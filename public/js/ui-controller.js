
$(document).ready(function() {
    var cameraInvoke = document.getElementById('camera-invoke');
    var mapContainer = document.getElementById('map');

    windowW = window.innerWidth;
    windowH = window.innerHeight;

    mapContainer.style.width = windowW + 'px';
    mapContainer.style.height = windowH + 'px';

    $(window).resize(function() {
        windowW = window.innerWidth;
        windowH = window.innerHeight;

        mapContainer.style.width = windowW + 'px';
        mapContainer.style.height = windowH + 'px';
    });
});
