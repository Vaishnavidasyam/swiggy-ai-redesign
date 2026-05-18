// src/pages/OrderDetails.jsx

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Bike,
  Clock3,
  Phone,
  ShieldCheck,
  Star,
  ChevronRight,
  MapPin,
  PackageCheck,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import useThemeStore from "../store/themeStore";

import socket from "../socket";

export default function OrderDetails() {
  const navigate = useNavigate();

  const { darkMode } = useThemeStore();

  /* STATUS */

  const [liveStatus, setLiveStatus] = useState("Picked Up 📦");

  const [riderPosition, setRiderPosition] = useState(10);

  /* SOCKET */

  useEffect(() => {
    socket.on("order-status-update", (data) => {
      setLiveStatus(data.status);
    });

    return () => {
      socket.off("order-status-update");
    };
  }, []);

  /* MAP */

  useEffect(() => {
    const interval = setInterval(() => {
      setRiderPosition((prev) => {
        if (prev >= 82) return prev;

        return prev + 4;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  /* ORDER */

  const order = {
    id: "#8G2KP",

    restaurant: "Paradise Biryani",

    rating: 4.7,

    eta: "32 mins",

    total: 769,

    rider: "Rahul Kumar",

    address: "Ameerpet, Hyderabad",

    payment: "Google Pay",

    items: [
      {
        name: "Chicken Biryani",

        qty: 1,

        price: 329,

        image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a",
      },

      {
        name: "Veg Biryani",

        qty: 1,

        price: 259,

        image: "https://images.unsplash.com/photo-1604908554165-e9464d4d26df",
      },

      {
        name: "Raita",

        qty: 1,

        price: 49,

        image: "https://images.unsplash.com/photo-1559847844-d721426d6edc",
      },
    ],
  };

  /* STEPS */

  const steps = [
    "Order Placed ✅",

    "Preparing Food 🍳",

    "Rider Assigned 🛵",

    "Picked Up 📦",

    "Near You 📍",

    "Delivered 🎉",
  ];

  return (
    <div
      className={`min-h-screen pb-[180px] transition-all duration-300 ${
        darkMode ? "bg-[#0b1220] text-white" : "bg-[#f6f8fc] text-black"
      }`}
    >
      {/* CONTAINER */}

      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10">
        {/* HEADER */}

        <div
          className={`sticky top-0 z-40 pt-6 pb-5 backdrop-blur-xl ${
            darkMode ? "bg-[#0b1220]/85" : "bg-[#f6f8fc]/85"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* LEFT */}

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className={`h-12 w-12 rounded-2xl flex items-center justify-center border ${
                  darkMode
                    ? "bg-white/[0.04] border-white/[0.06]"
                    : "bg-white border-black/[0.04]"
                }`}
              >
                <ArrowLeft size={18} />
              </button>

              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                  Live Tracking
                </h1>

                <p
                  className={`text-sm mt-2 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  AI powered delivery updates
                </p>
              </div>
            </div>

            {/* ICON */}

            <div className="hidden md:flex h-16 w-16 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 text-white items-center justify-center shadow-lg">
              <Bike size={26} />
            </div>
          </div>
        </div>

        {/* HERO */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-[#ff6b57] to-pink-500 p-6 md:p-8 mt-4 text-white shadow-xl"
        >
          {/* GLOW */}

          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          {/* CONTENT */}

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
            {/* LEFT */}

            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full text-xs font-bold">
                ✨ AI Delivery
              </div>

              <AnimatePresence mode="wait">
                <motion.h2
                  key={liveStatus}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  className="text-4xl md:text-5xl font-black leading-[1.05] mt-6"
                >
                  {liveStatus}
                </motion.h2>
              </AnimatePresence>

              <p className="text-orange-100 leading-7 mt-5 max-w-xl">
                Rahul is on the way to your location using AI optimized
                traffic-free routing.
              </p>

              {/* STATS */}

              <div className="flex flex-wrap gap-4 mt-8">
                <GlassStat label="ETA" value={order.eta} />

                <GlassStat label="Rider" value="Live" />

                <GlassStat label="Distance" value="2.1 km" />
              </div>
            </div>

            {/* RIGHT */}

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/10 w-full max-w-[300px]">
              <p className="text-orange-100 text-sm">Total Paid</p>

              <h2 className="text-5xl font-black mt-3">₹{order.total}</h2>

              <div className="mt-6 flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl">
                <ShieldCheck size={18} />

                <p className="text-sm font-medium">Secure payment successful</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* MAIN GRID */}

        <div className="grid xl:grid-cols-[1fr_0.42fr] gap-6 mt-6">
          {/* LEFT */}

          <div className="space-y-6">
            {/* LIVE MAP */}

            <GlassCard darkMode={darkMode}>
              {/* HEADER */}

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Live Map</h2>

                  <p
                    className={`text-sm mt-2 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Real-time rider movement
                  </p>
                </div>

                <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-xs font-bold">
                  LIVE
                </div>
              </div>

              {/* MAP */}

              <div
                className={`relative h-[320px] rounded-3xl overflow-hidden ${
                  darkMode ? "bg-[#182033]" : "bg-[#edf2f7]"
                }`}
              >
                {/* ROADS */}

                <div className="absolute inset-0 opacity-40">
                  <div className="absolute top-20 left-0 w-full h-[2px] bg-white" />

                  <div className="absolute top-40 left-0 w-full h-[2px] bg-white" />

                  <div className="absolute left-20 top-0 h-full w-[2px] bg-white" />

                  <div className="absolute right-24 top-0 h-full w-[2px] bg-white" />
                </div>

                {/* USER */}

                <div className="absolute right-8 bottom-8 z-20">
                  <div className="h-16 w-16 rounded-full bg-green-500 border-4 border-white shadow-xl flex items-center justify-center text-white">
                    <MapPin size={24} />
                  </div>
                </div>

                {/* RIDER */}

                <motion.div
                  animate={{
                    left: `${riderPosition}%`,
                  }}
                  transition={{
                    duration: 2.5,
                  }}
                  className="absolute top-20 z-20"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-orange-500 opacity-20 animate-ping" />

                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 border-4 border-white shadow-xl flex items-center justify-center text-white relative z-10">
                      <Bike size={24} />
                    </div>
                  </div>
                </motion.div>

                {/* RIDER CARD */}

                <div className="absolute left-5 bottom-5 z-20">
                  <div
                    className={`rounded-3xl px-5 py-4 backdrop-blur-xl border shadow-sm ${
                      darkMode
                        ? "bg-[#111827]/80 border-white/[0.06]"
                        : "bg-white/90 border-black/[0.04]"
                    }`}
                  >
                    <p className="text-xs text-gray-500">Delivery Partner</p>

                    <h3 className="font-bold text-lg mt-2">{order.rider}</h3>

                    <p className="text-sm text-[#ff6b57] font-medium mt-2">
                      2.1 km away
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* TRACKING */}

            <GlassCard darkMode={darkMode}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Order Status</h2>

                  <p
                    className={`text-sm mt-2 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Real-time delivery progression
                  </p>
                </div>

                <div className="bg-[#fff3ef] text-[#ff6b57] h-14 w-14 rounded-2xl flex items-center justify-center">
                  <PackageCheck size={22} />
                </div>
              </div>

              {/* STEPS */}

              <div className="mt-10 space-y-5">
                {steps.map((step, index) => {
                  const active = steps.indexOf(liveStatus) >= index;

                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div
                        className={`h-5 w-5 rounded-full border-4 transition-all duration-300 ${
                          active
                            ? "bg-gradient-to-r from-orange-500 to-pink-500 border-orange-500"
                            : "border-gray-300"
                        }`}
                      />

                      <p
                        className={`font-medium ${
                          active
                            ? darkMode
                              ? "text-white"
                              : "text-black"
                            : "text-gray-500"
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>

          {/* RIGHT */}

          <div className="space-y-6 xl:sticky xl:top-32 h-fit">
            {/* RESTAURANT */}

            <GlassCard darkMode={darkMode}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{order.restaurant}</h2>

                  <p className="text-sm text-gray-500 mt-3">
                    Order ID {order.id}
                  </p>
                </div>

                <div className="bg-green-500 px-3 py-2 rounded-2xl flex items-center gap-1">
                  <Star size={14} fill="white" className="text-white" />

                  <span className="text-sm font-bold text-white">
                    {order.rating}
                  </span>
                </div>
              </div>

              {/* ETA */}

              <div className="mt-6 flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-[#fff3ef] text-[#ff6b57] flex items-center justify-center">
                  <Clock3 size={22} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Estimated Arrival</p>

                  <h3 className="font-bold text-lg mt-2">{order.eta}</h3>
                </div>
              </div>
            </GlassCard>

            {/* ITEMS */}

            <GlassCard darkMode={darkMode}>
              <h2 className="text-2xl font-bold">Order Items</h2>

              <div className="space-y-4 mt-6">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 rounded-3xl p-4 ${
                      darkMode ? "bg-[#111827]/70" : "bg-[#fafafa]"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-2xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{item.name}</h3>

                      <p className="text-sm text-gray-500 mt-2">
                        Qty {item.qty}
                      </p>
                    </div>

                    <h2 className="font-bold text-xl">₹{item.price}</h2>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* SUPPORT */}

            <GlassCard darkMode={darkMode}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Need Help?</h2>

                  <p
                    className={`text-sm mt-2 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Contact support instantly
                  </p>
                </div>

                <button className="h-14 w-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-lg">
                  <Phone size={20} />
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* FLOATING ACTION */}

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-50">
        <button
          onClick={() => navigate("/orders")}
          className="w-full bg-[#111827] text-white rounded-3xl px-6 py-5 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            {/* LEFT */}

            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center">
                <Bike size={22} />
              </div>

              <div className="text-left">
                <p className="text-xs text-gray-400">Delivery Status</p>

                <h2 className="font-bold text-sm mt-1">Rider arriving soon</h2>
              </div>
            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-2 text-sm font-semibold">
              Orders
              <ChevronRight size={18} />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

/* GLASS CARD */

function GlassCard({ children, darkMode }) {
  return (
    <div
      className={`rounded-3xl p-6 backdrop-blur-xl border shadow-sm ${
        darkMode
          ? "bg-white/[0.04] border-white/[0.06]"
          : "bg-white/80 border-black/[0.04]"
      }`}
    >
      {children}
    </div>
  );
}

/* STATS */

function GlassStat({ label, value }) {
  return (
    <div className="bg-white/15 backdrop-blur-lg px-5 py-4 rounded-2xl">
      <p className="text-orange-100 text-xs">{label}</p>

      <h3 className="font-bold text-2xl mt-1">{value}</h3>
    </div>
  );
}
