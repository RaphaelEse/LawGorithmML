# Will use Flask/Python/RESTApi for our backend

# db.py
import os
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

def create_bill_node(bill_id, title, summary, date, status):
    """
    Creates a Bill node with the given properties.
    """
    with get_db_session() as session:
        session.run(
            """
            CREATE (b:Bill {
                bill_id: $bill_id,
                title: $title,
                summary: $summary,
                date: $date,
                status: $status
            })
            RETURN b
            """,
            bill_id=bill_id,
            title=title,
            summary=summary,
            date=date,        # store as string or convert to date() in Cypher
            status=status
        )

def test_db_connection():
    """
    Test connection by running a simple Cypher query
    and returning the result.
    """
    with get_db_session() as session:
        result = session.run("RETURN 1 AS test_value")
        record = result.single()
        return record["test_value"] if record else None

# Optional: if you run db.py directly, you can test the connection.
if __name__ == "__main__":
    # Stubbed Bill Node
    create_bill_node(
        bill_id="H.R. 1234",
        title="Stubbed Bill Title",
        summary="This is a stub for demonstration purposes.",
        date="2025-02-18",
        status="Introduced"
    )
    print("Stubbed bill node created successfully.")


