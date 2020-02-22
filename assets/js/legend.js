
$(document).ready(function(){
	$('button').click(function(){
	console.log('clicked!');
	});
});


var legend_pop = [{'type':'0-150','color':'rgb(240,248,255)'},{'type':'150-300','color':'rgb(255,250,205)'},{'type':'300-450','color':'rgb(255,127,80)'},{'type':'450-600','color':'rgb(255,99,71)'},{'type':'600-','color':'rgb(255,0,0)'}];
var legend_landslide = [{'type':'0-1000','color':'rgb(44,123,182)'},{'type':'1000-22000','color':'rgb(171,217,233)'},{'type':'22000-3270000','color':'rgb(255,255,191)'},{'type':'3270000-485000000','color':'rgb(253,174,97)'},{'type':'485000000-','color':'rgb(215,25,28)'}];
var legend_floodfreq = [{'type':'1','color':'rgb(44,123,182)'},{'type':'2','color':'rgb(171,217,233)'},{'type':'3','color':'rgb(255,255,191)'},{'type':'4','color':'rgb(253,174,97)'},{'type':'5-','color':'rgb(215,25,28)'}];
var legend_beachloss = [{'type':'0-20','color':'rgb(0,164,228)'},{'type':'20-40','color':'rgb(193,216,47)'},{'type':'40-60','color':'rgb(255,221,0)'},{'type':'60-80','color':'rgb(251,176,52)'},{'type':'80-','color':'rgb(255,38,0)'}];
var legend_poverty = [{'type':'0-10','color':'rgb(0,164,228)'},{'type':'10-15','color':'rgb(193,216,47)'},{'type':'15-20','color':'rgb(255,221,0)'},{'type':'20-25','color':'rgb(251,176,52)'},{'type':'25-','color':'rgb(255,38,0)'}];

var legend_data ={
	'pop':{
		'title':'Population',
		'data':legend_pop
	},
	'landslide':{
		'title':'Land slide (US$)',
		'data':legend_landslide
	},
	'floodfreq':{
		'title':'Flood frequcny',
		'data':legend_floodfreq
	},
	'beachloss':{
		'title':'Beach loss(%)',
		'data':legend_beachloss
	},
	'poverty':{
		'title':'Poverty rate(%)',
		'data':legend_poverty
	}
};

function legend_draw(svg,types,lindex){

        legend_title = svg
        .append('text')
        .attr('x',20)
        .attr('y',15 + lindex*110)
        .text(legend_data[types[lindex]].title)
        .attr("font-family",'sans-serif')
        .attr("font-size","12")
        .attr("font-weight","Bold")
        .attr("fill","black");

        legend = svg
        .append('g')
        .attr('class',"legend_contents")
        .selectAll('rect')
        .data(legend_data[types[lindex]].data);
        boxes = legend
        .enter()
        .append('rect')
        .attr('x',5)
        .attr("y", function (d,i) { return 25 + 15*i + lindex*110; })
        .attr('width', 10)
        .attr('height',10)
        .style("fill", function(d) { return d.color; });

        legend_names = legend
        .enter()
        .append('text')
        .attr('x',20)
        .attr('y',function(d,i) { return 35 + 15*i + lindex*110;})
        .text(function(d){return d.type;})
        .attr("font-family",'sans-serif')
        .attr("font-size","12")
        .attr("font-weight","normal")
        .attr("fill","black");
}


function  init_legend(types){
        var width =150,height = types.length*10;
	console.log(types);
	$('#legend_svg').remove();
	if (types.length >0) {
	//$('<p>title</p>').insertAfter('#legend_title');
        svg = d3.select("#legend").append("svg")
        .attr("id", "legend_svg")
        .attr("width", width)
        .attr("height", height);

		for ( var i=0; i<types.length; i++) {
			legend_draw(svg,types,i);
		}
	}
}

function legendPanel() {
	var panel = document.createElement('div');
		var ck1 = '<div id="legend_title"></div><div id="legend"></div>'
		panel.innerHTML = ck1;
		var element = document.createElement('div');
		element.className = 'legend-control ol-unselectable ol-control';
		element.appendChild(panel);
 
		var myControl = new ol.control.Control({
   		 element: element
		});

	return myControl;
}

