// ==========================================
// FILE: src/pages/Cart.jsx
// ==========================================

import { useMemo, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import api from "../api";

import { useCart } from "../context/CartContext";

import useThemeStore from "../store/themeStore";

import AISavingsCard from "../components/AISavingsCard";

import SmartCouponSection from "../components/SmartCouponSection";

import CompactBillSummary from "../components/CompactBillSummary";

export default function Cart() {
  /* CART */

  const {
    cartItems = [],
    loading,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  /* THEME */

  const { darkMode } = useThemeStore();

  /* STATES */

  const [toast, setToast] = useState("");

  const [notes, setNotes] = useState({});

  const [expandedNote, setExpandedNote] = useState(null);

  const [recommendations, setRecommendations] = useState([]);

  const [appliedCoupon, setAppliedCoupon] = useState("");

  const [savings, setSavings] = useState(0);

  /* LOAD RECOMMENDATIONS */

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const restRes = await api.get("/restaurants");

        if (restRes.data.length > 0) {
          const restaurantId = restRes.data[0]._id;

          const menuRes = await api.get(`/restaurants/${restaurantId}/menu`);

          const suggested = menuRes.data.filter((item) => item.price < 200);

          setRecommendations(suggested.slice(0, 4));
        }
      } catch (err) {
        console.log(err);
      }
    }

    loadRecommendations();
  }, []);

  /* TOTALS */

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + (item.price || 0) * item.quantity,
      0,
    );
  }, [cartItems]);

  const taxes = Math.round(subtotal * 0.05);

  const deliveryFee = subtotal >= 399 ? 0 : 40;

  const total = subtotal + taxes + deliveryFee - savings;

  /* TOAST */

  function showToast(message) {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 1200);
  }

  /* EMPTY */

  if (!loading && cartItems.length === 0) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center px-6 text-center ${
          darkMode ? "bg-[#0b1220] text-white" : "bg-[#f5f7fb] text-black"
        }`}
      >
        <div className="h-32 w-32 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center shadow-xl">
          <ShoppingBag size={54} className="text-white" />
        </div>

        <h1 className="text-4xl font-black mt-8">Cart Empty</h1>

        <p
          className={`mt-4 text-sm leading-7 max-w-[280px] ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Add delicious food from nearby restaurants and continue checkout.
        </p>

        <Link to="/">
          <button className="mt-8 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-[24px] font-black shadow-xl">
            Explore Food
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pb-[240px] transition-all duration-300 ${
        darkMode ? "bg-[#0b1220] text-white" : "bg-[#f5f7fb] text-black"
      }`}
    >
      {/* TOAST */}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-black text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOADING */}

      {loading && (
        <div className="flex justify-center pt-10">
          <div className="h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div className="max-w-md mx-auto px-4">
        {/* HEADER */}

        <div className="sticky top-0 z-40 backdrop-blur-xl pt-5 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[34px] font-black leading-[1.05]">
                Your Cart
              </h1>

              <p
                className={`text-sm mt-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {cartItems.length} items ready for checkout
              </p>
            </div>

            <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-lg">
              <ShoppingBag size={24} />
            </div>
          </div>
        </div>

        {/* AI SAVINGS */}

        <AISavingsCard
          subtotal={subtotal}
          addToCart={addToCart}
          recommendations={recommendations}
        />

        {/* CART ITEMS */}

        <div className="mt-6 space-y-4">
          {cartItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              className={`rounded-[28px] p-4 shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition-all duration-300 ${
                darkMode ? "bg-[#151d2d]" : "bg-white"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* IMAGE */}

                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-[96px] w-[96px] min-w-[96px] rounded-[22px] object-cover bg-gray-200"
                />

                {/* CONTENT */}

                <div className="flex-1 min-w-0">
                  {/* TOP */}

                  <div className="flex justify-between gap-3">
                    <div className="pr-2">
                      <h2 className="font-black text-[17px] leading-6 line-clamp-2">
                        {item.name}
                      </h2>

                      <p
                        className={`text-[11px] mt-1 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Popular item
                      </p>

                      <h3 className="mt-2 font-black text-[20px] text-[#ff6b57]">
                        ₹{item.price}
                      </h3>
                    </div>

                    {/* DELETE */}

                    <button
                      onClick={() => {
                        removeFromCart(item._id);

                        showToast(`${item.name} removed`);
                      }}
                      className="h-10 w-10 min-w-[40px] rounded-xl bg-red-50 text-red-500 flex items-center justify-center"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* QUANTITY */}

                  <div className="mt-4 flex items-center justify-between gap-3">
                    {/* STEPPER */}

                    <div className="flex items-center gap-4 bg-[#fff4ef] px-3 py-2 rounded-2xl">
                      {/* MINUS */}

                      <button
                        onClick={() => {
                          decreaseQty(item._id);

                          showToast("Quantity updated");
                        }}
                        className="h-9 w-9 rounded-xl bg-white text-[#ff6b57] flex items-center justify-center shadow-sm"
                      >
                        <Minus size={15} />
                      </button>

                      {/* COUNT */}

                      <span className="font-black text-base min-w-[18px] text-center text-[#111827]">
                        {item.quantity}
                      </span>

                      {/* PLUS */}

                      <button
                        onClick={() => {
                          increaseQty(item._id);

                          showToast("Quantity updated");
                        }}
                        className="h-9 w-9 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-lg"
                      >
                        <Plus size={15} />
                      </button>
                    </div>

                    {/* TOTAL */}

                    <h2 className="font-black text-[22px] whitespace-nowrap">
                      ₹{item.price * item.quantity}
                    </h2>
                  </div>

                  {/* NOTES */}

                  <div className="mt-3">
                    <button
                      onClick={() =>
                        setExpandedNote(
                          expandedNote === item._id ? null : item._id,
                        )
                      }
                      className="text-[#ff6b57] text-[12px] font-semibold flex items-center gap-1 mt-2"
                    >
                      Add cooking instructions
                      <ChevronDown size={15} />
                    </button>

                    <AnimatePresence>
                      {expandedNote === item._id && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          className="overflow-hidden"
                        >
                          <textarea
                            value={notes[item._id] || ""}
                            onChange={(e) =>
                              setNotes({
                                ...notes,

                                [item._id]: e.target.value,
                              })
                            }
                            placeholder="Less spicy, no onion..."
                            className={`w-full mt-3 rounded-2xl p-4 text-sm outline-none resize-none ${
                              darkMode
                                ? "bg-[#1f293d] text-white placeholder:text-gray-500"
                                : "bg-[#f8fafc]"
                            }`}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* COUPONS */}

        <SmartCouponSection
          subtotal={subtotal}
          appliedCoupon={appliedCoupon}
          setAppliedCoupon={setAppliedCoupon}
          savings={savings}
          setSavings={setSavings}
        />

        {/* COMPLETE MEAL */}

        <div className="mt-7">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-black text-2xl">Complete your meal</h2>

              <p
                className={`text-xs mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Frequently added together
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.map((item) => (
              <motion.div
                key={item._id}
                whileTap={{
                  scale: 0.98,
                }}
                className={`rounded-[24px] p-4 flex items-center justify-between gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.05)] ${
                  darkMode ? "bg-[#151d2d]" : "bg-white"
                }`}
              >
                {/* LEFT */}

                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />

                  <div>
                    <h2 className="font-black">{item.name}</h2>

                    <p
                      className={`text-xs mt-1 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Popular add-on
                    </p>

                    <h3 className="font-black mt-1 text-[#ff6b57]">
                      ₹{item.price}
                    </h3>
                  </div>
                </div>

                {/* ADD */}

                <button
                  onClick={() => {
                    addToCart(item._id);

                    showToast(`${item.name} added`);
                  }}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-3 rounded-2xl font-black shadow-lg"
                >
                  Add
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* BILL */}

      <CompactBillSummary
        subtotal={subtotal}
        taxes={taxes}
        deliveryFee={deliveryFee}
        savings={savings}
        total={total}
        appliedCoupon={appliedCoupon}
      />

      {/* CHECKOUT BAR */}

      <div className="fixed bottom-[92px] left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
        <Link to="/checkout/address">
          <motion.button
            whileTap={{
              scale: 0.98,
            }}
            className="w-full"
          >
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-[30px] px-5 py-4 shadow-[0_18px_50px_rgba(255,120,90,0.28)]">
              <div className="flex items-center justify-between">
                {/* LEFT */}

                <div>
                  <p className="text-xs text-orange-100">Total payable</p>

                  <h2 className="text-white text-[30px] font-black mt-1">
                    ₹{total}
                  </h2>
                </div>

                {/* RIGHT */}

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-orange-100 text-xs">Secure checkout</p>

                    <h3 className="text-white font-black text-lg mt-1">
                      Continue
                    </h3>
                  </div>

                  <div className="h-11 w-11 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                    <ArrowRight size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
