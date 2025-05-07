import React from "react";
import RechartsLineChartMetrics from "./RechartsLineChartMetrics";
import MetricsTable from "./MetricsTable";
import NivoHeatmap from "./NivoHeatmap";
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";


function ComparativeAnalysis() {
  return (
    <div className="comp-page">
    <div className="comp-table">
      <MetricsTable />
    </div>
    
  <Container fluid>
    <Row>
      <Col md="12">
        <Card>
          <Card.Header>
            <Card.Title as="h3">Comparative Analysis Metrics Line Chart:</Card.Title>
            <div style={{ margin: "5px 0" }}></div>
                <p className="card-category" style={{ fontSize: "1rem" }}>
                <b>1)</b> Below is a line chart comparing performance among the four models used for comparative analysis.
                </p>
                <p className="card-category" style={{ fontSize: "1rem" }}>
                <b>2)</b> Upon mouseover, the chart will display each model's performance for the chosen metric type.
                </p>
            <div style={{ margin: "20px 0" }}></div>
            <RechartsLineChartMetrics />
          </Card.Header>
          <Card.Body>
          </Card.Body>
          <Card.Footer>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>

  <Container fluid>
    <Row>
      <Col md="12">
        <Card>
          <Card.Header>
            <Card.Title as="h3">Comparative Analysis Accuracy Heatmap:</Card.Title>
            <div style={{ margin: "5px 0" }}></div>
                <p className="card-category" style={{ fontSize: "1rem" }}>
                <b>1)</b> Below is a heatmap comparing accuracy scores for all five citation context classification types among the four models used for comparative analysis.
                </p>
                <p className="card-category" style={{ fontSize: "1rem" }}>
                <b>2)</b> Upon mouseover, the heatmap will isolate the column and row of the chosen cell, as well as present information about the chosen cell in the heatmap.
                </p>
                <p className="card-category" style={{ fontSize: "1rem" }}>
                <b>3)</b> Each column compares the accuracy score of the chosen citation context classification type among all models, while each row compares the accuracy score of the chosen model among all citation context classification types.
                </p>
            <NivoHeatmap />
          </Card.Header>
          <Card.Body>
          </Card.Body>
          <Card.Footer>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>

  </div>
  )
}

export default ComparativeAnalysis;