import { toggleFavorite } from "./storage.js";

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

let products = [];
let itemsToShow = 8;
let showingSaleOnly = false;
let showingNewOnly = false;

function getFavoritesFromStorage() {
  try {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  } catch (e) {
    return [];
  }
}

function isFavorited(id) {
  const favs = getFavoritesFromStorage();
  return favs.some((f) => (typeof f === "object" ? f.id == id : f == id));
}

// -------------------------
// LOAD PRODUCTS
// -------------------------
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    applyURLFilter(); // << USE URL FILTER HERE
  })
  .catch((err) => console.error("Could not load JSON:", err));

// -------------------------
// APPLY URL FILTER
// -------------------------
function applyURLFilter() {
  const params = new URLSearchParams(window.location.search);
  const filter = params.get("filter");

  if (filter === "sale") {
    showingSaleOnly = true;
    showingNewOnly = false;
    const saleProducts = products.filter((p) => p.sale_price);
    renderProducts(saleProducts);
    return;
  }

  if (filter === "new") {
    showingSaleOnly = false;
    showingNewOnly = true;
    const newProducts = products.filter((p) => !p.sale_price);
    renderProducts(newProducts);
    return;
  }

  // Default: no filter
  renderProducts(products);
}

function addSaveButtonListeners() {
  document.querySelectorAll(".save-btn").forEach((save) => {
    save.addEventListener("click", (event) => {
      event.stopPropagation();
      save.classList.toggle("active");
      const product = products.find((p) => p.id == save.dataset.id);
      toggleFavorite(product);

    const active = save.classList.contains('active');
      showToast(active ? 'Added to favorites' : 'Removed from favorites', { target: save });
    });
  });
}
// showToast: small floating message anchored to target (fallback bottom-right)
function showToast(message, { duration = 1600, target = null } = {}) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // position: center over target (viewport coords) or bottom-right fallback
  if (target instanceof Element) {
    const rect = target.getBoundingClientRect();
    toast.style.position = 'fixed';
    toast.style.left = (rect.left + rect.width / 2) + 'px';
    // place slightly above the element
    toast.style.top = Math.max(8, rect.top - 36) + 'px';
  } else {
    toast.style.position = 'fixed';
    toast.style.right = '18px';
    toast.style.bottom = '24px';
  }
  toast.style.zIndex = 9999;

  // animate in/out via CSS classes
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, Number(duration) || 0);
}


// -------------------------
// RENDER PRODUCTS
// -------------------------
function renderProducts(list = products) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  const visibleProducts =
    showingSaleOnly || showingNewOnly ? list : list.slice(0, itemsToShow);

  visibleProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    if (product.sale_price) {
      card.innerHTML = `
       <img src="${product.picture1}" alt="${product.title}" />
       <div class="product-info">
         <div class="product-title">${product.title}</div>
         <div class="product-price">
           <div class="old-price">${product.price}</div>
           <div class="product-sale-price">${product.sale_price}</div>
         </div>
       </div>
       <span class="save-btn" data-id="${product.id}" title="Save">
         <svg class="save-icon" viewBox="0 0 24 24" width="28" height="28">
           <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
         </svg>
       </span>
     `;
    } else {
      card.innerHTML = `
       <img src="${product.picture1}" alt="${product.title}" />
       <div class="product-info">
         <div class="product-title">${product.title}</div>
         <div class="product-price">${product.price}</div>
       </div>
       <span class="save-btn" data-id="${product.id}" title="Save">
         <svg class="save-icon" viewBox="0 0 24 24" width="28" height="28">
           <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
         </svg>
       </span>
     `;
    }

    const tempSaveBtn = card.querySelector(".save-btn");
    if (tempSaveBtn && isFavorited(product.id)) {
      tempSaveBtn.classList.add("active");
    }

    card.addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    grid.appendChild(card);
  });

  addSaveButtonListeners();

const loadMoreBtn = document.getElementById("load-more-btn");

if (loadMoreBtn) {
  if (
    showingSaleOnly ||
    showingNewOnly ||
    itemsToShow >= list.length
  ) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

}

// -------------------------
// LOAD MORE
// -------------------------
const loadMoreBtn = document.getElementById("load-more-btn");
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    itemsToShow += 8;
    renderProducts();
  });
}

// -------------------------
// SALE BUTTON
// -------------------------
const saleButton = document.getElementById("sale-btn");
saleButton.addEventListener("click", () => {
  showingSaleOnly = true;
  showingNewOnly = false;
  const saleProducts = products.filter((item) => item.sale_price);
  renderProducts(saleProducts);
});

// -------------------------
// NEW IN BUTTON
// -------------------------
const newInButton = document.getElementById("newIn-btn");
newInButton.addEventListener("click", () => {
  showingSaleOnly = false;
  showingNewOnly = true;
  const newProducts = products.filter((item) => !item.sale_price);
  renderProducts(newProducts);
});

