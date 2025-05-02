import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function TableList() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h3">Comparative Analysis Results:</Card.Title>
                <div style={{ margin: "5px 0" }}></div>
                <p className="card-category" style={{ fontSize: "1rem" }}>
                  Below are industry-standard metrics for machine learning models compared between Lawgorithm's Custom Zero-Shot Classification
                  Model and three other legal classification models chosen for comparative analysis.
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Model</th>
                      <th className="border-0">Accuracy</th>
                      <th className="border-0">Precision</th>
                      <th className="border-0">Recall</th>
                      <th className="border-0">F1-Score</th>
                      <th className="border-0">Weighted F1-Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Custom Zero-Shot Classification Model</td>
                      <td>90.87%</td>
                      <td>90.88%</td>
                      <td>90.87%</td>
                      <td>90.82%</td>
                      <td>90.82%</td>
                    </tr>
                    <tr>
                      <td>LegalBERT</td>
                      <td>95.80%</td>
                      <td>95.86%</td>
                      <td>95.80%</td>
                      <td>95.80%</td>
                      <td>95.80%</td>
                    </tr>
                    <tr>
                      <td>Distil-BERT</td>
                      <td>95.72%</td>
                      <td>95.77%</td>
                      <td>95.71%</td>
                      <td>95.71%</td>
                      <td>95.71%</td>
                    </tr>
                    <tr>
                      <td>Graph Convolutional Networks (GCN)</td>
                      <td>75.96%</td>
                      <td>77.99%</td>
                      <td>75.96%</td>
                      <td>75.96%</td>
                      <td>76.34%</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
