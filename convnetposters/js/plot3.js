// https://github.com/douglasbagnall/image-tsne

function plot(json, size){
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    var svg = d3.select("div.w3-twothird")
	.append("svg")
        .attr("width", w/2-10)
        .attr("height", (w/2-10)*2/3);
    var img = d3.select('div.w3-third')
        .append("img")
        .attr('id', 'current_img')
        .attr('height', (w/2-10)*2/3);

    var img1 = d3.select('div.img1')
        .append("img")
        .attr('id', 'current_img')
        .attr('height', (w/2-10)*2/3);

    var img2 = d3.select('div.img2')
        .append("img")
        .attr('id', 'current_img')
        .attr('height', (w/2-10)*2/3);

    var img3 = d3.select('div.img3')
        .append("img")
        .attr('id', 'current_img')
        .attr('height', (w/2-10)*2/3);


    var score1 = d3.select("#score1");
    var score2 = d3.select("#score2");
    var score3 = d3.select("#score3");

    svg.append('g').selectAll('.myPoint')
        .data(json)
        .enter()
        .append('image')
        .attr("xlink:href", function(d){ return d[2] })
        .attr("x", function(d){ return d[0]})
        .attr("y", function(d){ return d[1]})
        .attr("width", size[0])
        .attr("height", size[1])
        .on("click", function(d, i){
            img.attr('src', d[3]);
            img1.attr('src', d[4]);
            img2.attr('src', d[5]);
            img3.attr('src', d[6]);
	    score1.html("1st closest poster: "+d[7]);
	    score2.html("2nd closest poster: "+d[8]);
	    score3.html("3rd closest poster: "+d[9]);
        });

    var zoom = d3.zoom().scaleExtent([0.5, 10])
	.translateExtent([[-50, -50], [3000, 3000]]);
    svg.call(zoom);
    zoom.on("zoom", function(){
	
	var transform = d3.event.transform;
	var w = size[0] / transform.k;
	var h = size[1] / transform.k;
	var transform = "translate(" + transform.x + "," + transform.y + ") scale(" + transform.k + ")"
	svg.selectAll('image')
	    .attr("transform", transform)
	    .attr('width', w)
	    .attr('height',h);

        // var e = d3.event;
        // var w = size[0] / e.scale;
        // var h = size[1] / e.scale;
        // var transform = 'translate(' + e.translate + ')' +' scale(' + e.scale + ')';
        // svg.selectAll('image')
        //     .attr('transform', transform)
        //     .attr('width', w)
        //     .attr('height', h);
    });
}

function updateWindow(){
   var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
   d3.select("svg")
        .attr("width", w/2-10)
        .attr("height", (w/2-10)*2/3);
   d3.selectAll('img')
        .attr('id', 'current_img')
        .attr('height', (w/2-10)*2/3);
}
window.onresize = updateWindow;

function get_dataset(){
    var dataset = window.location.search.substr(1);
    if (dataset) {
	return "datasets/" + dataset + ".json";
    } else {
        return "datasets/x.json";
    }
}
 


function get_size(){
    var dataset = window.location.search.substr(1);
    return [40, 40];
}

d3.json(get_dataset(), function(error, json) {
    if (error) return console.warn(error);
    plot(json, get_size());
});
