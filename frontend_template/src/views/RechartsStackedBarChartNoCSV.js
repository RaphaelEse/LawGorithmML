import React, { useState, useEffect } from "react";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,CartesianGrid
} from 'recharts';

import * as d3 from 'd3'



const RechartsStackedBarChart = () => {
  const [isStacked, setIsStacked] = useState(false); // toggle state

  // Sample wide-format CSV data
  const csvData = `Type,Custom NLP Model,LegalBERT,Legal-RoBERTa,Custom-LegalBERT,Graph Convolutional Networks,Long-Short Term Memory Network,Zero-Shot Classification Model
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