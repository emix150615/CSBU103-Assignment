$(document).ready(function () {

    $("#registerForm").submit(function (e) {

        let email = $("#username").val();
        let password = $("#password").val();
        let confirm = $("#confirm").val();

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;

        let valid = true;

        if (!emailRegex.test(email)) {
            $("#emailError").text("Invalid email format");
            valid = false;
        } else {
            $("#emailError").text("");
        }

        if (!passwordRegex.test(password)) {
            $("#passwordError").text("Min 6 chars, 1 number, 1 special char");
            valid = false;
        } else {
            $("#passwordError").text("");
        }

        if (password !== confirm) {
            $("#confirmError").text("Passwords do not match");
            valid = false;
        } else {
            $("#confirmError").text("");
        }

        if (!valid) e.preventDefault();
    });

});
