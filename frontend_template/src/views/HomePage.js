import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

function Homepage() {

  return (
      <Container fluid className="mt-4">
        <Row className="justify-content-center text-center">
          <Col md="10">
          <div className="d-flex align-items-center justify-content-center">
            <h1 className="display-3">LawGorithm</h1>
            <img src={require("assets/img/lawgorithm_logo_black.png")} alt="Lawgorithm Logo" width={250}/>
            </div>
            <h3 className="text-muted">Group Members: Jacob Albright, Alip Yalikun, Evan Lee, Jay Sarode, Raphael Esedebe</h3>
            <p className="lead">
              Welcome to LawGorithm! Below is a brief overview of the sections and how to navigate through them.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center mt-4">
          <Col md="7">
            <Card className="text-center">
              <Card.Body>
                <i className="nc-icon nc-globe-2" style={{ fontSize: "4rem" }}></i>
                <Card.Title style={{ fontSize: "1.5rem" }}>Navigation Overview</Card.Title>
                <div style={{ margin: "10px 0" }}></div>
                <Card.Text>
                  Use the left navigation bar to explore different tabs, each covering key aspects of our project.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center mt-4">
          <Col md="7">
            <Card className="text-center">
              <Card.Body>
                <i className="nc-icon nc-paper-2" style={{ fontSize: "3.75rem" }}></i>
                <Card.Title style={{ fontSize: "1.5rem" }}>Why Legal Citation Context?</Card.Title>
                <div style={{ margin: "10px 0" }}></div>
                <Card.Text>
                Legal documentation such as bills, laws, and statutes serves as the foundation for decision-making and policy creation for judges, legislators, and attorneys. These legal documents rely on connections to historical documentation through citations in a variety of contexts, and understanding the semantic role that each citation is essential for deeper legal document understanding, retrieval, and analysis.                 </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center mt-4">
          <Col md="7">
            <Card className="text-center">
              <Card.Body>
                <i className="nc-icon nc-app" style={{ fontSize: "4rem" }}></i>
                <Card.Title style={{ fontSize: "1.5rem" }}>Project Overview</Card.Title>
                <Card.Text>
                <div style={{ margin: "10px 0" }}></div>
                Utilizing a Bloomberg-provided database of 108 bills with over 17,000 citations, LawGorithm has conducted a four-phase project to better understand the context of citations within legal docuemntation:
                </Card.Text>
              <ol>
              <li>Initial legal and machine learning research with a literature review and final citation context taxonomy of five types:  Amending, Definition, Precedent, Exception, Authority</li>
              <div style={{ margin: "10px 0" }}></div>
              <li>Conducted a comparative analysis between a custom NLP model utilizing zero-shot classification with a neural network and three other industry-standard legal classification models</li>
              <div style={{ margin: "10px 0" }}></div>
              <li>Created a classification result retrieval pipeline with back end APIs and a Neo4j database to store extracted contexts and create a interactive graph visualizations</li>
              <div style={{ margin: "10px 0" }}></div>
              <li>Created six additional visualzations with the Recharts and Nivo libraries to visualization model metrics and classification results</li>

              </ol>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Stakeholders & Industry Impact */}
        <Row className="justify-content-center mt-4">
          <Col md="7">
            <Card className="text-center">
              <Card.Body>
                <i className="nc-icon nc-bank" style={{ fontSize: "4rem" }}></i>
                <Card.Title style={{ fontSize: "1.5rem" }}>Industry Impact</Card.Title>
                <Card.Text>
                  Stakeholders include law firms, government agencies, financial institutions, and corporate compliance teams.
                  Benefits extend to legislators, attorneys, and policymakers by gaining clarity for legal decisions. NLP and ML researchers will also benefit from enhanced workflows in law-related AI by advancing citation classification techniques.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default Homepage;
