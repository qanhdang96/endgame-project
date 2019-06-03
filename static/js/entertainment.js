boundaryURL = "https://raw.githubusercontent.com/qanhdang96/db/master/boundaries.geojson"
zipcodesURL = "https://raw.githubusercontent.com/qanhdang96/db/master/zipcodes.geojson"
NightclubURL = "https://raw.githubusercontent.com/qanhdang96/db/master/pub_point.geojson"
museumURL = "https://raw.githubusercontent.com/qanhdang96/db/master/museum_point.geojson"
theatreURL = "https://raw.githubusercontent.com/qanhdang96/db/master/theatres.geojson"

var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?" +
    "access_token=pk.eyJ1IjoicWFuaGRhbmc5NiIsImEiOiJjanZvaG5kdXcxeXk0NDN1aW85eXpqa3NnIn0.PdZBCbzVJ9iM-Au8hD_jsg");

var baseMaps = {
  "Street Map": streetmap,
};

d3.json(boundaryURL, function(boundaryData) {
  var boundary = L.geoJSON(boundaryData, {
        onEachFeature: function (feature, layer) {
    var marker1 = layer.bindPopup('<h1>Austin, TX </h1><h3>Mayor: Steve </h3><h3>Population: 950,715</h3><h3>Area: '+feature.properties.AREAMILES+' Square Miles</h3><h3><a href='+feature.properties.WEB_URL+' target="_blank">Discover Austin</a></h3>');
    marker1.on('click', function (event) {
  this.openPopup();
});
  }
})

  var myMap = L.map("map", {
    center: [
      38.9, -77
    ],
    zoom: 11,
    layers: [streetmap, boundary]
  });

d3.json(zipcodesURL, function(zipcodeData) {
  var zipcode = L.geoJSON(zipcodeData, {
        style: function(feature) {
      return {
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        color: "green"
      };
    },
  onEachFeature: function (feature, layer) {
    var marker5 = layer.bindPopup('<h3>'+feature.properties.ZIPCODE+'</h3><h4>'+feature.properties.NAME+'</h4>');
    marker5.on('mouseover', function (event) {
  this.openPopup();
  layer = event.target
  layer.setStyle({
    fillOpacity: 0.8
  })
});
marker5.on('mouseout', function (event) {
  this.closePopup();
  layer = event.target
  layer.setStyle({
    fillOpacity: 0.2
  })
});
        marker5.on('click', function(event) {
          myMap.fitBounds(event.target.getBounds());
        })
      }
  })

d3.json(NightclubURL, function(NightclubData) {
  var nightclubs = L.geoJSON(NightclubData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: nightclubsIcon})
    },
    onEachFeature: function (feature, layer) {
   layer.bindPopup('<h3>'+feature.properties.TRADE_NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4><h4>License Type: '+feature.properties.TYPE+'</h4>');
     }
    })  
  var NightclubGroup = L.markerClusterGroup();
  NightclubGroup.addLayer(nightclubs)

d3.json(museumURL, function(MuseumData) {
  var museums = L.geoJSON(MuseumData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: museumIcon})
    },
    onEachFeature: function (feature, layer) {
   layer.bindPopup('<h3>'+feature.properties.TRADE_NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4><h4>License Type: '+feature.properties.TYPE+'</h4>');
     }
    })  
  var MuseumGroup = L.markerClusterGroup();
  MuseumGroup.addLayer(museums)


d3.json(theatreURL, function(theatreData) {
  var theatres = L.geoJSON(TheatreData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: theatreIcon})
    },
    onEachFeature: function (feature, layer) {
   layer.bindPopup('<h3>'+feature.properties.TRADE_NAME+'</h3><h4>'+feature.properties.ADDRESS+'</h4><h4>License Type: '+feature.properties.TYPE+'</h4>');
     }
    })  
  var TheatreGroup = L.markerClusterGroup();
  TheatreGroup.addLayer(theatres)

  var overlayMaps = {
    "Austin Boundary": boundary,
    "Austin Zipcodes": zipcode,
    "Austin Nightclubs": NightclubGroup,
    "Austin Museum": MuseumGroup,
    "Austin Theatre": TheatreGroup
  }

  L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(myMap);
})
})
})