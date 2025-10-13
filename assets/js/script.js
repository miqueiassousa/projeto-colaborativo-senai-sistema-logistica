function forgotPassword() {
    alert("Usuário: admin\nSenha: password");
}

function login() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    if (username === "admin" && password === "password") {
        window.location.href = "mainPage.html"; // Redirect to dashboard or another page
    } else {
        alert("Usuário ou senha incorretos. Tente novamente!");
    }
}