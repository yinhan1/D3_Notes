const canvas = d3.select(".canva");

//add an svg element
const svgWidth = 1000;
const svgHeight = 600;
const svg = canvas.append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

//set up canvas margin
const margin = {top: 50, right: 50, bottom: 70, left: 70};
const graphWidth = svgWidth - margin.left - margin.right;
const graphHeight = svgHeight - margin.top - margin.bottom;

//get main canvas
const mainCanvas = svg.append("g")
                .attr("width", graphWidth)
                .attr("height",  graphHeight)
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

//create axes groups 
const xAxisGroup = mainCanvas.append('g')
                             .attr("transform", `translate(0, ${graphHeight})`);
const yAxisGroup = mainCanvas.append('g')
                             .attr("transform", `translate(-10, 0)`);

//apply to data
d3.csv('data/posterior_aco.csv').then(data => {
    
    //rescale x
    const x = d3.scaleLinear()
                .domain( [0, data.length] )
                .range( [0, graphWidth] );

    //rescale y 
    const y = d3.scaleLinear()
                .domain( [d3.min(data, d => d.alpha) - 0.1, d3.max(data, d => d.alpha)] )
                .range( [graphHeight, 0] );
    
    //add axis
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    //create line generator 
    var linearGen = d3.line()
                      .x( (d, i) => x(i))
                      .y( (d, i) => y(d.alpha));

    //main canvas - track plot 
    mainCanvas.append("path")
              .attr("fill", "none")
              .attr("stroke", "grey")
              .attr("stroke-width", 0.5)
              .attr("d", linearGen(data));

    //main cavas - initial circle
    mainCanvas.append('circle')
              .attr('fill', 'grey')
              .attr('cx', x(0))
              .attr('cy', y(data[0].alpha))
              .attr('r', 2);

});
                
