
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

// Legend Update
$(document).ready(function(){
  $(".legend .radio_content").hide();
  $(".legend .radio_content:first-child").show();

  $(".radio_wrap").click(function(){
    var current_radio = $(this).attr("data-radio");
    $(".legend .radio_content").hide();
    $("."+ current_radio).show();
  })
});

// Filter by Input Variables
  const layerList = document.getElementById('menu');
  const inputs = layerList.getElementsByTagName('input');
  var input_variable = document.getElementById('');

  for (const input of inputs) {
      input.onclick = (layer) => {
      const layerId = layer.target.id;
      map.setStyle('mapbox://styles/jlaa13624/' + layerId);
      };
  }
// Slider
var sliderRange = document.getElementById("sliderRange");
var slider_year = document.getElementById("slider_year");
slider_year.innerHTML = sliderRange.value;

sliderRange.oninput = function() {
  slider_year.innerHTML = this.value;
}

//-----------------------------Test------------------------------------
var land_use=['mapbox://styles/jlaa13624/ckuu5ac9k3q4j17l8z5gxhoah','mapbox://styles/jlaa13624/ckw0ow5qt35de15p9i44tuhcb','mapbox://styles/jlaa13624/ckw0p9l9y0kik15pg9l9fs0qw','mapbox://styles/jlaa13624/ckw0pbusk39hx15l8x3o47xnp','mapbox://styles/jlaa13624/ckw0pbyte35sx15p9yhnlq8c8','mapbox://styles/jlaa13624/ckw0pc3ph0gey16pdap0n8rtm','mapbox://styles/jlaa13624/ckw0pc82j39i615l8m7q02okq','mapbox://styles/jlaa13624/ckw0pchya1q9114nuran1z2m6'];
var housing=['mapbox://styles/jlaa13624/ckvvn0nl12ewe14obm6seupo4','mapbox://styles/jlaa13624/ckwphm75w2bsk14oasj6xxucj','mapbox://styles/jlaa13624/ckwphmb5q2bsl14oak0aai7l5','mapbox://styles/jlaa13624/ckwphmcoi21wj14s1wcs7odr2','mapbox://styles/jlaa13624/ckwphmdyt224o14p63y9wkeda','mapbox://styles/jlaa13624/ckwphmf580xgj14rst190frhg','mapbox://styles/jlaa13624/ckwphmgih025h14nxva9b6rz9','mapbox://styles/jlaa13624/ckwphmhzi10es15p9n2p38ngw'];
var income=['mapbox://styles/jlaa13624/ckvvznmwd2r0z14pql0jeo5z2','mapbox://styles/jlaa13624/ckwphmjct10ev15p993rkpio3','mapbox://styles/jlaa13624/ckwphmkqm03mu14nk62nv1j8q','mapbox://styles/jlaa13624/ckwplf33c25kx14s1sbp08owa','mapbox://styles/jlaa13624/ckwplf81s144415p9suxvm88k','mapbox://styles/jlaa13624/ckwplfen6113u14ls0h1hhb0w','mapbox://styles/jlaa13624/ckwplfg8p05s615ljblpa5e2e','mapbox://styles/jlaa13624/ckwplfht025v414p6sycfuf3e'];
var education = ['mapbox://styles/jlaa13624/ckvw20xrx041514oawwee0mcw','mapbox://styles/jlaa13624/ckwplt1k12fvu14oa3dhlxdww','mapbox://styles/jlaa13624/ckwplt44f02h514ns0916f4ef','mapbox://styles/jlaa13624/ckwplt5ij1l3q15oxqma2b0z0','mapbox://styles/jlaa13624/ckwplt6wx1lai14qa5z2nnhck','mapbox://styles/jlaa13624/ckwplt82t07qm14oauj9rrcby','mapbox://styles/jlaa13624/ckwplt95014h515p95re6wb7q','mapbox://styles/jlaa13624/ckwplta91269114p63wuh1ut8'];
var population = ['mapbox://styles/jlaa13624/ckvw250cs00u815pfozb1fc8c','mapbox://styles/jlaa13624/ckwpm287w2g4y14oaq1xaa4pd','mapbox://styles/jlaa13624/ckwpm2agt07xy14nrzci3yci3','mapbox://styles/jlaa13624/ckwpm2bks14qa15p9e96d4mpj','mapbox://styles/jlaa13624/ckwpm2cm711wy14poibxetz1y','mapbox://styles/jlaa13624/ckwpm2dqw1ljh14qaytymatp8','mapbox://styles/jlaa13624/ckwpm2ewv11v415phiutq3y2o','mapbox://styles/jlaa13624/ckwpm2fup11x514poxnl1yf3u'];
var transit = ['mapbox://styles/jlaa13624/ckvw2aw5004ag14oanwyhpwzt','mapbox://styles/jlaa13624/ckwplfjez07cj14nryazf4uv0','mapbox://styles/jlaa13624/ckwplfl5x023p14ns40328uyc','mapbox://styles/jlaa13624/ckwpmlrnz1m2e14qa9lu4yj4c','mapbox://styles/jlaa13624/ckwpmlta3038q14nsdn0gxbts','mapbox://styles/jlaa13624/ckwpmlu8h2vaj15ohamyx4f5j','mapbox://styles/jlaa13624/ckwpmlv8x159015p9hz0djcak','mapbox://styles/jlaa13624/ckwpmmjxl039j14o3ggej9lxg'];
var noise = ['mapbox://styles/jlaa13624/ckvw108xn016415rto04t5sts','mapbox://styles/jlaa13624/ckwpmqbg6071h15ljxbi98p18','mapbox://styles/jlaa13624/ckwpmqe09071i15ljeu5r5bwr','mapbox://styles/jlaa13624/ckwpmqfhn1bpu15qk7vvbpvbs','mapbox://styles/jlaa13624/ckwpmqh0g071p15lj5mbj4kvy','mapbox://styles/jlaa13624/ckwpmqioz08lt14nrb3n6o4hr','mapbox://styles/jlaa13624/ckwpmqk6z08my14oax5xfs8bd','mapbox://styles/jlaa13624/ckwpmqlpk12db14lsp53w94zu'];
var green = ['mapbox://styles/jlaa13624/ckvw2bawz04at14oabwk4fnan','mapbox://styles/jlaa13624/ckwpmwo8v077q15ljruka8ybv','mapbox://styles/jlaa13624/ckwpmwpt51md214qad97t1bml','mapbox://styles/jlaa13624/ckwpmwqtu2vlj15ohp53ex9bi','mapbox://styles/jlaa13624/ckwpmwrvw08ro14nrashylqtg','mapbox://styles/jlaa13624/ckwpmwt8m08sr14oaqdj2usg7','mapbox://styles/jlaa13624/ckwpmwu9z2vlo15ohvgldlljr','mapbox://styles/jlaa13624/ckwpmwvaq1md714qatgbf935d'];
  
