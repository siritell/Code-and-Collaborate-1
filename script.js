let products = [];
let itemsToShow = 8; // 4 rows × 2 columns

// Load products.json
fetch("products.json")
  .then(response => response.json())
  .then(data => {
    products = data;
    renderProducts();
  })
  .catch(err => console.error("Could not load JSON:", err));

function renderProducts() {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  const visibleProducts = products.slice(0, itemsToShow);

  visibleProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.picture}" alt="${product.title}" />
      <div class="product-info">
        <div class="product-title">${product.title}</div>
        <div class="product-price">$${product.price}</div>
      </div>
    `;

    grid.appendChild(card);
  });
}

document.getElementById("load-more-btn").addEventListener("click", () => {
  itemsToShow += 8; // 4 more rows
  renderProducts();
});