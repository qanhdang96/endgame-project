boundaryURL = "https://raw.githubusercontent.com/qanhdang96/endgame-project/master/db/boundaries.geojson"
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

  var myMap = L.map("map", {
    center: [
      30.2672, -97.7431
    ],
    zoom: 11,
    layers: [streetmap,boundary]
  });


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
    "Austin Boundary": boundary,
    "Austin Nightclubs": NightclubGroup,
    "Austin Museum": MuseumGroup,
    "Austin Theatre": TheatreGroup
  }

  L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(myMap);
})
})
})
})

