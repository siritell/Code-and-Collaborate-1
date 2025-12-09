const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

export function getBag() {
  return JSON.parse(localStorage.getItem("shoppingBag")) || [];
}

export function saveBag(bag) {
  localStorage.setItem("shoppingBag", JSON.stringify(bag));
}

export function addToBag(product) {
  const bag = getBag();

  const existing = bag.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    bag.push({ ...product, quantity: 1 });
  }

  saveBag(bag);
}

export function removeFromBag(productId) {
  let bag = getBag();
  bag = bag.filter((item) => item.id !== productId);
  saveBag(bag);
}