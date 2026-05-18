import { Sparkles, ChevronRight } from "lucide-react";

import { motion } from "framer-motion";

import { getAISuggestions } from "../utils/checkoutAI";

import useThemeStore from "../store/themeStore";

export default function AICheckoutSuggestions({ cartItems }) {
  const { darkMode } = useThemeStore();

  const suggestions = getAISuggestions(cartItems);

  if (suggestions.length === 0) return null;

  return (
    <div className="space-y-4 mt-6">
      {/* HEADER */}

      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-sm">
          <Sparkles size={20} />
        </div>

        <div>
          <h2 className="text-[24px] font-black">Smart AI Suggestions</h2>

          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Personalized checkout insights
          </p>
        </div>
      </div>

      {/* LIST */}

      {suggestions.map((suggestion, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: index * 0.08,
          }}
          className={`rounded-[28px] p-5 border shadow-sm ${
            darkMode
              ? "bg-[#151d2d] border-[#232c3f]"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-black text-lg leading-tight">
                {suggestion.title}
              </h3>

              <p
                className={`text-sm mt-3 leading-7 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {suggestion.subtitle}
              </p>
            </div>

            <button className="h-11 w-11 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-sm">
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
