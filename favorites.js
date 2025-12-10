const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

import {
  getFavorites,
  saveFavorites,
  addToBag
} from "./storage.js";

export function renderFavorites() {
  const grid = document.getElementById("favorites-grid");
  const favorites = getFavorites();

  grid.innerHTML = "";

  if (favorites.length === 0) {
    grid.innerHTML = "<p class='no-favorites'>No favorites yet!</p>";
    return;
  }

favorites.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <a href="product.html?id=${product.id}" class="product-link">
      <img src="${product.picture1}" alt="${product.title}" />
      <div class="product-info">
        <div class="product-title">${product.title}</div>
        <div class="product-price">
          ${
            product.sale_price
              ? `<span class="old-price" style="text-decoration:line-through;color:#888;">$${product.price}</span>
                 <span class="product-sale-price" style="color:#d00;font-weight:bold;margin-left:8px;">$${product.sale_price}</span>`
              : `$${product.price}`
          }
        </div>
      </div>
    </a>
    <button class="add-cart-btn" data-id="${product.id}">Add to Bag</button>
    <span class="save-btn active" data-id="${product.id}" title="Remove">
      <svg class="save-icon" viewBox="0 0 24 24" width="28" height="28">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>      
    </span>
  `;

  grid.appendChild(card);
});



document.querySelectorAll(".add-cart-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const id = btn.dataset.id;
    const product = getFavorites().find(p => String(p.id) === String(id));
    console.log("Product found:", product);  // <-- ADD THIS
    if (product) {
      console.log("Adding to bag:", product);  // <-- ADD THIS
      addToBag(product);
    }
  });
});

  document.querySelectorAll(".save-btn").forEach(save => {
    save.addEventListener("click", () => {
      const id = save.dataset.id;
      const updated = getFavorites().filter(p => String(p.id) !== String(id));
      saveFavorites(updated);
      renderFavorites();
    });
  });
}

document.addEventListener("DOMContentLoaded", renderFavorites);