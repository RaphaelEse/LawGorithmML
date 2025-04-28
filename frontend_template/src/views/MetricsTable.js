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
                      <td>86.10%</td>
                      <td>86.26%</td>
                      <td>86.10%</td>
                      <td>86.07%</td>
                      <td>86.07%</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          {/* <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Table on Plain Background</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Salary</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">City</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </>
  );
}

export default TableList;
