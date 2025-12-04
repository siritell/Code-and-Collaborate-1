document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const detailsContainer = document.getElementById("product-details");

  if (!productId) {
    detailsContainer.innerHTML = "<p>No product selected.</p>";
    return;
  }

  fetch("products.json")
    .then((response) => response.json())
    .then((products) => {
      const product = products.find((p) => p.id == productId);

      if (!product) {
        detailsContainer.innerHTML = "<p>Product not found.</p>";
        return;
      }

      // Inject product HTML 
      detailsContainer.innerHTML = `
          <div class="single-product">

            <!-- IMAGE SLIDER -->
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
                <span class="product-price">${product.price} :-</span>
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

      /* -------------------------------
         SLIDER FUNCTIONALITY
      --------------------------------*/
      const images = document.querySelectorAll(".main-product-img");
      const nextBtn = document.querySelector(".next-btn");
      const prevBtn = document.querySelector(".prev-btn");

      let currentSlide = 0;

      function showSlide(index) {
        images.forEach((img) => img.classList.remove("active"));
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

        showSlide(0); // show first image
      }

      /* -------------------------------
          ACCORDION FUNCTIONALITY
      --------------------------------*/
      const accordionHeaders = document.querySelectorAll(".accordion-header");

      accordionHeaders.forEach((header) => {
        header.addEventListener("click", () => {
          const item = header.parentElement;
          const content = header.nextElementSibling;

          // Toggle display
          const isOpen = item.classList.contains("active");
          document
            .querySelectorAll(".accordion-item")
            .forEach((i) => i.classList.remove("active"));
          document
            .querySelectorAll(".accordion-content")
            .forEach((c) => (c.style.maxHeight = null));

          if (!isOpen) {
            item.classList.add("active");
            content.style.maxHeight = content.scrollHeight + "px";
          }
        });
      });

      /* -------------------------------
          ADD SIZE CHIPS (IF AVAILABLE)
      --------------------------------*/
      if (product.sizes && Array.isArray(product.sizes)) {
        const sizeContainer = document.getElementById("size-container");
        sizeContainer.innerHTML = product.sizes
          .map((size) => `<span class="size-chip">${size}</span>`)
          .join("");
      }
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
      detailsContainer.innerHTML =
        "<p>Error loading product details. Try again later.</p>";
    });
});
