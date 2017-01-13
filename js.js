

var padding = 20,
margin = {top: 20, bottom: 60, left: 90, right: 50},
h = 500 - margin.top - margin.bottom + padding ,
  w = 1000 - margin.left - margin.right;

var svg  = d3.select("body").append("svg").attr("height", h + margin.top + margin.bottom).attr("width",w + margin.right + margin.left)
.append("g")
.attr("transform", `translate(${margin.left}, ${(margin.top )})`)



var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"

var photoUrl = "https://timedotcom.files.wordpress.com/2014/10/tour-de-france.jpeg?quality=85&w=1014";

d3.select("div").text("Data Collected for Professional Cyclists and Evaluating Time of Completion,  Placement Ranking and Allegation of Performance Enhancing Drugs")



d3.json(url, function(data){

// data.forEach(function(d){
//   d.Seconds = d.Seconds/60
// })
//Tool-Tip
tip = d3.tip().attr('class', 'd3-tip').html(function(d) {
if(d.Doping !== ""){
  return `<p> In ${d.Year}, ${d.Name}, completed race in ${d.Seconds} seconds and placed ${d.Place}</br> had ${d.Doping} </p>` ;
}
else {
  return `<p> ${d.Name}, complted race in ${d.Seconds} and placed ${d.Place} and there we no allegations of drug use  </p>`
}
});

console.log(data[0])

var x = d3.scaleLinear()
          .domain([d3.min(data, function(d){return d.Seconds}) , d3.max(data, function(d){return d.Seconds})])
          .range([w - padding, padding])

var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d){return d.Place + 9})])
          .range([padding, h-padding])


var circle = svg.selectAll("circle").data(data).enter().append("circle").attr("transform", `translate(${margin.left + padding}, 0)`)

circle.call(tip)

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

svg.append("g").call(d3.axisBottom(x).ticks(20))
.attr("transform", `translate(${ margin.left}, ${h - padding})`)
.attr("class", "axis");

svg.append("g").call(d3.axisLeft(y))
.attr("transform", `translate(${margin.left + padding}, 0)`)
.attr("class", "axis");

svg.append("text").text("Placed Finised ").attr("transform", `rotate(-90)`).attr("x", `${-h/2}`).attr("class", "labels").attr("y", `${padding}`);

svg.append("text").text("Time(seconds) to complete Competition ").attr("transform", `translate(${w/2}, ${h + padding + 20})` ).attr("class", "labels") ;


//Tool-Tip

})
