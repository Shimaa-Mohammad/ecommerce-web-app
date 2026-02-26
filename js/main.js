if (!localStorage.getItem("admin")) {

    var admin =
        [
            {
                name: "shimaa",
                email: "shimaa_ahmed123@gmail.com",
                password: "1234absA@#",
                role: "admin"
            },
        ]

    localStorage.setItem("admin", JSON.stringify(admin));
}

export function protectRoute() {
 
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const currentUser = JSON.parse(localStorage.getItem("CurrentUser"));


  if (!isLoggedIn || !currentUser) {
    window.location.href = "login.html";
    return;
  }

}