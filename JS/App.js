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
  container: 'map_landuse', // container element ID
  style: 'mapbox://styles/jlaa13624/ckuu5ac9k3q4j17l8z5gxhoah', // style URL
  center: [-73.970, 40.715], // starting position [lng, lat]
  zoom: 13, // starting zoom
  minZoom:10.5, // Zoom out
  maxZoom:18 //Zoom in
});  


var nav = new mapboxgl.NavigationControl();// Navigation Control
map.addControl(nav,'top-left');
map.addControl(new mapboxgl.FullscreenControl(),'top-left');


map.on('mousemove',function(event){
  if(map.loaded()){
      var features = map.queryRenderedFeatures(event.point,{
          layers:['Manhattan','Brooklyn','Queens','Staten Island','Bronx']
      });
      map.getCanvas().style.cursor = features.length ? 'pointer':'';
  }	
  /*
  if (features.length){
      map.getCanvas().style.cursor = 'pointer';
  } else{
      map.getCanvas().style.cursor='';
  }
  */
});
  

map.on('click',function(event){
  //console.log('Mouse Clicked');
  //console.log(event.point); //get click location

  var geometry = event.point;
  var parameters = {
      layers:['Manhattan','Brooklyn','Queens','Staten Island','Bronx']
  };

  var features = map.queryRenderedFeatures(geometry, parameters);
  //console.log(features);
  //console.log(features.length+'features');

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


const map2 = new mapboxgl.Map({
    container: 'map_houseunit', // container element ID
    style: 'mapbox://styles/jlaa13624/ckvvn0nl12ewe14obm6seupo4', // style URL
    center: [-73.970, 40.715], // starting position [lng, lat]
    zoom: 13, // starting zoom
    minZoom:10.5, // Zoom out
    maxZoom:18 //Zoom in
  });  