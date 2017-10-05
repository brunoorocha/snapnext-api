
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
    var video        = document.getElementById('video');
    var videoCanvas  = document.getElementById('video-canvas');
    var context      = videoCanvas.getContext('2d');
    var localStream  = null;
    var w;
    var h;

    $('#video').css('height', $(window).height() - 20 + "px");
    $('#photo-preview').css('height', $(window).height() - 20 + "px");

    $('.close-btn').on("click", function(evt) {
        evt.preventDefault();

        video.pause();
        video.srcObject = null;
        localStream.getTracks()[0].stop();

        context.clearRect(0, 0, w, h);
        $('.mask').removeClass('maskFlexbox');
        $('.slider').css('margin-left', '0');
    });

    $('.voltar-btn').on("click", function(evt) {
        evt.preventDefault();

        $('.slider').css('margin-left', '0');
        context.clearRect(0, 0, w, h);
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

                localStream = video.srcObject = mediaStream;

                video.onloadedmetadata = function(e) {
                    video.play();

                    w = this.videoWidth;
                    h = this.videoHeight;

                    videoCanvas.setAttribute('width', w);
                    videoCanvas.setAttribute('height', h);

                    context.translate(w, 0);
                    context.scale(-1, 1);
                };

                $('#camera-capture-btn').on('click', function(e) {
                    e.preventDefault();

                    context.drawImage(video, 0, 0, w, h);
                    $('.slider').css('margin-left', '-100%');
                });
            })
            .catch(function(err) { console.log(err.name + ": " + err.message); });
    });

    // APP KEY: AIzaSyCqzLefuOPjzqilZRRZDILvSF8QgJ_r1jc
});
