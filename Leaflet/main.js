window.onload = init;
function init() {
  //HTML element
  const mapElement = document.getElementById("mapid");
   
  //basemaps
  const stadiaMaps = L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 20,
      
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }
  );

  const openStreetMapStandard = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      noWrap:true,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  //leaflet map obj
  const mymap = L.map(mapElement, {
    center: [28.4744,77.5040],
    zoom: 14,
    minZoom: 2,
    easeLinearity: 0.5,
    worldCopyJump: true,
    layers: [openStreetMapStandard],
  });




  //basemap obj
  const baseLayers = {
    "<b>OpenStreetMapStandard</b>": openStreetMapStandard,
    StadiaMaps: stadiaMaps,
  };

  //overlays
  const perthBaseMapImage='./Data/perth.png';

  const perthBaseMapBounds=[[-40.92808330139302,112.45635819689767],[-22.11281294436251,135.05127721944262]]
  const imagePerthOverlay=L.imageOverlay(perthBaseMapImage,perthBaseMapBounds)
  
 
  //overlay obj
  const overlayerLayers={
    'Perth image':imagePerthOverlay
  }
  
 
  //layer control
  const layerControls = L.control
    .layers(
      baseLayers,
      overlayerLayers,
      {
        collapsed: false,
        position: "topright",
      }
    )
    .addTo(mymap);
    
  

   
   const perthMarker=L.marker([28.4680,77.5090],{
    opacity: 1
   }).addTo(mymap)

   //const perthMarkerPopup= perthMarker.bindPopup('perth city from the popup');

   const perthMarkerTooltip=perthMarker.bindTooltip("Greater Noida").openTooltip();

   /*
   mymap.locate({setView:true,maxxZoom:18,enableHighAccuracy:true})

   function onLocationFound(e){
    var radius=e.accuracy.toFixed(2);
    var locationMarker=L.marker(e.latlng).addTo(mymap)
    .bindPopup('You are within '+radius+' metres from this point').openPopup()
  
    var locationCircle=L.circle(e.latlng,radius).addTo(mymap);
  }
   mymap.on('locationfound',onLocationFound)


   function onLocationError(e){
    window.alert(e.message)
   }
   mymap.on('locationerror',onLocationError)


   */
   const myCustomIcon=L.icon({
    iconUrl: '../Data/custom.png',
    iconSize: [40,40]
   })
   
   //dist

   const myDivIcon=L.divIcon({
    className: 'my-div-icon',
    iconSize: 30
   })

   var counter=0
   var coordinates=[]

   mymap.on('click',function(e){
    counter+=1;
    let latlng=e.latlng;
    coordinates.push(latlng)

    let popup=L.popup({
      autoClose: false,
      closeOnClick: false
    }).setContent(String(counter))

    L.marker(latlng,{icon:myDivIcon})
    .addTo(mymap)
    .bindPopup(popup)
    .openPopup()


    if (counter>=2){
      let distance=mymap.distance(coordinates[0],coordinates[1])
      console.log('distance between '+counter+' and '+(counter-1)+' is '+distance)
      coordinates.shift()

    }
   })

  

   /*
   var drawPolyLine=L.polyline([], {
    color: 'red',
    smoothFactor: 10,
    weight: 6
  }).addTo(mymap);

   mymap.on('click',function(e){
    let latlng=e.latlng;
    drawPolyLine.addLatLng(latlng)

   })
   */
   /*
   var masterPolyLine=L.polyline([], {color: 'blue'}).addTo(mymap);
   var masterLineCoordinates=[]
   mymap.on('dblclick',function(e){
    let clickedAllCoordinates=drawPolyLine.getLatLngs()
    let clickedAllCoordinatesExceptTheLastOne=clickedAllCoordinates.slice(0,clickedAllCoordinates[0].length-1)
    
    masterLineCoordinates.push(clickedAllCoordinatesExceptTheLastOne)
    masterPolyLine.setLatLngs(masterLineCoordinates)

    drawPolyLine.setLatLngs([])
   })
*/
   //console.log(mymap.dragging.disable())
    /*
   var polygon = L.polygon([], {color: 'red'}).addTo(mymap);
   mymap.on('click',function(e){
    let latlng=e.latlng;
    polygon.addLatLng(latlng)
  })

  var masterPolygon=L.polygon([], {color: 'blue'}).addTo(mymap);
  var masterPolygonCoordinates=[]

  mymap.on('dblclick',function(e){
 
    let clickedAllCoordinates=polygon.getLatLngs()
 
    let clickedAllCoordinatesExceptTheLastOne=clickedAllCoordinates.slice(0,clickedAllCoordinates[0].length-1)

   masterPolygonCoordinates.push(clickedAllCoordinatesExceptTheLastOne)
   masterPolygon.setLatLngs(masterPolygonCoordinates)

   polygon.setLatLngs([])

  })
*/
  }
