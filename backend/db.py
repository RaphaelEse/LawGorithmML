import os
import json
from dotenv import load_dotenv
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

def save_bill_with_citations(bill_data):
    with get_db_session() as session:
        def tx_func(tx, bill_data):
            # 1) Create the Bill node (only bill_id)
            create_bill_query = """
            CREATE (b:Bill { bill_id: $bill_id })
            RETURN b
            """
            tx.run(create_bill_query, bill_id=bill_data["bill_id"])
            
            # 2) Prepare and batch create Citation nodes using UNWIND.
            citations = bill_data.get("citations", [])
            # Add a composite key so that each citation is unique per bill
            for citation in citations:
                citation["uniqueCitationId"] = f"{bill_data['bill_id']}_{citation['citation_id']}"
            
            create_citations_query = """
            UNWIND $citations AS citation
            CREATE (c:Citation {
                uniqueCitationId: citation.uniqueCitationId,
                citation_id: citation.citation_id,
                text: citation.text,
                startPosition: coalesce(citation.startPosition, 0),
                endPosition: coalesce(citation.endPosition, 0),
                normCite: coalesce(citation.normCite, ""),
                citeType: coalesce(citation.citeType, ""),
                altCite: coalesce(citation.altCite, ""),
                pinCiteStr: coalesce(citation.pinCiteStr, ""),
                pageRangeStr: coalesce(citation.pageRangeStr, ""),
                nodeId: coalesce(citation.nodeId, 0),
                section: coalesce(citation.section, ""),
                sectionAndSubSection: coalesce(citation.sectionAndSubSection, ""),
                isShortCite: coalesce(citation.isShortCite, false),
                chunk_id: coalesce(citation.chunk_id, 0),
                context: coalesce(citation.context, ""),
                low_confidence: coalesce(citation.low_confidence, "")
            })
            """
            tx.run(create_citations_query, citations=citations)
            
            # 3) Group citations by their dynamic relationship type (from high_confidence)
            relationship_groups = {}
            for citation in citations:
                rel_type = citation.get("high_confidence", "DEFAULT")
                if rel_type not in relationship_groups:
                    relationship_groups[rel_type] = []
                relationship_groups[rel_type].append(citation)
            
            # 4) Create relationships for each group using the composite key
            for rel_type, group in relationship_groups.items():
                create_relationships_query = f"""
                UNWIND $group AS citation
                MATCH (b:Bill {{ bill_id: $bill_id }})
                MATCH (c:Citation {{ uniqueCitationId: citation.uniqueCitationId }})
                CREATE (b)-[:`{rel_type}`]->(c)
                """
                tx.run(create_relationships_query, bill_id=bill_data["bill_id"], group=group)

        session.execute_write(tx_func, bill_data)


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
    Searches for Bill nodes where bill_id contains the search_term (case-insensitive).
    Returns:
        A list of matching bill_id strings.
    """
    with get_db_session() as session:
        def tx_func(tx, search_term):
            result = tx.run(
                """
                MATCH (b:Bill)
                WHERE toLower(b.bill_id) CONTAINS toLower($search_term)
                RETURN b.bill_id AS bill_id
                """,
                {"search_term": search_term}
            )
            return [record["bill_id"] for record in result]
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


if __name__ == "__main__":
    import os
    import json
    import glob

    # Determine the absolute path to the 'fin_labeled' folder at the same level as this file.
    current_dir = os.path.dirname(os.path.abspath(__file__))
    json_dir = os.path.join(current_dir, "fin_labeled")
    
    # Find all JSON files in the folder
    json_files = glob.glob(os.path.join(json_dir, "*.json"))
    print(json_files)
    # Process each JSON file in the folder
    for json_file in json_files:
        print(f"Processing file: {json_file}")
        with open(json_file, "r") as f:
            bill_data = json.load(f)
        # Save the bill and its citations
        save_bill_with_citations(bill_data)

