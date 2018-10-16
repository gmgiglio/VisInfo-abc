var width = 500,
    height = 500;

var y = d3.scale.linear()
    .range([height, 0]);

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

var Data = [];
d3.tsv("data.tsv", type, function(error, data) { 
  y.domain([0, d3.max(data, function(d) { return d.value; })]);
    
  data.forEach(function(element){
      element.divNum = 1;
  });
  
  var barWidth = width / data.length;

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

  bar.append("rect")
    .attr("y", function(d) { return y(d.value); } )
    .attr("height", function(d) { return (height - y(d.value)); })
    .attr("width", barWidth - 1)
    .attr("class", "total-bar");
    

  bar.append("rect")
      .attr("y", function(d) { return height - ((height - y(d.value)) / d.divNum); })
      .attr("height", function(d) { return (height - y(d.value)) / d.divNum ; })
      .attr("width", barWidth)
      .attr("class", "remaining-bar")
      .style("fill", function(d) { return d.color; });
      
  
  Data = data;

});

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}


var paso = 1;

function votosActuales(partido){
  return partido.value / partido.divNum;
}

function pasoDHondt(){
  
  d3.select("#printeo").html(paso);
  paso++;
  
  let maxd = Data.reduce((max,d) => votosActuales(max) > votosActuales(d) ? max : d);
  
  ganaCupo(maxd);
  maxd.divNum += 1;
  
  chart.selectAll("g")
    .selectAll(".remaining-bar").transition()
    .duration(750)
    .attr("y", function(d) { return height - ((height - y(d.value)) / d.divNum); })
    .attr("height", function(d) { return (height - y(d.value)) / d.divNum ; });
   
}


function ganaCupo(pardido){
  //IMPLEMENTAR
}

function imprimirValores(){
  d3.select("#printeo").selectAll("p")
    .data(Data)
  .enter()
    .append("p")
    .text(function(d){
      return d.value;
});
}

