const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

import {
  getFavorites,
  saveFavorites,
  toggleFavorite,
  addToBag,
} from "./storage.js";

export function renderFavorites() {
  const grid = document.getElementById("favorites-grid");
  const favorites = getFavorites();

  const emptyBagImage = document.querySelector(".empty-bag");
  const noFavoritesText = document.querySelector(".no-favorites");
  const shoppingButton = document.querySelector(".shopping-button-wrapper");
  const isEmpty = !favorites || favorites.length === 0;
  if (emptyBagImage) {
    emptyBagImage.style.display = isEmpty ? "block" : "none";
  }
  if (noFavoritesText) {
    noFavoritesText.style.display = isEmpty ? "block" : "none";
  }
  if (shoppingButton) {
    shoppingButton.style.display = isEmpty ? "block" : "none";
  }

  grid.innerHTML = "";

  if (isEmpty) {
    return;
  }

  favorites.forEach((product) => {
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

    const addBtn = card.querySelector(".add-cart-btn");
    if (addBtn) {
      addBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        addToBag(product);
        showToast(`${product.title} added to bag`, {
          target: card,
          duration: 1600,
        });
      });
    }

    const saveBtn = card.querySelector(".save-btn");
    if (saveBtn) {
      saveBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavorite(product);
        const nowFav = getFavorites().some(
          (p) => String(p.id) === String(product.id)
        );
        showToast(nowFav ? "Added to favorites" : "Removed from favorites", {
          target: saveBtn,
          duration: 1400,
        });
        // re-render so removed items disappear
        renderFavorites();
      });
    }
  });
}

// toast that can be anchored to a target element (falls back to bottom-right)
function showToast(message, { duration = 2000, target = null } = {}) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  toast.style.position = "fixed";
  toast.style.zIndex = 9999;
  toast.style.whiteSpace = "nowrap";

  // position: center over target (viewport coords) or bottom-right fallback
  if (target instanceof Element) {
    const rect = target.getBoundingClientRect();
    let left = rect.left + rect.width / 2;
    let top = rect.top - 36; // place above target by default

    // ensure top is not off-screen
    const margin = 8;
    top = Math.max(margin, top);

    // apply initial coords so offsetWidth is available
    toast.style.left = left + "px";
    toast.style.top = top + "px";
    // CSS should include translateX(-50%) for centering animation
    requestAnimationFrame(() => toast.classList.add("show"));

    // after render, clamp horizontal position so toast stays inside viewport
    requestAnimationFrame(() => {
      const tw = toast.offsetWidth;
      const minLeft = margin + tw / 2;
      const maxLeft = window.innerWidth - margin - tw / 2;
      if (left < minLeft) left = minLeft;
      if (left > maxLeft) left = maxLeft;
      toast.style.left = left + "px";
    });
  } else {
    // fallback bottom-right
    toast.style.right = "18px";
    toast.style.bottom = "24px";
    requestAnimationFrame(() => toast.classList.add("show"));
  }

  // remove after duration
  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => toast.remove(), {
      once: true,
    });
  }, Number(duration) || 0);
}
document.addEventListener("DOMContentLoaded", renderFavorites);
