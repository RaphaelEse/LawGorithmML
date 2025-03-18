from flask import Flask, jsonify
from db import get_all_bills, get_all_citations, test_db_connection

app = Flask(__name__)

@app.route("/bills", methods=["GET"])
def api_get_bills():
    """
    Retrieve all Bill nodes from the database and return them as JSON.
    """
    bills = get_all_bills()
    # Convert each Neo4j node (which is a Record) into a dict of properties
    bills_list = [dict(bill) for bill in bills]
    return jsonify(bills_list)

@app.route("/citations", methods=["GET"])
def api_get_citations():
    """
    Retrieve all Citation nodes from the database and return them as JSON.
    """
    citations = get_all_citations()
    citations_list = [dict(citation) for citation in citations]
    return jsonify(citations_list)

@app.route("/test", methods=["GET"])
def api_test_connection():
    """
    Test the database connection.
    """
    result = test_db_connection()
    return jsonify({"test_value": result})

if __name__ == "__main__":
    app.run(debug=True)
