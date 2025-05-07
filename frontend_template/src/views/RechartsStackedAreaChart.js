import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as d3 from 'd3'

const modelCsvFiles = {
  model1: "/citations_bill_date_model1.csv",
  model2: "/citations_bill_date_model2.csv",
  model3: "/citations_bill_date_model3.csv",
  model4: "/citations_bill_date_model4.csv",
}
const modelCsvFilesNoAuthority = {
  model1: "/citations_bill_date_model1_noAuth.csv",
  model2: "/citations_bill_date_model2_noAuth.csv",
  model3: "/citations_bill_date_model3_noAuth.csv",
  model4: "/citations_bill_date_model4_noAuth.csv",
}

const modelNames = {
  model1: "Custom Zero-Shot Classification Model",
  model2: "LegalBERT",
  model3: "Distil-BERT",
  model4: "Graph Convolutional Network (GCN)"
}

const maxValues = {
  model1: 503,
  model2: "By Month",
  model3: "By Quarter",
  model4: "By Year"
}

const StackedAreaChart = () => {

  const [data, setData] = useState([]);
  const [selectedModel, setSelectedModel] = useState("model1");
  const [limitExtremes, setLimitExtremes] = useState(false); // toggle state
  
    useEffect(() => {
      // Fetch data from the selected CSV file 
      const filePath = limitExtremes ? modelCsvFilesNoAuthority[selectedModel] : modelCsvFiles[selectedModel];

      d3.csv(filePath, d3.autoType).then((parsedData) => {
        setData(parsedData);
        console.log(parsedData);
      });
    }, [selectedModel, limitExtremes]); // Update data when selectedModel changes or LimitExtremes is toggled

  
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
              border: "2px solid #aaa",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {modelNames[model]}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={500} >
        <AreaChart key={selectedModel} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" tickMargin={5} tickSize={10}/>
          <YAxis tickMargin={5} domain={limitExtremes ? [0, 175] : [0,500]}/>
          <Tooltip />          
          <Legend 
            verticalAlign="bottom"
            wrapperStyle={{ marginTop: 100 }}
          />
          <Area type="monotone" dataKey="Amending" stackId="1" stroke="#ff5733" fill="#ff5733" />
          <Area type="monotone" dataKey="Definition" stackId="1" stroke="#ff8a33" fill="#ff8a33" />
          <Area type="monotone" dataKey="Precedent" stackId="1" stroke="#609f20" fill="#609f20" />
          <Area type="monotone" dataKey="Exception" stackId="1" stroke="#3383ff" fill="#3383ff" />
          <Area type="monotone" dataKey="Authority" stackId="1" stroke="#ff33aa" fill="#ff33aa" />
        </AreaChart>
      </ResponsiveContainer>
      <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold", fontSize: "14px", color: "#333" }}>
        <input
          type="checkbox"
          checked={limitExtremes}
          onChange={() => setLimitExtremes((prev) => !prev)}
        />{" "}
        Omit Outliers
      </label>
    </div>
  );
};

export default StackedAreaChart;