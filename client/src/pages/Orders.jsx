// ==========================================
// FILE: src/pages/Orders.jsx
// ==========================================

import { useEffect, useState } from "react";

import {
  CheckCircle2,
  Clock3,
  ChefHat,
  Bike,
  Home,
  MapPin,
  CreditCard,
  Phone,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  PackageCheck,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useNavigate } from "react-router-dom";

import useThemeStore from "../store/themeStore";

export default function Orders() {
  const navigate = useNavigate();

  const { darkMode } = useThemeStore();

  /* ORDER */

  const [order, setOrder] = useState({
    id: "#9E5AC",

    restaurant: "Paradise Biryani",

    total: 769,

    payment: "Google Pay",

    eta: "35-40 mins",

    step: 0,

    address: "Home · Ameerpet, Hyderabad",

    rider: "Restaurant preparing your food",

    items: [
      {
        name: "Chicken Biryani",
        qty: 1,
      },

      {
        name: "Veg Biryani",
        qty: 1,
      },

      {
        name: "Raita",
        qty: 1,
      },
    ],
  });

  /* LIVE TRACK */

  const [showLiveMap, setShowLiveMap] = useState(false);

  const [riderAssigned, setRiderAssigned] = useState(false);

  const [riderPosition, setRiderPosition] = useState(8);

  const [distanceAway, setDistanceAway] = useState("2.8 km away");

  /* ORDER STATUS */

  useEffect(() => {
    const timer = setInterval(() => {
      setOrder((prev) => {
        if (prev.step >= 4) return prev;

        const next = prev.step + 1;

        const riderList = [
          "Restaurant preparing your food",
          "Food is being packed",
          "Rahul picked up your order",
          "Rider arriving near your location",
          "Order delivered successfully",
        ];

        const etaList = [
          "35-40 mins",
          "25-30 mins",
          "15-20 mins",
          "5-10 mins",
          "Delivered",
        ];

        return {
          ...prev,

          step: next,

          rider: riderList[next],

          eta: etaList[next],
        };
      });
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  /* RIDER */

  useEffect(() => {
    if (order.step >= 2) {
      setRiderAssigned(true);
    }
  }, [order.step]);

  /* LIVE MAP */

  useEffect(() => {
    if (!showLiveMap) return;

    const tracking = setInterval(() => {
      setRiderPosition((prev) => {
        if (prev >= 80) return prev;

        return prev + 6;
      });

      const values = [
        "2.8 km away",
        "2.1 km away",
        "1.5 km away",
        "900 m away",
        "Arriving soon",
      ];

      setDistanceAway(values[Math.floor(Math.random() * values.length)]);
    }, 4000);

    return () => clearInterval(tracking);
  }, [showLiveMap]);

  /* STEPS */

  const steps = [
    {
      title: "Received",
      icon: CheckCircle2,
    },

    {
      title: "Preparing",
      icon: ChefHat,
    },

    {
      title: "Picked Up",
      icon: Bike,
    },

    {
      title: "Arriving",
      icon: Home,
    },

    {
      title: "Delivered",
      icon: PackageCheck,
    },
  ];

  return (
    <div
      className={`min-h-screen pb-44 ${
        darkMode ? "bg-[#0a101f] text-white" : "bg-[#f4f7fb] text-black"
      }`}
    >
      {/* CONTAINER */}

      <div className="max-w-md mx-auto px-4">
        {/* ORDER CARD */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className={`mt-4 rounded-[34px] overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.04)] ${
            darkMode ? "bg-[#151b29]" : "bg-white"
          }`}
        >
          <div className="p-5">
            <div className="flex items-start gap-4">
              {/* ICON */}

              <div
                className={`h-12 w-12 rounded-2xl text-white flex items-center justify-center flex-shrink-0 ${
                  order.step === 4
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : "bg-gradient-to-r from-orange-500 to-pink-500"
                }`}
              >
                {order.step === 4 ? (
                  <PackageCheck size={24} />
                ) : (
                  <CheckCircle2 size={24} />
                )}
              </div>

              {/* CONTENT */}

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-[22px] font-black leading-tight">
                      {order.step === 4 ? "Order Delivered" : "Order Confirmed"}
                    </h1>

                    <p
                      className={`text-sm mt-1 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {order.restaurant}
                    </p>

                    {order.step === 4 && (
                      <div className="mt-3 bg-green-100 text-green-700 px-3 py-2 rounded-full text-xs font-bold inline-flex items-center gap-2">
                        🎉 Delivered successfully
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <h2 className="font-black text-[20px] text-[#ff6b57]">
                      ₹{order.total}
                    </h2>

                    <p className="text-xs text-gray-400 mt-1">
                      {order.items.length} items
                    </p>
                  </div>
                </div>

                {/* ETA */}

                <div
                  className={`mt-4 rounded-[24px] px-4 py-3 border flex items-center justify-between ${
                    darkMode
                      ? "bg-[#20283b] border-white/5"
                      : "bg-[#fff7f3] border-black/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#fff3ef] text-[#ff6b57] flex items-center justify-center">
                      <Clock3 size={18} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        {order.step === 4 ? "Delivered" : "Arriving in"}
                      </p>

                      <h3 className="font-black text-base">{order.eta}</h3>
                    </div>
                  </div>

                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.step === 4
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {order.step === 4 ? "Completed" : "On Time"}
                  </div>
                </div>

                {/* ORDER ID */}

                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs text-gray-400">Order ID {order.id}</p>

                  <div className="flex items-center gap-1 text-[#ff6b57] text-xs font-bold">
                    <Sparkles size={12} />
                    AI optimized
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* TRACK ORDER */}

        <div
          className={`mt-4 rounded-[34px] p-5 shadow-[0_10px_35px_rgba(0,0,0,0.04)] ${
            darkMode ? "bg-[#151b29]" : "bg-white"
          }`}
        >
          {/* HEADER */}

          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-black text-[24px]">Track Order</h2>

              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Real-time delivery updates
              </p>
            </div>

            <div className="h-11 w-11 rounded-2xl bg-[#fff3ef] text-[#ff6b57] flex items-center justify-center">
              <Bike size={20} />
            </div>
          </div>

          {/* TRACKER */}

          <div className="flex items-center justify-between mt-8 relative">
            <div className="absolute top-5 left-0 w-full h-[3px] bg-gray-200 rounded-full" />

            <motion.div
              animate={{
                width: `${order.step * 25}%`,
              }}
              className="absolute top-5 left-0 h-[3px] bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
            />

            {steps.map((step, index) => {
              const Icon = step.icon;

              const active = order.step === index;

              const completed = order.step > index;

              return (
                <div
                  key={step.title}
                  className="relative z-10 flex flex-col items-center"
                >
                  <motion.div
                    animate={
                      active
                        ? {
                            scale: [1, 1.08, 1],
                          }
                        : {}
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                    }}
                    className={`h-10 w-10 rounded-2xl flex items-center justify-center ${
                      active || completed
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                        : darkMode
                          ? "bg-[#20283b]"
                          : "bg-[#f3f4f6]"
                    }`}
                  >
                    <Icon size={17} />
                  </motion.div>

                  <p
                    className={`text-[11px] tracking-tight font-bold mt-2 ${
                      active ? "text-[#ff6b57]" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* LIVE UPDATE */}

          <div
            className={`mt-7 rounded-[26px] p-4 border ${
              darkMode
                ? "bg-[#20283b] border-white/5"
                : "bg-[#fff7f3] border-black/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center">
                <Bike size={18} />
              </div>

              <div className="flex-1">
                <p className="text-xs text-gray-500">Live Update</p>

                <h3 className="font-semibold text-[15px] mt-1">
                  {order.rider}
                </h3>
              </div>

              {/* ARROW */}

              {order.step >= 2 && order.step !== 4 && (
                <motion.button
                  whileTap={{
                    scale: 0.92,
                  }}
                  onClick={() => setShowLiveMap(!showLiveMap)}
                  className={`h-10 w-10 rounded-xl flex items-center justify-center animate-pulse active:scale-[0.98] transition-all duration-300 ${
                    darkMode ? "bg-[#151b29]" : "bg-white"
                  } shadow-sm`}
                >
                  <motion.div
                    animate={{
                      rotate: showLiveMap ? 180 : 0,
                    }}
                  >
                    <ChevronDown size={18} className="text-[#ff6b57]" />
                  </motion.div>
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* LIVE MAP */}

        <AnimatePresence>
          {showLiveMap && riderAssigned && order.step !== 4 && (
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
              <div
                className={`mt-4 rounded-[34px] overflow-hidden ${
                  darkMode ? "bg-[#151b29]" : "bg-white"
                }`}
              >
                <div className="p-5">
                  {/* MAP HEADER */}

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="font-black text-lg">Live Tracking</h2>

                      <p className="text-xs text-gray-500 mt-1">
                        Rahul is on the way
                      </p>
                    </div>

                    <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">
                      Live
                    </div>
                  </div>

                  {/* MAP */}

                  <div
                    className={`relative h-[210px] rounded-[30px] overflow-hidden shadow-inner ${
                      darkMode ? "bg-[#20283b]" : "bg-[#eef3f8]"
                    }`}
                  >
                    {/* ROADS */}

                    <div className="absolute inset-0 opacity-40">
                      <div className="absolute top-10 left-0 w-full h-[2px] bg-white" />

                      <div className="absolute top-24 left-0 w-full h-[2px] bg-white" />

                      <div className="absolute top-40 left-0 w-full h-[2px] bg-white" />

                      <div className="absolute left-16 top-0 h-full w-[2px] bg-white" />

                      <div className="absolute right-20 top-0 h-full w-[2px] bg-white" />
                    </div>

                    {/* USER */}

                    <div className="absolute right-7 bottom-7 z-20 flex flex-col items-center">
                      <div className="h-14 w-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-xl border-4 border-white">
                        <Home size={22} />
                      </div>
                    </div>

                    {/* RIDER */}

                    <motion.div
                      animate={{
                        left: `${riderPosition}%`,
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                      }}
                      className="absolute top-16 z-20"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-orange-500 opacity-20 animate-ping" />

                        <div className="h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-2xl border-4 border-white relative z-10">
                          <Bike size={22} />
                        </div>
                      </div>
                    </motion.div>

                    {/* RIDER CARD */}

                    <div className="absolute left-5 bottom-5 z-20">
                      <div
                        className={`rounded-[20px] backdrop-blur-xl px-4 py-3 shadow-lg ${
                          darkMode ? "bg-[#151b29]/90" : "bg-white/90"
                        }`}
                      >
                        <p className="text-xs text-gray-500">
                          Delivery Partner
                        </p>

                        <h3 className="font-black text-sm mt-1">Rahul Kumar</h3>

                        <p className="text-xs text-[#ff6b57] font-bold mt-1">
                          {distanceAway}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AI NOTE */}

                  <div
                    className={`mt-4 rounded-[22px] px-4 py-4 text-xs leading-6 ${
                      darkMode
                        ? "bg-[#20283b] text-gray-300"
                        : "bg-[#fff7f3] text-gray-600"
                    }`}
                  >
                    ✨ AI selected the fastest traffic-free delivery route for
                    quicker arrival.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* INFO */}

        <div className="space-y-4 mt-4">
          <InfoCard
            darkMode={darkMode}
            icon={<MapPin size={22} />}
            title="Delivering To"
            value={order.address}
          />

          <InfoCard
            darkMode={darkMode}
            icon={<CreditCard size={22} />}
            title="Payment"
            value={`Paid via ${order.payment} · ₹${order.total}`}
          />
        </div>

        {/* SUPPORT */}

        <div
          className={`mt-4 rounded-[32px] p-5 border ${
            darkMode ? "bg-[#151b29] border-white/5" : "bg-white border-black/5"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-black text-lg">Need Help?</h2>

              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Contact support anytime
              </p>
            </div>

            <button className="h-14 w-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-lg active:scale-[0.98] transition-all duration-300">
              <Phone size={22} />
            </button>
          </div>
        </div>

        {/* PAYMENT */}

        <div
          className={`mt-4 rounded-[32px] p-5 flex items-center gap-4 ${
            darkMode ? "bg-[#151b29]" : "bg-white"
          }`}
        >
          <div className="h-12 w-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
            <ShieldCheck size={22} />
          </div>

          <div>
            <h2 className="font-black text-base">Payment Successful</h2>

            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Your payment was processed securely
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
        <div className="bg-[#111827] rounded-[28px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.18)]">
          <div className="px-4 py-3 flex items-center justify-between">
            {/* LEFT */}

            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-lg">
                {order.step === 4 ? (
                  <PackageCheck size={20} />
                ) : (
                  <Bike size={20} />
                )}
              </div>

              <div>
                <p className="text-xs text-gray-400">Delivery Status</p>

                <h2 className="text-white font-black text-sm mt-1">
                  {order.step === 4 ? "Enjoy your meal 🎉" : order.rider}
                </h2>
              </div>
            </div>

            {/* BUTTON */}

            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg active:scale-[0.98] transition-all duration-300"
            >
              Browse
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* INFO CARD */

function InfoCard({ darkMode, icon, title, value }) {
  return (
    <div
      className={`rounded-[32px] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] ${
        darkMode ? "bg-[#151b29]" : "bg-white"
      }`}
    >
      <div className="flex gap-4">
        <div className="h-12 w-12 rounded-2xl bg-[#fff3ef] text-[#ff6b57] flex items-center justify-center">
          {icon}
        </div>

        <div className="flex-1">
          <p className="text-sm text-gray-500">{title}</p>

          <h3 className="font-black text-base mt-2 leading-7">{value}</h3>
        </div>
      </div>
    </div>
  );
}
