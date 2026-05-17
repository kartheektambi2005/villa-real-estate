let form = document.getElementById("loginForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");

    emailError.innerText = "";
    passwordError.innerText = "";

    let isValid = true;

    // Email Validation
    if(email === ""){
        emailError.innerText = "Email is required";
        isValid = false;
    }

    // Password Validation
    if(password === ""){
        passwordError.innerText = "Password is required";
        isValid = false;
    }
    else if(password.length < 6){
        passwordError.innerText = "Password must be at least 6 characters";
        isValid = false;
    }

    // Success
    if(isValid){

        // Redirect to homepage
        window.location.href = "index.html";
    }

});