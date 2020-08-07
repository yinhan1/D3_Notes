
//select div canva and create a selector arrary 
const canvas = d3.select(".canva");

//set up svg size
const svg = canvas.append("svg")
                  .attr('width', 600)
                  .attr('height', 600);

//specify svg elements                   
const rect = svg.selectAll('rect');
const text = svg.selectAll('text');

//live server: load json
d3.json("test.json").then(data =>{
   console.log(data);

   //add rect
   rect.data(data)
         .enter().append('rect')
         .attr('fill', (d, i) => d.fill )
         .attr('width', 60)
         .attr('height', (d, i) => d.height*2 )
         .attr('x', (d, i) => i*61 )
         .attr('y', (d, i) => (220-(d.height*2)) );

   //add text
   text.data(data)
            .enter().append('text')
            .text( (d, i)=> d.height*2 )
            .attr('x', (d, i) => i*61+61/2 )
            .attr('y', (d, i) => (220-(d.height*2))-2 )
            .attr('text-anchor', 'middle')
            .attr('font-family', 'monospace')
            .attr('font-size', 15)
            .attr('font-weight', 'bold')
            .attr('fill', (d, i) => d.fill )
            
});