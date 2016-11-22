/**
 * To visualize a percent of people, shows a static row of people images
 * lighting up. e.g. 4 of 5 people light up to show 80%.
 */
PeopleDisplay = function(_parentElement, _numerator, _denominator) {
  this.parentElement = _parentElement;
  this.numerator = _numerator;
  this.denominator = _denominator;

  this.width = 400;
  this.height = 200;

  // this.render();
  this.initVis();
};

PeopleDisplay.prototype.initVis = function() {
  var vis = this;

  // make static data
  // have `denominator` objects, of which `numerator` are lit up
  vis.people = [];
  for (var i = 0; i < vis.denominator; i++) {
    var person = {
      active: i < vis.numerator
    };
    vis.people.push(person);
  }

  // make svg
  vis.svg = d3.select("#" + vis.parentElement)
    .append("svg")
    .attr({
      width: vis.width,
      height: vis.height
    })
    .append("g");
  // .attr("transform", "translate(70,70)");

  // make grid layout
  vis.grid = d3.layout.grid()
    .bands()
    .nodeSize([50,50])
    .padding([10, 10]);
};

PeopleDisplay.prototype.render = function() {
  var vis = this;

  // draw people
  var rect = vis.svg.selectAll(".rect")
    .data(vis.grid(vis.people));

  // enter
  rect.enter()
    .append("image")
    .attr("class", "rect")
    .style("opacity", 1e-6);

  // update
  rect
    .attr("width", vis.grid.nodeSize()[0])
    .attr("height", vis.grid.nodeSize()[1])
    .attr("transform", function(d) {
      return "translate(" + (d.x) + "," + d.y + ")";
    })
    .attr("xlink:href", "images/woman-gray.png")
    .style("opacity", 1);

  // transition the fill
  rect.transition()
    .delay(function(d, i) {
      // fill in one at a time
      // wait time in milliseconds
      return i * 500;
    })
    .attr("xlink:href", function(d) {
      var color = d.active ? "red" : "gray";
      return "images/woman-" + color + ".png";
    });

  // exit
  rect.exit()
    .transition()
    .style("opacity", 1e-6)
    .remove();

}