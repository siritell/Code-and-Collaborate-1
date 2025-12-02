export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function isFavorite(id) {
  return getFavorites().some(item => String(item.id) === String(id));
}

export function toggleFavorite(product) {
  let favorites = getFavorites();

  const exists = favorites.some(item => String(item.id) === String(product.id));

  if (exists) {
    favorites = favorites.filter(item => String(item.id) !== String(product.id)) 
    } else {
      favorites.push(product);
    }

  saveFavorites(favorites);
};
