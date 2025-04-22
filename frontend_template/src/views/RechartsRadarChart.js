import React, { useState, useEffect } from "react";

import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from 'recharts';

import * as d3 from 'd3'

const modelNames = {
  model1: "Custom Zero-Shot Classification Model",
  model2: "LegalBERT",
  model3: "Longformer",
  model4: "Graph Convolutional Network (GCN)"
}

const colors = {
  model1: "#ff5733",
  model2: "#7c33ff",
  model3: "#609f20",
  model4: "#3383ff"
}

const RechartsRadarChart = () => {
  const [data, setData] = useState([]);
  const [selectedModel, setSelectedModel] = useState("model1");
  

  useEffect(() => {
    // Fetch data from the CSV file 
    d3.csv("/typesNumbersMultipleModels.csv", d3.autoType).then((parsedData) => {
      console.log(parsedData)
      setData(parsedData);
    });
  }, []);

 const filteredData = selectedModel === "All Models" 
      ? data
      : data.map((row) => ({
          Type: row.Type,
          [modelNames[selectedModel]]: row[modelNames[selectedModel]],
        }));

        console.log(filteredData)
          console.log(selectedModel)

  return (
    //Four buttons to select a single model and one more button to show all models at once in radar chart
    <div style={{ width: "50%", height: 400 }}>
      <div style={{ marginBottom: "10px" }}>

       <button
          key="All Models"
          onClick={() => setSelectedModel("All Models")}
          style={{
            backgroundColor: selectedModel === "All Models" ? "#007bff" : "#f0f0f0",
            color: selectedModel === "All Models" ? "#fff" : "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          All Models
        </button> 
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

      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="90%" data={filteredData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="Type" />
          <PolarRadiusAxis domain={[0, 40]}/>

          {selectedModel === "All Models" ? (
            <>
            <Radar
              name={modelNames.model1}
              dataKey={modelNames.model1}
              stroke="#ff5733"
              fill="#ff5733"
              fillOpacity={0.3} 
              />
            <Radar
                name={modelNames.model2}
                dataKey={modelNames.model2}
                stroke="#7c33ff"
                fill="#7c33ff"
                fillOpacity={0.3} 
                />
            <Radar
                name={modelNames.model3}
                dataKey={modelNames.model3}
                stroke="#609f20"
                fill="#609f20"
                fillOpacity={0.3} 
                />
            <Radar
                name={modelNames.model4}
                dataKey={modelNames.model4}
                stroke="#3383ff"
                fill="#3383ff"
                fillOpacity={0.3} 
                />
              </>
          ) : (
            <Radar
              name={modelNames[selectedModel]}
              dataKey={modelNames[selectedModel]}
              stroke={colors[selectedModel]}
              fill={colors[selectedModel]}
              fillOpacity={0.3}
            />
          )}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartsRadarChart;