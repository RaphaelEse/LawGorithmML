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
                <Card.Title as="h4">Comparative Analysis Results:</Card.Title>
                <p className="card-category">
                  Scores compared among our own Custom NLP Model and industry-standard models
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
                      <td>Custom NLP Model</td>
                      <td>91.4%</td>
                      <td>91.4%</td>
                      <td>91.4%</td>
                      <td>91.4%</td>
                      <td>91.4%</td>
                    </tr>
                    <tr>
                      <td>LegalBERT</td>
                      <td>73.3%</td>
                      <td>73.3%</td>
                      <td>73.3%</td>
                      <td>73.3%</td>
                      <td>73.3%</td>
                    </tr>
                    <tr>
                      <td>Legal-RoBERTa</td>
                      <td>81.6%</td>
                      <td>81.6%</td>
                      <td>81.6%</td>
                      <td>81.6%</td>
                      <td>81.6%</td>
                    </tr>
                    <tr>
                      <td>Custom-LegalBERT</td>
                      <td>57.9%</td>
                      <td>57.9%</td>
                      <td>57.9%</td>
                      <td>57.9%</td>
                      <td>57.9%</td>
                    </tr>
                    <tr>
                      <td>Graph Convolutional Networks</td>
                      <td>86.5%</td>
                      <td>86.5%</td>
                      <td>86.5%</td>
                      <td>86.5%</td>
                      <td>86.5%</td>
                    </tr>
                    <tr>
                      <td>Long-Short Term Memory Network</td>
                      <td>90.1%</td>
                      <td>90.1%</td>
                      <td>90.1%</td>
                      <td>90.1%</td>
                      <td>90.1%</td>
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
