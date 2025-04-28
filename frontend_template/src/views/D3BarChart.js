import React, { useState, useEffect } from "react";
import * as d3 from "d3";
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
const BarChart = () => {
  const [data, setData] = useState([
  ]);


  useEffect(() => {
    d3.csv("/typesNumbers.csv").then((csvData) => {
      const parsedData = csvData.map((d) => ({
        Type: d["Type"],
        Number: +d["Number"], // Ensure 'Number' is converted to a number
      }));
      
      console.log("Loaded Data:", parsedData); // Debugging output
      setData(parsedData);
    });
  }, []);

  useEffect(() => {
    if (data.length == 0) return;

    const margin = { top: 50, right: 20, bottom: 120, left: 60 };
    const width = 960 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(".bar-chart").selectAll("*").remove()

    const svg = d3
      .select(".bar-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
    const x = d3.scaleBand()
      .domain(data.map(d => d.Type))
      .range([0, width])
      .padding(0.2);


    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Number)])
      .nice()
      .range([height, 0]);

    // x.domain(
    //   data.map(function (d) {
    //     return d.name;
    //   })
    // );
    // y.domain([
    //   0,
    //   d3.max(data, function (d) {
    //     return d.value;
    //   }),
    // ]);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.Type))
      .attr("y", d => y(d.Number))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y((d.Number)))
      .attr("fill", "steelblue")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", "orange");
        tooltip
          .style("opacity", 1)
          .html(`Type: ${d.Type}<br/>Number: ${d.Number}`)
          .style("left", event.pageX - 150 + "px")
          .style("top", event.pageY - 30 + "px"); 
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "steelblue"); 
        tooltip.style("opacity", 0); 
      });

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg
      .append("g").call(d3.axisLeft(y));

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 5)
      .attr("text-anchor", "middle")
      .text("Citation Context Types");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 15)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .text("Number");


      const tooltip = d3
      .select(".bar-chart")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("opacity", 0)
      .style("background-color", "rgba(0, 0, 0, 0.7)")
      .style("color", "white")
      .style("border-radius", "4px")
      .style("padding", "5px");
  }, [data]);

  return <div className="bar-chart"></div>;

; }; export default BarChart;










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
