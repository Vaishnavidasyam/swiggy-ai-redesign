import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import { Clock3, Star, Heart } from "lucide-react";

export default function RestaurantCard({ restaurant }) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className="mb-6"
    >
      <Link to={`/restaurant/${restaurant._id}`}>
        <div className="bg-white rounded-[32px] overflow-hidden shadow-lg border border-gray-100">
          {/* IMAGE SECTION */}

          <div className="relative overflow-hidden">
            <img
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="w-full h-56 object-cover transition duration-500 hover:scale-105"
            />

            {/* OVERLAY */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* TRENDING */}

            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-lg px-4 py-2 rounded-full text-xs font-bold shadow-md">
              🔥 Trending
            </div>

            {/* FAVORITE */}

            <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-lg h-11 w-11 rounded-full flex items-center justify-center shadow-md">
              <Heart size={18} className="text-red-500" />
            </button>

            {/* DELIVERY */}

            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-2xl text-xs flex items-center gap-2 backdrop-blur-lg">
              <Clock3 size={14} />

              <span>{restaurant.deliveryTime || "30 mins"}</span>
            </div>
          </div>

          {/* CONTENT */}

          <div className="p-5">
            {/* TOP */}

            <div className="flex justify-between items-start gap-3">
              <div>
                <h2 className="text-xl font-black text-gray-900">
                  {restaurant.name}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  {restaurant.cuisine}
                </p>
              </div>

              {/* RATING */}

              <div className="bg-green-600 text-white px-3 py-2 rounded-2xl text-sm flex items-center gap-1 shadow-md">
                <Star size={14} fill="white" />

                <span className="font-bold">{restaurant.rating}</span>
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

            <div className="flex justify-between items-center mt-6">
              <div>
                <p className="text-sm text-gray-400">Starting from</p>

                <h3 className="text-lg font-black">₹149</h3>
              </div>

              <button className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white px-5 py-3 rounded-2xl font-bold shadow-lg">
                View Menu
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
