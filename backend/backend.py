from flask import Flask, jsonify, request
from flask_cors import CORS
from db import get_all_bills, get_all_citations, test_db_connection,get_bill_graph, search_bills

app = Flask(__name__)
CORS(app)

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

@app.route("/bills/search", methods=["GET"])
def api_search_bills():
    q = request.args.get("q", "")
    hits = search_bills(q)
    return jsonify(hits)

@app.route("/bills/<bill_id>/graph", methods=["GET"])
def api_get_bill_graph(bill_id):
    """
    Retrieves the Bill node (by bill_id) and all directly connected nodes and relationships.
    This is useful for graph visualization.
    """
    graph_data = get_bill_graph(bill_id)
    return jsonify(graph_data)

if __name__ == "__main__":
    app.run(debug=True)
