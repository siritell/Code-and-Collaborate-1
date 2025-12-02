
document.addEventListener("DOMContentLoaded", () => {
  let products = [];

  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));

  // Load products.json
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      renderProductDetails(productId);
    })
    .catch((err) => console.error("Could not load JSON:", err));

  // Function to render single product details
  function renderProductDetails(productId) {
    const product = products.find((p) => p.id === productId);
    const detailsContainer = document.getElementById("product-details");

    if (!product) {
      detailsContainer.innerHTML = "<p>Product not found.</p>";
      return;
    }

    // Inject main HTML structure
    detailsContainer.innerHTML = `
      <div class="single-product">
        <div class="product-image-box">
          <img src="${product.picture1}" class="main-product-img" alt="${product.title}">
        </div>
        <div class="product-main-info">
          <h3 class="product-title">${product.title}</h3>
          <div class="price-cart-row">
            <span class="product-price">${product.price} :-</span>
            <button class="add-cart-btn">Add to cart</button>
          </div>
        </div>
        <div class="accordion">
          <div class="accordion-item">
            <div class="accordion-header">Size <span>›</span></div>
            <div class="accordion-content" id="size-container"></div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header">Material <span>›</span></div>
            <div class="accordion-content">
              <p>${product.material}</p>
            </div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header">Product Description <span>›</span></div>
            <div class="accordion-content">
              <p>${product.description}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Populate sizes dynamically
    const sizeContainer = document.getElementById("size-container");
    if (product.sizes && product.sizes.length > 0) {
      product.sizes.forEach(size => {
        const span = document.createElement("span");
        span.className = "size-chip";
        span.textContent = size;
        sizeContainer.appendChild(span);
      });
    } else {
      sizeContainer.innerHTML = "<p>No sizes available.</p>";
    }

    // Accordion toggle functionality
    const headers = detailsContainer.querySelectorAll(".accordion-header");
    headers.forEach(header => {
      header.addEventListener("click", () => {
        const item = header.parentElement;
        const content = header.nextElementSibling;
        item.classList.toggle("active");
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  }
});
