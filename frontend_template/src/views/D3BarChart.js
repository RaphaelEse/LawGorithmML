import React, { useState, useEffect } from "react";
import * as d3 from "d3";

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
