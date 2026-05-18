// src/utils/favorites.js

export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function toggleFavorite(restaurantId) {
  const favorites = getFavorites();

  const exists = favorites.includes(restaurantId);

  let updated = [];

  if (exists) {
    updated = favorites.filter((id) => id !== restaurantId);
  } else {
    updated = [...favorites, restaurantId];
  }

  localStorage.setItem("favorites", JSON.stringify(updated));

  return updated;
}

export function isFavorite(restaurantId) {
  const favorites = getFavorites();

  return favorites.includes(restaurantId);
}
