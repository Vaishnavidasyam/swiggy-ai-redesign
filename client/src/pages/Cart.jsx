// src/pages/Cart.jsx

import { useMemo, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import api from "../api";

import { useCart } from "../context/CartContext";

import useThemeStore from "../store/themeStore";

import CompactBillSummary from "../components/CompactBillSummary";

import { getAISuggestions } from "../utils/checkoutAI";

export default function Cart() {
  const {
    cartItems = [],
    loading,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const { darkMode } = useThemeStore();

  const [toast, setToast] = useState("");

  const [recommendations, setRecommendations] = useState([]);

  /* LOAD */

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const restRes = await api.get("/restaurants");

        if (restRes.data.length > 0) {
          const restaurantId = restRes.data[0]._id;

          const menuRes = await api.get(`/restaurants/${restaurantId}/menu`);

          setRecommendations(menuRes.data);
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
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const taxes = Math.round(subtotal * 0.05);

  const deliveryFee = subtotal >= 399 ? 0 : 40;

  const savings = 60;

  const total = subtotal + taxes + deliveryFee - savings;

  /* AI */

  const aiSuggestions = getAISuggestions(
    cartItems,
    recommendations,
  );

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
          darkMode
            ? "bg-[#0b1220] text-white"
            : "bg-[#f5f7fb] text-black"
        }`}
      >
        <div className="h-28 w-28 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center shadow-sm">
          <ShoppingBag
            size={44}
            className="text-white"
          />
        </div>

        <h1 className="text-4xl font-black mt-8">
          Cart Empty
        </h1>

        <p
          className={`mt-4 text-sm leading-7 max-w-[300px] ${
            darkMode
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          Add delicious food from nearby restaurants
          and continue checkout.
        </p>

        <Link to="/home">
          <button className="mt-8 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold shadow-sm">
            Explore Food
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pb-[320px] md:pb-[220px] transition-all duration-300 ${
        darkMode
          ? "bg-[#0b1220] text-white"
          : "bg-[#f5f7fb] text-black"
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
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-black text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-md"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOADING */}

      {loading && (
        <div className="flex justify-center pt-10">
          <div className="h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* CONTAINER */}

      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 xl:px-10">
        {/* HEADER */}

        <div
          className={`sticky top-0 z-40 pt-6 pb-5 ${
            darkMode
              ? "bg-[#0b1220]/95"
              : "bg-[#f5f7fb]/95"
          } backdrop-blur-sm`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-5xl font-black leading-none">
                Your Cart
              </h1>

              <p
                className={`text-sm mt-3 ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                {cartItems.length} items ready for
                checkout
              </p>
            </div>

            <div className="h-14 w-14 md:h-16 md:w-16 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-sm">
              <ShoppingBag size={26} />
            </div>
          </div>
        </div>

        {/* MAIN */}

        <div className="grid xl:grid-cols-[1.4fr_0.5fr] gap-6 mt-6">
          {/* LEFT */}

          <div>
            {/* ITEMS */}

            <div className="space-y-5">
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
                    delay: index * 0.04,
                  }}
                  className={`rounded-[32px] border overflow-hidden shadow-sm ${
                    darkMode
                      ? "bg-[#151d2d] border-[#232c3f]"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* IMAGE */}

                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="
                        w-full
                        lg:w-[320px]
                        h-[220px]
                        sm:h-[260px]
                        object-cover
                      "
                    />

                    {/* CONTENT */}

                    <div className="flex-1 p-5 sm:p-7">
                      <div className="flex justify-between gap-4">
                        <div className="flex-1">
                          <div className="inline-flex bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black mb-4">
                            AI Recommended
                          </div>

                          <h2 className="text-[34px] sm:text-3xl font-black leading-tight">
                            {item.name}
                          </h2>

                          <p
                            className={`text-sm mt-3 leading-7 ${
                              darkMode
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            Freshly prepared using
                            premium ingredients &
                            optimized for fast
                            delivery.
                          </p>

                          <h3 className="mt-5 text-3xl sm:text-4xl font-black text-[#ff6b57]">
                            ₹{item.price}
                          </h3>
                        </div>

                        {/* DELETE */}

                        <button
                          onClick={() => {
                            removeFromCart(
                              item._id,
                            );

                            showToast(
                              `${item.name} removed`,
                            );
                          }}
                          className="h-12 w-12 min-w-[48px] rounded-2xl bg-red-50 text-red-500 flex items-center justify-center"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* FOOTER */}

                      <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
                        {/* QUANTITY */}

                        <div className="flex items-center gap-3 bg-[#fff4ef] px-3 py-3 rounded-2xl">
                          <button
                            onClick={() => {
                              decreaseQty(
                                item._id,
                              );

                              showToast(
                                "Quantity updated",
                              );
                            }}
                            className="h-10 w-10 rounded-xl bg-white text-[#ff6b57] flex items-center justify-center shadow-sm"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="font-black text-lg text-[#111827] min-w-[18px] text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => {
                              increaseQty(
                                item._id,
                              );

                              showToast(
                                "Quantity updated",
                              );
                            }}
                            className="h-10 w-10 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-sm"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* TOTAL */}

                        <div className="text-right">
                          <p
                            className={`text-xs mb-1 ${
                              darkMode
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            Total
                          </p>

                          <h2 className="text-3xl md:text-4xl font-black">
                            ₹
                            {item.price *
                              item.quantity}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* SMART INSIGHTS */}

            {aiSuggestions.length > 0 && (
              <div
                className={`mt-8 rounded-[32px] overflow-hidden border shadow-sm ${
                  darkMode
                    ? "bg-[#151d2d] border-[#232c3f]"
                    : "bg-white border-gray-100"
                }`}
              >
                {/* HEADER */}

                <div className="flex items-center justify-between p-5 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center shadow-md">
                      <Sparkles
                        size={22}
                        className="text-white"
                      />
                    </div>

                    <div>
                      <h2 className="text-xl md:text-2xl font-black">
                        Smart Insights
                      </h2>

                      <p
                        className={`text-sm mt-1 ${
                          darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        AI-powered meal
                        intelligence
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:flex bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs font-black">
                    LIVE AI
                  </div>
                </div>

                {/* FEATURED */}

                {aiSuggestions[0] && (
                  <div className="p-4 sm:p-5">
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-orange-500 via-[#ff6b57] to-pink-500 p-5 md:p-6"
                    >
                      <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                        {/* LEFT */}

                        <div className="max-w-2xl">
                          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full text-white text-xs font-black">
                            ✨ AI FEATURED PICK
                          </div>

                          <h2 className="text-2xl md:text-4xl font-black text-white leading-[1.05] mt-5">
                            {
                              aiSuggestions[0]
                                .title
                            }
                          </h2>

                          <p className="text-orange-50 leading-7 mt-5 text-sm md:text-base max-w-xl">
                            {
                              aiSuggestions[0]
                                .subtitle
                            }
                          </p>
                        </div>

                        {/* RIGHT */}

                        <div className="xl:min-w-[260px] w-full">
                          <div className="bg-white/10 backdrop-blur-xl rounded-[26px] p-4 border border-white/10">
                            <img
                              src={
                                aiSuggestions[0]
                                  .item.imageUrl
                              }
                              alt={
                                aiSuggestions[0]
                                  .item.name
                              }
                              className="w-full h-[160px] sm:h-[180px] object-cover rounded-2xl"
                            />

                            <div className="mt-4 flex items-center justify-between">
                              <h3 className="text-white text-2xl font-black">
                                ₹
                                {
                                  aiSuggestions[0]
                                    .item.price
                                }
                              </h3>

                              <div className="bg-white/20 px-3 py-1 rounded-full text-white text-xs font-black">
                                AI
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                addToCart(
                                  aiSuggestions[0]
                                    .item._id,
                                );

                                showToast(
                                  `${aiSuggestions[0].item.name} added`,
                                );
                              }}
                              className="w-full mt-4 bg-white text-[#ff6b57] py-3 rounded-2xl font-black shadow-lg"
                            >
                              Add Recommendation
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT */}

          <div className="xl:sticky xl:top-32 h-fit">
            <CompactBillSummary
              subtotal={subtotal}
              taxes={taxes}
              deliveryFee={deliveryFee}
              savings={savings}
              total={total}
            />
          </div>
        </div>
      </div>

      {/* CHECKOUT */}

      <div className="fixed bottom-[88px] md:bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-40">
        <Link to="/checkout/address">
          <motion.button
            whileTap={{
              scale: 0.98,
            }}
            className="w-full"
          >
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-[24px] px-5 py-4 shadow-[0_10px_40px_rgba(255,110,90,0.35)]">
              <div className="flex items-center justify-between">
                {/* LEFT */}

                <div>
                  <p className="text-[11px] text-orange-100">
                    Total payable
                  </p>

                  <h2 className="text-white text-2xl font-black mt-1">
                    ₹{total}
                  </h2>
                </div>

                {/* RIGHT */}

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-orange-100 text-[11px]">
                      Secure checkout
                    </p>

                    <h3 className="text-white font-black text-base mt-1">
                      Continue
                    </h3>
                  </div>

                  <div className="h-11 w-11 rounded-2xl bg-white/20 flex items-center justify-center">
                    <ArrowRight
                      size={20}
                      className="text-white"
                    />
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
