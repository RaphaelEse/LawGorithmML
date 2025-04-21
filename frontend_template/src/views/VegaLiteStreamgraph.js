import React, { useState, useEffect } from "react";
import {VegaLite} from "react-vega";
import * as d3 from "d3";
import ChartistGraph from "react-chartist";
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
const StreamGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv("/citations_date.csv").then((csvData) => {
      const parsedData = csvData.map((d) => ({
        Date: d["Date"],
        Count: +d["Count"], 
        Type: d["Type"]
      }));
      
      console.log("Loaded Data:", parsedData);
      setData(parsedData);
    });
  }, []);

  const spec = {
    width: 700,
    height: 500,
    title: "Citation Context Type Over Time Streamgraph",
    mark: { type: "area", interpolate: "basis" },
    encoding: {
      x: {
        field: "Date",
        timeUnit: "yearmonth",
        type: "temporal",
        axis: { format: "%b %Y", tickCount: 6, title: "Date" }
      },
      y: {
        field: "Count",
        type: "quantitative",
        aggregate: "sum",
        stack: "center",
        axis: { title: "Citation Type Count" }
      },
      color: {
        field: "Type",
        type: "nominal",
        scale: { scheme: "spectral" }
      }
    },
    data: { values: data }
  };

  return (
    <div>
      <VegaLite spec={spec} />
    </div>
  );
};

export default StreamGraph;


// function Dashboard() {
//   return (
//     <>
//       <Container fluid>
//         <Row>
//           <Col md="6">
//             <Card>
//               <Card.Header>
//                 <Card.Title as="h4">Test</Card.Title>
//                 <p className="card-category">March 2020 - November 2024</p>
//               </Card.Header>
//               <Card.Body>
//                 <div className="ct-chart" id="chartHours">
//                   <ChartistGraph
//                     data={{
//                       labels: [
//                         "9:00AM",
//                         "12:00AM",
//                         "3:00PM",
//                         "6:00PM",
//                         "9:00PM",
//                         "12:00PM",
//                         "3:00AM",
//                         "6:00AM",
//                       ],
//                       series: [
//                         [287, 385, 490, 492, 554, 586, 698, 695],
//                         [67, 152, 143, 240, 287, 335, 435, 437],
//                         [23, 113, 67, 108, 190, 239, 307, 308],
//                       ],
//                     }}
//                     type="Line"
//                     options={{
//                       low: 0,
//                       high: 800,
//                       showArea: false,
//                       height: "245px",
//                       axisX: {
//                         showGrid: false,
//                       },
//                       lineSmooth: true,
//                       showLine: true,
//                       showPoint: true,
//                       fullWidth: true,
//                       chartPadding: {
//                         right: 50,
//                       },
//                     }}
//                     responsiveOptions={[
//                       [
//                         "screen and (max-width: 640px)",
//                         {
//                           axisX: {
//                             labelInterpolationFnc: function (value) {
//                               return value[0];
//                             },
//                           },
//                         },
//                       ],
//                     ]}
//                   />
//                 </div>
//               </Card.Body>
//               <Card.Footer>
//                 <div className="legend">
//                   <i className="fas fa-circle text-info"></i>
//                   Legal Basis/Precedent <i className="fas fa-circle text-danger"></i>
//                   Authority <i className="fas fa-circle text-warning"></i>
//                   Ammending
//                 </div>
//                 <hr></hr>
//                 <div className="stats">
//                   {/* <i className="fas fa-history"></i> */}
//                   As provided by Bloomberg
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//           <Col md="6">
//             <Card>
//               <Card.Header>
//                 <Card.Title as="h4">NLP Model Citation Context Type Identifications</Card.Title>
//                 <p className="card-category">Based on Defined Citation Context Taxonomy</p>
//               </Card.Header>
//               <Card.Body>
//                 <div className="ct-chart" id="chartActivity">
//                   <ChartistGraph
//                     data={{
//                       labels: [
//                         "Legal Basis/Precedent",
//                         "Authority",
//                         "Definition",
//                         "Supporting/    Example",
//                         "Exception/     Limitation",
//                         "Rescending",
//                         "Adjusting",
//                       ],
//                       series: [
//                         [
//                           542,
//                           443,
//                           320,
//                           780,
//                           553,
//                           453,
//                           326,
//                         ],
//                         // [
//                         //   412,
//                         //   243,
//                         //   280,
//                         //   580,
//                         //   453,
//                         //   353,
//                         //   300,
//                         //   364,
//                         //   368,
//                         //   410,
//                         //   636,
//                         //   695,
//                         // ],
//                       ],
//                     }}
//                     type="Bar"
//                     options={{
//                       seriesBarDistance: 10,
//                       axisX: {
//                         showGrid: false,
//                       },
//                       height: "245px",
//                     }}
//                     responsiveOptions={[
//                       [
//                         "screen and (max-width: 640px)",
//                         {
//                           seriesBarDistance: 5,
//                           axisX: {
//                             labelInterpolationFnc: function (value) {
//                               return value[0];
//                             },
//                           },
//                         },
//                       ],
//                     ]}
//                   />
//                 </div>
//               </Card.Body>
//               <Card.Footer>
//                 <div className="legend">
//                   <i className="fas fa-circle text-info"></i>
//                   Citation Context Type Number
//                   {/* <i className="fas fa-circle text-danger"></i>
//                   BMW 5 Series */}
//                 </div>
//                 <hr></hr>
//                 <div className="stats">
//                   <i className="fas fa-check"></i>
//                   Data information certified
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//         </Row>
    
//       </Container>
//     </>
//   );
// }

// export default Dashboard;
