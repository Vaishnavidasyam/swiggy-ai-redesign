// src/pages/Browse.jsx

import { Search, Sparkles, Clock3 } from "lucide-react";

import useThemeStore from "../store/themeStore";

export default function Browse() {
  const { darkMode } = useThemeStore();

  return (
    <div
      className={`min-h-screen px-4 pt-6 pb-40 transition-all duration-300 ${
        darkMode ? "bg-[#0b1220] text-white" : "bg-[#f5f7fb] text-black"
      }`}
    >
      {/* HEADER */}

      <div className="flex items-start justify-between mb-7">
        {/* LEFT */}

        <div>
          <h1 className="text-[34px] font-black leading-[1.05]">Browse Food</h1>

          <p
            className={`text-sm mt-2 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Explore restaurants, dishes & AI suggestions
          </p>
        </div>

        {/* ICON */}

        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-md">
          <Search size={24} />
        </div>
      </div>

      {/* SEARCH BAR */}

      <div
        className={`rounded-[30px] p-4 shadow-sm border transition-all duration-300 ${
          darkMode
            ? "bg-[#151d2d] border-[#232c3f]"
            : "bg-white border-gray-100"
        }`}
      >
        <div className="flex items-center gap-3">
          {/* SEARCH ICON */}

          <div className="h-12 w-12 rounded-2xl bg-[#fff4ef] text-[#ff6b57] flex items-center justify-center">
            <Search size={20} />
          </div>

          {/* INPUT */}

          <input
            type="text"
            placeholder="Search food, restaurants..."
            className={`flex-1 bg-transparent outline-none text-[15px] ${
              darkMode
                ? "placeholder:text-gray-500"
                : "placeholder:text-gray-400"
            }`}
          />
        </div>
      </div>

      {/* AI DISCOVERY */}

      <div className="mt-6 bg-gradient-to-br from-orange-500 via-[#ff7a59] to-pink-500 rounded-[34px] p-6 text-white shadow-md">
        {/* TOP */}

        <div className="flex items-center gap-2">
          <Sparkles size={18} />

          <span className="text-sm font-bold">AI Food Discovery</span>
        </div>

        {/* TITLE */}

        <h2 className="text-[30px] font-black leading-[1.1] mt-5">
          Discover food
          <br />
          based on your mood
        </h2>

        {/* DESC */}

        <p className="text-sm leading-7 text-orange-100 mt-4 max-w-[260px]">
          Personalized restaurant and dish recommendations powered by AI.
        </p>

        {/* TAGS */}

        <div className="flex gap-3 mt-6 overflow-x-auto no-scrollbar">
          {["🔥 Spicy", "🍕 Pizza", "🥗 Healthy", "🌧️ Rain Mood"].map((tag) => (
            <div
              key={tag}
              className="px-4 py-2 rounded-full bg-white text-[#ff6b57] text-xs font-black whitespace-nowrap"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* RECENT SEARCHES */}

      <div className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-black">Recent Searches</h2>

            <p
              className={`text-xs mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Quickly continue where you left off
            </p>
          </div>

          <button className="text-[#ff6b57] text-sm font-bold">Clear</button>
        </div>

        {/* SEARCH ITEMS */}

        <div className="space-y-4">
          {[
            "Chicken Biryani",
            "Domino's Pizza",
            "Healthy Salads",
            "Ice Cream",
          ].map((item, index) => (
            <button
              key={index}
              className={`w-full rounded-[26px] p-4 flex items-center justify-between shadow-sm border transition-all duration-300 active:scale-[0.98] ${
                darkMode
                  ? "bg-[#151d2d] border-[#232c3f]"
                  : "bg-white border-gray-100"
              }`}
            >
              {/* LEFT */}

              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-2xl bg-[#fff4ef] text-[#ff6b57] flex items-center justify-center">
                  <Clock3 size={18} />
                </div>

                <div className="text-left">
                  <h2 className="font-black text-[15px]">{item}</h2>

                  <p
                    className={`text-xs mt-1 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Recent activity
                  </p>
                </div>
              </div>

              {/* ACTION */}

              <div className="text-[#ff6b57] text-sm font-bold">Search</div>
            </button>
          ))}
        </div>
      </div>

      {/* TRENDING */}

      <div className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-black">Trending Now</h2>

            <p
              className={`text-xs mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Popular food searches nearby
            </p>
          </div>
        </div>

        {/* TRENDING TAGS */}

        <div className="flex flex-wrap gap-3">
          {[
            "Burger",
            "Momos",
            "South Indian",
            "Biryani",
            "Cake",
            "Rolls",
            "Chinese",
            "Shawarma",
          ].map((tag) => (
            <button
              key={tag}
              className={`px-5 py-3 rounded-full text-sm font-black transition-all duration-300 ${
                darkMode
                  ? "bg-[#151d2d] border border-[#232c3f]"
                  : "bg-white border border-gray-100 shadow-sm"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
