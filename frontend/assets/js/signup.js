$(document).ready(function () {
    $("#signupButton").click(function () {
        var emailVal = $("#email").val();
        var passwordVal = $("#password").val();
        var passwordVal2 = $("#password2").val();
        if (passwordVal.length >= 6 || passwordVal2.length >= 6) {
            if (passwordVal === passwordVal2) {
                $.post("/account/signup", { email: emailVal, password: passwordVal }, function (data, status) {
                    if (data.success) {
                        location.href = "/dashboard"
                    }
                })
            } else {
                $("#errorMessage").text("Password does not match")
                $("#errorMessageDesc").text("Passwords must be same.")
                $("#errorBox").show();
            }
        }
        else {
            $("#errorMessage").text("Password Length")
            $("#errorMessageDesc").text("Password length must be longer than 6 character.")
            $("#errorBox").show();
        }

    })
    $("#loginButton").click(function () {
        location.href = "/account/login"
    })
})