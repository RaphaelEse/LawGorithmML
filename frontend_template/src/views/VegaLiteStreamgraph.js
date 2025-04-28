import React, { useState, useEffect } from "react";
import {VegaLite} from "react-vega";
import * as d3 from "d3";
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
