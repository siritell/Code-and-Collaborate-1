

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const detailsContainer = document.getElementById('product-details');


  if (productId) {
    fetch('products.json')
      .then(response => response.json())
      .then(products => {
        const product = products.find(p => p.id == productId);
        if (product) {
          detailsContainer.innerHTML = `
                <div class="single-product">
                  <div class="product-image-box">
                   <div class="slider">
    <img src="${product.picture1}" class="slide active">
    <img src="${product.picture2}" class="slide">
  </div>

  <div class="slider-buttons">
    <button class="prev">‹</button>
    <button class="next">›</button>
  </div>
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

        } else {
          detailsContainer.innerHTML = '<p>Product not found.</p>';
        }
      })


      .catch(error => {
        console.error('Error fetching product data:', error);
        detailsContainer.innerHTML = '<p>Error loading product details.</p>';
      });

  } else {
    detailsContainer.innerHTML = '<p>No product selected.</p>';
  }
});
const slides = document.querySelectorAll(".slide");
let current = 0;

document.querySelector(".next").addEventListener("click", () => {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
});

document.querySelector(".prev").addEventListener("click", () => {
  slides[current].classList.remove("active");
  current = (current - 1 + slides.length) % slides.length;
  slides[current].classList.add("active");
});