sliderRange.onchange = function() {
  var selected = document.querySelector('input[name="rtoggle"]:checked').value;
  var curr_map;
  var sliderRange = document.getElementById("sliderRange");
  var slider_year = document.getElementById("slider_year");

  if(selected=='landuse'){
      console.log('Landuse!');
      curr_map=land_use;
  }
  else if(selected=='housing'){
    console.log('housing!');
    curr_map=housing;
  }
  else if(selected=='income'){
    console.log('Income!');
    curr_map=income;
  }
  else if(selected=='education'){
    console.log('Education!');
    curr_map=education;
  }
  else if(selected=='population'){
    console.log('Population!');
    curr_map=population;
  }
  else if(selected=='transit'){
    console.log('Transit!');
    curr_map=transit;
  }
  else if(selected=='noise'){
    console.log('Noise!');
    curr_map=noise;
  }
  else{
    console.log('Green!');
    curr_map=green;
  }

slider_year.innerHTML = sliderRange.value;
let year = slider_year.innerHTML;
if (year == 2010){
      console.log('2010');
      map.setStyle(curr_map[0]);
      }

else if (year == 2011){
      console.log('2011');
      map.setStyle(curr_map[1]);
      }
else if (year == 2012){
      console.log('2012');
      map.setStyle(curr_map[2]);
      }

else if (year == 2013){
        console.log('2013');
        map.setStyle(curr_map[3]);
      }
      
else if (year == 2014){
      console.log('2014');
      map.setStyle(curr_map[4]);
    }
else if (year == 2015){
      console.log('2015');
      map.setStyle(curr_map[5]);
      }
else if (year == 2016){
      console.log('2016');
      map.setStyle(curr_map[6]);
      }
else{
      console.log('2017');
      map.setStyle(curr_map[7]);
      }
}


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

/* Javascript_ Slider Tutorial: https://www.youtube.com/watch?v=RfPXFlW01fU */
// HOW TO GET RADIO BUTTON INPUT????
// https://www.youtube.com/watch?v=r3Oc4IUP0XI
