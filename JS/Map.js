// Try this for zoom
// document.body.style.zoom = "50%";

mapboxgl.accessToken = 'pk.eyJ1IjoiamxhYTEzNjI0IiwiYSI6ImNrbzdnZzAzYTA2dDEyd2xrNGVoa242aHkifQ.fMOf-c4Vcc5JmV3Owr1Kzw';

const map = new mapboxgl.Map({
  container: 'map', // container element ID
  style: 'mapbox://styles/jlaa13624/ckuu5ac9k3q4j17l8z5gxhoah', // style URL
  center: [-73.9652, 40.7008], // starting position [lng, lat]
  zoom: 14, // starting zoom
  minZoom:10.5, // Zoom out
  maxZoom:18 //Zoom in
});  

var checking=0
var checking2=0

var landUseNames = {
  '1': 'One & Two Family Buildings',
  '2' : 'Multi-Family Walk-Up Buildings',
  '3' : 'Multi-Family Elevator Buildings',
  '4' : 'Mixed Residential & Commercial Buildings',
  '5' : 'Commercial & Office Buildings',
  '6' : 'Industrial & Manufacturing',
  '7' : 'Transportation & Utility',
  '8' : 'Public Facilities & Institutions',
  '9' : 'Open Space & Outdoor Recreation',
  '10' : 'Parking Facilities',
  '11' : 'Vacant Land'
}


// Navigation
var nav = new mapboxgl.NavigationControl();// Navigation Control
map.addControl(nav,'top-left');
map.addControl(new mapboxgl.FullscreenControl(),'top-left');

// Cursor
map.on('mousemove',function(event){ 
  if(map.loaded()){
      var features = map.queryRenderedFeatures(event.point,{
          layers:['BKMN']
      });
      map.getCanvas().style.cursor = features.length ? 'pointer':'';
  }	
});

//---------------------------------MAP VIEWER ---------------------------------

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

// Slider
var sliderRange = document.getElementById("sliderRange");
var slider_year = document.getElementById("slider_year");
slider_year.innerHTML = sliderRange.value;

sliderRange.oninput = function() {
  slider_year.innerHTML = this.value;
}

