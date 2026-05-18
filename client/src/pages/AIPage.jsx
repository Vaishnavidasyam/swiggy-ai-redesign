// src/pages/AIPage.jsx

import { Sparkles, Bot, Brain, Clock3 } from "lucide-react";

import { motion } from "framer-motion";

import AIFoodAssistant from "../components/AIFoodAssistant";

import useThemeStore from "../store/themeStore";

export default function AIPage() {
  const { darkMode } = useThemeStore();

  return (
    <div
      className={`min-h-screen px-4 pt-5 pb-40 transition-all duration-300 ${
        darkMode ? "bg-[#0b1220] text-white" : "bg-[#f5f7fb] text-black"
      }`}
    >
      {/* CONTAINER */}

      <div className="max-w-md mx-auto">
        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="flex items-start justify-between"
        >
          {/* LEFT */}

          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#ff6b57]" />

              <span className="text-sm font-bold text-[#ff6b57]">
                AI Powered
              </span>
            </div>

            <h1 className="text-[38px] font-black leading-[1.05] mt-4">
              Food AI
              <br />
              Assistant
            </h1>

            <p
              className={`text-sm leading-7 mt-4 max-w-[280px] ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Discover meals, personalized suggestions and smarter food
              recommendations powered by AI.
            </p>
          </div>

          {/* ICON */}

          <div className="h-16 w-16 rounded-[24px] bg-gradient-to-br from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-md">
            <Bot size={28} />
          </div>
        </motion.div>

        {/* HERO CARD */}

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
            delay: 0.08,
          }}
          className="mt-7 bg-gradient-to-br from-orange-500 via-[#ff7a59] to-pink-500 rounded-[36px] p-6 text-white shadow-md"
        >
          {/* TOP */}

          <div className="flex items-center gap-2">
            <Brain size={18} />

            <span className="text-sm font-bold">Smart AI Recommendations</span>
          </div>

          {/* TITLE */}

          <h2 className="text-[32px] font-black leading-[1.08] mt-5">
            Personalized
            <br />
            food discovery
          </h2>

          {/* DESC */}

          <p className="text-sm leading-7 text-orange-100 mt-4 max-w-[260px]">
            AI learns your food preferences, delivery habits and cravings to
            recommend the perfect meal.
          </p>

          {/* FEATURES */}

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-white rounded-[22px] p-4 text-[#111827]">
              <h3 className="font-black text-sm">Mood Based</h3>

              <p className="text-xs text-gray-500 mt-2 leading-5">
                Food suggestions based on mood & weather.
              </p>
            </div>

            <div className="bg-white rounded-[22px] p-4 text-[#111827]">
              <h3 className="font-black text-sm">Smart Timing</h3>

              <p className="text-xs text-gray-500 mt-2 leading-5">
                AI predicts faster delivery windows.
              </p>
            </div>
          </div>
        </motion.div>

        {/* QUICK ACTIONS */}

        <div className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-black">AI Features</h2>

              <p
                className={`text-xs mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Smart tools for better ordering
              </p>
            </div>
          </div>

          {/* GRID */}

          <div className="grid grid-cols-2 gap-4">
            {/* CARD */}

            <div
              className={`rounded-[28px] p-5 shadow-sm border ${
                darkMode
                  ? "bg-[#151d2d] border-[#232c3f]"
                  : "bg-white border-gray-100"
              }`}
            >
              <div className="h-12 w-12 rounded-2xl bg-[#fff4ef] text-[#ff6b57] flex items-center justify-center">
                <Sparkles size={22} />
              </div>

              <h3 className="font-black text-[16px] mt-5">Smart Picks</h3>

              <p
                className={`text-xs leading-6 mt-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Personalized meal recommendations.
              </p>
            </div>

            {/* CARD */}

            <div
              className={`rounded-[28px] p-5 shadow-sm border ${
                darkMode
                  ? "bg-[#151d2d] border-[#232c3f]"
                  : "bg-white border-gray-100"
              }`}
            >
              <div className="h-12 w-12 rounded-2xl bg-[#fff4ef] text-[#ff6b57] flex items-center justify-center">
                <Clock3 size={22} />
              </div>

              <h3 className="font-black text-[16px] mt-5">Fast Delivery</h3>

              <p
                className={`text-xs leading-6 mt-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Predicts the fastest delivery route.
              </p>
            </div>
          </div>
        </div>

        {/* AI ASSISTANT */}

        <div className="mt-8">
          <AIFoodAssistant />
        </div>
      </div>
    </div>
  );
}
