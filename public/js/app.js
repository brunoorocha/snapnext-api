
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
    
    //var apiURL = "http://localhost:8080";

    // $.ajax({
    //     url: apiURL +"/users/",
    //     success: function(data) {
    //         for (var key in data) {
    //             $('.results').append("<p>"+ JSON.stringify(data[key]) +"</p>");
    //         }
    //     },
    //     error: function(xhr, status) {
    //         console.log("error");
    //     }
    // });
});
