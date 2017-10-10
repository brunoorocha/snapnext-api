
$(document).ready(function() {
    var snapnextApiUrl = "https://pacific-taiga-97807.herokuapp.com";

    $("#login-form").submit(function(evt) {
        evt.preventDefault();

        var usernameField = $('#username');
        var passwordField = $('#password');

        var dataSerialized = {
            username: usernameField.val(),
            password: passwordField.val()
        }

        $("#entrar-btn").focus().addClass('loading');
        $("#entrar-btn").attr('disabled');
        $("#entrar-btn").attr('value', 'autenticando...');

        $.post(snapnextApiUrl + "/users/auth", dataSerialized, function(res) {
            sessionStorage.setItem('userID', res._id);
            $(location).attr('href', './map.html');
        }, "json")
            .fail(function(err) {

                $("#entrar-btn").removeClass('loading').removeAttr('disabled').attr('value', 'entrar');

                if(err.status == 401) {
                    var errResponse = err.responseJSON;

                    if(errResponse.msg == "Authentication failed! User not found.") {
                        $('#username-input').addClass('error-field');
                    }

                    if(errResponse.msg == "Authentication failed! Wrong password.") {
                        $('#password-input').addClass('error-field');
                    }

                    usernameField.focus(function() {
                        $('#username-input').removeClass('error-field');
                    });

                    passwordField.focus(function() {
                        $('#password-input').removeClass('error-field');
                    });
                }
            });

    });


    $("#signup-form").submit(function(evt) {
        evt.preventDefault();

        var usernameField = $('#new-username');
        var passwordField = $('#new-password');
        var passwordConfirmField = $('#new-password-confirm');

        if(passwordField.val() != passwordConfirmField.val()) {
            $('#password-confirm-input').addClass("error-field");
            return;
        }

        if(usernameField.val() == '') {
            $('#username-input').addClass("error-field");
            return;
        }

        if(passwordField.val() == '') {
            $('#password-input').addClass("error-field");
            return;
        }

        var dataSerialized = {
            username: usernameField.val(),
            password: passwordField.val()
        }

        $("#entrar-btn").focus().addClass('loading');
        $("#entrar-btn").attr('disabled');
        $("#entrar-btn").attr('value', 'verificando...');

        $.post(snapnextApiUrl + "/users/", dataSerialized, function(res) {
            sessionStorage.setItem('userID', res._id);
            $(location).attr('href', './map.html');
        }, "json")
            .fail(function(err) {

            });
    });

    $('#new-password-confirm').focus(function() {
        $('#password-confirm-input').removeClass('error-field');
    });

    $('#new-username').focus(function() {
        $('#username-input').removeClass('error-field');
    });

    $('#new-password').focus(function() {
        $('#password-input').removeClass('error-field');
    });

    $('#config-btn').on("click", function() {
        $('.config-modal').toggleClass('config-modal-actived');
    });

    var userID = sessionStorage.getItem('userID');
    $.get(snapnextApiUrl + "/users/" + userID, function(user) {
        $('.config-modal-username').html(user[0].username);
    });

    $('#snap-view-close-btn').on('click', function(evt) {
        evt.preventDefault();

        $('#snap-view').removeClass('maskFlexbox');
    });
});
