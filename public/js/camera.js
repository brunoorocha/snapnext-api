
$(document).ready(function() {

    var video        = document.getElementById('video');
    var videoCanvas  = document.getElementById('video-canvas');
    var context      = videoCanvas.getContext('2d');
    var localStream  = null;
    var w;
    var h;

    $('#video').css('height', $(window).height() - 20 + "px");
    $('#photo-preview').css('height', $(window).height() - 20 + "px");

    $('#camera-close-btn').on("click", function(evt) {
        evt.preventDefault();
        closeCamera();
    });

    $('#camera-close-btn2').on("click", function(evt) {
        evt.preventDefault();
        closeCamera();
    });

    $('.voltar-btn').on("click", function(evt) {
        evt.preventDefault();

        $('.slider').css('margin-left', '0');
        context.clearRect(0, 0, w, h);
    });

    $('#camera-invoke').on("click", function() {

        $('#camera-mask').addClass('maskFlexbox');

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

    var snapnextApiUrl = "https://pacific-taiga-97807.herokuapp.com";
    //var snapnextApiUrl = "http://localhost:8080";

    $('#publicar-btn').on("click", function() {
        var imagePNG = videoCanvas.toDataURL('image/png', 1.0);
        var userID = sessionStorage.getItem("userID");
        var userPos = JSON.parse(sessionStorage.getItem("userPos"));

        var dataSerialized = {
            image: imagePNG,
            lat: userPos.lat,
            lng: userPos.lng,
            subtitle: '',
            userId: userID
        }

        $('#publicando-notify').addClass('notification-show');
        closeCamera();

        $.post(snapnextApiUrl + "/snaps/", dataSerialized, function(res) {
            load_markers(window.map);
        }, "json")
            .done(function(err) {
                $('#publicando-notify').removeClass('notification-show');
            })
            .fail(function(err) {

            });
    });

    function closeCamera() {

        video.pause();
        video.srcObject = null;
        localStream.getTracks()[0].stop();

        context.clearRect(0, 0, w, h);
        $('#camera-mask').removeClass('maskFlexbox');
        $('.slider').css('margin-left', '0');
    }
    // APP KEY: AIzaSyCqzLefuOPjzqilZRRZDILvSF8QgJ_r1jc
});
