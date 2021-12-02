//Landuse

var landUseNames = {
    '01': 'One & Two Families Buildings',
    '02' : 'Multi-Family Walk-Up Buildings',
    '03' : 'Multi-Family Elevator Buildings',
    '04' : 'Mixed Residential & Commercial Buildings',
    '05' : 'Commercial & Office Buildings',
    '06' : 'Industrial & Manufacturing',
    '07' : 'Transportation & Utility',
    '08' : 'Public Facilities & Institutions',
    '09' : 'Open Space & Outdoor Recreation',
    '10' : 'Parking Facilities',
    '11' : 'Vacant Land'

}

mapboxgl.accessToken = 'pk.eyJ1IjoiamxhYTEzNjI0IiwiYSI6ImNrbzdnZzAzYTA2dDEyd2xrNGVoa242aHkifQ.fMOf-c4Vcc5JmV3Owr1Kzw';
const map = new mapboxgl.Map({
  container: 'map', // container element ID
  style: 'mapbox://styles/jlaa13624/ckuu5ac9k3q4j17l8z5gxhoah', // style URL
  center: [-73.9442, 40.6782], // starting position [lng, lat]
  zoom: 14, // starting zoom
  minZoom:10.5, // Zoom out
  maxZoom:18 //Zoom in
});  

// Navigation
var nav = new mapboxgl.NavigationControl();// Navigation Control
map.addControl(nav,'top-left');
map.addControl(new mapboxgl.FullscreenControl(),'top-left');



// Filter by Input Variables
/*  
- layerList is acquired by menu id, specified in App_test.html, under content_in_tabs class. 
- inputs is defined by layerList

*/
const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');

for (const input of inputs) {
    input.onclick = (layer) => {
    const layerId = layer.target.id;
     map.setStyle('mapbox://styles/jlaa13624/' + layerId);
    };
}

// Legend - could integrate into previous one
function updateLegend(){
  if (document.getElementById('ckuu5ac9k3q4j17l8z5gxhoah').checked){
    document.getElementById('legend_landuse');
  }// Check if the radio button is checked, a true/ false return

  else if (document.getElementById('ckvvn0nl12ewe14obm6seupo4').checked){
    document.getElementById('legend_housingunit');
  }

}


// Slider bar
var sliderRange = document.getElementById("sliderRange");
var slider_year = document.getElementById("slider_year");
slider_year.innerHTML = sliderRange.value;
  
sliderRange.oninput = function() {
  slider_year.innerHTML = this.value;
  
  let value = slider_year.innerHTML;
      if (value  == 2010){
       console.log('2010');
       map.setStyle('mapbox://styles/jlaa13624/ckuu5ac9k3q4j17l8z5gxhoah');
      }

      else if (value  == 2011){
       console.log('2011');
       map.setStyle('mapbox://styles/jlaa13624/ckw0ow5qt35de15p9i44tuhcb');
      }
      else if (value == 2012){
       console.log('2012');
       map.setStyle('mapbox://styles/jlaa13624/ckw0p9l9y0kik15pg9l9fs0qw');
      }

      else if (value == 2013){
        console.log('2013');
        map.setStyle('mapbox://styles/jlaa13624/ckw0pbusk39hx15l8x3o47xnp');
      }
       
     else if (value  == 2014){
       console.log('2014');
       map.setStyle('mapbox://styles/jlaa13624/ckw0pbyte35sx15p9yhnlq8c8');
     }
     else if (value  == 2015){
       console.log('2015');
       map.setStyle('mapbox://styles/jlaa13624/ckw0pc3ph0gey16pdap0n8rtm');
      }
     else if (value  == 2016){
       console.log('2016');
       map.setStyle('mapbox://styles/jlaa13624/ckw0pc82j39i615l8m7q02okq');
      }
     else{
       console.log('2017');
       map.setStyle('mapbox://styles/jlaa13624/ckw0pchya1q9114nuran1z2m6');
      }
}


// Mouse Click Popup
map.on('mousemove',function(event){
  if(map.loaded()){
      var features = map.queryRenderedFeatures(event.point,{
          layers:['Manhattan','Brooklyn','Queens','Staten Island','Bronx']
      });
      map.getCanvas().style.cursor = features.length ? 'pointer':'';
  }	
});
  
