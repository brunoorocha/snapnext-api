
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 18,
        styles: mapStyle,
        disableDefaultUI: true
    });

    var cmarker = {
        url: "./images/icons/map_marker.png",
        anchor: new google.maps.Point(41, 41)
    }

    //var infoWindow = new google.maps.InfoWindow({map: map});

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            sessionStorage.setItem('userPos', JSON.stringify(pos));
            //infoWindow.setPosition(pos);
            map.setCenter(pos);
        },

        function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }

    var snapnextApiUrl = "https://pacific-taiga-97807.herokuapp.com";

    $.get(snapnextApiUrl + "/snaps/markers/", function(snaps) {
        console.log(snaps);

        snaps.forEach(function(snap) {
            var coord = {
                 lat: snap.lat,
                 lng: snap.lng
            }

            var marker = new google.maps.Marker({
                position: coord,
                map: map,
                icon: cmarker,
                title: snap._id
            });
        });
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
}
