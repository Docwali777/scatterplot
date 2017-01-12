

var margin = {top: 80, bottom: 60, left: 50, right: 50},
h = 500 - margin.top - margin.bottom ,
  w = 600 - margin.left - margin.right,
  padding = 20;

var svg  = d3.select("body").append("svg").attr("height", h).attr("width",w)//.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`)


var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"

d3.json(url, function(data){

console.log(data[0].Seconds)

var x = d3.scaleLinear()
          .domain([d3.min(data, function(d){return d.Seconds}) , d3.max(data, function(d){return d.Seconds})])
          .range([w - padding, padding])

var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d){return d.Place})])
          .range([padding, h-padding])


var circle = svg.selectAll("circle").data(data).enter().append("circle");


circle.attr("cx", function(d){return x(d.Seconds)})
.attr("cy",function(d){return y(d.Place)})
.attr("r", 5)

svg.append("g").call(d3.axisBottom(x))

})
