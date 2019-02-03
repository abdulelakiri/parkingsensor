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
    
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
    });

    //Geolocation things
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
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
    //End of geolocation things

        //Position Marker
        var marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'You are here!'
        });

    function update() {
        const url = "https://hurani.lib.id/parkfind@dev/getAllSpots/";
        $.get(url, function (data, status) {
            for (var i = 0; i < data.length; i++) {
                owner = data[i];
                if (owner[1].taken) {
                    marker = new google.maps.Marker({
                        position: myLocation,
                        map: map
                    })

                    // marker.addListener('click', function() {
                    document.getElementById("name").innerHTML = owner[0];
                    document.getElementById("price").innerHTML = owner[1].rate;
                    document.getElementById("taken").innerHTML = owner[1].taken;

                    // });
                    //addMarker(owner[0], marker);
                } else {
                    document.getElementById("name").innerHTML = owner[0];
                    document.getElementById("price").innerHTML = owner[1].rate;
                    document.getElementById("taken").innerHTML = owner[1].taken;
                    deleteMarker(owner[0]);
                }
            }
        })

    };
    update();
    window.setInterval(update, 3000);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}