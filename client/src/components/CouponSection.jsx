import { BadgePercent, Ticket, Check, ChevronRight } from "lucide-react";

import { motion } from "framer-motion";

import useThemeStore from "../store/themeStore";

export default function CouponSection({
  appliedCoupon,
  setAppliedCoupon,
  setSavings,
}) {
  const { darkMode } = useThemeStore();

  /* COUPONS */

  const coupons = [
    {
      code: "SAVE80",

      title: "Save ₹80 on orders above ₹399",

      savings: 80,

      min: 399,

      tag: "Most Used",
    },

    {
      code: "FREEDEL",

      title: "Free delivery on your order",

      savings: 40,

      min: 199,

      tag: "Free Delivery",
    },

    {
      code: "WELCOME50",

      title: "Flat ₹50 OFF for new users",

      savings: 50,

      min: 149,

      tag: "New User",
    },
  ];

  /* APPLY */

  function applyCoupon(coupon) {
    setAppliedCoupon(coupon.code);

    setSavings(coupon.savings);
  }

  return (
    <div className="mt-7">
      {/* HEADER */}

      <div className="flex items-center gap-3 mb-5">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-lg">
          <BadgePercent size={20} />
        </div>

        <div>
          <h2 className="font-black text-xl">Coupons & Offers</h2>

          <p
            className={`text-xs mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Best offers for your order
          </p>
        </div>
      </div>

      {/* COUPONS */}

      <div className="space-y-4">
        {coupons.map((coupon, index) => {
          const active = appliedCoupon === coupon.code;

          return (
            <motion.div
              key={index}
              whileTap={{
                scale: 0.98,
              }}
              className={`rounded-[28px] p-4 transition-all duration-300 ${
                darkMode ? "bg-[#151d2d]" : "bg-white"
              } shadow-sm border ${
                active
                  ? "border-orange-400"
                  : darkMode
                    ? "border-white/5"
                    : "border-gray-100"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                {/* LEFT */}

                <div className="flex gap-4">
                  {/* ICON */}

                  <div
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center ${
                      active
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : darkMode
                          ? "bg-[#1f293d] text-orange-400"
                          : "bg-orange-50 text-orange-500"
                    }`}
                  >
                    {active ? <Check size={22} /> : <Ticket size={22} />}
                  </div>

                  {/* INFO */}

                  <div>
                    {/* TAG */}

                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold">
                        {coupon.tag}
                      </span>

                      <span
                        className={`text-[11px] font-semibold ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Min ₹{coupon.min}
                      </span>
                    </div>

                    {/* CODE */}

                    <h2 className="font-black text-lg">{coupon.code}</h2>

                    {/* TITLE */}

                    <p
                      className={`text-sm mt-1 leading-6 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {coupon.title}
                    </p>
                  </div>
                </div>

                {/* BUTTON */}

                <button
                  onClick={() => applyCoupon(coupon)}
                  className={`px-5 py-3 rounded-2xl font-black text-sm transition-all duration-300 flex items-center gap-2 ${
                    active
                      ? "bg-green-500 text-white"
                      : "bg-[#ff6b57] text-white"
                  }`}
                >
                  {active ? "Applied" : "Apply"}

                  {!active && <ChevronRight size={16} />}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
