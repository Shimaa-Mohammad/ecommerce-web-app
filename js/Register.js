
// --- Validation Functions ---
function validateName(name) {
    var regexName = /^[\p{L}][\p{L} .'-]+[\p{L}] [\p{L}][\p{L} .'-]+[\p{L}]$/u

    return regexName.test(name);


}

function validateEmail(email) {
    var regexEmail = /^[a-zA-Z][a-zA-Z0-9._+-]*@gmail\.com$/;
  
    return regexEmail.test(email);
}

function validatePhone(phone) {
    var regexPhone = /^(01)[0125][0-9]{8}$/;
    return regexPhone.test(phone);
}

function validatePassword(password) {
    var regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*\W).{8,}$/;
    return regexPassword.test(password);
}

// live validation
document.getElementById("name").addEventListener("blur", function () {
    if (!validateName(this.value.trim())) {
        this.style.border = "2px solid red"

    }
    else {
        this.style.border = "2px solid green"
        document.getElementById("name-error").style.display = "none"
    }
});
// email
document.getElementById("email").addEventListener("blur", function () {
    if (!validateEmail(this.value.trim())) {
        this.style.border = "2px solid red"
    }
    else {
        this.style.border = "2px solid green"
        document.getElementById("email-error").style.display = "none"

    }
});
// phone
document.getElementById("phone").addEventListener("blur", function () {
    if (!validatePhone(this.value.trim())) {
        this.style.border = "2px solid red"
    }
    else {
        this.style.border = "2px solid green"
        document.getElementById("phone-error").style.display = "none"
    }
});
// password
document.getElementById("password").addEventListener("blur", function () {
    if (!validatePassword(this.value.trim())) {
        this.style.border = "2px solid red"
    }
    else {
        this.style.border = "2px solid green"
        document.getElementById("password-error").style.display = "none"
    }
});


// --- Form Validation ---
function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();

    let valid = true;


    // Name
    if (!validateName(name)) {
        document.getElementById("name-error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("name-error").style.display = "none";
    }

    // Email
    if (!validateEmail(email)) {
        document.getElementById("email-error").style.display = "block";

        valid = false;
    } else {
        document.getElementById("email-error").style.display = "none";
    }

    // Phone
    if (!validatePhone(phone)) {
        document.getElementById("phone-error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("phone-error").style.display = "none";
    }

    // Password
    if (!validatePassword(password)) {
        document.getElementById("password-error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("password-error").style.display = "none";
    }

    return valid;
}

// --- Form Submit Handler ---
document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value.trim();

        const customers =
        {
            name,
            email,
            phone,
            password,
            role: "customer"
        }

        
        let storedCustomers = JSON.parse(localStorage.getItem("customers"));

        if (!Array.isArray(storedCustomers)) {
            storedCustomers = [];
        }
        const existCustomer = storedCustomers.find( item => item.email === email);

        if (existCustomer) {
           document.getElementById("already-regiter").style.transform="translate(-50%, 0)"
        } else {
            storedCustomers.push(customers)
            localStorage.setItem("customers", JSON.stringify(storedCustomers))
            var suceesRegister = document.getElementById("success-regiter")
            suceesRegister.style.transform = "translate(-50%, 0)";
            document.getElementById("already-regiter").style.transform="translate(-50%, -250%)"
            // store data in Local Storage

            function storeData() {
                
                window.location.href = "products.html"
            }
            setTimeout(storeData, 2000)

        }
    }
});
