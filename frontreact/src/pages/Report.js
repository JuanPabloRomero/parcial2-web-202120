import React, { useState, useEffect } from "react";
import * as d3 from "d3";
export const Report = () => {
  const canvas = d3.select("#canvas");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/products?q")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  

  var tooplTipDiv = d3
    .select("body")
    .append("div")
    .attr("id", "myTooltip")
    .style("opacity", 0);

  const width = 700;
  const height = 500;
  const margin = { top: 10, left: 50, bottom: 40, right: 10 };
  const iwidth = width - margin.left - margin.right;
  const iheight = height - margin.top - margin.bottom;

  const svg = canvas.append("svg");
  svg.attr("width", width);
  svg.attr("height", height);

  let g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const y = d3.scaleLinear().domain([0, 500]).range([iheight, 0]);

  const x = d3
    .scaleBand()
    .domain(products.map((d) => d.name))
    .range([0, iwidth])
    .padding(0.1);

  const bars = g.selectAll("rect").data(products);

  bars
    .enter()
    .append("rect")
    .attr("class", "bar")
    .style("fill", "steelblue")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.stock))
    .attr("height", (d) => iheight - y(d.stock))
    .attr("width", x.bandwidth())
    .on("mouseover", onMouseOver)
    .on("mouseout", onMouseOut);

  g.append("g")
    .classed("x--axis", true)
    .attr("transform", `translate(0, ${iheight})`);

  g.append("g").classed("y--axis", true).call(d3.axisLeft(y));

  function onMouseOver(d) {
    var tooltipDiv = d3.select("#myTooltip");

    tooltipDiv.transition().duration(200).style("opacity", 1);

    tooltipDiv
      .html(function(d) {
        return "<strong>Nombre:</strong> <span style='color:red'>" + bars.name + "</span>";
      })
      .style("cursor", "pointer")
      .style("color", "#333333");
  }

  function onMouseOut(d) {
    var tooltipDiv = d3.select("#myTooltip");
    tooltipDiv.transition().duration(500).style("opacity", 0);
  }

  return (
    <section id="report">
      <div className="report-container">
        <h1>Unidades en inventario</h1>
        <div id="canvas" />
      </div>
    </section>
  );
};
