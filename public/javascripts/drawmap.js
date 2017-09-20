function initMap() {
  var myLatLng = {lat: productLocation.lat, lng: productLocation.lon};


  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}
initMap();
