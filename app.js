let markers = {};
let map;
let trueTotalTime = 0;
let flag = false;

function setMapOnAll(map) {
    for (let username in markers) {
        markers[username].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function showMarkers() {
    setMapOnAll(map);
}

function addMarker(username, marker) {
    markers[username] = marker;
}

function deleteMarker(username) {
    clearMarkers();
    delete markers[username];
    showMarkers();
}

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        //gets rid of unecessary labels
          styles: [
            {
              "featureType": "all",
              "elementType": "labels",
              "stylers": [
                { "visibility": "off" }
              ]
            }, {
              "featureType": "road",
              "elementType": "labels",
              "stylers": [
                { "visibility": "on" }
              ]
            }
          ]
            
    });

    var pos;
    // Try HTML5 geolocation.
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
             pos = {
                 lat: position.coords.latitude,
                 lng: position.coords.longitude
             };

           map.setCenter(pos);

             //Position Marker
             var image = 'imgs/hereicon.png';
             let currentMarker = new google.maps.Marker({
              position: pos,
              map: map,
              icon: image
             });

         });
     } else {
         // Browser doesn't support Geolocation
         handleLocationError(false, infoWindow, map.getCenter());
     }
     
     //Parking icon image
     var parkImage = 'imgs/parkicon.png';
    
    // map.setCenter(markerLocation);

    function update() {
        $.get("https://hurani.lib.id/parkfind@dev/getAllSpots/", function (data, status) {
            for (var i = 0; i < data.length; i++) {
                let owner = data[i];
                let username = owner[0];
                if (!owner[1].taken && !(username in markers)) {
                    let markerLocation = {lat: parseFloat(owner[1].location[0]), lng: parseFloat(owner[1].location[1])};
                    let marker = new google.maps.Marker({
                        position: markerLocation,
                        map: map, 
                        icon: parkImage
                    })
                    marker.addListener("click",function(){
                        $("#spotInfo").show();
                        document.getElementById("name").innerHTML = username;
                        document.getElementById("price").innerHTML = owner[1].rate;
                        document.getElementById("taken").innerHTML = !owner[1].taken;
                    });
                    
                    htmlUsername= document.getElementById("name").innerHTML;
                    if (username == htmlUsername) {
                      document.getElementById("taken").innerHTML = "true";
                    }

                    addMarker(username, marker);
                } else if (owner[1].taken && username in markers) {
                    htmlUsername= document.getElementById("name").innerHTML;
                    if (username == htmlUsername) {
                      document.getElementById("taken").innerHTML = "unavailable";
                    }
                    
                    deleteMarker(username);
                }
            }
            flag = true;

        })

    };
    update();
    window.setInterval(update, 1000);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function formSubmit() {
    let username = document.getElementById("usernameInput");
    let address = document.getElementById("addressInput");
    let rate = document.getElementById("rateInput");
    fetch(`https://hurani.lib.id/parkfind@dev/signUpHost/username=${username}&address=${address}&rate=${rate}`)
}