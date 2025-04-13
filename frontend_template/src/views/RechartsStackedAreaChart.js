import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as d3 from 'd3'

const modelCsvFiles = {
  model1: "/citations_bill_date_model1.csv",
  model2: "/citations_bill_date_model2.csv",
  model3: "/citations_bill_date_model3.csv",
  model4: "/citations_bill_date_model4.csv",
}

const modelNames = {
  model1: "Custom Zero-Shot Classification Model",
  model2: "LegalBERT",
  model3: "Longformer",
  model4: "Graph Convolutional Network (GCN)"
}

const StackedAreaChart = () => {

  const [data, setData] = useState([]);
  const [selectedModel, setSelectedModel] = useState("model1");
  
    useEffect(() => {
      // Fetch data from the selected CSV file 
      const filePath = modelCsvFiles[selectedModel];
      d3.csv(filePath, d3.autoType).then((parsedData) => {
        setData(parsedData);
        console.log(parsedData);
      });
    }, [selectedModel]); // Update data when selectedModel changes

  
  return (
    // Four buttons to select the model
    <div>
      <div style={{ marginBottom: "10px" }}>
        {Object.keys(modelNames).map((model) => (
          <button
            key={model}
            onClick={() => setSelectedModel(model)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: selectedModel === model ? "#007bff" : "#f0f0f0",
              color: selectedModel === model ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {modelNames[model]}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend
            formatter={(value, entry) => {
              const { color } = entry;
              return <span style={{ color }}>{value}</span>;
            }}
          />
          <Area type="natural" dataKey="Authority" stackId="1" stroke="#ff5733" fill="#ff5733" />
          <Area type="natural" dataKey="Definition" stackId="1" stroke="#ff8a33" fill="#ff8a33" />
          <Area type="natural" dataKey="Exception" stackId="1" stroke="#609f20" fill="#609f20" />
          <Area type="natural" dataKey="Precedent" stackId="1" stroke="#3383ff" fill="#3383ff" />
          <Area type="natural" dataKey="Rescinding" stackId="1" stroke="#7c33ff" fill="#7c33ff" />
          <Area type="natural" dataKey="Amending" stackId="1" stroke="#ff33aa" fill="#ff33aa" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedAreaChart;



/*


const RechartsStackedBarChart = () => {
  const [isStacked, setIsStacked] = useState(false); // toggle state

  // Sample wide-format CSV data
  const csvData = `Type,Model1,Model2,Model3,Model4,Model5,Model6,Model7
Legal Basis/Precedent,43,32,30,25,35,38,40
Authority,33,34,29,31,30,28,32
Definition,12,16,14,18,20,19,17
Supporting/Example,32,24,28,29,27,25,26
Exception/Limitation,8,10,9,11,13,12,10
Rescinding,25,20,22,24,26,23,21
Adjusting,21,17,19,20,18,21,22`;

  const data = d3.csvParse(csvData);

  const modelKeys = data.columns.slice(1); // ['Model1', ..., 'Model7']

  return (
    <div style={{ width: "100%", height: 400 }}>
      <label style={{ display: "block", marginBottom: "10px" }}>
        <input
          type="checkbox"
          checked={isStacked}
          onChange={() => setIsStacked((prev) => !prev)}
        />{" "}
        Toggle Stacked View
      </label>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Type" />
          <YAxis />
          <Tooltip />
          <Legend />
          {modelKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId={isStacked ? "a" : undefined}
              fill={d3.schemeCategory10[index % 10]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartsStackedBarChart;
*/



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
