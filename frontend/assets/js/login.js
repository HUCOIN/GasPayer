$(document).ready(function () {
    $("#loginButton").click(function () {
        var emailVal = $("#email").val();
        var passwordVal = $("#password").val();
        $.post("/account/login", { email: emailVal, password: passwordVal }, function (data, status) {
            if (data.success) {
                location.href = "/dashboard"
            }
        })
    })

    $("#signupButton").click(function () {
        location.href = "/account/signup"
    })
})