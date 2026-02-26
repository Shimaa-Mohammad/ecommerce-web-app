// // Route Protection

import { protectRoute } from './main.js';
protectRoute()

// ===================== get products from JSON =====================

async function getProducts() {
    try {
        var response = await fetch("js/productsData.json");
        var data = await response.json();
        var productContainer = document.getElementById("container-products");

        if (!productContainer) return;

        data.products.forEach((product, index) => {
            var productData = document.createElement("div");
            productData.classList.add("products");

            productData.innerHTML = `
                <img class="image" src="${product.image}">
                <p>${product.title}</p>
                <div class="price">Price: ${product.price}</div>
            `;

            var orderButton = document.createElement("button");
            orderButton.innerHTML = "Add to cart";
            orderButton.classList.add("shopping-button");

            productData.appendChild(orderButton);
            productContainer.appendChild(productData);

            orderButton.addEventListener("click", function () {
                addToCart({
                    id: index,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                });

                const success = document.getElementById("success-order");
                if (success) {
                    success.style.display = "block";
                    setTimeout(() => {
                        success.style.display = "none";
                    }, 1000);
                }

                displayOrders();
            });
        });
    } catch (err) {
        console.error("failed", err);
    }
}

getProducts();

// ===================== USER =====================

const currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
if (!currentUser) {
    window.location.href = "login.html";
}
const userKey = `cart_${currentUser.email}`;

// ===================== STORAGE HELPERS =====================

function getOrders() {
    return JSON.parse(localStorage.getItem(userKey)) || [];
}

function saveOrders(orders) {
    localStorage.setItem(userKey, JSON.stringify(orders));
}

// ===================== UPDATE COUNT =====================

function updateCount() {
    if (!currentUser) return;
    const reservedOrder =getOrders();

    const shoppingCart = document.querySelector(".cart-number");
    if (!shoppingCart) return;

    const totalQuantity = reservedOrder.reduce( (sum, item) => sum + item.quantity, 0 );

    shoppingCart.textContent = totalQuantity;
}

// ===================== ADD TO CART =====================

function addToCart(product) {
    const orders = getOrders();
    const existingItem = orders.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        product.quantity = 1;
        orders.push(product);
    }

    saveOrders(orders);
    updateCount();
}

// ===================== PRICE =====================

function calculateTotalPrice(orders) {
    return orders.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
}

function updateTotalPrice() {
    const orders = getOrders();
    const totalPrice = calculateTotalPrice(orders);

    const priceEl = document.querySelector(".total-price span");
    if (priceEl) {
        priceEl.textContent = `$${totalPrice}`;
    }
}

// ===================== TABLE =====================

function createOrderRow(item, index) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td><img src="${item.image}" alt=""></td>
        <td class="order-title">${item.title}</td>
        <td>
            <i class="fa-solid fa-cart-arrow-down decrease" data-index="${index}"></i>
            <span>${item.quantity}</span>
            <i class="fa-solid fa-cart-plus increase" data-index="${index}"></i>
        </td>
        <td class="price">$${item.price}</td>
        <td>
            <button class="remove-order" data-index="${index}">Cancel</button>
        </td>
    `;

    return row;
}

var container = document.getElementById("table-body");

function displayOrders() {
    if (!container) return;

    const orders = getOrders();
    container.innerHTML = "";

    if (orders.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="5">
                    <p>No reserved Orders</p>
                    <i class="fa-regular fa-face-smile"></i>
                </td>
            </tr>
        `;
        return;
    }

    orders.forEach((item, index) => {
        container.appendChild(createOrderRow(item, index));
    });
}

// ===================== EVENT DELEGATION =====================

if (container) {
    container.addEventListener("click", (e) => {
        const orders = getOrders();
        const index = e.target.dataset.index;

        if (index === undefined) return;

        if (e.target.classList.contains("increase")) {
            orders[index].quantity++;
        }

        if (e.target.classList.contains("decrease")) {
            if (orders[index].quantity > 1) {
                orders[index].quantity--;
            } else {
                orders.splice(index, 1);
            }
        }

        if (e.target.classList.contains("remove-order")) {
            orders.splice(index, 1);
        }

        saveOrders(orders);
        updateUI();
    });
}

// ===================== UI =====================

function updateUI() {
    updateCount();
    displayOrders();
    updateTotalPrice();
}


// ===================== INIT =====================


updateUI();
