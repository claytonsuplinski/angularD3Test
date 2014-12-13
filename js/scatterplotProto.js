// properties are directly passed to `create` method
  var Sctterplot = Class.create({
                    initialize: function(datajson,xaxisName,yaxisName,yaxisPos) {
                        this.datajson = datajson;
                        this.xaxisName = xaxisName;
                        this.yaxisName = yaxisName;
                        this.yaxisPos = yaxisPos;
                      
                    },
                workOnElement: function(element) {
                		this.element = element;
                },
                generateGraph: function() {
                //d3 specific coding
               var margin = {top: 20, right: 20, bottom: 30, left: 40},
                            width = 960 - margin.left - margin.right,
                            height = 500 - margin.top - margin.bottom;

                var x = d3.scale.linear()
                    .range([0, width]);
                
                var y = d3.scale.linear()
                    .range([height, 0]);
                
                var color = d3.scale.category10();
                
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");
                
                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left");
                
                var svg = d3.select(this.element).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                
                d3.json(this.datajson,function(error, data) {
                                                 
                  data.forEach(function(d) {
                                    
                    d.sepalLength = +d.sepalLength;
                    d.sepalWidth = +d.sepalWidth;
                  });
                
                  x.domain(d3.extent(data, function(d) { return d.sepalWidth; })).nice();
                  y.domain(d3.extent(data, function(d) { return d.sepalLength; })).nice();
                
                  svg.append("g")
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .call(xAxis)
                    .append("text")
                      .attr("class", "label")
                      .attr("x", width)
                      .attr("y", -6)
                      .style("text-anchor", "end")
                      .text(this.xaxisName);
                
                  svg.append("g")
                      .attr("class", "y axis")
                      .call(yAxis)
                    .append("text")
                      .attr("class", "label")
                      .attr("transform", "rotate(-90)")
                      .attr("y", this.yaxisPos)
                      .attr("dy", ".71em")
                      .style("text-anchor", "end")
                      .text(this.yaxisName)
                
                  svg.selectAll(".dot")
                      .data(data)
                    .enter().append("circle")
                      .attr("class", "dot")
                      .attr("r", 3.5)
                      .attr("cx", function(d) { return x(d.sepalWidth); })
                      .attr("cy", function(d) { return y(d.sepalLength); })
                      .style("fill", function(d) { return color(d.species); });
                
                  var legend = svg.selectAll(".legend")
                      .data(color.domain())
                    .enter().append("g")
                      .attr("class", "legend")
                      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
                
                  legend.append("rect")
                      .attr("x", width - 18)
                      .attr("width", 18)
                      .attr("height", 18)
                      .style("fill", color);
                
                  legend.append("text")
                      .attr("x", width - 24)
                      .attr("y", 9)
                      .attr("dy", ".35em")
                      .style("text-anchor", "end")
                      .text(function(d) { return d; });    
            }.bind(this));
	 }
});
