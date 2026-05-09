// src/pages/RestaurantList.jsx

import { useEffect, useState } from "react";

import api from "../api";

import { Sparkles, Search } from "lucide-react";

import { motion } from "framer-motion";

import RestaurantCard from "../components/RestaurantCard";

import AIBanner from "../components/AIBanner";

import AIFloatingAssistant from "../components/AIFloatingAssistant";

import { categories } from "../data/categories";

import useThemeStore from "../store/themeStore";

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("All");

  const { darkMode } = useThemeStore();

  useEffect(() => {
    async function loadRestaurants() {
      try {
        const res = await api.get("/restaurants");

        setRestaurants(res.data);

        setLoading(false);
      } catch (err) {
        console.log(err);

        setLoading(false);
      }
    }

    loadRestaurants();
  }, []);

  const filteredRestaurants =
    activeCategory === "All"
      ? restaurants
      : restaurants.filter(
          (restaurant) => restaurant.cuisine === activeCategory,
        );

  return (
    <div
      className={`min-h-screen pb-52 transition-all duration-300 ${
        darkMode ? "bg-[#0b1220]" : "bg-[#f5f7fb]"
      }`}
    >
      <div className="max-w-md mx-auto">
        {/* HEADER */}

        <div className="px-4 pt-5">
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="rounded-[30px] overflow-hidden bg-gradient-to-br from-[#ff845c] via-[#ff6b6b] to-[#ff4d8d] p-6 relative shadow-[0_14px_40px_rgba(255,110,90,0.18)]"
          >
            {/* GLOW */}

            <div className="absolute top-[-80px] right-[-40px] h-52 w-52 rounded-full bg-white/10 blur-3xl" />

            {/* TOP */}

            <div className="relative z-10 flex items-center gap-2">
              <Sparkles size={16} />

              <span className="text-sm font-medium text-white/90">
                AI Food Discovery
              </span>
            </div>

            {/* TITLE */}

            <h1 className="relative z-10 mt-4 text-[34px] leading-[1.05] font-black text-white">
              What are you
              <br />
              craving today?
            </h1>

            {/* SUBTITLE */}

            <p className="relative z-10 mt-4 text-sm leading-7 text-orange-50/90 max-w-[260px]">
              Personalized recommendations based on your taste, mood and
              delivery speed.
            </p>

            {/* SEARCH */}

            <div className="relative z-10 mt-6">
              <div className="h-[56px] rounded-2xl bg-white/15 backdrop-blur-xl border border-white/10 flex items-center px-4">
                <Search size={18} className="text-white/80" />

                <input
                  type="text"
                  placeholder="Search food or restaurants"
                  className="bg-transparent outline-none flex-1 px-3 text-sm text-white placeholder:text-white/70"
                />
              </div>
            </div>

            {/* MOOD CHIPS */}

            <div className="relative z-10 mt-5 flex gap-2 overflow-x-auto no-scrollbar">
              {["🔥 Biryani", "🍕 Pizza", "🥗 Healthy", "🌧️ Rain Mood"].map(
                (tag) => (
                  <div
                    key={tag}
                    className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-xl border border-white/10 text-xs text-white whitespace-nowrap"
                  >
                    {tag}
                  </div>
                ),
              )}
            </div>
          </motion.div>
        </div>

        {/* AI BANNER */}

        <div className="px-4 mt-5">
          <AIBanner />
        </div>

        {/* CATEGORIES */}

        <div className="mt-8 px-4">
          <div className="flex items-center justify-between mb-5">
            <h2
              className={`text-[24px] font-black ${
                darkMode ? "text-white" : "text-[#111827]"
              }`}
            >
              Explore
            </h2>

            <button className="text-sm font-bold text-orange-500">
              See all
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {/* ALL */}

            <motion.button
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => setActiveCategory("All")}
              className="min-w-[84px]"
            >
              <div
                className={`h-[74px] rounded-[24px] flex items-center justify-center transition-all duration-300 ${
                  activeCategory === "All"
                    ? "bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-lg scale-105"
                    : darkMode
                      ? "bg-[#171f2f] text-white"
                      : "bg-white shadow-sm"
                }`}
              >
                <span className="text-2xl">🍽️</span>
              </div>

              <p
                className={`text-xs text-center mt-2 font-semibold ${
                  darkMode ? "text-white" : "text-[#111827]"
                }`}
              >
                All
              </p>
            </motion.button>

            {/* OTHER */}

            {categories.map((cat, index) => {
              const Icon = cat.icon;

              const active = activeCategory === cat.value;

              return (
                <motion.button
                  key={index}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => setActiveCategory(cat.value)}
                  className="min-w-[84px]"
                >
                  <div
                    className={`h-[74px] rounded-[24px] flex items-center justify-center transition-all duration-300 ${
                      active
                        ? "bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-lg scale-105"
                        : darkMode
                          ? "bg-[#171f2f] text-white"
                          : "bg-white shadow-sm"
                    }`}
                  >
                    <Icon size={24} />
                  </div>

                  <p
                    className={`text-xs text-center mt-2 font-semibold ${
                      darkMode ? "text-white" : "text-[#111827]"
                    }`}
                  >
                    {cat.name}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* RESTAURANTS */}

        <div className="mt-10 px-4">
          <div className="flex items-center justify-between mb-5">
            <h2
              className={`text-[24px] font-black ${
                darkMode ? "text-white" : "text-[#111827]"
              }`}
            >
              Popular Near You
            </h2>

            <button className="text-sm font-bold text-orange-500">
              View all
            </button>
          </div>

          {loading ? (
            <div className="space-y-5">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className={`rounded-[28px] overflow-hidden animate-pulse ${
                    darkMode ? "bg-[#171f2f]" : "bg-white"
                  }`}
                >
                  <div className="h-56 bg-gray-200" />

                  <div className="p-5">
                    <div className="h-5 w-1/2 bg-gray-200 rounded-full" />

                    <div className="h-4 w-1/3 bg-gray-100 rounded-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FLOATING AI */}

      <div className="fixed bottom-[92px] left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4">
        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="rounded-[28px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.12)]"
        >
          <AIFloatingAssistant />
        </motion.div>
      </div>
    </div>
  );
}
