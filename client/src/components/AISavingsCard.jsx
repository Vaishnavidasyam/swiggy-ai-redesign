import { Sparkles, ArrowRight } from "lucide-react";

import { motion } from "framer-motion";

import useThemeStore from "../store/themeStore";

export default function AISavingsCard({
  subtotal,
  addToCart,
  recommendations = [],
}) {
  const { darkMode } = useThemeStore();

  const target = 399;

  const remaining = target - subtotal;

  const progress = Math.min((subtotal / target) * 100, 100);

  const suggestedItem = recommendations[0];

  if (subtotal >= 399) {
    return (
      <div className="mt-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-[28px] p-5 text-white shadow-xl">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <Sparkles size={22} />
          </div>

          <div>
            <h2 className="font-black text-xl">Free delivery unlocked 🎉</h2>

            <p className="text-sm text-green-50 mt-2">
              Best savings automatically applied.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-[30px] p-5 text-white shadow-[0_12px_40px_rgba(255,120,80,0.28)] overflow-hidden relative">
      {/* BG */}

      <div className="absolute -top-10 -right-10 h-40 w-40 bg-white/10 rounded-full blur-2xl" />

      {/* CONTENT */}

      <div className="relative z-10">
        {/* TOP */}

        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <Sparkles size={22} />
          </div>

          <div className="flex-1">
            <h2 className="font-black text-xl leading-8">
              You're ₹{remaining} away from FREE delivery
            </h2>

            <p className="text-sm text-orange-50 mt-2 leading-6">
              AI found the best savings opportunity for your order.
            </p>
          </div>
        </div>

        {/* PROGRESS */}

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span>₹{subtotal}</span>

            <span>₹399</span>
          </div>

          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.8,
              }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>

        {/* SUGGESTION */}

        {suggestedItem && (
          <div
            className={`mt-5 rounded-[24px] p-4 ${
              darkMode ? "bg-black/20" : "bg-white/15"
            } backdrop-blur-xl`}
          >
            <div className="flex items-center justify-between gap-4">
              {/* LEFT */}

              <div className="flex items-center gap-3">
                <img
                  src={suggestedItem.imageUrl}
                  alt={suggestedItem.name}
                  className="h-16 w-16 rounded-2xl object-cover"
                />

                <div>
                  <h3 className="font-black text-lg">{suggestedItem.name}</h3>

                  <p className="text-xs text-orange-50 mt-1">
                    Add this to unlock savings
                  </p>

                  <p className="font-black mt-1">₹{suggestedItem.price}</p>
                </div>
              </div>

              {/* BUTTON */}

              <button
                onClick={() => addToCart(suggestedItem._id)}
                className="bg-white text-[#ff6b57] px-4 py-3 rounded-2xl font-black shadow-lg"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {/* FOOTER */}

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-orange-50">
          AI optimized your cart for maximum savings
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
}
