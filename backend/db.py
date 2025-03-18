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
            # Create the Bill node
            create_bill_query = """
            CREATE (b:Bill {
                bill_id: $bill_id,
                title: $title,
                summary: $summary,
                date: $date,
                status: $status
            })
            RETURN b
            """
            tx.run(create_bill_query,
                   bill_id=bill_data["bill_id"],
                   title=bill_data["title"],
                   summary=bill_data["summary"],
                   date=bill_data["date"],
                   status=bill_data["status"])
            
            # Process each citation
            for citation in bill_data.get("citations", []):
                # Create the Citation node
                create_citation_query = """
                CREATE (c:Citation {
                    citation_id: $citation_id,
                    text: $text,
                    normCite: $normCite,
                    citeType: $citeType,
                    section: $section,
                    isShortCite: $isShortCite
                })
                RETURN c
                """
                tx.run(create_citation_query,
                       citation_id=citation["citation_id"],
                       text=citation["text"],
                       normCite=citation["normCite"],
                       citeType=citation["citeType"],
                       section=citation["section"],
                       isShortCite=citation["isShortCite"])
                
                # Use the relationshipType from the citation for the edge label.
                # Dynamic relationship type requires interpolation since it cannot be parameterized.
                relationship_type = citation["relationshipType"]
                create_relationship_query = f"""
                MATCH (b:Bill {{bill_id: $bill_id}})
                MATCH (c:Citation {{citation_id: $citation_id}})
                CREATE (b)-[r:`{relationship_type}`]->(c)
                RETURN r
                """
                tx.run(create_relationship_query,
                    bill_id=bill_data["bill_id"],
                    citation_id=citation["citation_id"])
                        
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




# Optional: if you run db.py directly, load sample.json and save the bill data.
if __name__ == "__main__":
    # Retrieve and print all Bill nodes
    bills = get_all_bills()
    print("Bills:")
    for bill in bills:
        print(dict(bill))

    # Retrieve and print all Citation nodes
    citations = get_all_citations()
    print("Citations:")
    for citation in citations:
        print(dict(citation))