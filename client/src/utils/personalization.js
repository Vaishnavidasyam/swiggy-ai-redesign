// src/utils/personalization.js

export function getUserMood() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return {
      title: "Good Morning ☀️",

      subtitle: "Fresh breakfast picks",
    };
  }

  if (hour < 18) {
    return {
      title: "Afternoon Cravings 🍔",

      subtitle: "Popular lunch specials",
    };
  }

  return {
    title: "Late Night Cravings 🌙",

    subtitle: "Comfort food for tonight",
  };
}

export function getPersonalizedRestaurants(restaurants) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) return restaurants;

  return restaurants.sort((a, b) => {
    const aFav = favorites.includes(a._id) ? 1 : 0;

    const bFav = favorites.includes(b._id) ? 1 : 0;

    return bFav - aFav;
  });
}
