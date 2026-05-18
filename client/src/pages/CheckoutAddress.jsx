// src/pages/CheckoutAddress.jsx

import { useState } from "react";

import {
  Home,
  Briefcase,
  Plus,
  MapPin,
  Navigation,
  CheckCircle2,
  ChevronRight,
  LocateFixed,
  Sparkles,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useNavigate } from "react-router-dom";

import useThemeStore from "../store/themeStore";

import LocationModal from "../components/LocationModal";

export default function CheckoutAddress() {
  const navigate = useNavigate();

  const { darkMode } = useThemeStore();

  /* STATES */

  const [selectedAddress, setSelectedAddress] = useState(1);

  const [showForm, setShowForm] = useState(false);

  const [deliveryNote, setDeliveryNote] = useState("");

  const [showLocationModal, setShowLocationModal] = useState(false);

  const [aiHint, setAiHint] = useState("");

  const [aiLabel, setAiLabel] = useState("");

  /* ADDRESSES */

  const [addresses, setAddresses] = useState([
    {
      id: 1,

      title: "Home",

      subtitle: "Madhapur, Hyderabad",

      icon: Home,

      preferred: true,
    },

    {
      id: 2,

      title: "Office",

      subtitle: "Hitech City, Hyderabad",

      icon: Briefcase,

      preferred: false,
    },
  ]);

  /* NEW ADDRESS */

  const [newAddress, setNewAddress] = useState({
    title: "",

    address: "",
  });

  /* AI */

  function analyzeAddress(value) {
    const lower = value.toLowerCase();

    if (lower.includes("hostel")) {
      setAiLabel("Hostel");

      setAiHint("Add room number for faster delivery.");
    } else if (lower.includes("office") || lower.includes("tech")) {
      setAiLabel("Work");

      setAiHint("Traffic delays possible during peak hours.");
    } else if (lower.includes("apartment") || lower.includes("tower")) {
      setAiLabel("Apartment");

      setAiHint("Adding tower and flat number improves delivery accuracy.");
    } else {
      setAiLabel("Home");

      setAiHint("Looks like a residential delivery location.");
    }
  }

  /* SAVE */

  function saveAddress() {
    if (!newAddress.title || !newAddress.address) return;

    const created = {
      id: Date.now(),

      title: newAddress.title,

      subtitle: newAddress.address,

      icon: Home,

      preferred: false,
    };

    setAddresses([created, ...addresses]);

    setSelectedAddress(created.id);

    setNewAddress({
      title: "",

      address: "",
    });

    setAiHint("");

    setShowForm(false);
  }

  return (
    <div
      className={`min-h-screen pb-[220px] transition-all duration-300 ${
        darkMode ? "bg-[#0b1220] text-white" : "bg-[#f5f7fb] text-black"
      }`}
    >
      {/* CONTAINER */}

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 xl:px-10">
        {/* HEADER */}

        <div
          className={`sticky top-0 z-40 pt-6 pb-5 backdrop-blur-xl ${
            darkMode ? "bg-[#0b1220]/90" : "bg-[#f5f7fb]/90"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* LEFT */}

            <div>
              <h1 className="text-4xl md:text-5xl font-black leading-none">
                Delivery Address
              </h1>

              <p
                className={`text-sm mt-3 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Choose where your food should arrive
              </p>
            </div>

            {/* ICON */}

            <div className="h-16 w-16 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-md">
              <MapPin size={28} />
            </div>
          </div>
        </div>

        {/* GRID */}

        <div className="grid xl:grid-cols-[1fr_0.8fr] gap-8 mt-6">
          {/* LEFT */}

          <div>
            {/* MAIN CARD */}

            <div
              className={`rounded-[32px] overflow-hidden shadow-sm border ${
                darkMode
                  ? "bg-[#151d2d] border-[#232c3f]"
                  : "bg-white border-gray-100"
              }`}
            >
              {/* TOP */}

              <div className="p-6 border-b border-black/5">
                <div className="flex items-center justify-between">
                  {/* LEFT */}

                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center">
                      <MapPin size={22} />
                    </div>

                    <div>
                      <h2 className="font-black text-xl">
                        Add Delivery Address
                      </h2>

                      <p
                        className={`text-sm mt-1 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Live location or manual entry
                      </p>
                    </div>
                  </div>

                  {/* BADGE */}

                  <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-xs font-black">
                    Smart
                  </div>
                </div>
              </div>

              {/* CONTENT */}

              <div className="p-6 space-y-5">
                {/* LIVE */}

                <motion.button
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() => setShowLocationModal(true)}
                  className={`w-full rounded-[28px] p-5 flex items-center justify-between transition-all duration-300 ${
                    darkMode ? "bg-[#1b2435]" : "bg-[#f8fafc]"
                  }`}
                >
                  {/* LEFT */}

                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center">
                      <LocateFixed size={18} />
                    </div>

                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h2 className="font-black text-sm">
                          Use Current Location
                        </h2>

                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold">
                          Fastest
                        </span>
                      </div>

                      <p
                        className={`text-xs mt-1 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        GPS powered smart address
                      </p>
                    </div>
                  </div>

                  <ChevronRight size={18} className="text-gray-400" />
                </motion.button>

                {/* DIVIDER */}

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-[1px] bg-black/5" />

                  <span
                    className={`text-xs ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    OR
                  </span>

                  <div className="flex-1 h-[1px] bg-black/5" />
                </div>

                {/* MANUAL */}

                <motion.button
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() => setShowForm(!showForm)}
                  className={`w-full rounded-[28px] p-5 flex items-center justify-between transition-all duration-300 ${
                    darkMode ? "bg-[#1b2435]" : "bg-[#f8fafc]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-[#fff3ef] text-[#ff6b57] flex items-center justify-center">
                      <Plus size={18} />
                    </div>

                    <div className="text-left">
                      <h2 className="font-black text-sm">
                        Enter Address Manually
                      </h2>

                      <p
                        className={`text-xs mt-1 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Apartment, hostel, office...
                      </p>
                    </div>
                  </div>

                  <ChevronRight size={18} className="text-gray-400" />
                </motion.button>

                {/* FORM */}

                <AnimatePresence>
                  {showForm && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: 15,
                      }}
                      className="space-y-4 pt-2"
                    >
                      {/* TITLE */}

                      <input
                        type="text"
                        placeholder="Address label"
                        value={newAddress.title}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,

                            title: e.target.value,
                          })
                        }
                        className={`w-full rounded-[24px] px-5 py-4 outline-none text-sm ${
                          darkMode
                            ? "bg-[#243045] text-white placeholder:text-gray-500"
                            : "bg-[#f1f5f9]"
                        }`}
                      />

                      {/* ADDRESS */}

                      <textarea
                        rows="4"
                        placeholder="Complete address..."
                        value={newAddress.address}
                        onChange={(e) => {
                          setNewAddress({
                            ...newAddress,

                            address: e.target.value,
                          });

                          analyzeAddress(e.target.value);
                        }}
                        className={`w-full rounded-[24px] px-5 py-4 outline-none resize-none text-sm ${
                          darkMode
                            ? "bg-[#243045] text-white placeholder:text-gray-500"
                            : "bg-[#f1f5f9]"
                        }`}
                      />

                      {/* AI */}

                      {aiHint && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          className={`rounded-[26px] p-5 border ${
                            darkMode
                              ? "bg-[#1b2435] border-[#232c3f]"
                              : "bg-[#fff7f3] border-orange-100"
                          }`}
                        >
                          <div className="flex gap-4">
                            <div className="h-11 w-11 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center">
                              <Sparkles size={18} />
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <h2 className="font-black text-sm">
                                  AI Delivery Assist
                                </h2>

                                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold">
                                  {aiLabel}
                                </span>
                              </div>

                              <p
                                className={`text-xs mt-2 leading-6 ${
                                  darkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {aiHint}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* BTN */}

                      <button
                        onClick={saveAddress}
                        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-[24px] font-black shadow-md"
                      >
                        Save Address
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* SAVED */}

            <div className="mt-8 flex items-center justify-between">
              <h2 className="font-black text-2xl">Saved Addresses</h2>

              <button className="text-[#ff6b57] text-sm font-bold">
                Manage
              </button>
            </div>

            {/* LIST */}

            <div className="space-y-4 mt-5">
              {addresses.map((item) => {
                const Icon = item.icon;

                const active = selectedAddress === item.id;

                return (
                  <motion.button
                    key={item.id}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={() => setSelectedAddress(item.id)}
                    className={`w-full rounded-[30px] p-5 border transition-all duration-300 text-left shadow-sm ${
                      active
                        ? darkMode
                          ? "bg-[#151d2d] border-[#ff6b57]"
                          : "bg-white border-[#ff6b57]"
                        : darkMode
                          ? "bg-[#151d2d] border-[#232c3f]"
                          : "bg-white border-gray-100"
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* ICON */}

                      <div
                        className={`h-14 w-14 rounded-2xl flex items-center justify-center ${
                          active
                            ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                            : darkMode
                              ? "bg-[#1f293d] text-gray-300"
                              : "bg-[#fff4ef] text-[#ff6b57]"
                        }`}
                      >
                        <Icon size={22} />
                      </div>

                      {/* CONTENT */}

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h2 className="font-black text-lg">{item.title}</h2>

                          {item.preferred && (
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold">
                              Preferred
                            </span>
                          )}
                        </div>

                        <p
                          className={`text-sm mt-2 leading-7 ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {item.subtitle}
                        </p>

                        {active && (
                          <div className="mt-4 inline-flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1 rounded-full text-[11px] font-bold">
                            <CheckCircle2 size={13} />
                            Selected for delivery
                          </div>
                        )}
                      </div>

                      {active && (
                        <CheckCircle2 size={24} className="text-green-500" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}

          <div className="hidden xl:block">
            <div
              className={`sticky top-32 rounded-[32px] overflow-hidden border shadow-sm ${
                darkMode
                  ? "bg-[#151d2d] border-[#232c3f]"
                  : "bg-white border-gray-100"
              }`}
            >
              {/* IMAGE */}

              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                alt="delivery"
                className="w-full h-[240px] object-cover"
              />

              {/* CONTENT */}

              <div className="p-6">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-2 rounded-full text-xs font-black">
                  ✨ Smart Delivery
                </div>

                <h2 className="text-3xl font-black mt-5 leading-tight">
                  AI optimized delivery routing
                </h2>

                <p
                  className={`mt-4 leading-7 text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Your selected address enables faster rider allocation,
                  optimized ETA predictions, and real-time delivery tracking.
                </p>

                {/* STATS */}

                <div className="grid grid-cols-2 gap-4 mt-7">
                  <div
                    className={`rounded-2xl p-4 ${
                      darkMode ? "bg-[#1b2435]" : "bg-[#fff7f3]"
                    }`}
                  >
                    <p className="text-xs text-gray-400">Avg Delivery</p>

                    <h3 className="text-2xl font-black mt-2">18 mins</h3>
                  </div>

                  <div
                    className={`rounded-2xl p-4 ${
                      darkMode ? "bg-[#1b2435]" : "bg-[#fff7f3]"
                    }`}
                  >
                    <p className="text-xs text-gray-400">AI Accuracy</p>

                    <h3 className="text-2xl font-black mt-2">98%</h3>
                  </div>
                </div>

                {/* FEATURES */}

                <div className="space-y-4 mt-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                      <CheckCircle2 size={18} />
                    </div>

                    <div>
                      <h3 className="font-bold text-sm">
                        Faster rider assignment
                      </h3>

                      <p className="text-xs text-gray-400 mt-1">
                        AI predicts best nearby rider
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <Sparkles size={18} />
                    </div>

                    <div>
                      <h3 className="font-bold text-sm">
                        Smart address parsing
                      </h3>

                      <p className="text-xs text-gray-400 mt-1">
                        Detects flats, towers & landmarks
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOCATION MODAL */}

      <LocationModal
        open={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        darkMode={darkMode}
        onSave={(address) => {
          const live = {
            id: Date.now(),

            title: "Current Location",

            subtitle: address,

            icon: MapPin,

            preferred: true,
          };

          setAddresses([live, ...addresses]);

          setSelectedAddress(live.id);
        }}
      />

      {/* CTA */}

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-50">
        <motion.button
          whileTap={{
            scale: 0.98,
          }}
          onClick={() => navigate("/checkout/payment")}
          className="w-full"
        >
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-[28px] px-6 py-4 shadow-lg">
            <div className="flex items-center justify-between">
              {/* LEFT */}

              <div className="text-left">
                <p className="text-xs text-orange-100">Delivering to</p>

                <h2 className="text-white text-2xl font-black mt-1">
                  {addresses.find((item) => item.id === selectedAddress)?.title}
                </h2>
              </div>

              {/* RIGHT */}

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-orange-100 text-xs">Secure checkout</p>

                  <h3 className="text-white font-black text-lg mt-1">
                    Continue
                  </h3>
                </div>

                <div className="h-11 w-11 rounded-2xl bg-white/20 flex items-center justify-center">
                  <ChevronRight size={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
