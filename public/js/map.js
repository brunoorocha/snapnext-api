
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

    var markers = [];

    var cmarker = {
        url: "./images/icons/map_marker.png",
        anchor: new google.maps.Point(41, 41)
    }

    $.get(snapnextApiUrl + "/snaps/markers/", function(snaps) {

        var locations = [];

        snaps.forEach(function(snap) {
            var coord = {
                 lat: snap.lat,
                 lng: snap.lng
            }

            locations.push(coord);

            var marker = new google.maps.Marker({
                position: coord,
                map: map,
                icon: cmarker,
                title: snap._id
            });

            marker.addListener('click', function() {
                $.get(snapnextApiUrl + "/snaps/"+ snap._id, function(snapdata) {
                    $('#snap-view').addClass('maskFlexbox');

                    var dateNow         = new Date().getTime();
                    var createdAtms     = new Date(snapdata.createdAt).getTime();
                    var dateDiff        = dateNow - createdAtms;

                    dateDiff = dateDiff / 1000;
                    dateDiff = dateDiff / 60;
                    var dateDiffInMins = Math.floor(dateDiff % 60);

                    dateDiff = dateDiff / 60;
                    var dateDiffInHours = Math.floor(dateDiff % 24);

                    if(dateDiffInHours > 0) {
                        $('.snap-time').html("há "+ dateDiffInHours + "h");
                    } else {
                        $('.snap-time').html("há "+ dateDiffInMins + "min");
                    }

                    $.get(snapnextApiUrl + "/users/"+ snapdata.userId, function(user) {
                        $('.snap-user').html(user[0].username);
                    });

                    $('#snap-img').attr('src', snapdata.imageURL);
                });
            });

            markers.push(marker);

        });

        var mcOptions = {
            maxZoom: 19,
            imagePath: "./images/icons/"
        }
        var markerCluster = new MarkerClusterer(map, markers, mcOptions);

    });


}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
}
