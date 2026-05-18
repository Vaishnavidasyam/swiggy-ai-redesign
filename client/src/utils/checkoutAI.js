// src/utils/checkoutAI.js

export function getAISuggestions(cartItems, recommendations) {
  const insights = [];

  if (!cartItems?.length || !recommendations?.length) {
    return [];
  }

  const cartNames = cartItems.map((item) => item.name.toLowerCase());

  /* TOTAL */

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  /* DESSERT */

  const dessert = recommendations.find(
    (item) =>
      item.name?.toLowerCase().includes("cake") ||
      item.name?.toLowerCase().includes("ice") ||
      item.name?.toLowerCase().includes("brownie") ||
      item.name?.toLowerCase().includes("gulab"),
  );

  if (dessert && !cartNames.includes(dessert.name.toLowerCase())) {
    insights.push({
      type: "dessert",

      title: "Complete your meal 🍰",

      subtitle: "Customers usually end with a dessert pairing.",

      item: dessert,
    });
  }

  /* DRINK */

  const drink = recommendations.find(
    (item) =>
      item.name?.toLowerCase().includes("cola") ||
      item.name?.toLowerCase().includes("drink") ||
      item.name?.toLowerCase().includes("juice") ||
      item.name?.toLowerCase().includes("mojito"),
  );

  if (drink && !cartNames.includes(drink.name.toLowerCase())) {
    insights.push({
      type: "drink",

      title: "Add a refreshing drink 🥤",

      subtitle: "A cool drink pairs perfectly with your order.",

      item: drink,
    });
  }

  /* FREE DELIVERY */

  if (total < 399) {
    const unlock = recommendations.find(
      (item) => item.price <= 399 - total + 80,
    );

    if (unlock) {
      insights.push({
        type: "delivery",

        title: "Unlock free delivery 🚚",

        subtitle: `Add items worth ₹${399 - total} more to save delivery fees.`,

        item: unlock,
      });
    }
  }

  /* TRENDING */

  const trending = recommendations.find((item) => item.rating >= 4.5);

  if (trending && !cartNames.includes(trending.name.toLowerCase())) {
    insights.push({
      type: "trending",

      title: "Trending near you 🔥",

      subtitle: "Popular among customers tonight.",

      item: trending,
    });
  }

  /* PROTEIN */

  const protein = recommendations.find(
    (item) =>
      item.name?.toLowerCase().includes("chicken") ||
      item.name?.toLowerCase().includes("paneer") ||
      item.name?.toLowerCase().includes("protein"),
  );

  if (protein && !cartNames.includes(protein.name.toLowerCase())) {
    insights.push({
      type: "protein",

      title: "Boost your meal 🍗",

      subtitle: "High-protein add-on recommended for this combo.",

      item: protein,
    });
  }

  /* SPICY BALANCE */

  const spicyItems = cartNames.filter(
    (name) => name.includes("spicy") || name.includes("hot"),
  );

  if (spicyItems.length > 0) {
    const cooling = recommendations.find(
      (item) =>
        item.name?.toLowerCase().includes("raita") ||
        item.name?.toLowerCase().includes("lassi"),
    );

    if (cooling && !cartNames.includes(cooling.name.toLowerCase())) {
      insights.push({
        type: "cooling",

        title: "Balance the spice 🌶️",

        subtitle: "Cooling side recommended for spicy dishes.",

        item: cooling,
      });
    }
  }

  /* LIMIT */

  return insights.slice(0, 6);
}
