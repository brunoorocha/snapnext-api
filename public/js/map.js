
function initMap() {
    window.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 18,
        styles: mapStyle,
        disableDefaultUI: true
    });

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

    load_markers(map);
}

function load_markers(map) {

    var snapnextApiUrl = "https://pacific-taiga-97807.herokuapp.com";
    // var snapnextApiUrl = "http://localhost:8080";
    
    var cmarker = {
        url: "./images/icons/map_marker.png",
        anchor: new google.maps.Point(41, 41)
    }

    $.get(snapnextApiUrl + "/snaps/markers/", function(snaps) {
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

            marker.addListener('click', function() {
                $.get(snapnextApiUrl + "/snaps/"+ snap._id, function(snapdata) {
                    $('#snap-view').addClass('maskFlexbox');

                    $('#snap-img').attr('src', snapdata.imageURL);
                });
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
