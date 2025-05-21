'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header sticky & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);



/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

function updateQuantity(button, delta) {
    const row = button.closest("tr");
    const quantityEl = row.querySelector(".quantity");
    let quantity = parseInt(quantityEl.textContent);
    quantity += delta;
    if (quantity < 1) quantity = 1;
    quantityEl.textContent = quantity;

    const price = parseFloat(row.dataset.price);
    const subtotal = price * quantity;
    row.querySelector(".subtotal").textContent = "Q" + subtotal.toFixed(2);

    updateTotals();
  }

  function removeProduct(button) {
    const row = button.closest("tr");
    row.remove();
    updateTotals();
  }

  function updateTotals() {
    const rows = document.querySelectorAll("#cart-body tr");
    let subtotal = 0;

    rows.forEach(row => {
      const price = parseFloat(row.dataset.price);
      const quantity = parseInt(row.querySelector(".quantity").textContent);
      subtotal += price * quantity;
    });

    const envio = subtotal > 0 ? 15 : 0;
    const total = subtotal + envio;

    document.getElementById("subtotal").textContent = "Q" + subtotal.toFixed(2);
    document.getElementById("envio").textContent = "Q" + envio.toFixed(2);
    document.getElementById("total").textContent = "Q" + total.toFixed(2);
    document.getElementById("checkout-total").textContent = "Q" + total.toFixed(2);
    }

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector('.search-field');

  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const sections = document.querySelectorAll('section.shop');

    sections.forEach(section => {
      let visibleItems = 0;
      const items = section.querySelectorAll('.scrollbar-item');

      items.forEach(item => {
        const title = item.querySelector('.card-title').textContent.toLowerCase();
        const match = title.includes(query);
        item.style.display = match ? 'list-item' : 'none';  // Cambiado aquí
        if (match) visibleItems++;
      });

      section.style.display = visibleItems > 0 ? 'block' : 'none';
    });
  });
});

 // Inicializa o carga el carrito
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Función para actualizar el total y el badge
  function updateCartDisplay() {
    const badge = document.querySelector('.btn-badge');
    const totalText = document.querySelector('.btn-text');

    const itemCount = cart.length;
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    badge.textContent = itemCount;
    totalText.textContent = `$${totalPrice.toFixed(2)}`;
    totalText.setAttribute('value', totalPrice.toFixed(2));
  }

  // Función para agregar producto al carrito
  function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }

  // Escucha todos los botones "add to cart"
  document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.shop-card');
      const title = card.querySelector('.card-title').textContent.trim();
      const price = parseFloat(card.querySelector('.price .span').textContent.replace('Q', '').replace('$', '').trim());

      const product = { title, price };
      addToCart(product);
    });
  });

  // Actualiza el carrito al cargar la página
  updateCartDisplay();

  