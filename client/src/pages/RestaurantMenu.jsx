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
  Flame,
  ShoppingBag,
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

      setToast(`${itemName} added`);

      setTimeout(() => {
        setToast("");
      }, 1200);
    } catch (err) {
      console.log(err);
    } finally {
      setAddingItem("");
    }
  }

  /* QTY */

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
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-6">
          <div className="animate-pulse">
            <div className="h-[320px] rounded-[34px] bg-gray-300" />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-[28px] overflow-hidden bg-gray-200"
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
          </div>
        </div>
      </div>
    );
  }

  /* NOT FOUND */

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Restaurant not found
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pb-40 transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-[#071120] via-[#0b1220] to-[#111827] text-white"
          : "bg-gradient-to-br from-[#fff8f5] via-[#ffffff] to-[#f5f7fb] text-black"
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

      {/* HERO */}

      <div className="relative">
        {/* IMAGE */}

        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-[260px] md:h-[360px] xl:h-[440px] object-cover"
        />

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

        {/* NAV */}

        <div className="absolute top-5 left-4 right-4 md:left-6 md:right-6 z-20 flex items-center justify-between">
          {/* BACK */}

          <button
            onClick={() => navigate(-1)}
            className="h-11 w-11 rounded-2xl bg-white text-black flex items-center justify-center shadow-lg"
          >
            <ArrowLeft size={18} />
          </button>

          {/* RIGHT */}

          <div className="flex items-center gap-3">
            <button className="h-11 w-11 rounded-2xl bg-white text-black flex items-center justify-center shadow-lg">
              <Heart size={17} className="text-red-500" />
            </button>

            <div className="bg-white px-4 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-lg">
              <Clock3 size={15} />
              30-40 mins
            </div>
          </div>
        </div>

        {/* CONTENT */}

        <div className="absolute bottom-6 left-4 right-4 md:left-6 md:right-6 z-10">
          <div className="max-w-3xl">
            {/* TITLE */}

            <h1 className="text-[34px] md:text-[52px] font-black leading-[0.98] text-white tracking-[-2px]">
              {restaurant.name}
            </h1>

            {/* CUISINE */}

            <p className="text-white/80 text-sm md:text-base mt-4 leading-7">
              {restaurant.cuisine}
            </p>

            {/* META */}

            <div className="flex flex-wrap items-center gap-3 mt-5">
              {/* RATING */}

              <div className="bg-green-500 px-4 py-2 rounded-xl text-white flex items-center gap-2 font-black shadow-lg text-sm">
                <Star size={14} fill="white" />

                {restaurant.rating}
              </div>

              {/* TAG */}

              <div className="bg-white text-[#111827] px-4 py-2 rounded-xl text-xs font-bold shadow-lg">
                🔥 Bestseller
              </div>

              <div className="bg-white text-[#111827] px-4 py-2 rounded-xl text-xs font-bold shadow-lg">
                🤖 AI Picks
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTAINER */}

      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6">
        {/* AI CARD */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-5 rounded-[28px] bg-gradient-to-r from-orange-500 via-[#ff6b57] to-pink-500 p-5 md:p-6 shadow-[0_20px_50px_rgba(255,120,90,0.22)]"
        >
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-white" />

            <span className="text-white text-xs font-black tracking-wide">
              AI RECOMMENDATION
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mt-4">
            {/* LEFT */}

            <div>
              <h2 className="text-white text-2xl md:text-3xl font-black leading-tight">
                Perfect combo for tonight 🍛
              </h2>

              <p className="text-orange-50 text-sm leading-7 mt-3 max-w-2xl">
                Most customers pair Chicken Biryani with Raita & Gulab Jamun.
              </p>
            </div>

            {/* RIGHT */}

            <div className="flex gap-3">
              <MiniInsight title="98%" subtitle="AI Match" />

              <MiniInsight title="20m" subtitle="Fast Delivery" />
            </div>
          </div>
        </motion.div>

        {/* TABS */}

        <div
          className={`sticky top-[72px] z-40 py-5 ${
            darkMode ? "bg-[#0b1220]/90" : "bg-[#f5f7fb]/90"
          } backdrop-blur-xl`}
        >
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 rounded-full text-sm whitespace-nowrap font-bold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                    : darkMode
                      ? "bg-white/[0.05] border border-white/[0.06] text-gray-300"
                      : "bg-white text-black border border-gray-100 shadow-sm"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* MENU */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredItems.map((item, index) => {
            const qty = getItemQty(item._id);

            return (
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
                  delay: index * 0.03,
                }}
                className={`overflow-hidden rounded-[28px] border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] ${
                  darkMode
                    ? "bg-white/[0.04] border-white/[0.06]"
                    : "bg-white border-gray-100"
                }`}
              >
                {/* IMAGE */}

                <div className="relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-[210px] object-cover"
                  />

                  {/* BADGE */}

                  <div className="absolute top-4 left-4 bg-white text-[#ff6b57] px-3 py-2 rounded-full text-[10px] font-black shadow-lg flex items-center gap-1">
                    <Flame size={12} />
                    Trending
                  </div>

                  {/* ACTION */}

                  <div className="absolute bottom-4 right-4">
                    {qty > 0 ? (
                      <div className="flex items-center gap-4 bg-white rounded-2xl px-4 py-3 shadow-xl">
                        {/* MINUS */}

                        <button
                          onClick={() => decreaseQty(item._id)}
                          className="h-7 w-7 rounded-full bg-[#fff3ef] text-[#ff6b57] flex items-center justify-center font-black text-lg"
                        >
                          -
                        </button>

                        {/* QTY */}

                        <span className="font-black text-[#111827] min-w-[14px] text-center">
                          {qty}
                        </span>

                        {/* PLUS */}

                        <button
                          onClick={() => handleAdd(item._id, item.name)}
                          className="h-7 w-7 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center font-black text-lg"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAdd(item._id, item.name)}
                        className="bg-white text-orange-500 min-w-[110px] px-4 py-3 rounded-2xl font-black shadow-xl flex items-center justify-center gap-2"
                      >
                        {addingItem === item._id ? (
                          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Plus size={16} />
                            ADD
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* CONTENT */}

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    {/* LEFT */}

                    <div className="flex-1">
                      <h2 className="text-[22px] font-black leading-tight">
                        {item.name}
                      </h2>

                      <p
                        className={`text-sm leading-7 mt-3 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {item.description}
                      </p>

                      {/* TAGS */}

                      <div className="flex flex-wrap gap-2 mt-4">
                        <Tag text="Bestseller" />

                        <Tag text="AI Pick" />
                      </div>
                    </div>

                    {/* PRICE */}

                    <div className="text-right">
                      <h2 className="text-[30px] font-black text-[#ff6b57]">
                        ₹{item.price}
                      </h2>

                      <p className="text-[11px] text-gray-400 mt-1">
                        incl. taxes
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FLOATING CART */}

      {cartCount > 0 && (
        <div className="fixed bottom-[88px] left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-50">
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
            <div className="bg-gradient-to-r from-orange-500 via-[#ff6b57] to-pink-500 rounded-[26px] px-5 py-4 shadow-[0_20px_50px_rgba(255,120,90,0.35)]">
              <div className="flex items-center justify-between">
                {/* LEFT */}

                <div className="flex items-center gap-4">
                  <div className="h-11 min-w-[46px] px-3 rounded-2xl bg-white/20 flex items-center justify-center">
                    <ShoppingBag size={18} className="text-white" />
                  </div>

                  <div className="text-left">
                    <h2 className="text-white font-black text-sm">
                      {cartCount} items added
                    </h2>

                    <p className="text-orange-100 text-xs mt-1">
                      ₹{grandTotal} total
                    </p>
                  </div>
                </div>

                {/* RIGHT */}

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-orange-100 text-[11px]">Continue</p>

                    <h3 className="text-white font-black text-sm mt-1">
                      View Cart
                    </h3>
                  </div>

                  <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <ArrowRight size={18} className="text-white" />
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

/* MINI INSIGHT */

function MiniInsight({ title, subtitle }) {
  return (
    <div className="bg-white/15 backdrop-blur-lg rounded-2xl px-4 py-3 min-w-[100px] border border-white/10">
      <p className="text-orange-100 text-[11px]">{subtitle}</p>

      <h2 className="text-white text-xl font-black mt-1">{title}</h2>
    </div>
  );
}

/* TAG */

function Tag({ text }) {
  return (
    <div className="bg-gradient-to-r from-orange-100 to-pink-100 text-[#ff6b57] px-3 py-1 rounded-full text-[11px] font-black">
      {text}
    </div>
  );
}
