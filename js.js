

var padding = 20,
margin = {top: 20, bottom: 60, left: 90, right: 90},
h = 800 - margin.top - margin.bottom + padding ,
  w = 800 - margin.left - margin.right;

var svg  = d3.select("body").append("svg").attr("height", h + margin.top + margin.bottom).attr("width",w + margin.right + margin.left)
.append("g")
.attr("transform", `translate(0, ${(margin.top )})`)



var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"


d3.select("div").text("Data Collected for Professional Cyclists and Evaluating Time of Completion,  Placement Ranking and Allegation of Performance Enhancing Drugs")


d3.json(url, function(data){



tip = d3.tip().attr('class', 'd3-tip').html(function(d) {
if(d.Doping !== ""){
  return `<p> In ${d.Year}, ${d.Name}, completed race in ${d.Time}  and placed ${d.Place}</br> had ${d.Doping} </p>` ;
}
else {
  return `<p> ${d.Name}, complted race in ${d.Time} and placed ${d.Place} and there we no allegations of drug use  </p>`
}
});
var parseTime = d3.timeParse("%S")

console.log()

var maxSec = d3.max(data, function(d){return d.Seconds});

var zero = d3.min(data, function(d){return maxSec - d.Seconds});
var minSec =  d3.min(data, function(d){return d.Seconds});

var slowest = d3.max(data, function(d){return maxSec - d.Seconds});

var totalDiff = maxSec- minSec

var x = d3.scaleLinear()
          .domain([d3.min(data, function(d){return d.Seconds}) , d3.max(data, function(d){return d.Seconds})])
          .range([w - padding, padding])

var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d){return d.Place + 1})])
          .range([padding, h-padding])

var z = d3.scaleLinear()
          .domain([slowest, zero])
          .range([0, w])


var circle = svg.selectAll("circle").data(data).enter().append("circle").attr("transform", `translate(${margin.left + padding}, 0)`)

var text = svg.selectAll("text").data(data).enter().append("text")

//text info for each circle
text.text(function(d){return d.Name})
.attr("x", function(d){return x(d.Seconds)})
.attr("y", function(d){return y(d.Place)})
.attr("font-family", "Arial" )
.attr("transform", `translate(${margin.left + padding + 10}, 5)`)
.attr("font-size", 9)
.attr("class", "dotText")

circle.call(tip) //activate Tool-Tip

//create info for circle
circle.attr("cx", function(d){return x(d.Seconds)})
.attr("cy",function(d){return y(d.Place)})
.attr("r", 5)
.attr("fill", function(d){
if(d.Doping === ""){
  return "rgb(16,30,88)"  //"rgb(3, 99, 145)"
} else {
  return "orange"
}
}).on('mouseover', tip.show)
  .on('mouseout', tip.hide)

//x-Axis

svg.append("g").call(d3.axisBottom(z).ticks(10))
.attr("transform", `translate(${ margin.left + padding}, ${h - padding})`)
.attr("class", "axis");

//y-Axis
svg.append("g").call(d3.axisLeft(y))
.attr("transform", `translate(${margin.left + padding}, 0)`)
.attr("class", "axis");

//y-Axis label
svg.append("text").text("Placed Finised ").attr("transform", `rotate(-90)`).attr("x", `${-h/2}`).attr("class", "labels").attr("y", `${padding}`);

//x-Axis label
svg.append("text").text("Time(seconds) to complete Competition ").attr("transform", `translate(${w/2}, ${h + padding + 20})` ).attr("class", "labels") ;


})
