import React, { useState, useEffect } from "react";

import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend
} from 'recharts';

import * as d3 from 'd3'

const modelNames = {
  model1: "Custom Zero-Shot Classification Model",
  model2: "LegalBERT",
  model3: "Distil-BERT",
  model4: "Graph Convolutional Network (GCN)"
}

const colors = {
  model1: "#ff5733",
  model2: "#ff8a33",
  model3: "#609f20",
  model4: "#3383ff"
}

const RechartsRadarChart = () => {
  const [data, setData] = useState([]);
  const [selectedModel, setSelectedModel] = useState("All Models");
  

  useEffect(() => {
    // Fetch data from the CSV file 
    d3.csv("/typesNumbersMultipleModels.csv", d3.autoType).then((parsedData) => {
      console.log(parsedData)
      setData(parsedData);
    });
  }, []);

  return (
    //Four buttons to select a single model and one more button to show all models at once in radar chart
    <div style={{ width: "100%", height: 400 }}>
      <div style={{ marginBottom: "10px" }}>

        <select
          value={selectedModel}
          onChange={(model) => setSelectedModel(model.target.value)}
          style={{
            //width adjusts to length of the text
            width: "auto",
            display: "inline-block",
            fontSize: "16px",
            margin: "5px 5px 5px 0px",
            padding: "5px 10px",
            backgroundColor: "#f0f0f0",
            color: "#000",
            border: "2px solid #aaa",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          <option value="All Models">All Models</option>
          {Object.keys(modelNames).map((model) => (
            <option key={model} value={model}>
              {modelNames[model]}
            </option>
          ))}
        </select> 
      </div>
      {selectedModel === "All Models" ? (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart key={selectedModel} cx="50%" cy="50%" outerRadius="90%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="Type" />
          <PolarRadiusAxis domain={[0, 40]}/>

            <Radar
              name={modelNames.model1}
              dataKey={modelNames.model1}
              stroke={colors.model1}
              fill={colors.model1}
              fillOpacity={0.25} 
              />
            <Radar
                name={modelNames.model2}
                dataKey={modelNames.model2}
                stroke={colors.model2}
                fill={colors.model2}
                fillOpacity={0.25} 
                />
            <Radar
                name={modelNames.model3}
                dataKey={modelNames.model3}
                stroke={colors.model3}
                fill={colors.model3}
                fillOpacity={0.25} 
                />
            <Radar
                name={modelNames.model4}
                dataKey={modelNames.model4}
                stroke={colors.model4}
                fill={colors.model4}
                fillOpacity={0.25} 
                />
                 <Legend />
        </RadarChart>
      </ResponsiveContainer>
    
          ) : (
        <ResponsiveContainer width="100%" height="100%">
        <RadarChart key={selectedModel} cx="50%" cy="50%" outerRadius="90%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="Type" />
          <PolarRadiusAxis domain={[0, 40]}/>
            <Radar
              name={modelNames[selectedModel]}
              dataKey={modelNames[selectedModel]}
              stroke={colors[selectedModel]}
              fill={colors[selectedModel]}
              fillOpacity={0.3}
            />
             <Legend />
        </RadarChart>
      </ResponsiveContainer>
          )}

    </div>
  );
};

export default RechartsRadarChart;