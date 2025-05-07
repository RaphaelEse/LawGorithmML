import React from "react";
import BillSearch from "./BillSearch";

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
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import Stack from "react-bootstrap/Stack"

function BillDetails() {
  return (
    
    <>
      <Container fluid>
      <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h3">Bill Details</Card.Title>
                <div style={{ margin: "5px 0" }}></div>
                <p className="card-category" style={{ fontSize: "1rem" }}>
                <b>1) </b> Below is a search bar allowing input of a bill number or title to create an interactive graph visualization showing citations with semantic context.
                </p>

              </Card.Header>
              <Card.Body>
                <BillSearch />
              </Card.Body>
            </Card>
          </Col>
        </Row>
     
      </Container>
    </>
  );
}

export default BillDetails;
