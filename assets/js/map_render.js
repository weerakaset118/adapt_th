
function adminSelect () {
	var panel = document.createElement('div');
		var ck1 = '<input id ="ad1" type="radio" name="riyu" value="1" checked="checked" onclick="adminChange()">Changwat<Br>'
		var ck2 = '<input id ="ad2" type="radio" name="riyu" value="2" onclick="adminChange()">Amphoe/Khet<Br>'
		var ck3 = '<input id ="ad3" type="radio" name="riyu" value="3" onclick="adminChange()">Tambon/Khwaeng'
		panel.innerHTML = ck1 + ck2 + ck3;
		var element = document.createElement('div');
		element.className = 'admin-select-control ol-unselectable ol-control';
		element.appendChild(panel);
 
		var myControl = new ol.control.Control({
   		 element: element
		});

	return myControl;
}


function updateBoder(latlon){
$.ajax({
        url: '/add:' + latlon,
        type: 'GET',
        async: true,
        dataType: "json",
        success: function (data) {	    
	    localStorage.setItem('code',JSON.stringify(data));            

	    changeBorder(prov_border,data.prov_code,4326);            
	    changeBorder(amphoe_border,data.amphoe_idn,4326);            
	    changeBorder(tambon_border,data.tambon_idn,4326);            
        },
	error: function(){
		alert("error");
	}
    });
};

function vector_source (code,epsg) {
	var area ="";
	if (code >9999 && code.toString().substring(0,2) == "10") {
		area = "khwaeng";
	} else if(code >9999 && code.toString().substring(0,2) != "10"){
		area = "tambon";
	} else if( code >99 && code.toString().substring(0,2) == "10"){
		area = "khet";
	} else if( code >99 && code.toString().substring(0,2) != "10"){
		area = "amphoe";
	} else {
		area = "province";
	}
      

        var vformat = new ol.format.GeoJSON({
              defaultProjection: 'EPSG:' + epsg
            });
	return new ol.source.Vector({
            format: vformat ,
            projection: 'EPSG:' + epsg,
            url: './assets/map/' + area  + '/' + code + '.geojson'
            });
}

function vector_style_stroke(color,width){
	return new ol.style.Stroke({
          color: color,
          width: width
          })
}

function vector_style(color,width){
	return new ol.style.Style({
          stroke: vector_style_stroke(color,width),
          //zIndex: 1
        });
}


function vector_border(code,epsg,color,width){
        var borderStyle = vector_style(color,width);
        var vsource = vector_source(code,epsg);
        return new ol.layer.Vector({
          source: vsource,
          style: [borderStyle]
        });
};

function changeBorder(vmap,code,epsg){
	vmap.setSource(vector_source(code,epsg));
}


function raster_source(mapName){
	return new ol.source.ImageWMS({
		url: 'http://153.126.195.22:8182/cgi-bin/mapserv?map=/map/thai.map',
		params:{LAYERS:mapName},
		serverType: 'geoserver'
	})
}


function raster(mapName,mapTitle,type){
        return new ol.layer.Image({
                type: type,
		title: mapTitle,
                source: raster_source(mapName),
		visible: false
        });
}

function remove_location_marker(map){
	var layersToRemove = [];
	map.getLayers().forEach(function (layer) {
	    if (layer.get('name') != undefined && layer.get('name') === 'location_point') {

	        layersToRemove.push(layer);
	    }
	});
	
	var len = layersToRemove.length;
	for(var i = 0; i < len; i++) {
	    map.removeLayer(layersToRemove[i]);
	}
}


function add_mark(map,point_location){
	remove_location_marker(map);

	var marker = new ol.Feature({
		geometry: new ol.geom.Point(point_location),
	});
	
	var vectorSource = new ol.source.Vector({
		features: [marker]
	});

        var mapPin = new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
                            anchor: [0.5, 1],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'fraction',
                            opacity: 1,
			    scale: 0.1,
                            src: 'assets/images/free-map-icon-3.jpg'
                        }));	

	var markerVectorLayer = new ol.layer.Vector({
		source: vectorSource,
		style: new ol.style.Style({image: mapPin}),
	});

	map.addLayer(markerVectorLayer);
	markerVectorLayer.set('name','location_point');
}

var basemap1 = new ol.layer.Tile({
      type: 'base',
      title:'Open Street Map',
      source: new ol.source.TileJSON({
        url: 'http://153.126.195.22:8080/styles/osm-bright.json?secure',
       // crossOrigin: 'anonymous'
      })
    });

var basemap2 = new ol.layer.Tile({
      type: 'base',
      visible: false,
      title:'Klokantech Basic',
      source: new ol.source.TileJSON({
        url: 'http://153.126.195.22:8080/styles/klokantech-basic.json?secure',
        //crossOrigin: 'anonymous'
      })
    });

var basemap3 = new ol.layer.Tile({
      type: 'base',
      visible: false,
      title:'Topographic map',
        source: new ol.source.TileWMS({
                url: 'https://ahocevar.com/geoserver/wms',
                crossOrigin: '',
                params: {
                        'LAYERS': 'ne:NE1_HR_LC_SR_W_DR',
                        'TILED': true
                },
        projection: 'EPSG:4326'
        })
});




