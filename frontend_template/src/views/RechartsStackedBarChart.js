import React, { useState, useEffect } from "react";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, ReferenceLine, Label
} from 'recharts';

import * as d3 from 'd3'

const RechartsStackedBarChart = () => {
  const [data, setData] = useState([]);
  const [isStacked, setIsStacked] = useState(false); // toggle state
  const colors = ["#ff5733", "#ff8a33", "#609f20", "#3383ff", "#3383ff"]; // Color array for different bars
  
  useEffect(() => {
    // Fetch data from the CSV file 
    d3.csv("/typesNumbersMultipleModels.csv", d3.autoType).then((parsedData) => {
      setData(parsedData);
    });
  }, []);
  
  const modelKeys = data.columns?.slice(1) ?? []; // ['Model1', ..., 'Model7']

  return (
    <div style={{ width: "100%", height: 500 }}>
      <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold", fontSize: "14px", color: "#333" }}>
        <input
          type="checkbox"
          checked={isStacked}
          onChange={() => setIsStacked((prev) => !prev)}
        />{" "}
        Toggle Stacked View
      </label>

      <ResponsiveContainer width="100%" height="100%">
        
        <BarChart 
          key={isStacked ? "stacked" : "grouped"} // Update key to force re-render on toggle
          data={data}
          margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
          stroke="#555"
          animationDuration={1000}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="Type" />
          <YAxis domain={isStacked ? [0, 13000] : [0,4100]}/>
          <Tooltip />
          <Legend />
          <ReferenceLine y={isStacked ? 12172 : 3043} strokeDasharray="0 0" stroke="#000000" strokeWidth={2.5}>
          <Label value={isStacked ? "Correct: 12172" : "Correct: 3043"} fill="#111" position="left" offset={10} />
        </ReferenceLine>
          {modelKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId={isStacked ? "a" : undefined} //StackId determines if the bars are stacked (a) or grouped (undefined)
              fill={colors[index % colors.length]} // Use a color array for different bars
            />

          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartsStackedBarChart;