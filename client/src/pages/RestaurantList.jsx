// src/pages/RestaurantList.jsx

import { useEffect, useState } from "react";

import api from "../api";

import {
  Sparkles,
  Search,
  Flame,
  MapPin,
  ArrowRight,
  Star,
  Clock3,
  TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";

import RestaurantCard from "../components/RestaurantCard";

import { categories } from "../data/categories";

import useThemeStore from "../store/themeStore";

import {
  getUserMood,
  getPersonalizedRestaurants,
} from "../utils/personalization";

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("All");

  const [search, setSearch] = useState("");

  const { darkMode } = useThemeStore();

  const mood = getUserMood();

  /* LOAD */

  useEffect(() => {
    async function loadRestaurants() {
      try {
        setLoading(true);

        const res = await api.get("/restaurants");

        const personalized = getPersonalizedRestaurants(res.data);

        setRestaurants(personalized);

        setFilteredRestaurants(personalized);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    loadRestaurants();
  }, []);

  /* FILTER */

  useEffect(() => {
    let updated = [...restaurants];

    if (activeCategory !== "All") {
      updated = updated.filter((restaurant) =>
        restaurant.cuisine
          ?.toLowerCase()
          .includes(activeCategory.toLowerCase()),
      );
    }

    if (search.trim()) {
      updated = updated.filter(
        (restaurant) =>
          restaurant.name?.toLowerCase().includes(search.toLowerCase()) ||
          restaurant.cuisine?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredRestaurants(updated);
  }, [search, activeCategory, restaurants]);

  return (
    <div
      className={`min-h-screen pb-32 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-[#071120] via-[#0b1220] to-[#111827]"
          : "bg-gradient-to-br from-[#fff8f5] via-[#ffffff] to-[#f5f7fb]"
      }`}
    >
      {/* CONTAINER */}

      <div className="w-full max-w-[1320px] mx-auto px-4 md:px-5 xl:px-6">
        {/* HERO */}

        <div className="pt-5">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              relative
              overflow-hidden
              rounded-[34px]
              bg-gradient-to-br
              from-[#ff7a45]
              via-[#ff5e62]
              to-[#ff3d8d]
              p-5
              sm:p-6
              lg:p-8
              shadow-[0_20px_50px_rgba(255,110,90,0.22)]
            "
          >
            {/* BG */}

            <div className="absolute -top-24 -right-20 h-[260px] w-[260px] rounded-full bg-white/10 blur-3xl" />

            {/* MOBILE IMAGE */}

            <div className="relative z-10 lg:hidden mb-5">
              <div className="relative rounded-[28px] bg-white/10 backdrop-blur-xl p-3 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
                  alt="Food"
                  className="h-[220px] w-full object-cover rounded-[22px]"
                />

                {/* TRENDING */}

                <div className="absolute top-6 left-6 bg-white text-[#ff6b57] px-3 py-2 rounded-full text-[10px] font-black shadow-lg">
                  🔥 Trending
                </div>

                {/* AI CARD */}

                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-[24px] p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-[#111827] text-lg font-black">
                        AI Picks
                      </h2>

                      <p className="text-xs text-gray-500 mt-1">
                        Personalized for you
                      </p>
                    </div>

                    <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center">
                      <ArrowRight size={18} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <MiniInfo
                      icon={<Star size={12} />}
                      text="4.9"
                    />

                    <MiniInfo
                      icon={<Clock3 size={12} />}
                      text="20m"
                    />

                    <MiniInfo
                      icon={<TrendingUp size={12} />}
                      text="#1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* GRID */}

            <div className="relative z-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
              {/* LEFT */}

              <div className="pt-8 lg:pt-0">
                {/* TAG */}

                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-lg px-4 py-2 rounded-full text-white text-[11px] font-black tracking-wide">
                  <Sparkles size={13} />
                  AI PERSONALIZED DISCOVERY
                </div>

                {/* TITLE */}

                <h1 className="mt-5 text-[42px] sm:text-[56px] lg:text-[58px] font-black leading-[0.96] text-white tracking-[-2px]">
                  {mood.title}
                </h1>

                {/* SUBTITLE */}

                <p className="mt-4 text-sm sm:text-base leading-7 text-orange-50/90 max-w-2xl">
                  {mood.subtitle}
                </p>

                {/* SEARCH */}

                <div className="mt-6 max-w-2xl">
                  <div className="h-[60px] rounded-[22px] bg-white/95 backdrop-blur-xl flex items-center px-4 shadow-xl">
                    <Search
                      size={18}
                      className="text-gray-500"
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search restaurants or dishes"
                      className="bg-transparent outline-none flex-1 px-3 text-gray-700 placeholder:text-gray-400 text-[14px]"
                    />

                    <button className="h-10 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-black shadow-lg">
                      Search
                    </button>
                  </div>
                </div>

                {/* STATS */}

                <div className="grid grid-cols-3 gap-3 mt-6">
                  <HeroStat
                    title="Restaurants"
                    value="500+"
                  />

                  <HeroStat
                    title="AI Match"
                    value="98%"
                  />

                  <HeroStat
                    title="Delivery"
                    value="20m"
                  />
                </div>
              </div>

              {/* DESKTOP RIGHT */}

              <div className="relative hidden lg:flex items-center justify-center">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="relative w-[280px] rounded-[28px] bg-white/15 backdrop-blur-2xl border border-white/10 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
                    alt="Food"
                    className="h-[200px] w-full object-cover rounded-[24px]"
                  />

                  <div className="absolute top-6 left-6 bg-white text-[#ff6b57] px-3 py-2 rounded-full text-[10px] font-black shadow-lg">
                    🔥 Trending
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-white text-xl font-black">
                          AI Picks
                        </h2>

                        <p className="text-white/70 text-xs mt-1">
                          Personalized for you
                        </p>
                      </div>

                      <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                        <ArrowRight size={18} />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <MiniInfo
                        icon={<Star size={13} />}
                        text="4.9"
                      />

                      <MiniInfo
                        icon={<Clock3 size={13} />}
                        text="20m"
                      />

                      <MiniInfo
                        icon={<TrendingUp size={13} />}
                        text="#1"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* TOP BAR */}

        <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* LOCATION */}

          <div
            className={`rounded-[22px] px-4 py-3 flex items-center gap-3 border shadow-sm ${
              darkMode
                ? "bg-white/[0.04] border-white/[0.05]"
                : "bg-white border-gray-100"
            }`}
          >
            <div className="h-11 w-11 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-lg">
              <MapPin size={18} />
            </div>

            <div>
              <p className="text-[11px] text-gray-500">
                Delivering to
              </p>

              <h2
                className={`font-black text-lg mt-1 ${
                  darkMode
                    ? "text-white"
                    : "text-[#111827]"
                }`}
              >
                Hyderabad 📍
              </h2>
            </div>
          </div>

          {/* PILLS */}

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <AiPill text="🔥 Trending" />

            <AiPill text="🥗 Healthy Picks" />

            <AiPill text="⚡ Under 20 mins" />

            <AiPill text="🍕 Pizza Combos" />
          </div>
        </div>

        {/* CATEGORIES */}

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2
                className={`text-2xl md:text-3xl font-black ${
                  darkMode
                    ? "text-white"
                    : "text-[#111827]"
                }`}
              >
                Categories
              </h2>

              <p
                className={`text-sm mt-1 ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                Browse cuisines
              </p>
            </div>
          </div>

          {/* LIST */}

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            <CategoryCard
              active={activeCategory === "All"}
              onClick={() => setActiveCategory("All")}
              darkMode={darkMode}
              icon={<Flame size={22} />}
              title="All"
            />

            {categories.map((cat, index) => {
              const Icon = cat.icon;

              return (
                <CategoryCard
                  key={index}
                  active={
                    activeCategory === cat.value
                  }
                  onClick={() =>
                    setActiveCategory(cat.value)
                  }
                  darkMode={darkMode}
                  icon={<Icon size={22} />}
                  title={cat.name}
                />
              );
            })}
          </div>
        </div>

        {/* RESTAURANTS */}

        <div className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2
                className={`text-2xl md:text-3xl font-black ${
                  darkMode
                    ? "text-white"
                    : "text-[#111827]"
                }`}
              >
                Popular Near You
              </h2>

              <p
                className={`text-sm mt-1 ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                Personalized recommendations
              </p>
            </div>
          </div>

          {/* GRID */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredRestaurants.map(
              (restaurant) => (
                <RestaurantCard
                  key={restaurant._id}
                  restaurant={restaurant}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* HERO STAT */

function HeroStat({ title, value }) {
  return (
    <div className="bg-white/15 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/10">
      <p className="text-orange-100 text-[11px]">
        {title}
      </p>

      <h2 className="text-white text-2xl font-black mt-1">
        {value}
      </h2>
    </div>
  );
}

/* MINI */

function MiniInfo({ icon, text }) {
  return (
    <div className="bg-[#fff3ef] rounded-xl h-11 flex items-center justify-center gap-2 text-[#ff6b57] text-sm font-black">
      {icon}

      {text}
    </div>
  );
}

/* AI PILL */

function AiPill({ text }) {
  return (
    <div className="px-3 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-semibold shadow-md whitespace-nowrap">
      {text}
    </div>
  );
}

/* CATEGORY */

function CategoryCard({
  active,
  onClick,
  darkMode,
  icon,
  title,
}) {
  return (
    <motion.button
      whileTap={{
        scale: 0.96,
      }}
      onClick={onClick}
      className="min-w-[78px]"
    >
      <div
        className={`h-[72px] rounded-[22px] flex items-center justify-center transition-all duration-300 ${
          active
            ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-[0_10px_30px_rgba(255,120,100,0.3)]"
            : darkMode
              ? "bg-white/[0.04] border border-white/[0.06] text-white"
              : "bg-white border border-gray-100 shadow-sm"
        }`}
      >
        {icon}
      </div>

      <p
        className={`text-xs font-bold text-center mt-2 ${
          darkMode
            ? "text-white"
            : "text-[#111827]"
        }`}
      >
        {title}
      </p>
    </motion.button>
  );
}
