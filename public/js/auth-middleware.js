$(function() {
    if(!sessionStorage.getItem('userID') || sessionStorage.getItem('userID') == '') {
        $(location).attr('href', './index.html');
    }

    $('#logout-btn').on('click', function() {
        if(sessionStorage.getItem('userID') && sessionStorage.getItem('userID') != '') {
            sessionStorage.removeItem('userID');
            $(location).attr('href', './index.html');
        }
    });
});
