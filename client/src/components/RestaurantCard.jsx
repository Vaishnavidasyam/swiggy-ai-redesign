// src/components/RestaurantCard.jsx

import { useState } from "react";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import { Clock3, Star, Heart } from "lucide-react";

import { isFavorite, toggleFavorite } from "../utils/favorites";

import useThemeStore from "../store/themeStore";

export default function RestaurantCard({ restaurant }) {
  const { darkMode } = useThemeStore();

  /* FAVORITE */

  const [favorite, setFavorite] = useState(isFavorite(restaurant._id));

  /* HANDLE FAVORITE */

  function handleFavorite(e) {
    e.preventDefault();

    const updated = toggleFavorite(restaurant._id);

    setFavorite(updated.includes(restaurant._id));
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -3,
      }}
      whileTap={{
        scale: 0.99,
      }}
      transition={{
        duration: 0.25,
      }}
      className="mb-5"
    >
      <Link to={`/restaurant/${restaurant._id}`}>
        <div
          className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
            darkMode
              ? "bg-[#151d2d] border-[#232c3f]"
              : "bg-white border-gray-100"
          } shadow-sm`}
        >
          {/* IMAGE */}

          <div className="relative">
            <img
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="w-full h-52 object-cover"
            />

            {/* OVERLAY */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* DELIVERY */}

            <div className="absolute bottom-4 left-4 bg-black/75 text-white px-3 py-2 rounded-xl text-xs flex items-center gap-2">
              <Clock3 size={13} />

              <span>{restaurant.deliveryTime || "30 mins"}</span>
            </div>

            {/* FAVORITE */}

            <button
              onClick={handleFavorite}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm"
            >
              <Heart
                size={18}
                className={`transition-all duration-300 ${
                  favorite ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>
          </div>

          {/* CONTENT */}

          <div className="p-4">
            {/* TOP */}

            <div className="flex items-start justify-between gap-3">
              <div>
                <h2
                  className={`text-[20px] font-black ${
                    darkMode ? "text-white" : "text-[#111827]"
                  }`}
                >
                  {restaurant.name}
                </h2>

                <p
                  className={`text-sm mt-1 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {restaurant.cuisine}
                </p>
              </div>

              {/* RATING */}

              <div className="bg-green-600 text-white px-3 py-2 rounded-xl text-sm flex items-center gap-1">
                <Star size={13} fill="white" />

                <span className="font-bold">{restaurant.rating || 4.5}</span>
              </div>
            </div>

            {/* TAGS */}

            <div className="flex gap-2 flex-wrap mt-4">
              <span className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full text-[11px] font-semibold">
                AI Recommended
              </span>

              <span className="bg-green-100 text-green-600 px-3 py-1.5 rounded-full text-[11px] font-semibold">
                Free Delivery
              </span>
            </div>

            {/* BOTTOM */}

            <div className="flex items-center justify-between mt-5">
              <div>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Starting from
                </p>

                <h3
                  className={`text-[22px] font-black mt-1 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  ₹{restaurant.priceForTwo || 149}
                </h3>
              </div>

              <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-3 rounded-xl font-bold shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                View Menu
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