map.on('click',function(event){
  var geometry = event.point;
  var parameters = {
      layers:['Manhattan','Brooklyn','Queens','Staten Island','Bronx']
  };
  var features = map.queryRenderedFeatures(geometry, parameters);

  var lot = features[0];
  console.log(lot);
  
  if(features.length){                            //automatically convert expressions inside the () to a Boolean value, if the number is 0, it would be convert to false --> features.length>0
      var bbl = lot.properties.BBL || '—'; // if the first value is undefined or empty, will get the second value
      var landuse = landUseNames[lot.properties.LandUse] || '—' ;
      var ownername = lot.properties.OwnerName || '—';
      var lotarea = lot.properties.LotArea || '—';
      var bldg = lot.properties.BldgArea || '—';
      var com = lot.properties.ComArea || '—';
      var res = lot.properties.ResArea || '—';
      var office = lot.properties.OfficeArea || '—';
      var retail = lot.properties.RetailArea || '—';
      var garage = lot.properties.GarageArea || '—';
      var strge = lot.properties.StrgeArea || '—';
      var factory = lot.properties.FactryArea || '—';
      var other = lot.properties.OtherArea || '—';
      console.log(bbl, landuse, ownername, lotarea, bldg, com, res, office, retail,garage, strge, factory, other);

      var popup = new mapboxgl.Popup()
          .setLngLat(event.lngLat) // Stores the geographic location
          .setHTML('<dl>'+
          '<dt>Borough, Tax Block & Lot</dt>'+
          '<dd>'+ bbl +'</dd>'+
          '<dt>Land Use</dt>'+
          '<dd>'+ landuse +'</dd>'+
          '<dt>Owner Name</dt>'+
          '<dd>'+ ownername +'</dd>'+
          '<dt>Lot Area</dt>'+
          '<dd>'+ lotarea +'</dd>'+
          '<dt>Floor Area, Total Building</dt>'+
          '<dd>'+ bldg +'</dd>'+
          '<dt>Floor Area, Commercial</dt>'+
          '<dd>'+ com +'</dd>'+
          '<dt>Floor Area, Residential</dt>'+
          '<dd>'+ res +'</dd>'+
          '<dt>Floor Area, Office</dt>'+
          '<dd>'+ office +'</dd>'+
          '<dt>Floor Area, Retail</dt>'+
          '<dd>'+ retail +'</dd>'+
          '<dt>Floor Area, Garage</dt>'+
          '<dd>'+ garage +'</dd>'+
          '<dt>Floor Area, Storage</dt>'+
          '<dd>'+ strge +'</dd>'+
          '<dt>Floor Area, Factory</dt>'+
          '<dd>'+ factory +'</dd>'+
          '<dt>Floor Area, Other</dt>'+
          '<dd>'+ other +'</dd>'+
          '</dl>')
          .addTo(map);
       }
});

// Legend
$(document).ready(function(){
    $(".legend .radio_content").hide();
    $(".legend .radio_content:first-child").show();

    $(".radio_wrap").click(function(){
      var current_radio = $(this).attr("data-radio");
      $(".legend .radio_content").hide();
      $("."+ current_radio).show();
    })
});

/* Javascript_ Slider Tutorial: https://www.youtube.com/watch?v=RfPXFlW01fU */














/*

// The Line chart that not being used


// Trend Test---------------------------------------------------------------
var margin = {top: 10, right: 100, bottom: 30, left: 70},
    width = 460 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var svg = d3.select("#trend_landuse")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/jljuli/nyc-rezoning/main/Data/landuse_trend.csv", function(data) {

    // List of groups (here I have one group per column)
    var allGroup = ["comarea", "resarea", "officearea","comarea_bk","resarea_bk","officearea_bk"]

    // Reformat the data: we need an array of arrays of {x, y} tuples
    var dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
      return {
        name: grpName,
        values: data.map(function(d) {
          return {time: d.time, value: +d[grpName]};
        })
      };
    });
    // I strongly advise to have a look to dataReady with
    // console.log(dataReady)

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain([2010,2017])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [1e+7,4e+9])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the lines
    var line = d3.line()
      .x(function(d) { return x(+d.time) })
      .y(function(d) { return y(+d.value) })
    svg.selectAll("myLines")
      .data(dataReady)
      .enter()
      .append("path")
        .attr("d", function(d){ return line(d.values) } )
        .attr("stroke", function(d){ return myColor(d.name) })
        .style("stroke-width", 4)
        .style("fill", "none")
    // Add the points
    svg
      // First we need to enter in a group
      .selectAll("myDots")
      .data(dataReady)
      .enter()
        .append('g')
        .style("fill", function(d){ return myColor(d.name) })
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function(d){ return d.values })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.time) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 5)
        .attr("stroke", "white")

    // Add a legend at the end of each line
    svg
      .selectAll("myLabels")
      .data(dataReady)
      .enter()
        .append('g')
        .append("text")
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
          .attr("transform", function(d) { return "translate(" + x(d.value.time) + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
          .attr("x", 12) // shift the text a bit more right
          .text(function(d) { return d.name; })
          .style("fill", function(d){ return myColor(d.name) })
          .style("font-size", 12)

})
//--------------------------------------------------

*/