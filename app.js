var markers = {};
var map;

function setMapOnAll(map) {
  for (var username in markers) {
    console.log(username)
    markers[username].setMap(map);
  }
}
function clearMarkers() {
  setMapOnAll(null);
}

function showMarkers() {
  setMapOnAll(map)
}
function addMarker(username, marker) {
  markers[username] = marker;
}

function deleteMarker(username) {
  clearMarkers();
  delete markers[username]
  showMarkers();
}
function initMap() {
    var myLocation = {lat: 44.227071, lng: -76.493316};
    var location2 = {lat: 44.227563, lng: -76.497704};
  
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: myLocation
    });

    //Geolocation things
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

        map.setCenter(pos);
    });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);

    //End of geolocation things
  
    function update() {
      
      const url = "https://hurani.lib.id/parkfind@dev/getAllSpots/";
      $.get(url, function(data, status){
          for (var i = 0; i < data.length; i++) {
              owner = data[i];
              if (owner[1].taken){
                marker = new google.maps.Marker({
                    position: myLocation,
                    map: map
                })
    
                // marker.addListener('click', function() {
                    document.getElementById("name").innerHTML=owner[0];
                    document.getElementById("price").innerHTML=owner[1].rate;
                    document.getElementById("taken").innerHTML=owner[1].taken;
                      }
                // });
                addMarker(owner[0], marker);
              }
              else {
                    document.getElementById("name").innerHTML=owner[0];
                    document.getElementById("price").innerHTML=owner[1].rate;
                    document.getElementById("taken").innerHTML=owner[1].taken;
                deleteMarker(owner[0]);
              }
          }
      })  

    };
    update();
    window.setInterval(update, 3000);

    
  }