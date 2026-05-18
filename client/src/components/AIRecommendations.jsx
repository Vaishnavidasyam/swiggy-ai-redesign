import { Sparkles } from "lucide-react";

import RestaurantCard from "./RestaurantCard";

export default function AIRecommendations({ restaurants }) {
  /* FAVORITES */

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  /* RECENT */

  const recent = JSON.parse(localStorage.getItem("recentRestaurants")) || [];

  /* TIME */

  const hour = new Date().getHours();

  let title = "AI Picks For You";

  let filtered = [];

  /* FAVORITES BASED */

  if (favorites.length > 0) {
    filtered = restaurants.filter((r) => favorites.includes(r._id));

    title = "Based On Your Favorites ❤️";
  } else if (recent.length > 0) {

  /* RECENTLY VIEWED */
    filtered = restaurants.filter((r) => recent.includes(r._id));

    title = "Recently Viewed 👀";
  } else if (hour >= 22) {

  /* TIME BASED */
    filtered = restaurants.filter(
      (r) =>
        r.cuisine?.toLowerCase().includes("burger") ||
        r.cuisine?.toLowerCase().includes("pizza"),
    );

    title = "Late Night Cravings 🌙";
  } else {

  /* DEFAULT */
    filtered = restaurants.slice(0, 2);
  }

  if (filtered.length === 0) return null;

  return (
    <div className="mt-10">
      {/* HEADER */}

      <div className="flex items-center gap-3 mb-5">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-md">
          <Sparkles size={22} />
        </div>

        <div>
          <h2 className="text-[24px] font-black">{title}</h2>

          <p className="text-sm text-gray-500">Personalized recommendations</p>
        </div>
      </div>

      {/* LIST */}

      <div className="space-y-5">
        {filtered.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
