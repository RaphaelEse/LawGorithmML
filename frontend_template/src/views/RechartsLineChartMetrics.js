import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
import * as d3 from 'd3'


const RechartsLineChartMetrics = () => {

  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Fetch data from the CSV file 
    d3.csv("/model_metrics.csv", d3.autoType).then((parsedData) => {
      setData(parsedData);
    });
  }, []);

    return (
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
        <LineChart key={data.length > 0 ? "loaded" : "loading"} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Metric" padding={{ left: 30, right: 30 }}/>
          <YAxis domain={[0.3, 0.8]}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Custom Zero-Shot Classification Model" stroke="#ff5733" strokeWidth={3}/>
          <Line type="monotone" dataKey="LegalBERT" stroke="#ff8a33" strokeWidth={3}/>
          <Line type="monotone" dataKey="Longformer" stroke="#609f20"strokeWidth={3}/>
          <Line type="monotone" dataKey="Graph Convolutional Network (GCN)" stroke="#3383ff" strokeWidth={3}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartsLineChartMetrics;
