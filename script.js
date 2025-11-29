let products = [];
let itemsToShow = 8; // Number of products initially shown

// Load products.json
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    renderProducts();
  })
  .catch((err) => console.error("Could not load JSON:", err));

// Function to render product grid
function renderProducts() {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  const visibleProducts = products.slice(0, itemsToShow);

  visibleProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.picture1}" alt="${product.title}" />
      <div class="product-info">
        <div class="product-title">${product.title}</div>
        <div class="product-price">$${product.price}</div>
      </div>
    `;

    // Show product details on click
    card.addEventListener("click", () => showProductDetails(product.id));

    grid.appendChild(card);
  });
}

// Load more button
document.getElementById("load-more-btn").addEventListener("click", () => {
  itemsToShow += 8; // Show 8 more products
  renderProducts();
});

// Function to show single product details on the same page
function showProductDetails(productId) {
  const product = products.find((p) => p.id === productId);
  const detailsContainer = document.getElementById("product-details");

  if (!product) {
    detailsContainer.innerHTML = "<p>Product not found.</p>";
    return;
  }

  // Render product details
  detailsContainer.innerHTML = `
    <div class="product-container">

      <!-- Left Side Images -->
      <div class="product-images">
        <img class="main-image" src="${product.picture1}" alt="${product.title}">
        <div class="thumbnail-row">
          <img class="thumb" src="${product.picture1}" alt="">
          <img class="thumb" src="${product.picture2}" alt="">
        </div>
      </div>

      <!-- Right Side Info -->
      <div class="product-info-box">
        <h2>${product.title}</h2>
        <p class="price">$${product.price}</p>
        <p class="description">${product.description}</p>
        <p><strong>Material:</strong> ${product.material}</p>
        <p><strong>Sizes:</strong></p>
        <div class="sizes">
          ${product.sizes.map((size) => `<span class="size-option">${size}</span>`).join("")}
        </div>
        <button id="back-btn">← Back to Products</button>
      </div>

    </div>
  `;

  // Hide product grid and load more button
  document.getElementById("product-grid").style.display = "none";
  document.getElementById("load-more-btn").style.display = "none";

  // Back button restores grid
  document.getElementById("back-btn").addEventListener("click", () => {
    detailsContainer.innerHTML = "";
    document.getElementById("product-grid").style.display = "grid";
    document.getElementById("load-more-btn").style.display = "block";
  });
}
