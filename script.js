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
let itemsToShow = 8; // 4 rows × 2 columns
let showingSaleOnly = false; // Flag to indicate sale filter is active
let showingNewOnly = false;  // Flag to indicate new in filter is active

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

// Load products.json
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    addSaleBanner();
    renderProducts();
  })
  .catch((err) => console.error("Could not load JSON:", err));

function addSaleBanner() {
  const grid = document.getElementById("product-grid");
  const banner = document.createElement("div");
  banner.className = "sale-banner";
  const container = document.createElement("div");
  container.className = "sale-slider";
  const images = ["images/SALE.jpg", "images/SALE.jpg"];
  images.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "slide-img";
    container.appendChild(img);
  });
  banner.appendChild(container);
  grid.parentNode.insertBefore(banner, grid);
  let index = 0;
  setInterval(() => {
    index = (index + 1) % images.length;
    container.style.transform = `translateX(-${index * 100}%)`;
  }, 3000);
}

function addSaveButtonListeners() {
  document.querySelectorAll(".save-btn").forEach((save) => {
    save.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent navigation
      save.classList.toggle("active");
      const product = products.find((p) => p.id == save.dataset.id);
      toggleFavorite(product);
    });
  });
}

function renderProducts(list = products) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  // Determine visible products
  const visibleProducts = (showingSaleOnly || showingNewOnly) ? list : list.slice(0, itemsToShow);

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

  // Hide load more button if any filter is active
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.style.display = (showingSaleOnly || showingNewOnly) ? "none" : "block";
  }
}

// Load more button
const loadMoreBtn = document.getElementById("load-more-btn");
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    itemsToShow += 8; // 4 more rows
    renderProducts();
  });
}

// Sale filter button
const saleButton = document.getElementById("sale-btn");
saleButton.addEventListener("click", () => {
  showingSaleOnly = true;
  showingNewOnly = false; // Disable new in filter
  const saleProducts = products.filter((item) => item.sale_price);
  renderProducts(saleProducts);
});

// New filter button
const newInButton = document.getElementById("newIn-btn");
newInButton.addEventListener("click", () => {
  showingSaleOnly = false; // Disable sale filter
  showingNewOnly = true;    // Enable new in filter
  const newProducts = products.filter((item) => !item.sale_price);
  renderProducts(newProducts);
});
