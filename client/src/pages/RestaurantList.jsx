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
      className={`min-h-screen pb-32 overflow-x-hidden transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-[#071120] via-[#0b1220] to-[#111827]"
          : "bg-gradient-to-br from-[#fff8f5] via-[#ffffff] to-[#f5f7fb]"
      }`}
    >
      {/* CONTAINER */}

      <div className="w-full max-w-[1320px] mx-auto px-3 sm:px-4 md:px-5 xl:px-6">
        {/* HERO */}

        <div className="pt-4 sm:pt-5">
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
              rounded-[30px]
              sm:rounded-[34px]
              bg-gradient-to-br
              from-[#ff7a45]
              via-[#ff5e62]
              to-[#ff3d8d]
              p-4
              sm:p-5
              lg:p-8
              shadow-[0_20px_50px_rgba(255,110,90,0.22)]
            "
          >
            {/* GLOW */}

            <div className="absolute -top-20 -right-20 h-[220px] w-[220px] rounded-full bg-white/10 blur-3xl" />

            {/* MOBILE CARD */}

            <div className="lg:hidden relative z-10 mb-5">
              <div className="relative rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/10 p-3 overflow-hidden">
                {/* IMAGE */}

                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
                  alt="Food"
                  className="w-full h-[200px] object-cover rounded-[20px]"
                />

                {/* BADGE */}

                <div className="absolute top-5 left-5 bg-white text-[#ff6b57] px-3 py-2 rounded-full text-[10px] font-black shadow-lg">
                  🔥 Trending
                </div>

                {/* FLOAT CARD */}

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[88%] rounded-[22px] bg-white/95 backdrop-blur-xl p-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-[#111827] text-base font-black">
                        AI Picks
                      </h2>

                      <p className="text-[11px] text-gray-500 mt-1">
                        Personalized for you
                      </p>
                    </div>

                    <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center">
                      <ArrowRight size={16} />
                    </div>
                  </div>

                  {/* MINI */}

                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <MiniInfo
                      icon={<Star size={11} />}
                      text="4.9"
                    />

                    <MiniInfo
                      icon={<Clock3 size={11} />}
                      text="20m"
                    />

                    <MiniInfo
                      icon={<TrendingUp size={11} />}
                      text="#1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* GRID */}

            <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
              {/* LEFT */}

              <div>
                {/* TAG */}

                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-lg px-4 py-2 rounded-full text-white text-[10px] sm:text-[11px] font-black tracking-wide">
                  <Sparkles size={13} />
                  AI PERSONALIZED DISCOVERY
                </div>

                {/* TITLE */}

                <h1
                  className="
                    mt-5
                    text-[42px]
                    leading-[0.92]
                    sm:text-[58px]
                    lg:text-[64px]
                    font-black
                    text-white
                    tracking-[-2px]
                    break-words
                  "
                >
                  {mood.title}
                </h1>

                {/* SUB */}

                <p className="mt-4 text-[14px] sm:text-[16px] leading-7 text-orange-50/90 max-w-2xl">
                  {mood.subtitle}
                </p>

                {/* SEARCH */}

                <div className="mt-6">
                  <div
                    className="
                      rounded-[22px]
                      bg-white/95
                      backdrop-blur-xl
                      p-2
                      shadow-xl
                      flex
                      flex-col
                      sm:flex-row
                      gap-2
                    "
                  >
                    {/* INPUT */}

                    <div className="flex items-center flex-1 px-3 h-[52px]">
                      <Search
                        size={18}
                        className="text-gray-500"
                      />

                      <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                          setSearch(e.target.value)
                        }
                        placeholder="Search restaurants or dishes"
                        className="
                          bg-transparent
                          outline-none
                          flex-1
                          px-3
                          text-gray-700
                          placeholder:text-gray-400
                          text-[14px]
                          w-full
                        "
                      />
                    </div>

                    {/* BTN */}

                    <button
                      className="
                        h-[50px]
                        sm:h-[52px]
                        px-5
                        rounded-[18px]
                        bg-gradient-to-r
                        from-orange-500
                        to-pink-500
                        text-white
                        text-sm
                        font-black
                        shadow-lg
                        whitespace-nowrap
                      "
                    >
                      Search
                    </button>
                  </div>
                </div>

                {/* STATS */}

                <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-5">
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
                  className="relative w-[300px] rounded-[30px] bg-white/15 backdrop-blur-2xl border border-white/10 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
                    alt="Food"
                    className="h-[220px] w-full object-cover rounded-[24px]"
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

        <div className="mt-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
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

          {/* LOADING */}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`rounded-[28px] overflow-hidden animate-pulse ${
                    darkMode
                      ? "bg-[#151d2d]"
                      : "bg-white"
                  }`}
                >
                  <div className="h-56 bg-gray-300" />

                  <div className="p-4">
                    <div className="h-5 w-1/2 bg-gray-300 rounded-full" />

                    <div className="h-4 w-full bg-gray-200 rounded-full mt-4" />

                    <div className="h-4 w-2/3 bg-gray-200 rounded-full mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}

/* HERO STAT */

function HeroStat({ title, value }) {
  return (
    <div className="bg-white/15 backdrop-blur-xl rounded-2xl px-3 py-3 border border-white/10 min-w-0">
      <p className="text-orange-100 text-[10px] sm:text-[11px] truncate">
        {title}
      </p>

      <h2 className="text-white text-[28px] sm:text-3xl font-black mt-1 truncate">
        {value}
      </h2>
    </div>
  );
}

/* MINI */

function MiniInfo({ icon, text }) {
  return (
    <div className="bg-[#fff3ef] rounded-xl h-10 flex items-center justify-center gap-1 text-[#ff6b57] text-xs font-black">
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
