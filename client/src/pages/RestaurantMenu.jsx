// src/pages/RestaurantMenu.jsx

import { useEffect, useMemo, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Sparkles,
  Star,
  Plus,
  Heart,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import api from "../api";

import { useCart } from "../context/CartContext";

import useThemeStore from "../store/themeStore";

export default function RestaurantMenu() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { darkMode } = useThemeStore();

  const [restaurant, setRestaurant] = useState(null);

  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("Recommended");

  const [addingItem, setAddingItem] = useState("");

  const [toast, setToast] = useState("");

  const {
    cartCount,
    addToCart,
    decreaseQty,
    cartItems = [],
    grandTotal,
  } = useCart();

  /* LOAD */

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const restRes = await api.get("/restaurants");

        const found = restRes.data.find((r) => r._id === id);

        setRestaurant(found);

        const menuRes = await api.get(`/restaurants/${id}/menu`);

        setItems(menuRes.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  /* TABS */

  const tabs = ["Recommended", "Biryani", "Pizza", "Desserts", "Drinks"];

  /* FILTER */

  const filteredItems = useMemo(() => {
    if (activeTab === "Recommended") return items;

    return items.filter((item) =>
      item.name?.toLowerCase().includes(activeTab.toLowerCase()),
    );
  }, [items, activeTab]);

  /* ADD */

  async function handleAdd(itemId, itemName) {
    try {
      setAddingItem(itemId);

      await addToCart(itemId);

      setToast(`${itemName} added to cart`);

      setTimeout(() => setToast(""), 1400);
    } catch (err) {
      console.log(err);
    } finally {
      setAddingItem("");
    }
  }

  /* GET QTY */

  function getItemQty(itemId) {
    const found = cartItems.find((item) => item._id === itemId);

    return found ? found.quantity : 0;
  }

  /* LOADING */

  if (loading) {
    return (
      <div
        className={`min-h-screen ${darkMode ? "bg-[#0b1220]" : "bg-[#f5f7fb]"}`}
      >
        <div className="max-w-md mx-auto px-4 pt-5 space-y-5 animate-pulse">
          <div className="h-[260px] rounded-[32px] bg-gray-300" />

          <div className="h-32 rounded-[28px] bg-gray-200" />

          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-[28px] overflow-hidden bg-gray-200">
              <div className="h-56 bg-gray-300" />

              <div className="p-5">
                <div className="h-5 w-1/2 bg-gray-300 rounded-full" />

                <div className="h-4 w-full bg-gray-200 rounded-full mt-4" />

                <div className="h-4 w-2/3 bg-gray-200 rounded-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* NOT FOUND */

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Restaurant not found
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pb-44 transition-all duration-300 ${
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
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[200] bg-black text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}

      <div className="relative">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-[260px] object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        {/* TOP */}

        <div className="absolute top-5 left-4 right-4 z-20 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="h-11 w-11 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex items-center gap-3">
            <button className="h-11 w-11 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center">
              <Heart size={18} />
            </button>

            <div className="bg-white/15 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl text-white text-sm font-semibold flex items-center gap-2">
              <Clock3 size={15} />
              30-40 mins
            </div>
          </div>
        </div>

        {/* INFO */}

        <div className="absolute bottom-5 left-5 right-5 z-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-[34px] font-black leading-[1.02] text-white">
                {restaurant.name}
              </h1>

              <p className="text-white/80 text-sm mt-2">{restaurant.cuisine}</p>
            </div>

            <div className="bg-green-500 px-3 py-2 rounded-2xl flex items-center gap-1 text-white font-bold text-sm shadow-lg">
              <Star size={14} fill="white" />
              {restaurant.rating}
            </div>
          </div>

          {/* TAGS */}

          <div className="flex gap-2 mt-5 overflow-x-auto no-scrollbar">
            {[
              "🔥 Trending",
              "⚡ Fast Delivery",
              "🥘 Bestseller",
              "🤖 AI Picks",
            ].map((tag) => (
              <div
                key={tag}
                className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-xl border border-white/10 text-xs text-white whitespace-nowrap"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI CARD */}

      <div className="px-4 mt-5">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-[28px] p-5 shadow-[0_14px_40px_rgba(255,120,90,0.18)]"
        >
          <div className="flex items-center gap-2">
            <Sparkles size={17} className="text-white" />

            <span className="text-white text-sm font-bold tracking-wide">
              AI RECOMMENDATION
            </span>
          </div>

          <h2 className="text-white text-[22px] font-black mt-4 leading-tight">
            Perfect combo for tonight 🍛
          </h2>

          <p className="text-orange-50 text-sm leading-7 mt-3">
            Most users pair Chicken Biryani with Raita and Gulab Jamun.
          </p>
        </motion.div>
      </div>

      {/* TABS */}

      <div
        className={`sticky top-[70px] z-40 px-4 py-4 backdrop-blur-xl ${
          darkMode ? "bg-[#0b1220]/90" : "bg-[#f5f7fb]/90"
        }`}
      >
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm whitespace-nowrap font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                  : darkMode
                    ? "bg-[#151d2d] text-gray-300"
                    : "bg-white text-black shadow-sm"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ITEMS */}

      <div className="px-4 mt-2">
        {filteredItems.map((item, index) => {
          const qty = getItemQty(item._id);

          return (
            <motion.div
              key={item._id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              className={`rounded-[30px] overflow-hidden mb-5 transition-all duration-300 ${
                darkMode ? "bg-[#151d2d]" : "bg-white"
              } shadow-[0_10px_35px_rgba(0,0,0,0.06)]`}
            >
              {/* IMAGE */}

              <div className="relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-[220px] object-cover"
                />

                {/* ADD / QUANTITY */}

                <div className="absolute bottom-4 right-4">
                  {qty > 0 ? (
                    <div className="flex items-center gap-4 bg-white rounded-2xl px-4 py-3 shadow-2xl">
                      {/* MINUS */}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          decreaseQty(item._id);
                        }}
                        className="h-7 w-7 rounded-full bg-[#fff3ef] text-[#ff6b57] flex items-center justify-center font-black text-lg"
                      >
                        -
                      </button>

                      {/* QTY */}

                      <span className="font-black text-lg text-[#111827] min-w-[16px] text-center">
                        {qty}
                      </span>

                      {/* PLUS */}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          handleAdd(item._id, item.name);
                        }}
                        disabled={addingItem === item._id}
                        className="h-7 w-7 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center font-black text-lg"
                      >
                        {addingItem === item._id ? (
                          <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          "+"
                        )}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAdd(item._id, item.name)}
                      disabled={addingItem === item._id}
                      className="min-w-[116px] px-5 py-3 rounded-2xl font-black shadow-xl flex items-center justify-center gap-2 transition-all duration-300 bg-white text-orange-500"
                    >
                      {addingItem === item._id ? (
                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Plus size={18} />
                          ADD
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* CONTENT */}

              <div className="p-5">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h2 className="font-black text-[24px] leading-tight">
                      {item.name}
                    </h2>

                    <p
                      className={`text-sm mt-3 leading-7 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {item.description}
                    </p>

                    <div className="flex gap-2 mt-5 flex-wrap">
                      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
                        Bestseller
                      </span>

                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">
                        Quick Delivery
                      </span>

                      <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold">
                        AI Recommended
                      </span>
                    </div>
                  </div>

                  {/* PRICE */}

                  <div className="text-right">
                    <h2 className="font-black text-[28px] text-[#ff6b57]">
                      ₹{item.price}
                    </h2>

                    <p className="text-xs text-gray-400 mt-2">
                      inclusive taxes
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FLOATING CART */}

      {cartCount > 0 && (
        <div className="fixed bottom-[92px] left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
          <motion.button
            initial={{
              y: 100,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() => navigate("/cart")}
            className="w-full"
          >
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-[30px] px-5 py-4 shadow-[0_18px_50px_rgba(255,120,90,0.28)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 min-w-[48px] px-3 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                    <span className="text-white font-black text-lg">
                      {cartCount}
                    </span>
                  </div>

                  <div className="text-left">
                    <h2 className="text-white font-black text-[19px] leading-none">
                      Items added
                    </h2>

                    <p className="text-orange-100 text-sm mt-2">
                      ₹{grandTotal} total
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-orange-100 text-xs">Continue</p>

                    <h3 className="text-white font-black text-lg mt-1">
                      View Cart
                    </h3>
                  </div>

                  <div className="h-11 w-11 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                    <ArrowRight size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.button>
        </div>
      )}
    </div>
  );
}
