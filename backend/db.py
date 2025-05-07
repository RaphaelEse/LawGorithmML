import os
import json
from dotenv import load_dotenv
import csv
from neo4j import GraphDatabase

load_dotenv()

# Retrieve connection details from environment variables
NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USER = os.getenv("NEO4J_USER")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")

# Create a single driver instance
driver = GraphDatabase.driver(
    NEO4J_URI,
    auth=(NEO4J_USER, NEO4J_PASSWORD)
)

def get_db_session():
    """
    Returns a new session instance.
    Sessions should typically be short-lived and closed once done.
    """
    return driver.session()

def test_db_connection():
    """
    Test connection by running a simple Cypher query
    and returning the result.
    """
    with get_db_session() as session:
        result = session.run("RETURN 1 AS test_value")
        record = result.single()
        return record["test_value"] if record else None


def get_all_bills():
    """
    Retrieves all Bill nodes from the Neo4j database.
    
    Returns:
        A list of Bill nodes (each node contains its properties).
    """
    with get_db_session() as session:
        def tx_func(tx):
            result = tx.run("MATCH (b:Bill) RETURN b")
            return [record["b"] for record in result]
        return session.execute_read(tx_func)

def get_all_citations():
    """
    Retrieves all Citation nodes from the Neo4j database.
    
    Returns:
        A list of Citation nodes (each node contains its properties).
    """
    with get_db_session() as session:
        def tx_func(tx):
            result = tx.run("MATCH (c:Citation) RETURN c")
            return [record["c"] for record in result]
        return session.execute_read(tx_func)
    
def get_full_graph():
    """
    Retrieves all nodes and relationships from the Neo4j database and returns them
    in a format suitable for graph visualization (e.g., in React).

    Returns:
        A dictionary with two keys:
          - "nodes": A list of node dictionaries, each containing its internal ID, labels, and properties.
          - "relationships": A list of relationship dictionaries, each with an ID, type, source node ID,
                             target node ID, and properties.
    """
    with get_db_session() as session:
        def tx_func(tx):
            # Retrieve all nodes with their internal id, labels, and properties.
            nodes_result = tx.run(
                "MATCH (n) RETURN id(n) as id, labels(n) as labels, properties(n) as properties"
            )
            nodes = [
                {"id": record["id"], "labels": record["labels"], "properties": record["properties"]}
                for record in nodes_result
            ]

            # Retrieve all relationships with their internal id, type, start and end node ids, and properties.
            rels_result = tx.run(
                "MATCH ()-[r]->() RETURN id(r) as id, type(r) as type, id(startNode(r)) as source, id(endNode(r)) as target, properties(r) as properties"
            )
            relationships = [
                {
                    "id": record["id"],
                    "type": record["type"],
                    "source": record["source"],
                    "target": record["target"],
                    "properties": record["properties"]
                }
                for record in rels_result
            ]
            return {"nodes": nodes, "relationships": relationships}
        
        return session.execute_read(tx_func)

def search_bills(search_term):
    """
    Searches for Bill nodes where bill_id OR bill_title contains the search_term (case-insensitive).
    Returns:
      [ { "bill_id": "...", "bill_title": "..." }, … ]
    """
    with get_db_session() as session:
        def tx_func(tx, search_term):
            res = tx.run(
                """
                MATCH (b:Bill)
                WHERE toLower(b.bill_id) CONTAINS toLower($search_term)
                   OR toLower(b.bill_title) CONTAINS toLower($search_term)
                RETURN b.bill_id AS bill_id, b.bill_title AS bill_title
                ORDER BY b.bill_id
                LIMIT 20
                """,
                {"search_term": search_term}
            )
            return [ {"bill_id": r["bill_id"], "bill_title": r["bill_title"]} for r in res ]
        return session.execute_read(tx_func, search_term)

