
//Map Things
function initMap() {
    //get coordinates
    var myLocation = {lat: 44.227071, lng: -76.493316};
    var location2 = {lat: 44.227563, lng: -76.497704};
  
    //get map
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: myLocation
    });
    
    //get markers
    var marker1 = new google.maps.Marker({
      position: myLocation,
      map: map,
      title: 'Parking Spot',
      rate: 3, 
      owner: 'Karim', 
      available: true
      
    });
    var marker2 = new google.maps.Marker({
      position: {lat: 44.227563, lng: -76.497704},
      map: map,
      title: 'Parking Spot', 
      rate: 2, 
      owner: 'Adam', 
      available: true
    });
    
    marker1.addListener('click', function() {
      document.getElementById("content").innerHTML="hello world1"; 
    });
    marker2.addListener('click', function() {
      document.getElementById("content").innerHTML="hello world2"; 
    });
    
  }

