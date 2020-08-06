
//select div canva and create a selector arrary 
const canvas = d3.select(".canva");

//insert svg element in div canva
const svg = canvas.append("svg")
                  .attr('width', 300)
                  .attr('height', 3000);

//insert element circlr                
svg.append("circle")
   .attr('cx', 50)
   .attr('cy', 50)
   .attr('r', 50)
   .attr('fill', "brown");

//insert element rectangle
svg.append("rect")
   .attr('width', 50)
   .attr('height', 100)
   .attr('x', 10)
   .attr('y', 10)
   .attr('rx', 10)
   .attr('ry', 10)
   .attr('fill', "blue");

//insert element line
svg.append("line")
   .attr('x1', 100)
   .attr('x2', 10)
   .attr('y1', 100)
   .attr('y2', 10)
   .attr('stroke', "black");

//insert element text 
svg.append("text")
   .text("Hello There!")
   .attr('font-size', 12)
   .attr('fill', "grey")
   .attr('x', 50)
   .attr('y', 50);