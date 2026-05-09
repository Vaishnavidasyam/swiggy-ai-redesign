// src/pages/RestaurantDetails.jsx

import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import api from "../api";

import { Star, Clock3, Plus, Sparkles, ArrowRight } from "lucide-react";

import { motion } from "framer-motion";

import { useCart } from "../context/CartContext";

export default function RestaurantDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);

  const [menu, setMenu] = useState([]);

  const { addToCart, cartCount, grandTotal } = useCart();

  /* LOAD */

  useEffect(() => {
    async function loadData() {
      try {
        const restaurantRes = await api.get("/restaurants");

        const found = restaurantRes.data.find((r) => r._id === id);

        setRestaurant(found);

        const menuRes = await api.get(`/restaurants/${id}/menu`);

        setMenu(menuRes.data);
      } catch (err) {
        console.log(err);
      }
    }

    loadData();
  }, [id]);

  /* LOADING */

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc]">
        <div className="h-16 w-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pb-44 bg-[#f8f9fc] min-h-screen">
      {/* HERO */}

      <div className="relative">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-[320px] object-cover"
        />

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* RESTAURANT INFO */}

        <div className="absolute bottom-5 left-4 right-4">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="bg-white/15 backdrop-blur-xl border border-white/10 rounded-[30px] p-5 text-white shadow-xl"
          >
            {/* TOP */}

            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-black leading-tight">
                  {restaurant.name}
                </h1>

                <p className="mt-2 text-white/80 text-sm">
                  {restaurant.cuisine}
                </p>
              </div>

              {/* RATING */}

              <div className="bg-green-500 px-3 py-2 rounded-2xl flex items-center gap-1 shadow-lg">
                <Star size={16} fill="white" />

                <span className="font-bold text-sm">{restaurant.rating}</span>
              </div>
            </div>

            {/* BOTTOM */}

            <div className="flex items-center gap-4 mt-5 flex-wrap">
              <div className="flex items-center gap-2 text-sm">
                <Clock3 size={16} />

                <span>{restaurant.deliveryTime}</span>
              </div>

              <div className="bg-white/10 px-4 py-2 rounded-full text-sm">
                Free Delivery
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-2 rounded-full text-sm font-bold">
                AI Recommended
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MENU */}

      <div className="px-4 mt-7">
        {/* HEADER */}

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[30px] font-black">Recommended</h2>

            <p className="text-sm text-gray-500 mt-1">
              AI personalized picks for you
            </p>
          </div>

          <div className="bg-orange-100 text-orange-500 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
            <Sparkles size={16} />
            AI Picks
          </div>
        </div>

        {/* MENU ITEMS */}

        <div className="space-y-6">
          {menu.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{
                y: -2,
              }}
              className="bg-white rounded-[34px] overflow-hidden shadow-[0_12px_45px_rgba(0,0,0,0.06)]"
            >
              {/* IMAGE */}

              <div className="relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />

                {/* TAG */}

                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                  AI Recommended
                </div>

                {/* ADD BUTTON */}

                <div className="absolute bottom-5 right-5">
                  <motion.button
                    whileTap={{
                      scale: 0.94,
                    }}
                    onClick={() => addToCart(item._id)}
                    className="bg-white text-orange-500 px-6 py-4 rounded-[24px] font-black shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex items-center gap-2"
                  >
                    <Plus size={18} />
                    ADD
                  </motion.button>
                </div>
              </div>

              {/* CONTENT */}

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  {/* LEFT */}

                  <div className="flex-1">
                    <h3 className="text-[34px] leading-none font-black">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 text-sm leading-7 mt-4">
                      {item.description}
                    </p>
                  </div>

                  {/* PRICE */}

                  <div className="text-[32px] font-black text-[#ff6b57]">
                    ₹{item.price}
                  </div>
                </div>

                {/* TAGS */}

                <div className="flex flex-wrap gap-3 mt-6">
                  <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold">
                    Bestseller
                  </div>

                  <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-bold">
                    Fast Delivery
                  </div>

                  <div className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-bold">
                    AI Recommended
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-[30px] px-5 py-4 shadow-[0_14px_40px_rgba(255,120,90,0.28)]">
              <div className="flex items-center justify-between">
                {/* LEFT */}

                <div className="flex items-center gap-4">
                  {/* COUNT */}

                  <div className="h-12 min-w-[50px] px-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <span className="text-white font-black text-lg">
                      {cartCount}
                    </span>
                  </div>

                  {/* TEXT */}

                  <div className="text-left">
                    <h2 className="text-white font-black text-[20px] leading-none">
                      Items added
                    </h2>

                    <p className="text-orange-100 text-sm mt-2">
                      Ready for checkout
                    </p>
                  </div>
                </div>

                {/* RIGHT */}

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-orange-100 text-xs">Total</p>

                    <h3 className="text-white font-black text-2xl mt-1">
                      ₹{grandTotal}
                    </h3>
                  </div>

                  <div className="h-11 w-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
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