// 8 Years Slider Control
var land_use=['mapbox://styles/jlaa13624/ckuu5ac9k3q4j17l8z5gxhoah','mapbox://styles/jlaa13624/ckw0ow5qt35de15p9i44tuhcb','mapbox://styles/jlaa13624/ckw0p9l9y0kik15pg9l9fs0qw','mapbox://styles/jlaa13624/ckw0pbusk39hx15l8x3o47xnp','mapbox://styles/jlaa13624/ckw0pbyte35sx15p9yhnlq8c8','mapbox://styles/jlaa13624/ckw0pc3ph0gey16pdap0n8rtm','mapbox://styles/jlaa13624/ckw0pc82j39i615l8m7q02okq','mapbox://styles/jlaa13624/ckw0pchya1q9114nuran1z2m6'];
var housing=['mapbox://styles/jlaa13624/ckvvn0nl12ewe14obm6seupo4','mapbox://styles/jlaa13624/ckwphm75w2bsk14oasj6xxucj','mapbox://styles/jlaa13624/ckwphmb5q2bsl14oak0aai7l5','mapbox://styles/jlaa13624/ckwphmcoi21wj14s1wcs7odr2','mapbox://styles/jlaa13624/ckwphmdyt224o14p63y9wkeda','mapbox://styles/jlaa13624/ckwphmf580xgj14rst190frhg','mapbox://styles/jlaa13624/ckwphmgih025h14nxva9b6rz9','mapbox://styles/jlaa13624/ckwphmhzi10es15p9n2p38ngw'];
var income=['mapbox://styles/jlaa13624/ckvvznmwd2r0z14pql0jeo5z2','mapbox://styles/jlaa13624/ckwphmjct10ev15p993rkpio3','mapbox://styles/jlaa13624/ckwphmkqm03mu14nk62nv1j8q','mapbox://styles/jlaa13624/ckwplf33c25kx14s1sbp08owa','mapbox://styles/jlaa13624/ckwplf81s144415p9suxvm88k','mapbox://styles/jlaa13624/ckwplfen6113u14ls0h1hhb0w','mapbox://styles/jlaa13624/ckwplfg8p05s615ljblpa5e2e','mapbox://styles/jlaa13624/ckwplfht025v414p6sycfuf3e'];
var education = ['mapbox://styles/jlaa13624/ckvw20xrx041514oawwee0mcw','mapbox://styles/jlaa13624/ckwplt1k12fvu14oa3dhlxdww','mapbox://styles/jlaa13624/ckwplt44f02h514ns0916f4ef','mapbox://styles/jlaa13624/ckwplt5ij1l3q15oxqma2b0z0','mapbox://styles/jlaa13624/ckwplt6wx1lai14qa5z2nnhck','mapbox://styles/jlaa13624/ckwplt82t07qm14oauj9rrcby','mapbox://styles/jlaa13624/ckwplt95014h515p95re6wb7q','mapbox://styles/jlaa13624/ckwplta91269114p63wuh1ut8'];
var population = ['mapbox://styles/jlaa13624/ckvw250cs00u815pfozb1fc8c','mapbox://styles/jlaa13624/ckwpm287w2g4y14oaq1xaa4pd','mapbox://styles/jlaa13624/ckwpm2agt07xy14nrzci3yci3','mapbox://styles/jlaa13624/ckwpm2bks14qa15p9e96d4mpj','mapbox://styles/jlaa13624/ckwpm2cm711wy14poibxetz1y','mapbox://styles/jlaa13624/ckwpm2dqw1ljh14qaytymatp8','mapbox://styles/jlaa13624/ckwpm2ewv11v415phiutq3y2o','mapbox://styles/jlaa13624/ckwpm2fup11x514poxnl1yf3u'];
var transit = ['mapbox://styles/jlaa13624/ckvw2aw5004ag14oanwyhpwzt','mapbox://styles/jlaa13624/ckwplfjez07cj14nryazf4uv0','mapbox://styles/jlaa13624/ckwplfl5x023p14ns40328uyc','mapbox://styles/jlaa13624/ckwpmlrnz1m2e14qa9lu4yj4c','mapbox://styles/jlaa13624/ckwpmlta3038q14nsdn0gxbts','mapbox://styles/jlaa13624/ckwpmlu8h2vaj15ohamyx4f5j','mapbox://styles/jlaa13624/ckwpmlv8x159015p9hz0djcak','mapbox://styles/jlaa13624/ckwpmmjxl039j14o3ggej9lxg'];
var noise = ['mapbox://styles/jlaa13624/ckvw108xn016415rto04t5sts','mapbox://styles/jlaa13624/ckwpmqbg6071h15ljxbi98p18','mapbox://styles/jlaa13624/ckwpmqe09071i15ljeu5r5bwr','mapbox://styles/jlaa13624/ckwpmqfhn1bpu15qk7vvbpvbs','mapbox://styles/jlaa13624/ckwpmqh0g071p15lj5mbj4kvy','mapbox://styles/jlaa13624/ckwpmqioz08lt14nrb3n6o4hr','mapbox://styles/jlaa13624/ckwpmqk6z08my14oax5xfs8bd','mapbox://styles/jlaa13624/ckwpmqlpk12db14lsp53w94zu'];
var green = ['mapbox://styles/jlaa13624/ckvw2bawz04at14oabwk4fnan','mapbox://styles/jlaa13624/ckwpmwo8v077q15ljruka8ybv','mapbox://styles/jlaa13624/ckwpmwpt51md214qad97t1bml','mapbox://styles/jlaa13624/ckwpmwqtu2vlj15ohp53ex9bi','mapbox://styles/jlaa13624/ckwpmwrvw08ro14nrashylqtg','mapbox://styles/jlaa13624/ckwpmwt8m08sr14oaqdj2usg7','mapbox://styles/jlaa13624/ckwpmwu9z2vlo15ohvgldlljr','mapbox://styles/jlaa13624/ckwpmwvaq1md714qatgbf935d'];
  
