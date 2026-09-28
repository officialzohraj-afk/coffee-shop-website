const PICKS = [
  {
    id: "iced-caramel",
    name: "Iced Caramel Latte",
    desc: "Espresso, cold milk, caramel drizzle",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    desc: "Equal parts espresso, steamed milk, foam",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "mocha",
    name: "Mocha",
    desc: "Espresso, dark chocolate, steamed milk",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "espresso",
    name: "Espresso",
    desc: "A short, concentrated double shot",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "vanilla-latte",
    name: "Vanilla Latte",
    desc: "Smooth espresso, steamed milk, vanilla",
    price: 5.49,
    image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "spanish-latte",
    name: "Spanish Latte",
    desc: "Rich espresso, milk and condensed milk",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1534687941688-651ccaafbff8?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    desc: "Slow-steeped coffee served chilled",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "chocolate-frappe",
    name: "Chocolate Frappe",
    desc: "Blended coffee, chocolate and creamy milk",
    price: 6.49,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80"
  }
];

let cart = [];

const $ = (selector) => document.querySelector(selector);


// ==================== TOAST ====================

function toast(message) {
  const container = $("#toast-container");

  if (!container) return;

  const messageBox = document.createElement("div");

  messageBox.className = "toast";
  messageBox.textContent = message;

  container.appendChild(messageBox);

  setTimeout(() => {
    messageBox.classList.add("show");
  }, 50);

  setTimeout(() => {
    messageBox.classList.remove("show");

    setTimeout(() => {
      messageBox.remove();
    }, 300);

  }, 2000);
}


// ==================== SHOW PRODUCTS ====================

function renderProducts() {

  const grid = $("#pick-grid");

  if (!grid) return;

  grid.innerHTML = PICKS.map((item) => {

    return `
      <article class="pick-card">

        <div class="pick-img">
          <img 
            src="${item.image}" 
            alt="${item.name}"
          >
        </div>

        <h3 class="pick-name">
          ${item.name}
        </h3>

        <p class="pick-desc">
          ${item.desc}
        </p>

        <div class="pick-footer">

          <span class="pick-price">
            $${item.price.toFixed(2)}
          </span>

          <div class="pick-actions">

            <button 
              class="icon-btn"
              data-like="${item.id}"
              type="button"
            >
              ♡
            </button>

            <button 
              class="add-btn"
              data-add="${item.id}"
              type="button"
            >
              Add to Cart
            </button>

          </div>

        </div>

      </article>
    `;

  }).join("");
}


// ==================== ADD TO CART ====================

function addToCart(id) {

  const product = PICKS.find((item) => item.id === id);

  if (!product) return;

  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {

    existingItem.quantity++;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }

  updateCart();

  toast(product.name + " added to cart");
}


// ==================== UPDATE CART COUNT ====================

function updateCart() {

  const cartCount = $("#cart-count");

  if (!cartCount) return;

  let totalItems = 0;

  cart.forEach((item) => {
    totalItems += item.quantity;
  });

  cartCount.textContent = totalItems;

  showCartItems();
}


// ==================== SHOW CART ITEMS ====================

