$(function() {
    if(!sessionStorage.getItem('userID') || sessionStorage.getItem('userID') == '') {
        $(location).attr('href', './index.html');
    }
});