var flood_freq = raster('flood_freq','Flood frequency','nonbase');
var landSlideRisk = raster('landSlideRisk','Landslide Risk','nonbase');
var droughtRisk = raster('droughtRisk','Drought Risk','nonbase');
var province = raster('province','provincial border','nonbase');
var poverty2017 = raster('poverty2017','Poverty rate(2017)','nonbase');
var poverty2013 = raster('poverty_tambon2013','Poverty rate(2013)','nonbase');
var landslide_damage = raster('landslide_damage','Land slide','nonbase');
var beachloss_rcp26 = raster('b_projection_rcp26', 'Beach loss (RCP2.6)','nonbase');
var beachloss_rcp45 = raster('b_projection_rcp45', 'Beach loss (RCP4.5)','nonbase');
var beachloss_rcp60 = raster('b_projection_rcp60', 'Beach loss (RCP6.0)','nonbase');
var beachloss_rcp85 = raster('b_projection_rcp85', 'Beach loss (RCP8.5)','nonbase');
var pop2015 = raster('pop2015', 'Population (2015)','nonbase');
var soil_salinity = raster('soil_salinity','Soil salinity','nonbase');
var ricechange_2006_2041_rcp85 = raster('ricechange_2006_2041_rcp85','Change of rate in rice production in 2041(RCP8.5)','nonbase');
var ricechange_2006_2081_rcp85 = raster('ricechange_2006_2081_rcp85','Change of rate in rice production in 2081(RCP8.5)','nonbase');
var soil_salinity = raster('soil_salinity','Soil salinity','nonbase');

var prov_border   = vector_border(10,4326,'#5858FA',2);
var amphoe_border = vector_border(1001,4326,'#5858FA',3);
var tambon_border = vector_border(100101,4326,'#5858FA',3);

var adminBorders = {1:prov_border,2:amphoe_border,3:tambon_border};
var adminOrder   = {1:"province",2:"amphoe",3:"tambon"}

function adminChange(){
	var area =  adminOrder[$('input[name=riyu]:checked').val()];
	changeAdminGraph();
	if (area=="province"){
		prov_border.setVisible(1);
		amphoe_border.setVisible(0);
		tambon_border.setVisible(0);
	} else if (area=="amphoe"){
		prov_border.setVisible(0);
		amphoe_border.setVisible(1);
		tambon_border.setVisible(0);
	} else{
		prov_border.setVisible(0);
		amphoe_border.setVisible(0);
		tambon_border.setVisible(1);
	}
}


var baseMG = new ol.layer.Group({
		'title' : 'Base maps',
		layers: [basemap1,basemap2,basemap3]
});

var economicDamgeG = new ol.layer.Group({
		'title' : 'Economic damage maps',
		layers: [landslide_damage]
});

var disasterG = new ol.layer.Group({
		'title' : 'Disaster risk maps',
		layers: [droughtRisk,landSlideRisk,flood_freq,soil_salinity,beachloss_rcp26,beachloss_rcp45,beachloss_rcp60,beachloss_rcp85,ricechange_2006_2041_rcp85,ricechange_2006_2081_rcp85]
});

var basicDataG = new ol.layer.Group({
		'title' : 'Basic information',
		layers: [poverty2013,pop2015]
});
		
function alert_on_zoom(event){
	alert("Map zoomed");
}

$(function(){
	
	var map = new ol.Map({
		interactions : ol.interaction.defaults({doubleClickZoom :false}),
		target: 'mapid',
		layers: [baseMG,economicDamgeG,disasterG,basicDataG,prov_border,amphoe_border,tambon_border],
		view: new ol.View({
		center: ol.proj.fromLonLat([100.523186,13.229]),
		zoom: 6,
		//maxZoom: 28,
		minZoom: 7,
		resolution:2445.98490512564,
		maxResolution:2445.98490512564,
		//minResolution:0
		})
	});

	amphoe_border.setVisible(0);
	tambon_border.setVisible(0);

	map.addControl(new ol.control.LayerSwitcher());
	//map.addControl(legendPanel());
	map.addControl(new ol.control.ScaleLine());
	map.addControl(adminSelect());

	updateBoder('100.4923,13.7539');
	/*
	var selectProvince = new ol.style.Style({
    	stroke: new ol.style.Stroke({
       		color:'#5858FA',
       		width: 2
    		})
	});

	var select = new ol.interaction.Select({
    		style: selectProvince
	});
	map.addInteraction(select);
	*/

	map.on('click', function(evt){
		var coord3857 = evt.coordinate;
		add_mark(map,coord3857);
		var coord = ol.proj.transform(coord3857,"EPSG:3857","EPSG:4326");
		var template = '{x},{y}';
		var out = ol.coordinate.format(coord, template,4);
		updateData(out);
		updateBoder(out);
	});
      
       
	map.on('moveend', function(e) {
		var newZoom = map.getView().getZoom();
	        //alert(map.getView().getResolution());
		if (newZoom > 6) {
			prov_border.setStyle(vector_style('#5858FA',3))
		}

		else {
			prov_border.setStyle(vector_style('#5858FA',2))
		}
	});
	//init_legend('poverty');

});
