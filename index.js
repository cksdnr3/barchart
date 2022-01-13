const style = {
  container: {
    width: 778,
    height: 519,
    margin: { top: 40, right: 40, bottom: 40, left: 40 },
  },
  bar: {
    width: 60,
    color: "#58DBC8",
  },
  background: {
    width: 285,
    color: ["#8D98FF", "#FEBF7C"],
    padding: { left: 20 },
  },
  yAxis: {
    width: 46,
  },
};

const data = [
  { name: "A", value: 63, visibility: "visible" },
  { name: "B", value: 78, visibility: "visible" },
  { name: "B", value: 100, visibility: "hidden" },
];

const x = d3
  .scaleBand()
  .domain(data.map((d, i) => d.name))
  .range([
    style.background.padding.left,
    style.container.width +
      style.container.margin.left -
      (style.background.width - style.bar.width),
  ])
  .padding(0);

const y = d3
  .scaleLinear()
  .domain([0, 100])
  .range([
    style.container.height - style.container.margin.bottom,
    style.container.margin.top,
  ]);

// X Axis
const xAxis = (g) =>
  g
    .attr(
      "transform",
      `translate(0, ${style.container.height - style.container.margin.bottom})`
    )
    .call(d3.axisBottom(x).tickSizeOuter(0).tickSizeInner(0))
    .call((g) => g.select(".domain").remove());

// Y Axis
const yAxis = (g) =>
  g
    .attr(
      "transform",
      `translate(${
        style.container.width / 2 -
        (style.background.width * 2 +
          style.yAxis.width +
          style.background.padding.left) /
          2 +
        style.container.margin.left
      }, 0)`
    )
    .call(
      d3
        .axisLeft(y)
        .ticks(3)
        .tickValues([25, 50, 75])
        .tickFormat((d, i) => `${d}%`)
        .tickSizeInner(0)
    )
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g.selectAll("text").attr("fill", "#ABAFB2").attr("font-size", "2.4em")
    );
// 778 519
// SVG
const svg = d3
  .select(".chart-container")
  .append("svg")
  .attr("width", style.container.width)
  .attr("height", style.container.height);

// Legend A
svg
  .append("circle")
  .attr("cx", 6)
  .attr(
    "cy",
    style.container.height -
      style.container.margin.bottom -
      style.container.margin.top
  )
  .attr("r", 6)
  .style("fill", style.background.color[0]);

// Legend B
svg
  .append("circle")
  .attr("cx", 6)
  .attr(
    "cy",
    style.container.height -
      style.container.margin.bottom -
      style.container.margin.top
  )
  .attr("r", 6)
  .style("fill", style.background.color[0]);

// svg.append("g").call(xAxis);
svg.append("g").call(yAxis);

// Background A
const backgroundA = svg
  .append("g")
  .append("rect")
  .attr("fill", style.background.color[0])
  .attr("fill-opacity", 0.7)
  .attr(
    "x",
    x("A") +
      style.container.width / 2 -
      (style.background.width * 2 + style.yAxis.width) / 2 +
      style.container.margin.left
  )
  .attr("y", style.container.margin.top)
  .attr("width", style.background.width)
  .attr(
    "height",
    style.container.height -
      style.container.margin.bottom -
      style.container.margin.top
  );

// Background B
svg
  .append("g")
  .append("rect")
  .attr("fill", style.background.color[1])
  .attr("fill-opacity", 0.7)
  .attr(
    "x",
    x("A") +
      style.background.width +
      style.container.width / 2 -
      (style.background.width * 2 + style.yAxis.width) / 2 +
      style.container.margin.left
  )
  .attr("y", style.container.margin.top)
  .attr("width", style.background.width)
  .attr(
    "height",
    style.container.height -
      style.container.margin.bottom -
      style.container.margin.top
  );

svg.append("g");

// Bars
svg
  .append("g")
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr(
    "x",
    (d, i) =>
      x(d.name) + // xAxis tick의 x좌표
      style.container.width / 2 -
      (style.background.width * 2 + style.yAxis.width) / 2 + // Background A 시작지점 x좌표
      style.container.margin.left +
      (style.background.width - style.bar.width) / 2 // Background A 중앙
  )
  .attr("y", (d, i) => y(d.value))
  .attr("height", (d, i) => y(0) - y(d.value))
  .attr("width", style.bar.width)
  .attr("fill", style.bar.color)
  .attr("visibility", (d, i) => d.visibility);
