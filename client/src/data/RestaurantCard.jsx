import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import { Clock3, Star, Heart } from "lucide-react";

import useThemeStore from "../store/themeStore";

export default function RestaurantCard({ restaurant }) {
  const { darkMode } = useThemeStore();

  return (
    <Link to={`/restaurant/${restaurant._id}`}>
      <motion.div
        whileHover={{
          y: -4,
        }}
        whileTap={{
          scale: 0.98,
        }}
        className={`overflow-hidden rounded-[32px] mb-5 transition-all duration-300 ${
          darkMode
            ? "bg-[#171c28] border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
            : "bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
        }`}
      >
        {/* IMAGE */}

        <div className="relative">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="w-full h-56 object-cover"
          />

          {/* OVERLAY */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* TRENDING */}

          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full text-xs font-bold shadow-md">
            🔥 Trending
          </div>

          {/* FAVORITE */}

          <button className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white/90 backdrop-blur-xl flex items-center justify-center shadow-lg">
            <Heart size={20} className="text-red-500" />
          </button>

          {/* TIME */}

          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-2xl text-xs flex items-center gap-2 backdrop-blur-lg">
            <Clock3 size={13} />
            {restaurant.deliveryTime}
          </div>
        </div>

        {/* CONTENT */}

        <div className="p-5">
          {/* TOP */}

          <div className="flex items-start justify-between">
            <div>
              <h2
                className={`text-[24px] font-black ${
                  darkMode ? "text-white" : "text-[#111827]"
                }`}
              >
                {restaurant.name}
              </h2>

              <p
                className={`mt-1 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {restaurant.cuisine}
              </p>
            </div>

            {/* RATING */}

            <div className="bg-green-500 text-white px-3 py-2 rounded-2xl flex items-center gap-1 shadow-lg">
              <Star size={14} fill="white" />

              <span className="font-bold text-sm">{restaurant.rating}</span>
            </div>
          </div>

          {/* TAGS */}

          <div className="flex flex-wrap gap-2 mt-5">
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs font-bold">
              AI Recommended
            </span>

            <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-xs font-bold">
              Free Delivery
            </span>

            <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-xs font-bold">
              Fast Serving
            </span>
          </div>

          {/* BOTTOM */}

          <div className="flex items-center justify-between mt-6">
            <div>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Starting from
              </p>

              <h3
                className={`text-2xl font-black ${
                  darkMode ? "text-white" : "text-[#111827]"
                }`}
              >
                ₹149
              </h3>
            </div>

            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-2xl font-black shadow-lg hover:scale-[1.03] transition-all">
              View Menu
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
