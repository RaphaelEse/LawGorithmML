import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

function Homepage() {
  return (
      <Container fluid className="mt-4">
        <Row className="justify-content-center text-center">
          <Col md="10">
            <h1 className="display-4">LawGorithm</h1>
            <h3 className="text-muted">Group Members: Jacob Albright, Alip Yalikun, Evan Lee, Jay Sarode, Raphael Esedebe</h3>
            <p className="lead">
              Welcome to LawGorithm! Below is a brief overview of the sections and how to navigate through them.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center mt-4">
          <Col md="6">
            <Card className="text-center">
              <Card.Body>
                <i className="nc-icon nc-globe-2" style={{ fontSize: "3rem" }}></i>
                <Card.Title>Navigation Overview</Card.Title>
                <Card.Text>
                  Use the left navigation bar to explore different tabs, each covering key aspects of our project.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center mt-4">
          <Col md="6">
            <Card className="text-center">
              <Card.Body>
                <i className="nc-icon nc-app" style={{ fontSize: "3rem" }}></i>
                <Card.Title>Project Overview</Card.Title>
                <Card.Text>
                  LawGorithm conducts a comparative analysis between a fine-tuned, custom machine learning model and various currently available machine learning models to classify the context of citations.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Stakeholders & Industry Impact */}
        <Row className="justify-content-center mt-4">
          <Col md="6">
            <Card className="text-center">
              <Card.Body>
                <i className="nc-icon nc-bank" style={{ fontSize: "3rem" }}></i>
                <Card.Title>Industry Impact</Card.Title>
                <Card.Text>
                  Stakeholders include law firms, government agencies, financial institutions, and corporate compliance teams.
                  Benefits extend to legislators, attorneys, and policymakers by gaining clarity for legal decisions. NLP and ML researchers will also benefit from enhanced workflows in law-related AI by advancing citation classification techniques.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center mt-4">
          <Col md="6">
            <Card className="text-center">
              <Card.Body>
                <i className="nc-icon nc-chart-bar-32" style={{ fontSize: "3rem" }}></i>
                <Card.Title>Abstract & Results</Card.Title>
                <Card.Text>
                  Our study found that [general results].
                </Card.Text>
                <Button variant="warning">View Findings</Button>  {/* link to visulization tap */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default Homepage;
