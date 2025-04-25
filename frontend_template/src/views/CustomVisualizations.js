import React from "react";
import ChartistGraph from "react-chartist";
import D3BarChart from "./D3BarChart"
import VegaLiteStreamgraph from "./VegaLiteStreamgraph"
import Recharts from "./RechartsStackedBarChart"
import RechartsStackedBarChart from "./RechartsStackedBarChart";
import RechartsStackedBarChartNoCSV from "./RechartsStackedBarChartNoCSV";
import RechartsStackedAreaChart from "./RechartsStackedAreaChart";
import RechartsRadarChart from "./RechartsRadarChart";
import RechartsPieChart from "./RechartsPieChart";
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



function CustomVisualizations() {
  return (
    <div className="graphs-page">

          <>
            <Container fluid>
              <Row>
                <Col md="12">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h3">Total Citation Context Types by Model: Stacked/Grouped Bar Chart</Card.Title>
                      <p className="card-category">March 2020 - November 2024</p>
                      <div style={{ margin: "20px 0" }}></div>
                      <RechartsStackedBarChart />
                    </Card.Header>
                    <Card.Body>
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </Container>
          </>

    <div style={{ margin: "0px 0" }}></div>
    <>
            <Container fluid>
              <Row>
                <Col md="12">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h3">Citation Context Types Over Time: Stacked Area Chart</Card.Title>
                      <p className="card-category">March 2020 - November 2024</p>
                      <div style={{ margin: "20px 0" }}></div>
                    </Card.Header>
                    <Card.Body style={{ height: "560px" }}>
                    <RechartsStackedAreaChart />
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </Container>
          </>

    {/* <div style={{ margin: "80px 0" }}></div> */}

    <>
            <Container fluid>
              <Row>
                <Col md="6">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h3">Citation Context Types By Model: Radar Chart</Card.Title>
                      <p className="card-category">March 2020 - November 2024</p>
                      <div style={{ margin: "20px 0" }}></div>
                    </Card.Header>
                    <Card.Body style={{ height: "500px" }}>
                    <RechartsRadarChart />
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col md="6">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h3">Total Citation Types: Pie Chart</Card.Title>
                      <p className="card-category">March 2020 - November 2024</p>
                      <div style={{ margin: "20px 0" }}></div>
                    </Card.Header>
                    <Card.Body style={{ height: "500px" }}>
                    <RechartsPieChart />
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </Container>
          </>
  </div>
  )
}

export default CustomVisualizations;
