// src/pages/Orders.jsx

import { useEffect, useState } from "react";

import {
  CheckCircle2,
  CookingPot,
  Package,
  Bike,
  Home,
  Clock3,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Store,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useNavigate } from "react-router-dom";

import useThemeStore from "../store/themeStore";

export default function Orders() {
  const navigate = useNavigate();

  const { darkMode } = useThemeStore();

  const order = JSON.parse(localStorage.getItem("latestOrder")) || {};

  const steps = [
    {
      title: "Order Confirmed",
      subtitle: "Restaurant accepted your order",
      icon: <CheckCircle2 size={16} />,
      color: "from-green-500 to-emerald-500",
    },

    {
      title: "Preparing Food",
      subtitle: "Chef is preparing your meal",
      icon: <CookingPot size={16} />,
      color: "from-orange-500 to-amber-500",
    },

    {
      title: "Packing Order",
      subtitle: "Food packed securely",
      icon: <Package size={16} />,
      color: "from-pink-500 to-rose-500",
    },

    {
      title: "Picked Up",
      subtitle: "Rider picked your order",
      icon: <Bike size={16} />,
      color: "from-sky-500 to-cyan-500",
    },

    {
      title: "On The Way",
      subtitle: "Heading to your location",
      icon: <Bike size={16} />,
      color: "from-violet-500 to-purple-500",
    },

    {
      title: "Delivered",
      subtitle: "Enjoy your delicious meal",
      icon: <Home size={16} />,
      color: "from-emerald-500 to-green-500",
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const [riderPosition, setRiderPosition] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }

        return prev;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeStep < 3) return;

    const interval = setInterval(() => {
      setRiderPosition((prev) => {
        if (prev >= 82) return prev;

        return prev + 5;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [activeStep]);

  const showMap = activeStep >= 3 && activeStep < 5;

  return (
    <div
      className={`min-h-screen pb-[260px] md:pb-[180px] transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-[#0b1220] via-[#111827] to-[#151d2d] text-white"
          : "bg-gradient-to-br from-[#fff7f2] via-[#fdfdfd] to-[#f5f7fb]"
      }`}
    >
      {/* CONTAINER */}

      <div className="max-w-[1320px] mx-auto px-4 md:px-6">
        {/* HERO */}

        <div className="pt-6">
          <div className="grid lg:grid-cols-[1fr_260px] gap-4">
            {/* LEFT */}

            <div>
              <motion.div
                key={activeStep}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                }}
              >
                <div
                  className={`inline-flex items-center gap-2 bg-gradient-to-r ${steps[activeStep].color} text-white px-4 py-2 rounded-full text-xs font-black shadow-lg`}
                >
                  ✨ LIVE DELIVERY STATUS
                </div>

                <h1 className="text-[40px] md:text-[52px] leading-none font-black tracking-tight mt-4">
                  {steps[activeStep].title}
                </h1>

                <p
                  className={`mt-3 text-sm max-w-md leading-7 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {steps[activeStep].subtitle}
                </p>
              </motion.div>
            </div>

            {/* PRICE */}

            <div
              className={`rounded-[28px] p-5 border backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] ${
                darkMode
                  ? "bg-white/[0.05] border-white/[0.06]"
                  : "bg-white/80 border-black/[0.04]"
              }`}
            >
              <p className="text-gray-500 text-sm">Total Paid</p>

              <h2 className="text-[42px] font-black mt-3 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                ₹{order.total || 754}
              </h2>

              <div className="mt-5 inline-flex items-center gap-2 bg-green-100 text-green-600 px-3 py-2 rounded-full text-xs font-black">
                <ShieldCheck size={14} />
                Payment Successful
              </div>
            </div>
          </div>
        </div>

        {/* GRID */}

        <div className="grid xl:grid-cols-[1fr_310px] gap-5 mt-5">
          {/* LEFT */}

          <div className="space-y-4">
            {/* AI CARD */}

            <div
              className={`rounded-[32px] overflow-hidden bg-gradient-to-r ${steps[activeStep].color} p-5 text-white relative shadow-[0_20px_50px_rgba(0,0,0,0.12)]`}
            >
              <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full text-xs font-black">
                  🚀 AI DELIVERY ENGINE
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -20,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                  >
                    <h2 className="text-3xl md:text-4xl font-black leading-tight mt-5">
                      {steps[activeStep].title}
                    </h2>

                    <p className="mt-3 text-white/90 max-w-lg text-sm leading-7">
                      {steps[activeStep].subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex flex-wrap gap-3 mt-5">
                  <MiniStat title="ETA" value="28 mins" />

                  <MiniStat title="AI Match" value="98%" />

                  <MiniStat title="Route" value="Fastest" />
                </div>
              </div>
            </div>

            {/* MAP */}

            <AnimatePresence>
              {showMap && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 20,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                >
                  <GlassCard darkMode={darkMode}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-black">Live Map</h2>

                        <p className="text-sm text-gray-500 mt-1">
                          Rider is on the way
                        </p>
                      </div>

                      <div className="bg-green-100 text-green-600 px-3 py-2 rounded-full text-xs font-black">
                        LIVE
                      </div>
                    </div>

                    <div className="relative h-[240px] rounded-[28px] overflow-hidden bg-gradient-to-br from-[#eef5ff] via-[#f7fbff] to-[#edf3f8]">
                      <div className="absolute left-14 right-14 top-1/2 h-2 rounded-full bg-gradient-to-r from-orange-300 to-pink-400" />

                      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20">
                        <div className="h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 border-[4px] border-white shadow-xl flex items-center justify-center text-white">
                          <Store size={18} />
                        </div>
                      </div>

                      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20">
                        <div className="h-14 w-14 rounded-full bg-green-500 border-[4px] border-white shadow-xl flex items-center justify-center text-white">
                          <Home size={18} />
                        </div>
                      </div>

                      <motion.div
                        animate={{
                          left: `${riderPosition}%`,
                        }}
                        transition={{
                          duration: 1.8,
                        }}
                        className="absolute top-1/2 -translate-y-1/2 z-30"
                      >
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-40 scale-150" />

                          <div className="relative h-14 w-14 rounded-full bg-white border-[4px] border-orange-500 shadow-2xl flex items-center justify-center text-orange-500">
                            <Bike size={18} />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>

            {/* TIMELINE */}

            <GlassCard darkMode={darkMode}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black">Order Timeline</h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Real-time delivery updates
                  </p>
                </div>

                <div className="bg-orange-100 text-orange-600 px-3 py-2 rounded-full text-xs font-black">
                  LIVE
                </div>
              </div>

              <div className="mt-7">
                {steps.map((step, index) => {
                  const completed = index <= activeStep;

                  const current = index === activeStep;

                  return (
                    <div
                      key={index}
                      className="flex gap-4 relative pb-4 last:pb-0"
                    >
                      {index !== steps.length - 1 && (
                        <div
                          className={`absolute left-[17px] top-10 w-[3px] h-full rounded-full ${
                            completed
                              ? `bg-gradient-to-b ${step.color}`
                              : "bg-gray-200"
                          }`}
                        />
                      )}

                      <div
                        className={`relative z-10 h-9 w-9 rounded-full flex items-center justify-center shadow-md ${
                          completed
                            ? `bg-gradient-to-r ${step.color} text-white`
                            : "bg-[#eef3f8] text-gray-500"
                        }`}
                      >
                        {step.icon}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`font-black text-[17px] ${
                              current ? "text-[#ff6b57]" : ""
                            }`}
                          >
                            {step.title}
                          </h3>

                          {current && (
                            <div className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-[10px] font-black">
                              LIVE
                            </div>
                          )}
                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            {/* ITEMS */}

            <GlassCard darkMode={darkMode}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black">Ordered Items</h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Freshly prepared meals
                  </p>
                </div>

                <div className="bg-orange-100 text-orange-600 px-3 py-2 rounded-full text-xs font-black">
                  {order.items?.length || 0} Items
                </div>
              </div>

              <div className="space-y-3 mt-5">
                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="
                      bg-gradient-to-br
                      from-white
                      to-[#fff7f3]
                      border
                      border-black/[0.04]
                      rounded-[24px]
                      p-3.5
                      flex
                      items-center
                      gap-4
                    "
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="
                        h-20
                        w-20
                        md:h-24
                        md:w-24
                        rounded-2xl
                        object-cover
                        shrink-0
                      "
                    />

                    <div className="flex-1 min-w-0">
                      <h3
                        className="
                          font-black
                          text-lg
                          md:text-xl
                          leading-tight
                          break-words
                        "
                      >
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-2">
                        Qty {item.qty || item.quantity}
                      </p>
                    </div>

                    <h2
                      className="
                        text-xl
                        md:text-2xl
                        font-black
                        text-[#ff6b57]
                        shrink-0
                      "
                    >
                      ₹{item.price}
                    </h2>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* RIGHT */}

          <div className="space-y-4 xl:sticky xl:top-24 h-fit">
            <InfoCard
              darkMode={darkMode}
              icon={<Clock3 size={18} />}
              title="Estimated Delivery"
              value="28-35 mins"
            />

            <InfoCard
              darkMode={darkMode}
              icon={<ShieldCheck size={18} />}
              title="Payment Method"
              value={order.payment || "Google Pay"}
            />

            <GlassCard darkMode={darkMode}>
              <div className="flex items-center gap-3">
                <Sparkles className="text-orange-500" />

                <h2 className="text-2xl font-black">Smart Insights</h2>
              </div>

              <div className="space-y-3 mt-5">
                <Insight
                  title="Fastest route selected"
                  subtitle="Saved 6 mins delivery time"
                />

                <Insight
                  title="Traffic avoided"
                  subtitle="AI rerouted automatically"
                />

                <Insight
                  title="Fresh preparation priority"
                  subtitle="Prepared last for freshness"
                />
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* RESPONSIVE CTA */}

      <div
        className="
          fixed
          left-0
          right-0
          bottom-[110px]
          md:bottom-6
          z-40
          flex
          justify-center
          px-3
          md:px-6
          pointer-events-none
        "
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="w-full max-w-[720px] pointer-events-auto">
          <motion.button
            whileTap={{ scale: 0.985 }}
            onClick={() => navigate("/home")}
            className="
              relative
              overflow-hidden
              w-full
              rounded-[24px]
              md:rounded-[30px]
              bg-[#0f172a]/95
              backdrop-blur-2xl
              border
              border-white/10
              shadow-[0_20px_60px_rgba(0,0,0,0.35)]
            "
          >
            <div
              className={`
                absolute
                inset-0
                opacity-20
                bg-gradient-to-r
                ${steps[activeStep].color}
              `}
            />

            <div
              className="
                relative
                flex
                items-center
                justify-between
                gap-3
                px-4
                md:px-6
                py-4
                md:py-5
              "
            >
              {/* LEFT */}

              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`
                    h-12
                    w-12
                    md:h-14
                    md:w-14
                    shrink-0
                    rounded-2xl
                    bg-gradient-to-r
                    ${steps[activeStep].color}
                    flex
                    items-center
                    justify-center
                    shadow-lg
                    text-white
                  `}
                >
                  {steps[activeStep].icon}
                </div>

                <div className="min-w-0 text-left">
                  <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wide">
                    Delivery Status
                  </p>

                  <h2
                    className="
                      text-sm
                      md:text-lg
                      font-black
                      text-white
                      truncate
                      mt-1
                    "
                  >
                    {steps[activeStep].title}
                  </h2>
                </div>
              </div>

              {/* RIGHT */}

              <div className="flex items-center gap-2 shrink-0">
                <div className="hidden sm:block text-right">
                  <p className="text-[10px] text-gray-400">Continue browsing</p>

                  <h3 className="text-sm md:text-base font-bold text-white mt-1">
                    Browse Food
                  </h3>
                </div>

                <div
                  className="
                    h-11
                    w-11
                    md:h-12
                    md:w-12
                    rounded-2xl
                    bg-white/10
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    text-white
                  "
                >
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

/* GLASS CARD */

function GlassCard({ children, darkMode }) {
  return (
    <div
      className={`rounded-[28px] p-5 border backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.04)] ${
        darkMode
          ? "bg-white/[0.05] border-white/[0.06]"
          : "bg-white/80 border-black/[0.04]"
      }`}
    >
      {children}
    </div>
  );
}

/* INFO CARD */

function InfoCard({ darkMode, icon, title, value }) {
  return (
    <div
      className={`rounded-[28px] p-5 border backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.04)] ${
        darkMode
          ? "bg-white/[0.05] border-white/[0.06]"
          : "bg-white/80 border-black/[0.04]"
      }`}
    >
      <div className="flex items-center gap-4 min-h-[110px]">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-orange-100 to-pink-100 text-[#ff6b57] flex items-center justify-center">
          {icon}
        </div>

        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="text-2xl font-black mt-2">{value}</h2>
        </div>
      </div>
    </div>
  );
}

/* INSIGHT */

function Insight({ title, subtitle }) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-orange-50 to-pink-50 p-4 border border-orange-100">
      <h3 className="font-bold text-[#ff6b57]">{title}</h3>

      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

/* MINI STAT */

function MiniStat({ title, value }) {
  return (
    <div className="bg-white/15 backdrop-blur-lg rounded-2xl px-4 py-3 min-w-[110px]">
      <p className="text-white/80 text-xs">{title}</p>

      <h2 className="font-black text-xl mt-2">{value}</h2>
    </div>
  );
}
