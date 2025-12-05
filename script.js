import { toggleFavorite } from "./storage.js";


let products = [];
let itemsToShow = 8; // 4 rows × 2 columns

function getFavoritesFromStorage() {
  try {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  } catch (e) {
    return [];
  }
}

function isFavorited(id) {
  const favs = getFavoritesFromStorage();
  return favs.some(f => (typeof f === 'object' ? f.id == id : f == id));
}

// Load products.json
fetch("products.json")
  .then(response => response.json())
  .then(data => {
    products = data;
    addSaleBanner();
    renderProducts();
  })
  .catch(err => console.error("Could not load JSON:", err));
  

function addSaleBanner() {
  const grid = document.getElementById("product-grid");
  const banner = document.createElement("div");
  banner.className = "sale-banner";
  banner.innerHTML = `<img src="images/SALE.jpg" alt="Sale Banner" />`;
  grid.parentNode.insertBefore(banner, grid);
}

function addSaveButtonListeners() {
  document.querySelectorAll('.save-btn').forEach(save => {
    save.addEventListener('click', () => {
      event.stopPropagation();
      save.classList.toggle('active');
      const product = products.find(p => p.id == save.dataset.id);
      toggleFavorite(product);
    });
  });
}

function renderProducts() {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  const visibleProducts = products.slice(0, itemsToShow);

  visibleProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";


 if (product.sale_price){
   card.innerHTML = `
     <img src="${product.picture1}" alt="${product.title}" />
     <div class="product-info">
       <div class="product-title">${product.title}</div>
       <div class="product-price"><div class="old-price">${product.price}</div> <div class="product-sale-price">${product.sale_price}</div></div>
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
   `; }

       const tempSaveBtn = card.querySelector('.save-btn');
    if (tempSaveBtn && isFavorited(product.id)) {
      tempSaveBtn.classList.add('active');
    }

    card.addEventListener('click', () => {
      window.location.href = `product.html?id=${product.id}`;
    });
    
    card.addEventListener('click', () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    grid.appendChild(card);
  });

  addSaveButtonListeners();
}

document.getElementById("load-more-btn").addEventListener("click", () => {
  itemsToShow += 8; // 4 more rows
  renderProducts();
});

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

