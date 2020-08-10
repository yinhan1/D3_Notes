//fetch canva of html
const canvas = d3.select('.canva');


//add svg element
const svg = canvas.append('svg')
                  .attr('width', 600)
                  .attr('height', 600);

//set canvas margin
const margin = {top: 20, right: 20, bottom: 70, left: 70};
const graphWidth = 500 - margin.left - margin.right;
const graphHeight = 300 - margin.top - margin.bottom;

//create a group for margin
const graph = svg.append('g')
                .attr('width', graphWidth)
                .attr('height', graphHeight)
                //move around object g 
                .attr('transform', 
                      `translate(${margin.left}, ${margin.top})`)

const rect = graph.selectAll('rect');

//create axes groups 
const xAxisGroup = graph.append('g')
                    .attr("transform", 
                    `translate(0, ${graphHeight + margin.top})`);
const yAxisGroup = graph.append('g');


//load data to add elements
d3.json('test.json').then(data => {

    //rescale bar height to half
    const y = d3.scaleLinear()
                .domain( [0, d3.max(data, d => d.height)] )
                .range( [graphHeight + margin.top, 0] );
    
    //band scale 
    const x = d3.scaleBand()
                //create a new array mapping fill values
                .domain(data.map(item => item.fill))
                .range([0, 500])
                //add space between bars 
                .paddingInner(0.1)
                .paddingOuter(0.2);

    //add axis
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    //add rect
    rect.data(data)
        .enter().append('rect')
        .transition()
            .attr('y', (d, i) => y(d.height))
            .delay(function (d, i) {
                return i * 200;
            })
            .ease(d3.easeBounceIn)

        .attr('fill', (d, i) => d.fill )
        .attr('width', x.bandwidth )
        .attr('height', (d, i) => margin.top + graphHeight - y(d.height))
        .attr('x', (d, i) => x(d.fill) )
        //.attr('y', (d, i) => y(d.height))
        .on('mouseover', function(d, i, n) {
            d3.select(n[i])
                .transition()
                .duration(100)
                .style('opacity', 0.7)
        })
        .on('mouseout', function (d, i, n) {
            d3.select(n[i])
                .transition()
                .duration(100)
                .style('opacity', 1) 
        });
        
    });