def get_bill_graph(bill_id):
    """
    Retrieves the subgraph for the given bill_id. It returns the Bill node
    and all nodes connected to it plus the relationships connecting them.
    
    Returns:
        A dictionary with:
          - "nodes": a list of dicts for each node (internal id, labels, properties)
          - "relationships": a list of dicts for each relationship (id, type, source, target, properties)
    """
    with get_db_session() as session:
        def tx_func(tx, bill_id):
            cypher = """
            MATCH (b:Bill {bill_id: $bill_id})
            OPTIONAL MATCH (b)-[r]-(n)
            WITH collect(distinct b) + collect(distinct n) AS nodes, collect(distinct r) AS rels
            RETURN
              [node IN nodes | { id: id(node), labels: labels(node), properties: properties(node) }] AS nodes,
              [rel IN rels | { id: id(rel), type: type(rel), source: id(startNode(rel)), target: id(endNode(rel)), properties: properties(rel) }] AS relationships
            """
            result = tx.run(cypher, bill_id=bill_id)
            record = result.single()
            if record:
                return {"nodes": record["nodes"], "relationships": record["relationships"]}
            else:
                return {"nodes": [], "relationships": []}
        return session.execute_read(tx_func, bill_id)
    
current_dir  = os.path.dirname(os.path.abspath(__file__))
csv_path     = os.path.join(current_dir, "Bills and Names - Sheet1.csv")

bill_title_map = {}
with open(csv_path, newline="", encoding="utf-8") as fh:
    reader = csv.DictReader(fh)
    for row in reader:
        bid   = row["File Name"].strip()   # <-- this is your bill_id
        title = row["Bill Name"].strip()   # <-- this is the human‐readable title
        bill_title_map[bid] = title

def save_bill_with_citations(bill_data, bill_title):
    with get_db_session() as session:
        def tx(tx, bd, title):
            bid = bd["bill_id"]

            # 1) MERGE Bill and set its title
            tx.run("""
                MERGE (b:Bill { bill_id: $bill_id })
                SET   b.bill_title = $bill_title
            """, bill_id=bid, bill_title=title)

            # 2) Build composite key so citations never collide
            citations = bd.get("citations", [])
            for c in citations:
                c["uniqueCitationId"] = f"{bid}__{c['citation_id']}"

            # 3) MERGE all Citation nodes
            tx.run("""
                UNWIND $citations AS c
                MERGE (cit:Citation { uniqueCitationId: c.uniqueCitationId })
                SET
                  cit.citation_id     = c.citation_id,
                  cit.text            = c.text,
                  cit.context         = coalesce(c.context, ""),
                  cit.original_label  = coalesce(c.original_label, ""),
                  cit.predicted_label = coalesce(c.predicted_label, ""),
                  cit.bill_full_name  = coalesce(c.bill_full_name, ""),
                  cit.bill_id         = coalesce(c.bill_id, ""),
                  cit.model_name      = coalesce(c.model_name, ""),
                  cit.prob_Amending   = c.prob_Amending,
                  cit.prob_Authority  = c.prob_Authority,
                  cit.prob_Definition = c.prob_Definition,
                  cit.prob_Exception  = c.prob_Exception,
                  cit.prob_Precedent  = c.prob_Precedent
            """, citations=citations)

            # 4) Group by predicted_label and create relationships
            rel_groups = {}
            for c in citations:
                lbl = c.get("predicted_label", "DEFAULT")
                rel_groups.setdefault(lbl, []).append(c)

            for rel_type, grp in rel_groups.items():
                tx.run(f"""
                    UNWIND $grp AS c
                    MATCH (b:Bill {{ bill_id: $bill_id }})
                    MATCH (cit:Citation {{ uniqueCitationId: c.uniqueCitationId }})
                    MERGE (b)-[:`{rel_type}`]->(cit)
                """, bill_id=bid, grp=grp)

        session.execute_write(tx, bill_data, bill_title)

if __name__ == "__main__":
    json_path = os.path.join(current_dir, "new_distilbert_results.json")
    with open(json_path, "r", encoding="utf-8") as jf:
        all_bills = json.load(jf)

    for bill in all_bills:
        bid   = bill.get("bill_id")
        title = bill_title_map.get(bid, "")
        print(f"→ Importing {bid!r} as “{title}” ({len(bill.get('citations', []))} citations)")
        save_bill_with_citations(bill, title)

    print("✅ Done importing all bills.")