sliderRange.onchange = function() {
  
   // Switch between maps and ml when moving sliders
   document.getElementById("map").style.display = "block"; 
   document.getElementsByClassName('legend')[0].style.display = 'block';
   document.getElementsByClassName('legend_com')[0].style.display = 'none';
   document.getElementById("comparison-container").style.display = "none";
   document.getElementsByClassName('legend_ml')[0].style.display = 'none';

  //Default Map: Landuse
    if(document.querySelector('input[name="rtoggle"]:checked') == null){
      selected = 'landuse';
    }
    else {
      var selected = document.querySelector('input[name="rtoggle"]:checked').value;
    }
   
    // Change between input variables
    var curr_map;  

    if(selected=='landuse'){
      console.log('Landuse!');
      curr_map=land_use;
    }

    else if(selected=='housing'){     
      document.getElementById("map").style.display = "none";
      document.getElementById('housing_diff').style.display = 'block';
      document.getElementsByClassName('legend')[0].style.display = 'none'; 
      document.getElementsByClassName('legend_com')[0].style.display = 'block';
      document.getElementsByClassName('legend_ml')[0].style.display = 'none';
      document.getElementById("comparison-container").style.display = "none";
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

   // Change with slider bar
    slider_year.innerHTML = sliderRange.value;
    let year = sliderRange.value;
    const housing_map = new mapboxgl.Map({
      container: 'housing_before',
      style: 'mapbox://styles/jlaa13624/ckvvn0nl12ewe14obm6seupo4',
      center: [-73.99, 40.69], // starting position [lng, lat]
      zoom: 14, // starting zoom
      minZoom:10.5, // Zoom out
      maxZoom:18 //Zoom in
      });

    if (year == 2010){
      console.log('2010');
      if(selected=='housing'){
        housing_map.setStyle(curr_map[0]);
      }
      else{
        map.setStyle(curr_map[0]);
        console.log(curr_map[0]);
      }
    }

    else if (year == 2011){
      console.log('2011');
       if(selected=='housing'){
        housing_map.setStyle(curr_map[1]);
      }
      else{
        map.setStyle(curr_map[1]);
        console.log(curr_map[1]);
      }
    }
    else if (year == 2012){
      if(selected=='housing'){
        housing_map.setStyle(curr_map[2]);
      }
      else{
        map.setStyle(curr_map[2]);
        console.log(curr_map[2]);
      }
    }
    else if (year == 2013){
      if(selected=='housing'){
        housing_map.setStyle(curr_map[3]);
      }
      else{
        map.setStyle(curr_map[3]);
        console.log(curr_map[3]);
      }
    }    
    else if (year == 2014){
      if(selected=='housing'){
        housing_map.setStyle(curr_map[4]);
      }
      else{
        map.setStyle(curr_map[4]);
        console.log(curr_map[4]);
      }
    }
    else if (year == 2015){
      if(selected=='housing'){
        housing_map.setStyle(curr_map[5]);
      }
      else{
        map.setStyle(curr_map[5]);
        console.log(curr_map[5]);
      }
    }
    else if (year == 2016){
      if(selected=='housing'){
        housing_map.setStyle(curr_map[6]);
      }
      else{
        map.setStyle(curr_map[6]);
        console.log(curr_map[6]);
      }
    }
    else{
      if(selected=='housing'){
        housing_map.setStyle(curr_map[7]);
      }
      else{
        map.setStyle(curr_map[7]);
        console.log(curr_map[7]);
      }
    }
}


// Input Variables Buttons
const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');
var input_variable = document.getElementById('');

for (const input of inputs) {

  input.onclick = (layer) => {
    const layerId = layer.target.id;
    map.setStyle('mapbox://styles/jlaa13624/' + layerId); //8 inputs
    document.getElementById("sliderRange").value='2010';// Slider bar
    slider_year.innerHTML = "2010"; //Slider bar value
    
    // Get button value
    if(document.querySelector('input[name="rtoggle"]:checked') == null){
      selected_button = 'landuse';
    }
    else {
      var selected_button = document.querySelector('input[name="rtoggle"]:checked').value;
    }
    
    if(selected_button=='landuse'||selected_button=='income'||selected_button=='education'||selected_button=='population'||selected_button=='transit'||selected_button=='noise'||selected_button=='green'){
        // Switch between maps
      document.getElementById("map").style.display = "block"; 
      document.getElementsByClassName('legend')[0].style.display = 'block';
      document.getElementById("housing_diff").style.display = "none";
      document.getElementsByClassName('legend_com')[0].style.display = 'none';
      document.getElementById("comparison-container").style.display = "none";
      document.getElementsByClassName('legend_ml')[0].style.display = 'none';
    }
  
    else {    
        console.log('Compare!');
        document.getElementById("map").style.display = "none"; 
        document.getElementsByClassName('legend')[0].style.display = 'none';
        document.getElementById("housing_diff").style.display = "block";
        document.getElementsByClassName('legend_com')[0].style.display = 'block';
        document.getElementById("comparison-container").style.display = "none";
        document.getElementsByClassName('legend_ml')[0].style.display = 'none';

        if(checking==0){
          checking=1;
          const map = new mapboxgl.Map({
            container: 'housing_before',
            style: 'mapbox://styles/jlaa13624/ckvvn0nl12ewe14obm6seupo4',
            center: [-73.99, 40.69], // starting position [lng, lat]
            zoom: 14, // starting zoom
            minZoom:10.5, // Zoom out
            maxZoom:18 //Zoom in
            });
          const afterMap = new mapboxgl.Map({
            container: 'housing_after',
            style: 'mapbox://styles/jlaa13624/ckwwzaoes0e1i14tjc3olwycg',
            center: [-73.99, 40.69], // starting position [lng, lat]
            zoom: 14, // starting zoom
            minZoom:10.5, // Zoom out
            maxZoom:18 //Zoom in
            });
          const container = '#housing_diff';           
          const housing_diff = new mapboxgl.Compare(map, afterMap, container, {
          }); 
          
          // AfterMap Popup
          afterMap.on('mousemove',function(event){  // Cursor Change
            if(afterMap.loaded()){
                var features_2 = afterMap.queryRenderedFeatures(event.point,{
                    layers:['BKMN']
                });
                afterMap.getCanvas().style.cursor = features_2.length ? 'pointer':'';
            }	
          });      
          afterMap.on('click',function(event){// click arguement+listener funciton
            var geometry = event.point;//get mouseclick location
            var parameters = {
                layers:['BKMN']
                };

            var features_2 = afterMap.queryRenderedFeatures(geometry, parameters);
            var lot_2 = features_2[0];// get all the features in each tax lot    
            console.log(lot_2)
          
            if(features_2.length){                           //automatically convert expressions inside the () to a Boolean value, if the number is 0, it would be convert to false --> features.length>0   
                  var bbl = lot_2.properties.bbl || '—'; // if the first value is undefined or empty, will get the second value
                  var diff =lot_2.properties.diff|| '—' ;

                  var popup_2 = new mapboxgl.Popup()
                      .setLngLat(event.lngLat) // Stores the geographic location, position popup to mouseclick
                      .setHTML('<dl>'+         //HTML Markup for the content
                      '<dt>Borough, Tax Block & Lot</dt>'+
                      '<dd>'+ bbl +'</dd>'+
                      '<dt>2017 - 2010 </dt>'+
                      '<dd>'+ diff +'</dd>'+
                      '</dl>')
                      .addTo(afterMap);
                  }
             });         
    }
  }       
 };
}

//---------------------------------MACHINE LEARNING OUTCOME ---------------------------------
var ml = document.getElementById("tab-2");

ml.onclick = function(){
  
   // Switch between maps and ml
  document.getElementById("map").style.display = "none";
  document.getElementsByClassName('legend')[0].style.display = 'none';
  document.getElementById("housing_diff").style.display = "none";
  document.getElementsByClassName('legend_com')[0].style.display = 'none';
  document.getElementById("comparison-container").style.display = "block";
  document.getElementsByClassName('legend_ml')[0].style.display = 'block';


  if(checking2==0){
    checking2=1
    const beforeMap = new mapboxgl.Map({
      container: 'before',
      style: 'mapbox://styles/jlaa13624/ckw0pchya1q9114nuran1z2m6',
      center: [-74.00, 40.72], // starting position [lng, lat]
      zoom: 14, // starting zoom
      minZoom:10.5, // Zoom out
      maxZoom:18 //Zoom in
      });   
    const afterMap = new mapboxgl.Map({
      container: 'after',
      style: 'mapbox://styles/jlaa13624/ckwvmktdj5s1315qjp1rqow5h',
      center: [-74.00, 40.72], // starting position [lng, lat]
      zoom: 14, // starting zoom
      minZoom:10.5, // Zoom out
      maxZoom:18 //Zoom in
      });
    const container = '#comparison-container';  
    const map_com = new mapboxgl.Compare(beforeMap, afterMap, container, {
    });

    // BeforeMap Popup
    // beforeMap.on('mousemove',function(event){  // Cursor Change
    //   if(beforeMap.loaded()){
    //       var features = beforeMap.queryRenderedFeatures(event.point,{
    //           layers:['BKMN']
    //       });
    //       beforeMap.getCanvas().style.cursor = features.length ? 'pointer':'';
    //   }	
    // });      
    // beforeMap.on('click',function(event){// click arguement+listener funciton
    //   var geometry = event.point;//get mouseclick location
    //   var parameters = {
    //       layers:['BKMN']
    //   };
    //   var features = beforeMap.queryRenderedFeatures(geometry, parameters);
    //   var lot = features[0];// get all the features in each tax lot    
    //   if(features.length){                           //automatically convert expressions inside the () to a Boolean value, if the number is 0, it would be convert to false --> features.length>0   
    //       var bbl = lot.properties.bbl || '—'; // if the first value is undefined or empty, will get the second value
    //       var zipcode = lot.properties.zipcode || '—';
    //       var landuse = landUseNames[lot.properties.landuse] || '—' ;
    //       var lotarea = lot.properties.lotarea || '—';
    //       var com = lot.properties.comarea || '—';
    //       var res = lot.properties.resarea || '—';
    //       var office = lot.properties.officearea || '—';
    //       var retail = lot.properties.retailarea || '—';
    //       var garage = lot.properties.garagearea || '—';
    //       var strge = lot.properties.strgearea || '—';
    //       var factory = lot.properties.factryarea || '—';
    //       var other = lot.properties.otherarea || '—';
    //       var popup = new mapboxgl.Popup()
    //           .setLngLat(event.lngLat) // Stores the geographic location, position popup to mouseclick
    //           .setHTML('<dl>'+         //HTML Markup for the content
    //           '<dt>Borough, Tax Block & Lot</dt>'+
    //           '<dd>'+ bbl +'</dd>'+
    //           '<dt>Zip Code</dt>'+
    //           '<dd>'+ zipcode +'</dd>'+
    //           '<dt>Land Use</dt>'+
    //           '<dd>'+ landuse +'</dd>'+
    //           '<dt>Lot Area</dt>'+
    //           '<dd>'+ lotarea +'</dd>'+
    //           '<dt>Floor Area, Commercial</dt>'+
    //           '<dd>'+ com +'</dd>'+
    //           '<dt>Floor Area, Residential</dt>'+
    //           '<dd>'+ res +'</dd>'+
    //           '<dt>Floor Area, Office</dt>'+
    //           '<dd>'+ office +'</dd>'+
    //           '<dt>Floor Area, Retail</dt>'+
    //           '<dd>'+ retail +'</dd>'+
    //           '<dt>Floor Area, Garage</dt>'+
    //           '<dd>'+ garage +'</dd>'+
    //           '<dt>Floor Area, Storage</dt>'+
    //           '<dd>'+ strge +'</dd>'+
    //           '<dt>Floor Area, Factory</dt>'+
    //           '<dd>'+ factory +'</dd>'+
    //           '<dt>Floor Area, Other</dt>'+
    //           '<dd>'+ other +'</dd>'+
    //           '</dl>')
    //           .addTo(beforeMap);
    //       }

          // beforeMap.on('click',function(event){
            
          //   console.log('Mouse Clicked');
          //   console.log(event.point);

          //   var geometry = event.point;//get mouseclick location
          //   var parameters = {
          //       layers:['BKMN']
          //   };
          //   var features = map.queryRenderedFeatures(geometry, parameters);// WHY FEATURES IS EMPTY!!!!!!!!!!!!!!!
          //   var lot = features[0];// get all the features in each tax lot
          //   console.log(features);


          // });

          // AfterMap Popup
          afterMap.on('mousemove',function(event){  // Cursor Change
            if(afterMap.loaded()){
                var features_2 = afterMap.queryRenderedFeatures(event.point,{
                    layers:['BKMN']
                });
                afterMap.getCanvas().style.cursor = features_2.length ? 'pointer':'';
            }	
          });      
          afterMap.on('click',function(event){// click arguement+listener funciton
            var geometry = event.point;//get mouseclick location
            var parameters = {
                layers:['BKMN']
            };

          var features_2 = afterMap.queryRenderedFeatures(geometry, parameters);
          var lot_2 = features_2[0];// get all the features in each tax lot    
        
          if(features_2.length){                           //automatically convert expressions inside the () to a Boolean value, if the number is 0, it would be convert to false --> features.length>0   
                var bbl = lot_2.properties.bbl || '—'; // if the first value is undefined or empty, will get the second value
                var original_landuse = landUseNames[lot_2.properties.original_landuse] || '—' ;
                var predicted_landuse = landUseNames[lot_2.properties.result] || '—' ;

                var popup_2 = new mapboxgl.Popup()
                    .setLngLat(event.lngLat) // Stores the geographic location, position popup to mouseclick
                    .setHTML('<dl>'+         //HTML Markup for the content
                    '<dt>Borough, Tax Block & Lot</dt>'+
                    '<dd>'+ bbl +'</dd>'+
                    '<dt>Landuse</dt>'+
                    '<dd>'+ original_landuse +'</dd>'+
                    '<dt>Predicted Landuse</dt>'+
                    '<dd>'+ predicted_landuse +'</dd>'+
                    '</dl>')
                    .addTo(afterMap);
           }
    });
  } 
}


// ---------------------------------Land Use Pop Up ---------------------------------

map.on('click',function(event){// click arguement+listener funciton
  console.log('map onlick called');
  var geometry = event.point;//get mouseclick location
  var parameters = {
      layers:['BKMN']
  };
  var features = map.queryRenderedFeatures(geometry, parameters);
  var lot = features[0];// get all the features in each tax lot
  console.log(lot.properties.landuse);
  
  if(features.length){                           //automatically convert expressions inside the () to a Boolean value, if the number is 0, it would be convert to false --> features.length>0   
      var bbl = lot.properties.bbl || '—'; // if the first value is undefined or empty, will get the second value
      var zipcode = lot.properties.zipcode || '—';
      var landuse = landUseNames[lot.properties.landuse] || '—' ;
      var lotarea = lot.properties.lotarea || '—';
      var com = lot.properties.comarea || '—';
      var res = lot.properties.resarea || '—';
      var office = lot.properties.officearea || '—';
      var retail = lot.properties.retailarea || '—';
      var garage = lot.properties.garagearea || '—';
      var strge = lot.properties.strgearea || '—';
      var factory = lot.properties.factryarea || '—';
      var other = lot.properties.otherarea || '—';
      console.log(bbl, zipcode, landuse, lotarea, com, res, office, retail,garage, strge, factory, other);

      var popup = new mapboxgl.Popup()
          .setLngLat(event.lngLat) // Stores the geographic location
          .setHTML('<dl>'+
          '<dt>Borough, Tax Block & Lot</dt>'+
          '<dd>'+ bbl +'</dd>'+
          '<dt>Zip Code</dt>'+
          '<dd>'+ zipcode +'</dd>'+
          '<dt>Land Use</dt>'+
          '<dd>'+ landuse +'</dd>'+
          '<dt>Lot Area</dt>'+
          '<dd>'+ lotarea +'</dd>'+
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



// ---------------------------------Housing Unit Pop Up ---------------------------------

// Use this part to Test!
map.on('click',function(event){
  console.log('Mouse Clicked');
  console.log(event.point);
});