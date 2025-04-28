import React from "react";
import RechartsStackedBarChart from "./RechartsStackedBarChart";
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
                      <div style={{ margin: "5px 0" }}></div>
                <p className="card-category" style={{ fontSize: "1rem" }}>
                 Below is a bar chart comparing the total number of classifications for all five citation context classification types among the four models used for comparative analysis.
                </p>
                <p className="card-category" style={{ fontSize: "1rem" }}>
                The "Toggle Stacked View" option allows you to view the chart in either stacked or grouped format.
                </p>
                {/* <p className="card-category" style={{ fontSize: "1rem" }}>
                 When the "Toggle Stacked View" option is unchecked, the chart will compare the number of classifications for each citation context type by model.
                </p>
                {/* <p className="card-category" style={{ fontSize: "1rem" }}>
                When the "Toggle Stacked View" option is checked, the chart will compare the total number of classifications for each citation context type.
                </p> */}
                <p className="card-category" style={{ fontSize: "1rem" }}>
                Upon mouseover, the chart will display the total number of classifications for each citation context type by model.
                </p>
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
                      <div style={{ margin: "5px 0" }}></div>
                <p className="card-category" style={{ fontSize: "1rem" }}>
                 Below is a stacked area chart describing how the number of classifications for citation context type changes over time.
                </p>
                <p className="card-category" style={{ fontSize: "1rem" }}>
                The four buttons above the chart allow you to select between the four models used for comparative analysis.
                </p>
                <p className="card-category" style={{ fontSize: "1rem" }}>
                Upon mouseover, the chart will display a specific date and the number of classifications for each citation context type.
                </p>
                    </Card.Header>
                    <Card.Body style={{ height: "560px" }}>
                    <RechartsStackedAreaChart />
                    </Card.Body>
                    <Card.Footer>
                      Note: This is the only visualization that uses original data without SMOTE balancing to preserve citation date authenticity. This results in an imbalanced dataset skewed towards the "Authority" citation context type.
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
                      <div style={{ margin: "5px 0" }}></div>
                      <p className="card-category" style={{ fontSize: "1rem" }}>
                      Below is a radar chart comparing the number of classifications among the citation context classification types for a chosen model.
                      </p>
                      <p className="card-category" style={{ fontSize: "1rem" }}>
                        By default, all models are shown in a stacked format. To choose a single model, use the dropdown menu above the chart.
                      </p>
                      <div style={{ margin: "0px 0" }}></div>
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
                      <div style={{ margin: "5px 0" }}></div>
                      <p className="card-category" style={{ fontSize: "1rem" }}>
                      Below is a pie chart comparing the total number of classifications among the citation context classification types for all models.
                      </p>
                      <p className="card-category" style={{ fontSize: "1rem" }}>
                      Upon mouseover, the chart will display the total number of classifications and the percentage of total classifications for the chosen citation context classification type.
                      </p>
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
