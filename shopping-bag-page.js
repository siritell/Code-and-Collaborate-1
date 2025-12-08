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
        <span>${item.title}</span>
        <span>${item.quantity} x ${item.price}</span>
        <button class="remove-btn">Remove</button>
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
