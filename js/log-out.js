const userIcon = document.getElementById("user");
const tooltip = document.getElementById("tooltipLogout");
const logoutBtn = document.getElementById("logout-btn");


userIcon.addEventListener("mouseenter", function (e) {
    e.stopPropagation();
    tooltip.style.display =
        tooltip.style.display === "block" ? "none" : "block";
});


document.addEventListener("click", function () {
    tooltip.style.display = "none";
});


logoutBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    logOut()
});

function logOut() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}
