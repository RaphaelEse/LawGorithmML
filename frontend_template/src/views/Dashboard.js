import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
import D3BarChart from "./D3BarChart"
import VegaLiteStreamgraph from "./VegaLiteStreamgraph"
import GraphVisualization from "./GraphVisualization";
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

  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  // useEffect(() => {
  //   fetch("http://127.0.0.1:5000/full-graph")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)

  //       const nodes = data.nodes || [];
  //       const links = (data.relationships || []).map(rel => ({
  //         source: rel.source,
  //         target: rel.target,
  //         type: rel.type
  //       }));
  //       setGraphData({ nodes, links });
  //       console.log(graphData)
  //     })
  //     .catch((err) => console.error("Error fetching graph data:", err));
  // }, []);

  return (

    <>
      <Container fluid>
        {/* Display the graph visualization */}
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Citation Context Type Over Time</Card.Title>
              </Card.Header>
              <Card.Body>
                <BillSearch />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Citation Context Type Over Time</Card.Title>
                <p className="card-category">March 2020 - November 2024</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "9:00AM",
                        "12:00AM",
                        "3:00PM",
                        "6:00PM",
                        "9:00PM",
                        "12:00PM",
                        "3:00AM",
                        "6:00AM",
                      ],
                      series: [
                        [287, 385, 490, 492, 554, 586, 698, 695],
                        [67, 152, 143, 240, 287, 335, 435, 437],
                        [23, 113, 67, 108, 190, 239, 307, 308],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Legal Basis/Precedent <i className="fas fa-circle text-danger"></i>
                  Authority <i className="fas fa-circle text-warning"></i>
                  Ammending
                </div>
                <hr></hr>
                <div className="stats">
                  {/* <i className="fas fa-history"></i> */}
                  As provided by Bloomberg
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">NLP Model Citation Context Type Identifications</Card.Title>
                <p className="card-category">Based on Defined Citation Context Taxonomy</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: [
                        "Legal Basis/Precedent",
                        "Authority",
                        "Definition",
                        "Supporting/    Example",
                        "Exception/     Limitation",
                        "Rescending",
                        "Adjusting",
                      ],
                      series: [
                        [
                          542,
                          443,
                          320,
                          780,
                          553,
                          453,
                          326,
                        ],
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Citation Context Type Number
                  {/* <i className="fas fa-circle text-danger"></i>
                  BMW 5 Series */}
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
