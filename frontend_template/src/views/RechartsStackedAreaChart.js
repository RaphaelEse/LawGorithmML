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

const timeDivisions = {
  model1: "By Date",
  model2: "By Month",
  model3: "By Quarter",
  model4: "By Year"
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
        <AreaChart key={data.length > 0 ? "loaded" : "loading"} data={data}> //Ensures animation of chart
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

      {/* <div style={{ marginBottom: "10px" }}>
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
      </div> */}
    </div>
  );
};

export default StackedAreaChart;