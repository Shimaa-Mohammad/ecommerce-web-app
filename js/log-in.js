
// --- check for user  ---
function checkUser(role, email, password) {
    let users = JSON.parse(localStorage.getItem(role)) || [];
    let existUser = users.find(item => item.email === email && item.password === password );

    if (existUser) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("CurrentUser", JSON.stringify(existUser));
        return existUser.role;
    }

    return null;
}

// --- Login submit handler ---
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();
    var errorSpan = document.getElementById("login-error");

    var adminRole = checkUser("admin", email, password);   //admin
    var customerRole = checkUser("customers", email, password);    //customer

    if (adminRole === "admin") {

        errorSpan.style.display = "none";
        window.location.href = "admin.html";
    }
    else if (customerRole === "customer") {
        errorSpan.style.display = "none";
        window.location.href = "products.html";
    }
    else {

        errorSpan.textContent = "Invalid Email or Password";
        errorSpan.style.display = "block";
    }
});