function showCartItems() {

  const cartItems = $("#cart-items");
  const cartTotal = $("#cart-total");

  if (!cartItems || !cartTotal) return;


  // EMPTY CART

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        Your cart is empty.
      </div>
    `;

    cartTotal.textContent = "$0.00";

    return;
  }


  // CART ITEMS

  cartItems.innerHTML = cart.map((item) => {

    return `
      <div class="cart-item">

        <div>

          <div class="cart-item-name">
            ${item.name}
          </div>

          <div class="cart-item-price">
            $${(item.price * item.quantity).toFixed(2)}
          </div>

          <div class="cart-controls">

            <button
              class="qty-btn"
              data-minus="${item.id}"
              type="button"
            >
              −
            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              class="qty-btn"
              data-plus="${item.id}"
              type="button"
            >
              +
            </button>

            <button
              class="remove-btn"
              data-remove="${item.id}"
              type="button"
            >
              Remove
            </button>

          </div>

        </div>

      </div>
    `;

  }).join("");


  // TOTAL

  let total = 0;

  cart.forEach((item) => {

    total += item.price * item.quantity;

  });

  cartTotal.textContent = "$" + total.toFixed(2);
}


// ==================== OPEN CART ====================

function openCart() {

  const cartOverlay = $("#cart-overlay");

  if (!cartOverlay) {
    alert("Cart HTML is missing. Please add the cart section in HTML.");
    return;
  }

  cartOverlay.classList.add("open");

  cartOverlay.setAttribute("aria-hidden", "false");

  showCartItems();
}


// ==================== CLOSE CART ====================

function closeCart() {

  const cartOverlay = $("#cart-overlay");

  if (!cartOverlay) return;

  cartOverlay.classList.remove("open");

  cartOverlay.setAttribute("aria-hidden", "true");
}


// ==================== CHANGE QUANTITY ====================

function changeQuantity(id, amount) {

  const item = cart.find((product) => product.id === id);

  if (!item) return;

  item.quantity += amount;


  // Remove item if quantity becomes 0

  if (item.quantity <= 0) {

    cart = cart.filter((product) => product.id !== id);

  }

  updateCart();
}


// ==================== REMOVE ITEM ====================

function removeItem(id) {

  cart = cart.filter((item) => item.id !== id);

  updateCart();

  toast("Item removed from cart");
}


// ==================== CONFIRM ORDER ====================

function confirmOrder(event) {

  event.preventDefault();

  if (cart.length === 0) {

    toast("Please add an item to your cart first.");

    return;
  }


  const name = $("#customer-name").value.trim();

  const address = $("#customer-address").value.trim();


  if (name === "" || address === "") {

    toast("Please enter your name and address.");

    return;
  }


  $("#success-message").textContent =
    "Thank you, " + name + "! Your order has been placed.";


  $("#order-form").style.display = "none";

  $("#order-success").classList.add("show");


  // Empty cart after successful order

  cart = [];

  updateCart();
}


// ==================== WHEN PAGE LOADS ====================

document.addEventListener("DOMContentLoaded", function () {

  renderProducts();

  updateCart();


  // ADD TO CART + LIKE BUTTON

  const productGrid = $("#pick-grid");

  if (productGrid) {

    productGrid.addEventListener("click", function (event) {

      const addButton = event.target.closest("[data-add]");

      if (addButton) {

        addToCart(addButton.dataset.add);

        return;
      }


      const likeButton = event.target.closest("[data-like]");

      if (likeButton) {

        likeButton.classList.toggle("liked");

        if (likeButton.classList.contains("liked")) {

          likeButton.textContent = "♥";

        } else {

          likeButton.textContent = "♡";

        }

      }

    });

  }


  // CART BUTTON

  const cartButton = $("#cart-button");

  if (cartButton) {

    cartButton.addEventListener("click", openCart);

  }


  // CLOSE CART

  const closeButton = $("#cart-close");

  if (closeButton) {

    closeButton.addEventListener("click", closeCart);

  }


  // CART OVERLAY

  const cartOverlay = $("#cart-overlay");

  if (cartOverlay) {

    cartOverlay.addEventListener("click", function (event) {


      // Close when clicking outside modal

      if (event.target.id === "cart-overlay") {

        closeCart();

      }


      // PLUS

      const plusButton =
        event.target.closest("[data-plus]");

      if (plusButton) {

        changeQuantity(
          plusButton.dataset.plus,
          1
        );

      }


      // MINUS

      const minusButton =
        event.target.closest("[data-minus]");

      if (minusButton) {

        changeQuantity(
          minusButton.dataset.minus,
          -1
        );

      }


      // REMOVE

      const removeButton =
        event.target.closest("[data-remove]");

      if (removeButton) {

        removeItem(removeButton.dataset.remove);

      }

    });

  }


  // CONFIRM ORDER

  const orderForm = $("#order-form");

  if (orderForm) {

    orderForm.addEventListener(
      "submit",
      confirmOrder
    );

  }


  // CONTINUE SHOPPING

  const continueButton =
    $("#continue-shopping");

  if (continueButton) {

    continueButton.addEventListener(
      "click",
      function () {

        $("#order-success").classList.remove("show");

        $("#order-form").style.display = "flex";

        $("#order-form").reset();

        closeCart();

        const picks = $("#picks");

        if (picks) {

          picks.scrollIntoView({
            behavior: "smooth"
          });

        }

      }
    );

  }


  // ORDER ONLINE BUTTON

  const orderButton = $("#order-btn");

  if (orderButton) {

    orderButton.addEventListener(
      "click",
      function () {

        const picks = $("#picks");

        if (picks) {

          picks.scrollIntoView({
            behavior: "smooth"
          });

        }

      }
    );

  }


  // MOBILE MENU

  const burger = $("#burger");

  const navLinks = $("#nav-links");

  if (burger && navLinks) {

    burger.addEventListener(
      "click",
      function () {

        const isOpen =
          navLinks.classList.toggle("open");

        burger.setAttribute(
          "aria-expanded",
          isOpen
        );

      }
    );


    navLinks.addEventListener(
      "click",
      function (event) {

        if (event.target.tagName === "A") {

          navLinks.classList.remove("open");

        }

      }
    );

  }

});