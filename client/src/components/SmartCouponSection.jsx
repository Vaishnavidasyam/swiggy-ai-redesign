// ==========================================
// FILE: src/components/SmartCouponSection.jsx
// ==========================================

import { Ticket, Check } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useState, useMemo, useEffect } from "react";

import useThemeStore from "../store/themeStore";

export default function SmartCouponSection({
  subtotal,
  appliedCoupon,
  setAppliedCoupon,
  savings,
  setSavings,
}) {
  const { darkMode } = useThemeStore();

  const [expanded, setExpanded] = useState(false);

  /* COUPONS */

  const coupons = [
    {
      code: "SAVE80",

      amount: 80,

      min: 399,

      title: "Save ₹80 on orders above ₹399",

      color: "from-orange-500 to-pink-500",
    },

    {
      code: "FREEDEL",

      amount: 40,

      min: 199,

      title: "Free delivery on your order",

      color: "from-green-500 to-emerald-500",
    },

    {
      code: "WELCOME50",

      amount: 50,

      min: 149,

      title: "Flat ₹50 OFF for new users",

      color: "from-purple-500 to-indigo-500",
    },
  ];

  /* BEST COUPON */

  const bestCoupon = useMemo(() => {
    return coupons
      .filter((coupon) => subtotal >= coupon.min)
      .sort((a, b) => b.amount - a.amount)[0];
  }, [subtotal]);

  /* AUTO APPLY BEST */

  useEffect(() => {
    if (!appliedCoupon && bestCoupon) {
      setAppliedCoupon(bestCoupon.code);

      setSavings(bestCoupon.amount);
    }
  }, [bestCoupon]);

  /* APPLY COUPON */

  function applyCoupon(coupon) {
    if (subtotal < coupon.min) {
      return;
    }

    setAppliedCoupon(coupon.code);

    setSavings(coupon.amount);
  }

  return (
    <div className="mt-7">
      {/* HEADER */}

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-lg">
            <Ticket size={20} />
          </div>

          <div>
            <h2 className="font-black text-xl">Coupons & Offers</h2>

            <p
              className={`text-xs mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              AI selected the best savings
            </p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-bold text-[#ff6b57]"
        >
          {expanded ? "Hide" : "View all"}
        </button>
      </div>

      {/* BEST COUPON */}

      {bestCoupon && (
        <motion.div
          layout
          className={`rounded-[28px] p-5 shadow-sm border ${
            darkMode
              ? "bg-[#151d2d] border-white/5"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* LEFT */}

            <div className="flex gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center justify-center shadow-lg">
                <Check size={22} />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold">
                    BEST OFFER
                  </span>

                  <span
                    className={`text-[10px] font-semibold ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    AUTO APPLIED
                  </span>
                </div>

                <h2 className="font-black text-lg">{appliedCoupon}</h2>

                <p
                  className={`text-sm mt-1 leading-6 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {coupons.find((c) => c.code === appliedCoupon)?.title}
                </p>
              </div>
            </div>

            {/* SAVING */}

            <div className="text-right">
              <h2 className="text-2xl font-black text-green-500">₹{savings}</h2>

              <p className="text-xs text-green-500 font-semibold mt-1">Saved</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ALL COUPONS */}

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="overflow-hidden"
          >
            <div className="space-y-4 mt-4">
              {coupons.map((coupon) => {
                const active = appliedCoupon === coupon.code;

                const locked = subtotal < coupon.min;

                return (
                  <motion.div
                    key={coupon.code}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className={`rounded-[24px] p-4 shadow-sm border ${
                      darkMode
                        ? "bg-[#151d2d] border-white/5"
                        : "bg-white border-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* LEFT */}

                      <div className="flex gap-4">
                        <div
                          className={`h-14 w-14 rounded-2xl bg-gradient-to-r ${coupon.color} text-white flex items-center justify-center shadow-lg`}
                        >
                          {active ? <Check size={22} /> : <Ticket size={22} />}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold">
                              SAVE ₹{coupon.amount}
                            </span>

                            <span
                              className={`text-[10px] font-semibold ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              Min ₹{coupon.min}
                            </span>
                          </div>

                          <h2 className="font-black text-lg">{coupon.code}</h2>

                          <p
                            className={`text-sm mt-1 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {coupon.title}
                          </p>

                          {locked && (
                            <p className="text-xs text-red-400 mt-2 font-semibold">
                              Add ₹{coupon.min - subtotal} more to unlock
                            </p>
                          )}
                        </div>
                      </div>

                      {/* BUTTON */}

                      <button
                        disabled={locked}
                        onClick={() => applyCoupon(coupon)}
                        className={`px-5 py-3 rounded-2xl font-black text-sm transition-all ${
                          active
                            ? "bg-green-500 text-white"
                            : locked
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-[#ff6b57] text-white"
                        }`}
                      >
                        {active ? "Applied" : locked ? "Locked" : "Apply"}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
