
function thousandsSeparate(num){
	//print a number with commas as thousands separators
	return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

function growthRate(start,end,duration){
	var startValue = Number(start);
	var endValue   = Number(end);
	var GR = (endValue/startValue) ** (1/(duration-1))-1
	return GR;
}


function changeAdminGraph(){
	var data = JSON.parse(localStorage.getItem('data'));
	var area =  adminOrder[$('input[name=riyu]:checked').val()];
	var code  = JSON.parse(localStorage.getItem('code'));

	chart_pop.series[0].setData(data.pop[area]);
	var landslideData = [data.landslide[area]/1000]
	chart_landslide.series[0].setData(landslideData);
        var tempMin = [];
	var tempMax = [];
	
	tempMin = tempMin.concat(data['beachloss'][area]['mn']['r26'],data['beachloss'][area]['mn']['r45'],data['beachloss'][area]['mn']['r60'],data['beachloss'][area]['mn']['r85']);
	//var bvalueMin = tempMin.map(function(value){return value*33});
	tempMax = tempMax.concat(data['beachloss'][area]['mx']['r26'],data['beachloss'][area]['mx']['r45'],data['beachloss'][area]['mx']['r60'],data['beachloss'][area]['mx']['r85']);
	//var bvalueMax = tempMax.map(function(value){return value*33});
	chart_beachloss.series[0].setData(tempMin);
	chart_beachloss.series[1].setData(tempMax);
 
	var floodfreqData = [data.floodfreq[area]];
	chart_floodfreq.series[0].setData(floodfreqData);


	if(area == "province"){
		chart_pop.setTitle({text:"Population in " + code.prov_nam_e});
		chart_landslide.setTitle({text:"Annual economic damage by landslide  in " + code.prov_nam_e });
	        chart_beachloss.setTitle({text:"Cost for beach nourishment to keep the beach width in " + code.prov_nam_e });
	        chart_floodfreq.setTitle({text:"Flood frequency in  " + code.prov_nam_e + " from 2005 to 2016"});
	} else if(area == "amphoe"){
		chart_pop.setTitle({text:"Population in " + code.amphoe_e + " " + code.prov_nam_e});
		chart_landslide.setTitle({text:"Annual economic damage by landslide  in " + code.amphoe_e  + code.prov_nam_e });
	        chart_beachloss.setTitle({text:"Cost for beach nourishment to keep the beach width in "  + code.amphoe_e + " " + code.prov_nam_e });
	        chart_floodfreq.setTitle({text:"Flood frequency in "  + code.amphoe_e + " " + code.prov_nam_e + " from 2005 to 2016"});
	} else {
		chart_pop.setTitle({text:"Population in " + code.tam_nam_t + " " + code.amphoe_e  + " "  + code.prov_nam_e});
		chart_landslide.setTitle({text:"Annual economic damage by landslide  in " + code.tam_nam_t + " "  + code.amphoe_e  + code.prov_nam_e });
	        chart_beachloss.setTitle({text:"Cost for beach nourishment to keep the beach width in " + code.tam_nam_t + " " + code.amphoe_e  + " "  + code.prov_nam_e });
	        chart_floodfreq.setTitle({text:"Flood frequency in " + code.tam_nam_t + " " + code.amphoe_e  + " "  + code.prov_nam_e + " from 2005 to 2016"});
	}
	    
}

function updateAbst(){
	var data = JSON.parse(localStorage.getItem('data'));
	var code  = JSON.parse(localStorage.getItem('code'));
	var gdata = JSON.parse(localStorage.getItem('gdata'));
	$("#prov_name").text(code.prov_nam_e);
	var pcode = code.p_code;
	var gdpcapita  = ((gdata[pcode]["gdpcapita"]).toString()).split(",");
	var population = ((data.pop['province']).toString()).split(",");

	var gdpcapita_first  = gdpcapita[gdpcapita.length-6];
	var population_first = population[gdpcapita.length-6];
	var gdpcapita_last   = gdpcapita[gdpcapita.length-1];
	var population_last  = population[population.length-1];

	var gdpgrowth = growthRate(gdpcapita_first,gdpcapita_last,5);

	$("#grp").text("Real GPP per capita(2017) : " + thousandsSeparate(gdpcapita_last) + " Baht");
	$("#grp_growth").text("Average real GPP growth rate(2013-2017:annual) : " + Math.round(gdpgrowth * 1000)/10 + " %");
	$("#population").text("Population(2017) : " + thousandsSeparate(population_last) );
}

function updateChart(){
	var data  = JSON.parse(localStorage.getItem('data'));
	var gdata = JSON.parse(localStorage.getItem('gdata'));
	var code  = JSON.parse(localStorage.getItem('code'));
	var area =  adminOrder[$('input[name=riyu]:checked').val()];
	changeAdminGraph();

	var pcode = code.p_code;

	    chart.series[9].setData(gdata[pcode]["grp"]["agri"])
	    chart.series[8].setData(gdata[pcode]["grp"]["mining"])
	    chart.series[7].setData(gdata[pcode]["grp"]["manufact"])
	    chart.series[6].setData(gdata[pcode]["grp"]["sales"])
	    chart.series[5].setData(gdata[pcode]["grp"]["hotel"])
	    chart.series[4].setData(gdata[pcode]["grp"]["finance"])
	    chart.series[3].setData(gdata[pcode]["grp"]["realestate"])
	    chart.series[2].setData(gdata[pcode]["grp"]["admin"])
	    chart.series[1].setData(gdata[pcode]["grp"]["education"])
	    chart.series[0].setData(gdata[pcode]["grp"]["others"])
	    chart.setTitle({text:"Gross Regional Product in " + code.prov_nam_e})

	    chart_agri.series[0].setData(gdata[pcode]["agri"]['Orchid'])
	    chart_agri.series[1].setData(gdata[pcode]["agri"]['Sugarcane'])
	    chart_agri.series[2].setData(gdata[pcode]["agri"]['Oil Palm'])
	    chart_agri.series[3].setData(gdata[pcode]["agri"]['Para Rubber'])
	    chart_agri.series[4].setData(gdata[pcode]["agri"]['Cassava'])
	    chart_agri.series[5].setData(gdata[pcode]["agri"]['Maize'])
	    chart_agri.series[6].setData(gdata[pcode]["agri"]['Second Rice'])
	    chart_agri.series[7].setData(gdata[pcode]["agri"]['Major Rice'])
	    chart_agri.setTitle({text:"Agricultural production in " + code.prov_nam_e});

	    chart_debt.series[0].setData(gdata[pcode]["debt"]['7'])
	    chart_debt.series[1].setData(gdata[pcode]["debt"]['6'])
	    chart_debt.series[2].setData(gdata[pcode]["debt"]['5'])
	    chart_debt.series[3].setData(gdata[pcode]["debt"]['4'])
	    chart_debt.series[4].setData(gdata[pcode]["debt"]['3'])
	    chart_debt.series[5].setData(gdata[pcode]["debt"]['2'])
	    chart_debt.setTitle({text:"Debt per household by purpose of borrowing in " + code.prov_nam_e});

	    chart_poverty.series[0].setData(gdata[pcode]["poverty"])
	    chart_poverty.setTitle({text:"Poverty rate in " + code.prov_nam_e});

	    chart_capita.series[0].setData(gdata[pcode]["tgdp"])
	    chart_capita.series[1].setData(gdata[pcode]["gdpcapita"])
	    chart_capita.setTitle({text:"GRP and GRP per capita in " + code.prov_nam_e});

}


function updateData(latlon){
$.ajax({
        url: '/data:' + latlon,
        type: 'GET',
        async: true,
        dataType: "json",
        success: function (data) {	    
		localStorage.setItem('data',JSON.stringify(data));            
		updateAbst();
		updateChart();
        },
	error: function(){
		alert("error");
	}
    });
};

$(function(){
$.ajax({
        url: '/generaldata',
        type: 'GET',
        async: true,
        dataType: "json",
        success: function (data) {	    
		localStorage.setItem('gdata',JSON.stringify(data));            
        },
	error: function(){
		alert("error");
	}
    });

Highcharts.chart('container', {
    chart: {type: 'column'},
    title: {text: '',style:{fontSize:'12px'}},
    yAxis: {title: {text: 'Million Baht'}},
    formatter: {function(){return this.total}},
    legend: {layout: 'vertical',align: 'right',verticalAlign: 'middle',itemStyle:{fontSize:'10px'}},
    plotOptions: {column: {stacking: 'normal'},series: {label: {connectorAllowed: false},pointStart: 1995}},
    credits:{enabled:false},
    exporting: { enabled: false },
    series: [{
        name: 'others',
        data: []
    },{
        name: 'education',
        data: []
    },{
        name: 'administrative work',
        data: []
    },{
        name: 'real esate',
        data: []
    },{
        name: 'finance',
        data: []
    },{
        name: 'hotel & restaurant',
        data: []
    },{
        name: 'whale & retail sales',
        data: []
    },{
        name: 'manufacturing',
        data: []
    },{
        name: 'mining',
        data: []
    },{
        name: 'agriculture',
        data: []
    }
],

});

Highcharts.chart('agri', {
    chart: {type: 'column'},
    title: {text: '',style:{fontSize:'12px'}},
    yAxis: {title: {text: '1,000 Baht'}},
    legend: {layout: 'vertical',align: 'right',verticalAlign: 'middle',itemStyle:{fontSize:'10px'}},
    plotOptions: {column: {stacking: 'normal'},series: {label: {connectorAllowed: false},pointStart: 2008}},
    credits:{enabled:false},
    exporting: { enabled: false },
    series: [{
        name: 'Orchid',
        data: []
    },{
        name: 'Sugarcane',
        data: []
    },{
        name: 'Oil Palm',
        data: []
    },{
        name: 'Para Rubber',
        data: []
    },{
        name: 'Cassava',
        data: []
    },{
        name: 'Maize',
        data: []
    },{
        name: 'Second Rice',
        data: []
    },{
        name: 'Major Rice',
        data: []
    }
],

});

Highcharts.chart('tambon_pop', {
    title: {text: '',style:{fontSize:'12px'}},
    yAxis: {title: {text: 'person'},min:0},
    //legend: {layout: 'vertical',align: 'right',verticalAlign: 'middle'},
    plotOptions: {column: {stacking: 'normal'},series: {label: {connectorAllowed: false},pointStart: 2000}},
    credits:{enabled:false},
    exporting: { enabled: false },
    series: [{name: 'population',data: []}],
});

Highcharts.chart('beachloss', {
    chart: {type: 'column'},
    title: {text: '',style:{fontSize:'12px'}},
    yAxis: {title: {text: 'Million $'}},
    //legend: {layout: 'vertical',align: 'right',verticalAlign: 'middle',itemStyle:{fontSize:'10px'}},
    xAxis: { categories:['10m RCP2.6','20m RCP2.6','30m RCP26','Present RCP2.6','10m RCP4.5','20m RCP4.5','30m RCP4.5','Present RCP4.5','10m RCP6.0','20m RCP6.0','30m RCP6.0','Present RCP6.0','10m RCP8.5','20m RCP8.5','30m RCP8.5','Present RCP8.5',]},
    credits:{enabled:false},
    exporting: { enabled: false },
    series: [{name: 'Minimum cost',data: []},{name: 'Maximum cost',data: []},]
});

Highcharts.chart('landslide', {
    chart: {type: 'column'},
    title: {text: '',style:{fontSize:'12px'}},
    yAxis: {title: {text: 'Million $'}},
    //legend: {layout: 'vertical',align: 'right',verticalAlign: 'middle',itemStyle:{fontSize:'10px'}},
    xAxis: { categories:['economic damage']},
    credits:{enabled:false},
    exporting: { enabled: false },
    series: [{name: 'Minimum cost',data: []}]
});

Highcharts.chart('floodfreq', {
    chart: {type: 'column'},
    title: {text: '',style:{fontSize:'12px'}},
    yAxis: {title: {text: 'times'},min:0,max:12},
    //legend: {layout: 'vertical',align: 'right',verticalAlign: 'middle',itemStyle:{fontSize:'10px'}},
    xAxis: { categories:['flood frequency']},
    credits:{enabled:false},
    exporting: { enabled: false },
    series: [{name: 'times',data: []}]
});

Highcharts.chart('debt', {
    chart: {type: 'column'},
    title: {text: '',style:{fontSize:'12px'}},
    yAxis: {title: {text: 'Baht'}},
    legend: {layout: 'horizontal',verticalAlign: 'bottom',itemStyle:{fontSize:'10px'}},
    plotOptions: {column: {stacking: 'normal'},series: {label: {connectorAllowed: false},pointStart: 2002}},
    credits:{enabled:false},
    exporting: { enabled: false },
    series: [{
        name: 'Others',
        data: []
    },{
        name: 'Debt for Purchase/Hire House and land',
        data: []
    },{
        name: 'Education',
        data: []
    },{
        name: 'Debt for Farming',
        data: []
    },{
        name: 'Debt for Own-Account Non-Farm',
        data: []
    },{
        name: 'Debt for Household Consumption',
        data: []
    }
],

});

Highcharts.chart('poverty', {
    title: {text: '',style:{fontSize:'12px'}},
    yAxis: {title: {text: 'percent'},min:0},
    //legend: {layout: 'vertical',align: 'right',verticalAlign: 'middle'},
    plotOptions: {column: {stacking: 'normal'},series: {label: {connectorAllowed: false},pointStart: 2006}},
    credits:{enabled:false},
    exporting: { enabled: false },
    series: [{name: 'poverty rate',data: []}],
});

var yearlist = [];
for (var i=1995; i<2018; i++) {
    yearlist.push(String(i));
}


Highcharts.chart('gdpcapita', {
    title: {text: '',style:{fontSize:'12px'}},
    xAxis:[{categories:yearlist,crosshair: true}],
    yAxis: [{title: {text: 'GRP (Million Baht)'},min:0},{title: {text: 'GRP per capita (Baht)'},min:0,opposite: true}],
    credits:{enabled:false},
    exporting: { enabled: false },
    series: [{name: 'GRP',type:'column',data: []},{name: 'GRP per capita',type:'spline',data: [],yAxis:1}],
});


chart = new $(container).highcharts();
chart_capita = new $(gdpcapita).highcharts();
chart_agri = new $(agri).highcharts();
chart_pop = new $(tambon_pop).highcharts();
chart_pop.legend.destroy()
chart_beachloss = new $(beachloss).highcharts();
chart_landslide = new $(landslide).highcharts();
chart_landslide.legend.destroy();
chart_debt = new $(debt).highcharts();
chart_poverty = new $(poverty).highcharts();
chart_poverty.legend.destroy();
chart_floodfreq = new $(floodfreq).highcharts();
chart_floodfreq.legend.destroy();
updateData('100.4923,13.7539');

});


