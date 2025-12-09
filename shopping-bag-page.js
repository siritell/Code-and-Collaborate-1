import { getBag, removeFromBag } from "./shopping-bag.js";

document.addEventListener("DOMContentLoaded", () => {
  const emptyUI = document.querySelector(".shopping-bag-container");
  const bagUI = document.getElementById("bag-items");

  function renderBag() {
    const bag = getBag();

    if (!bag.length) {
      emptyUI.style.display = "flex";
      bagUI.style.display = "none";
      bagUI.innerHTML = "";
      return;
    }

    emptyUI.style.display = "none";
    bagUI.style.display = "flex";
    bagUI.innerHTML = "";

    bag.forEach((item) => {
      const div = document.createElement("div");
      div.className = "bag-item";
      div.innerHTML = `
        <img src="${item.picture1 || "icons/default-product.png"}" alt="${
        item.title
      }" class="bag-item-img">
        <div class="bag-item-details">
          <span class="bag-item-title">${item.title}</span>
          <div class="bag-item-meta">
            <span class="bag-item-quantity">${item.quantity}</span>
            <span class="bag-item-multiply">&nbsp;x&nbsp;</span>
            <span class="bag-item-price">
  ${
    item.sale_price
      ? `<span class="sale-price">${item.sale_price} :-</span> <span class="old-price">${item.price} :-</span>`
      : `${item.price} :-`
  }
</span>
          </div>
        </div>
        <button class="remove-btn">x</button>
      `;

      div.querySelector(".remove-btn").addEventListener("click", () => {
        removeFromBag(item.id);
        renderBag();
      });

      bagUI.appendChild(div);
    });
  }

  renderBag();
});
