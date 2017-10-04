
$(document).ready(function() {

    var player = document.getElementById('video');
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
    var handleSuccess = function(stream) {
         player.srcObject = stream;
    }

    $('#camera-close-btn').on("click", function(evt) {
        evt.preventDefault();

        $('.mask').removeClass('maskFlexbox');
    });

    $('#camera-invoke').on("click", function() {

        $('.mask').addClass('maskFlexbox');

        navigator.getUserMedia({ video: true },
            // Success Callback
            function(stream){
                // Create an object URL for the video stream and
                // set it as src of our HTLM video element.
                video.src = window.URL.createObjectURL(stream);
                // Play the video element to show the stream to the user.
                video.play();
            },
            // Error Callback
            function(err){
                // Most common errors are PermissionDenied and DevicesNotFound.
                console.error(err);
            }
        );
    });

    // APP KEY: AIzaSyCqzLefuOPjzqilZRRZDILvSF8QgJ_r1jc

});
