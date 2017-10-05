
$(document).ready(function() {

    // var player         = document.getElementById('video');
    // var snapshotCanvas = document.getElementById('snapshot');
    // var captureBtn     = document.getElementById('capture-btn');
    //
    // captureBtn.addEventListener("click", function() {
    //     var context = snapshot.getContext('2d');
    //
    //     context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
    // });
    //
    var localStream = null;

    $('#camera-close-btn').on("click", function(evt) {
        evt.preventDefault();

        video.pause();
        video.srcObject = null;
        localStream.getTracks()[0].stop();
        $('.mask').removeClass('maskFlexbox');
    });

    $('#camera-invoke').on("click", function() {

        $('.mask').addClass('maskFlexbox');

        var constraints = {
            video: {
                width: {
                    min: 640,
                    max: 720
                },
                height: {
                    min: 360,
                    max: 1280
                }
            }
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(mediaStream) {

                var video        = document.getElementById('video');
                var videoCanvas  = document.getElementById('video-canvas');
                var cntxt        = videoCanvas.getContext('2d');
                var w            = $('#video').width();
                var h            = $('#video').height();

                localStream = video.srcObject = mediaStream;

                video.onloadedmetadata = function(e) {
                    video.play();
                    //console.log("width: "+ w +" | height: "+ h);
                };

                $('#camera-capture-btn').on('click', function(e) {
                    e.preventDefault();
                    console.log("capture");
                });
            })
            .catch(function(err) { console.log(err.name + ": " + err.message); });
    });

    // APP KEY: AIzaSyCqzLefuOPjzqilZRRZDILvSF8QgJ_r1jc
});
