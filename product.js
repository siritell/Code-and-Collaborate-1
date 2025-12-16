import { addToBag } from "./shopping-bag.js";
import {isFavorite, toggleFavorite} from "./storage.js";

export function productLoad() { 
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const detailsContainer = document.getElementById("product-details");

  if (!productId) {
    detailsContainer.innerHTML = "<p>No product selected.</p>";
    return;
  }

  fetch("products.json")
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id == productId);
      if (!product) {
        detailsContainer.innerHTML = "<p>Product not found.</p>";
        return;
      }

      detailsContainer.innerHTML = `
        <div class="single-product">
              <span class="save-btn ${isFavorite(product.id) ? "active" : ""}" data-id="${product.id}" title="Save">
            <svg class="save-icon" viewBox="0 0 24 24" width="28" height="28">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </span>          <!-- IMAGE SLIDER -->
          <div class="product-image-box slider-container">
            <button class="slide-btn prev-btn">&#10094;</button>
            <img src="${product.picture1}" class="main-product-img active" alt="${product.title}">
            <img src="${product.picture2}" class="main-product-img" alt="${product.title}">
            <button class="slide-btn next-btn">&#10095;</button>
          </div>

          <!-- PRODUCT INFO -->
          <div class="product-main-info">
            <h3 class="product-title">${product.title}</h3>
            <div class="price-cart-row">
              <span class="product-price">
                ${
                  product.sale_price
                  ? `<span class="old-price">${product.price} :-</span> <span class="product-sale-price">${product.sale_price} :-</span>`
                  : `${product.price} :-`
                }
              </span>
              <button class="add-cart-btn">Add to cart</button>
            </div>
          </div>

          <!-- ACCORDION -->
          <div class="accordion">
            <div class="accordion-item">
              <div class="accordion-header">Size <span class="arrow">›</span></div>
              <div class="accordion-content" id="size-container"></div>
            </div>

            <div class="accordion-item">
              <div class="accordion-header">Material <span class="arrow">›</span></div>
              <div class="accordion-content">
                <p>${product.material}</p>
              </div>
            </div>

            <div class="accordion-item">
              <div class="accordion-header">Product Description <span class="arrow">›</span></div>
              <div class="accordion-content">
                <p>${product.description}</p>
              </div>
            </div>
          </div>
        </div>
      `;


      const saveBtn = detailsContainer.querySelector(".save-btn");
      if (saveBtn) {
        saveBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          // update storage
          toggleFavorite(product);
          // update UI state immediately
 const nowActive = saveBtn.classList.toggle("active");
          showToast(nowActive ? "Added to favorites" : "Removed from favorites", { target: saveBtn, duration: 1600 });
        });
      }
      

 const addCartBtn = detailsContainer.querySelector(".add-cart-btn");
      if (addCartBtn) {
        addCartBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          addToBag(product);
          const target = detailsContainer.querySelector(".single-product") || addCartBtn;
          showToast(`${product.title} added to bag`, { target, duration: 2200 });
        });
      }

function showToast(message, { duration = 2000, target = null } = {}) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  toast.style.zIndex = 9999;
  toast.style.whiteSpace = 'nowrap';


  if (target instanceof Element) {
    const rect = target.getBoundingClientRect();
    toast.classList.add('center');
    toast.style.position = "fixed";
    toast.style.left = (rect.left + rect.width / 2) + "px"; 
     toast.style.top = Math.max(8, rect.top - 36) + 'px';
  } else {
    toast.classList.add('fixed');
    toast.style.position = "fixed";
    toast.style.right = "18px";
    toast.style.bottom = "24px";
  }
 
  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, Number(duration) || 0);
}


      const images = document.querySelectorAll(".main-product-img");
      const nextBtn = document.querySelector(".next-btn");
      const prevBtn = document.querySelector(".prev-btn");
      let currentSlide = 0;

      function showSlide(index) {
        images.forEach(img => img.classList.remove("active"));
        images[index].classList.add("active");
      }

      if (nextBtn && prevBtn && images.length > 0) {
        nextBtn.addEventListener("click", () => {
          currentSlide = (currentSlide + 1) % images.length;
          showSlide(currentSlide);
        });
        prevBtn.addEventListener("click", () => {
          currentSlide = (currentSlide - 1 + images.length) % images.length;
          showSlide(currentSlide);
        });
        showSlide(0);
      }

      const accordionHeaders = document.querySelectorAll(".accordion-header");
      accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
          const item = header.parentElement;
          const content = header.nextElementSibling;
          item.classList.toggle("active");
          if (item.classList.contains("active")) {
            content.style.maxHeight = content.scrollHeight + "px";
          } else content.style.maxHeight = null;
        });
      });

      if (product.sizes && Array.isArray(product.sizes)) {
        const sizeContainer = document.getElementById("size-container");
        sizeContainer.innerHTML = product.sizes.map(size => `<span class="size-chip">${size}</span>`).join("");
      }
    })
    .catch(error => {
      console.error("Error fetching product:", error);
      detailsContainer.innerHTML = "<p>Error loading product details. Try again later.</p>";
    });
}

document.addEventListener("DOMContentLoaded", productLoad);
