mapURL = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/austin.geojson"
boundaryURL = "https://raw.githubusercontent.com/qanhdang96/endgame-project/master/db/boundaries.geojson"
zipcodesURL = "https://raw.githubusercontent.com/qanhdang96/endgame-project/master/db/zip-codes.geojson"
NightclubURL = "https://raw.githubusercontent.com/qanhdang96/endgame-project/master/db/pub_point.geojson"
museumURL = "https://raw.githubusercontent.com/qanhdang96/endgame-project/master/db/museum_point.geojson"
theatreURL = "https://raw.githubusercontent.com/qanhdang96/endgame-project/master/db/theatres.geojson"

var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?" +
    "access_token=pk.eyJ1IjoicWFuaGRhbmc5NiIsImEiOiJjanZvaG5kdXcxeXk0NDN1aW85eXpqa3NnIn0.PdZBCbzVJ9iM-Au8hD_jsg",
    {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.streets"});

var baseMaps = {
  "Street Map": streetmap,
};

d3.json(boundaryURL, function(boundaryData) {
  var boundary = L.geoJSON(boundaryData, {
        onEachFeature: function (feature, layer) {
          var marker1 = layer.bindPopup('<h1>Austin, TX </h1><h3>Mayor: Steve Adler </h3><h3>Population: 950,715</h3><h3>Area: '+feature.properties.shape_area+' Square Miles</h3>');
    marker1.on('click', function (event) {
  this.openPopup();
});
  }
})
d3.json(mapURL, function(mapData) {
  var map = L.geoJSON(mapData, {
        style: function(feature){
          return {color: "red"};
        },
        onEachFeature: function (feature, layer) {
    var marker2 = layer.bindPopup('<h1>Austin, TX </h1><h3>Name: '+feature.properties.name+'</h3>');
    marker2.on('click', function (event) {
  this.openPopup();
});
  }
})

  var myMap = L.map("map", {
    center: [
      30.2672, -97.7431
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
    var marker3 = layer.bindPopup('<h3>'+feature.properties.zipcode+'</h3><h4>'+feature.properties.name+'</h4>');
    marker3.on('mouseover', function (event) {
  this.openPopup();
  layer = event.target
  layer.setStyle({
    fillOpacity: 0.8
  })
});
marker3.on('mouseout', function (event) {
  this.closePopup();
  layer = event.target
  layer.setStyle({
    fillOpacity: 0.2
  })
});
        marker3.on('click', function(event) {
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
   layer.bindPopup('<h3>'+feature.properties.name+'</h3><h4>'+feature.properties.addr+'</h4><h4>License Type: '+feature.properties.amenity+'</h4>');
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
   layer.bindPopup('<h3>'+feature.properties.name+'</h3><h4>'+feature.properties.addr+'</h4><h4>License Type: '+feature.properties.tourism+'</h4>');
     }
    })  
  var MuseumGroup = L.markerClusterGroup();
  MuseumGroup.addLayer(museums)


d3.json(theatreURL, function(theatreData) {
  var theatres = L.geoJSON(theatreData, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {icon: theatreIcon})
    },
    onEachFeature: function (feature, layer) {
   layer.bindPopup('<h3>'+feature.properties.name+'</h3><h4>'+feature.properties.addr+'</h4><h4>License Type: '+feature.properties.amenity+'</h4>');
     }
    })  
  var TheatreGroup = L.markerClusterGroup();
  TheatreGroup.addLayer(theatres)

  var overlayMaps = {
    "Austin Map": map,
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
})
})
