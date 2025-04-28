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

function Dashboard() {
  return (
    
    <>
      <Container fluid>
      <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Bill Details</Card.Title>
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

export default Dashboard;
