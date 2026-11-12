/* ========================================================
   FOODIE EXPRESS - JAVASCRIPT
   Beginner-friendly functions for Cart & Search
   ======================================================== */

// When the webpage finishes loading, run these startup functions
document.addEventListener("DOMContentLoaded", function () {
    // 1. Update the cart badge count in the navigation bar
    updateCartBadge();

    // 2. Setup the search bar if it exists on the current page
    setupSearch();

    // 3. Setup login form handler
    setupAuthForms();
});

/* --------------------------------------------------------
   AUTHENTICATION FORMS (Login & Register)
   -------------------------------------------------------- */
function setupAuthForms() {
    // Login form handler
    let loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            let email = document.getElementById("loginEmail").value.trim();
            let password = document.getElementById("loginPassword").value.trim();

            if (!email || !password) {
                alert("Please enter both email and password.");
                return;
            }

            // Save active user in localStorage
            localStorage.setItem("foodieUser", JSON.stringify({ email: email }));
            alert("Login successful! Welcome back to Foodie Express.");
            window.location.href = "index.html";
        });
    }

    // Registration form handler
    let registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            let name = document.getElementById("regName").value.trim();
            let email = document.getElementById("regEmail").value.trim();
            let phone = document.getElementById("regPhone").value.trim();
            let password = document.getElementById("regPassword").value.trim();

            if (!name || !email || !phone || !password) {
                alert("Please fill in all the required fields.");
                return;
            }

            // Save registered user
            localStorage.setItem("foodieUser", JSON.stringify({ name: name, email: email, phone: phone }));
            alert("Account created successfully! Welcome to Foodie Express, " + name + "!");
            window.location.href = "index.html";
        });
    }
}

/* --------------------------------------------------------
   CART HELPER FUNCTIONS (Using localStorage)
   -------------------------------------------------------- */

// Retrieve cart items array from localStorage
function getCart() {
    let cart = localStorage.getItem("foodieCart");
    if (cart) {
        return JSON.parse(cart);
    }
    return []; // Return empty array if no cart exists yet
}

// Save cart items array into localStorage
function saveCart(cart) {
    localStorage.setItem("foodieCart", JSON.stringify(cart));
    updateCartBadge(); // Update the badge number whenever cart changes
}

// Update the badge number shown next to "Cart" in the navbar
function updateCartBadge() {
    let cart = getCart();
    let totalItems = 0;

    // Sum up the quantity of each item in cart
    for (let i = 0; i < cart.length; i++) {
        totalItems += cart[i].quantity;
    }

    // Find all cart badge elements on the page and update their text
    let badges = document.querySelectorAll(".cart-badge");
    badges.forEach(function (badge) {
        badge.innerText = totalItems;
    });
}

// Add an item to the cart (Used by Food Menu page)
function addToCart(foodId, foodName, foodPrice, foodImage) {
    let cart = getCart();

    // Check if this food item is already in the cart
    let existingItem = cart.find(function (item) {
        return item.id === foodId;
    });

    if (existingItem) {
        // If already in cart, just increase quantity by 1
        existingItem.quantity += 1;
    } else {
        // If not in cart, add as a new item with quantity 1
        cart.push({
            id: foodId,
            name: foodName,
            price: parseFloat(foodPrice),
            image: foodImage,
            quantity: 1
        });
    }

    // Save updated cart to localStorage
    saveCart(cart);

    // Show a friendly confirmation message
    alert(foodName + " has been added to your cart!");
}

/* --------------------------------------------------------
   SEARCH FUNCTIONALITY (For Home & Restaurant Pages)
   -------------------------------------------------------- */
function setupSearch() {
    let searchBtn = document.getElementById("searchBtn");
    let searchInput = document.getElementById("searchInput");

    if (searchBtn && searchInput) {
        // Run search when button is clicked
        searchBtn.addEventListener("click", function () {
            filterRestaurants(searchInput.value);
        });

        // Run search as user types
        searchInput.addEventListener("keyup", function (e) {
            filterRestaurants(searchInput.value);
        });
    }
}

// Filters restaurant cards based on typed search query
function filterRestaurants(query) {
    let cards = document.querySelectorAll(".restaurant-card");
    let lowerQuery = query.toLowerCase().trim();

    cards.forEach(function (card) {
        let name = card.querySelector(".restaurant-name").innerText.toLowerCase();
        let category = card.querySelector(".restaurant-category").innerText.toLowerCase();

        // If name or category matches the search term, show card, else hide it
        if (name.includes(lowerQuery) || category.includes(lowerQuery)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

