// src/pages/CheckoutAddress.jsx

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import {
  MapPin,
  Plus,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  LocateFixed,
  Home,
  Briefcase,
} from "lucide-react";

import { motion } from "framer-motion";

import useThemeStore from "../store/themeStore";

export default function CheckoutAddress() {
  const { darkMode } = useThemeStore();

  const [selectedAddress, setSelectedAddress] =
    useState("home");

  const [addresses, setAddresses] = useState([
    {
      id: "home",
      title: "Home",
      address: "Madhapur, Hyderabad",
      icon: Home,
      preferred: true,
    },

    {
      id: "office",
      title: "Office",
      address: "Hitech City, Hyderabad",
      icon: Briefcase,
    },
  ]);

  /* LIVE LOCATION */

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          const live = {
            id: "current",
            title: "Current Location",
            address: "Using GPS location",
            icon: LocateFixed,
          };

          setAddresses((prev) => [live, ...prev]);

          setTimeout(() => {
            setSelectedAddress("current");
          }, 100);
        },

        (err) => {
          console.log(err);
        },
      );
    }
  }, []);

  return (
    <div
      className={`min-h-screen overflow-x-hidden pb-[190px] md:pb-[170px] transition-all duration-300 ${
        darkMode
          ? "bg-[#0b1220] text-white"
          : "bg-[#f5f7fb] text-black"
      }`}
    >
      {/* CONTAINER */}

      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10">
        {/* HEADER */}

        <div className="pt-5 md:pt-6">
          <div className="flex items-start justify-between gap-4">
            {/* LEFT */}

            <div>
              <h1 className="text-[42px] leading-[0.95] md:text-6xl font-black">
                Delivery Address
              </h1>

              <p
                className={`mt-3 text-sm md:text-base ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                Choose where your food should
                arrive
              </p>
            </div>

            {/* ICON */}

            <div
              className="
                h-14
                w-14
                md:h-16
                md:w-16
                rounded-3xl
                bg-gradient-to-r
                from-orange-500
                to-pink-500
                text-white
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <MapPin size={24} />
            </div>
          </div>
        </div>

        {/* GRID */}

        <div className="grid xl:grid-cols-[1fr_0.8fr] gap-5 md:gap-6 mt-6 md:mt-8">
          {/* LEFT */}

          <div>
            {/* ADD ADDRESS */}

            <div
              className={`rounded-[24px] md:rounded-[32px] border overflow-hidden shadow-sm ${
                darkMode
                  ? "bg-[#151d2d] border-[#232c3f]"
                  : "bg-white border-gray-100"
              }`}
            >
              {/* TOP */}

              <div className="p-4 md:p-6 border-b border-white/5">
                <div className="flex items-center justify-between gap-3">
                  {/* LEFT */}

                  <div className="flex items-center gap-4">
                    <div
                      className="
                        h-14
                        w-14
                        md:h-16
                        md:w-16
                        rounded-2xl
                        bg-gradient-to-r
                        from-orange-500
                        to-pink-500
                        text-white
                        flex
                        items-center
                        justify-center
                        shadow-md
                      "
                    >
                      <MapPin size={24} />
                    </div>

                    <div>
                      <h2 className="text-2xl md:text-3xl font-black leading-tight">
                        Add Delivery Address
                      </h2>

                      <p
                        className={`mt-1 text-sm ${
                          darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        Live location or manual
                        entry
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:flex bg-green-100 text-green-600 px-4 py-2 rounded-full text-xs font-black">
                    Smart
                  </div>
                </div>
              </div>

              {/* OPTIONS */}

              <div className="p-4 md:p-6 space-y-4">
                {/* CURRENT */}

                <motion.button
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={`w-full rounded-[22px] md:rounded-[28px] p-4 md:p-5 flex items-center justify-between transition-all ${
                    darkMode
                      ? "bg-[#1b2435]"
                      : "bg-[#f5f7fb]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        h-12
                        w-12
                        md:h-14
                        md:w-14
                        rounded-2xl
                        bg-gradient-to-r
                        from-orange-500
                        to-pink-500
                        text-white
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <LocateFixed size={22} />
                    </div>

                    <div className="text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-black text-lg md:text-xl">
                          Use Current Location
                        </h3>

                        <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-[10px] font-black">
                          Fastest
                        </div>
                      </div>

                      <p
                        className={`text-sm mt-1 ${
                          darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        GPS powered smart address
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-gray-400"
                  />
                </motion.button>

                {/* DIVIDER */}

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-[1px] bg-gray-200" />

                  <span className="text-xs text-gray-400">
                    OR
                  </span>

                  <div className="flex-1 h-[1px] bg-gray-200" />
                </div>

                {/* MANUAL */}

                <motion.button
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={`w-full rounded-[22px] md:rounded-[28px] p-4 md:p-5 flex items-center justify-between transition-all ${
                    darkMode
                      ? "bg-[#1b2435]"
                      : "bg-[#f5f7fb]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        h-12
                        w-12
                        md:h-14
                        md:w-14
                        rounded-2xl
                        bg-[#fff4ef]
                        text-[#ff6b57]
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Plus size={22} />
                    </div>

                    <div className="text-left">
                      <h3 className="font-black text-lg md:text-xl">
                        Enter Address Manually
                      </h3>

                      <p
                        className={`text-sm mt-1 ${
                          darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        Apartment, hostel,
                        office...
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-gray-400"
                  />
                </motion.button>
              </div>
            </div>

            {/* SAVED */}

            <div className="mt-7 md:mt-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-3xl md:text-4xl font-black">
                  Saved Addresses
                </h2>

                <button className="text-[#ff6b57] font-black">
                  Manage
                </button>
              </div>

              {/* LIST */}

              <div className="space-y-4">
                {addresses.map((item) => {
                  const Icon = item.icon;

                  const active =
                    selectedAddress === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      whileTap={{
                        scale: 0.99,
                      }}
                      onClick={() =>
                        setSelectedAddress(item.id)
                      }
                      className={`w-full text-left rounded-[24px] md:rounded-[32px] border p-4 md:p-6 transition-all ${
                        active
                          ? "border-[#ff7a45] shadow-[0_10px_40px_rgba(255,120,100,0.12)]"
                          : darkMode
                            ? "border-[#232c3f] bg-[#151d2d]"
                            : "border-gray-100 bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        {/* LEFT */}

                        <div className="flex items-start gap-4">
                          <div
                            className={`h-16 w-16 md:h-20 md:w-20 rounded-[22px] flex items-center justify-center ${
                              active
                                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                                : darkMode
                                  ? "bg-[#1b2435] text-white"
                                  : "bg-[#fff4ef] text-[#ff6b57]"
                            }`}
                          >
                            <Icon size={28} />
                          </div>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-xl md:text-2xl font-black">
                                {item.title}
                              </h3>

                              {item.preferred && (
                                <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] md:text-xs font-black">
                                  Preferred
                                </div>
                              )}
                            </div>

                            <p
                              className={`mt-2 text-base md:text-lg ${
                                darkMode
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              {item.address}
                            </p>

                            {active && (
                              <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-600 px-3 py-2 rounded-full text-xs md:text-sm font-black">
                                <CheckCircle2 size={14} />
                                Selected for delivery
                              </div>
                            )}
                          </div>
                        </div>

                        {/* RIGHT */}

                        {active && (
                          <div className="h-8 w-8 md:h-10 md:w-10 rounded-full border-4 border-green-500 flex items-center justify-center">
                            <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-green-500" />
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="block">
            <div
              className={`rounded-[24px] md:rounded-[32px] overflow-hidden border shadow-sm ${
                darkMode
                  ? "bg-[#151d2d] border-[#232c3f]"
                  : "bg-white border-gray-100"
              }`}
            >
              {/* IMAGE */}

              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                alt="delivery"
                className="
                  w-full
                  h-[160px]
                  md:h-[240px]
                  object-cover
                "
              />

              {/* CONTENT */}

              <div className="p-5 md:p-6">
                {/* BADGE */}

                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-2 rounded-full text-xs font-black">
                  ✨ Smart Delivery
                </div>

                {/* TITLE */}

                <h2 className="text-[22px] leading-tight md:text-3xl font-black mt-5">
                  AI optimized delivery routing
                </h2>

                {/* TEXT */}

                <p
                  className={`mt-4 leading-8 text-base ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Your selected address enables
                  faster rider allocation,
                  optimized ETA predictions,
                  and real-time delivery
                  tracking.
                </p>

                {/* STATS */}

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div
                    className={`rounded-2xl p-4 ${
                      darkMode
                        ? "bg-[#1b2435]"
                        : "bg-[#fff7f3]"
                    }`}
                  >
                    <p className="text-xs text-gray-400">
                      Avg Delivery
                    </p>

                    <h3 className="text-2xl font-black mt-2">
                      18 mins
                    </h3>
                  </div>

                  <div
                    className={`rounded-2xl p-4 ${
                      darkMode
                        ? "bg-[#1b2435]"
                        : "bg-[#fff7f3]"
                    }`}
                  >
                    <p className="text-xs text-gray-400">
                      AI Accuracy
                    </p>

                    <h3 className="text-2xl font-black mt-2">
                      98%
                    </h3>
                  </div>
                </div>

                {/* FEATURES */}

                <div className="space-y-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                      <CheckCircle2 size={18} />
                    </div>

                    <div>
                      <h3 className="font-bold text-base">
                        Faster rider assignment
                      </h3>

                      <p className="text-sm text-gray-400 mt-1">
                        AI predicts best nearby
                        rider
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <Sparkles size={18} />
                    </div>

                    <div>
                      <h3 className="font-bold text-base">
                        Smart address parsing
                      </h3>

                      <p className="text-sm text-gray-400 mt-1">
                        Detects flats, towers &
                        landmarks
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHECKOUT BAR */}

      <div
        className="
          fixed
          bottom-[92px]
          md:bottom-6
          left-0
          right-0
          z-40
          px-3
          md:px-6
        "
      >
        <div className="max-w-[620px] mx-auto">
          <Link to="/checkout/payment">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <div
                className="
                  bg-gradient-to-r
                  from-orange-500
                  to-pink-500
                  rounded-[22px]
                  md:rounded-[28px]
                  px-4
                  md:px-5
                  py-3
                  md:py-4
                  shadow-[0_10px_35px_rgba(255,110,90,0.3)]
                "
              >
                <div className="flex items-center justify-between">
                  {/* LEFT */}

                  <div>
                    <p className="text-[10px] text-orange-100">
                      Delivering to
                    </p>

                    <h2 className="text-white text-lg md:text-2xl font-black mt-1">
                      {
                        addresses.find(
                          (a) =>
                            a.id ===
                            selectedAddress,
                        )?.title
                      }
                    </h2>
                  </div>

                  {/* RIGHT */}

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-[10px] text-orange-100">
                        Secure checkout
                      </p>

                      <h3 className="text-white font-black text-sm md:text-lg mt-1">
                        Continue
                      </h3>
                    </div>

                    <div
                      className="
                        h-10
                        w-10
                        md:h-12
                        md:w-12
                        rounded-2xl
                        bg-white/20
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <ArrowRight
                        size={18}
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
    </div>
  );
}
