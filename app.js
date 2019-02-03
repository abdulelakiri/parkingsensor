function initMap() {
    //get coordinates
    var myLocation = {lat: 44.227071, lng: -76.493316};
    var location2 = {lat: 44.227563, lng: -76.497704};
  
    //get map
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: myLocation
    });
    
    //geolocation stuff
    /*
    var infoWindow = new google.maps.InfoWindow;
     // Try HTML5 geolocatio n.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
  
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
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
  */
  
    //get markers
    const url = "https://hurani.lib.id/parkfind@dev/getAllSpots/";
    $.get(url, function(data, status){
        var markers = [];
        for (var i = 0; i < data.length; i++) {
            owner = data[i];
            marker = new google.maps.Marker({
                position: myLocation,
                map: map
            })

            marker.addListener('click', function() {
                document.getElementById("name").innerHTML=owner[0];
                document.getElementById("price").innerHTML=owner[1].rate;
                document.getElementById("taken").innerHTML=owner[1].taken;
            });

            markers.push(marker);
        }
    })  
  }