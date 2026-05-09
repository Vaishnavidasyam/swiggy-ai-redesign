// ==========================================
// FILE: src/pages/CheckoutAddress.jsx
// ==========================================

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

  /* AI ANALYSIS */

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

  /* SAVE ADDRESS */

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
      className={`min-h-screen pb-[190px] transition-all duration-300 ${
        darkMode ? "bg-[#0b1220] text-white" : "bg-[#f5f7fb] text-black"
      }`}
    >
      {/* CONTAINER */}

      <div className="max-w-md mx-auto px-4">
        {/* HEADER */}

        <div className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[34px] font-black leading-[1.05]">
                Delivery Address
              </h1>

              <p
                className={`text-sm mt-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Choose where your food should arrive
              </p>
            </div>

            <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-lg">
              <MapPin size={24} />
            </div>
          </div>
        </div>

        {/* MAIN CARD */}

        <div
          className={`mt-6 rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.06)] ${
            darkMode ? "bg-[#151d2d]" : "bg-white"
          }`}
        >
          {/* TOP */}

          <div className="p-5 border-b border-black/5">
            <div className="flex items-center justify-between">
              {/* LEFT */}

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center">
                  <MapPin size={20} />
                </div>

                <div>
                  <h2 className="font-black text-[17px]">
                    Add Delivery Address
                  </h2>

                  <p
                    className={`text-xs mt-1 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Live location or manual entry
                  </p>
                </div>
              </div>

              {/* SMART */}

              <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold">
                Smart
              </div>
            </div>
          </div>

          {/* CONTENT */}

          <div className="p-5 space-y-4">
            {/* LIVE LOCATION */}

            <motion.button
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => setShowLocationModal(true)}
              className={`w-full rounded-[26px] p-4 flex items-center justify-between transition-all duration-300 ${
                darkMode ? "bg-[#1b2435]" : "bg-[#f8fafc]"
              }`}
            >
              {/* LEFT */}

              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center">
                  <LocateFixed size={18} />
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h2 className="font-black text-sm">Use Current Location</h2>

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
              className={`w-full rounded-[26px] p-4 flex items-center justify-between transition-all duration-300 ${
                darkMode ? "bg-[#1b2435]" : "bg-[#f8fafc]"
              }`}
            >
              {/* LEFT */}

              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-r from-orange-50 to-pink-50 text-[#ff6b57] flex items-center justify-center">
                  <Plus size={18} />
                </div>

                <div className="text-left">
                  <h2 className="font-black text-sm">Enter Address Manually</h2>

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
                  className="space-y-3 pt-2"
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
                    className={`w-full rounded-[22px] px-4 py-4 outline-none text-sm transition-all duration-300 focus:ring-2 focus:ring-orange-500/20 ${
                      darkMode
                        ? "bg-[#243045] text-white placeholder:text-gray-500"
                        : "bg-[#f1f5f9]"
                    }`}
                  />

                  {/* ADDRESS */}

                  <textarea
                    rows="3"
                    placeholder="Complete address..."
                    value={newAddress.address}
                    onChange={(e) => {
                      setNewAddress({
                        ...newAddress,

                        address: e.target.value,
                      });

                      analyzeAddress(e.target.value);
                    }}
                    className={`w-full rounded-[22px] px-4 py-4 outline-none resize-none text-sm transition-all duration-300 focus:ring-2 focus:ring-orange-500/20 ${
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
                      className={`rounded-[24px] p-4 border ${
                        darkMode
                          ? "bg-[#1b2435] border-white/5"
                          : "bg-gradient-to-r from-orange-50 to-pink-50 border-orange-100"
                      }`}
                    >
                      <div className="flex gap-3">
                        {/* ICON */}

                        <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shrink-0">
                          <Sparkles size={18} />
                        </div>

                        {/* TEXT */}

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

                  {/* SAVE */}

                  <button
                    onClick={saveAddress}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-[22px] font-black shadow-lg"
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
          <h2 className="font-black text-xl">Saved Addresses</h2>

          <button className="text-[#ff6b57] text-sm font-bold">Manage</button>
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
                className={`w-full rounded-[28px] p-4 border transition-all duration-300 text-left shadow-[0_8px_30px_rgba(0,0,0,0.05)] ${
                  active
                    ? darkMode
                      ? "bg-[#151d2d] border-[#ff6b57]"
                      : "bg-white border-[#ff6b57]"
                    : darkMode
                      ? "bg-[#151d2d] border-white/5"
                      : "bg-white border-transparent"
                }`}
              >
                <div className="flex gap-4">
                  {/* ICON */}

                  <div
                    className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
                      active
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : darkMode
                          ? "bg-[#1f293d] text-gray-300"
                          : "bg-[#fff4ef] text-[#ff6b57]"
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  {/* CONTENT */}

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="font-black text-[16px]">{item.title}</h2>

                      {item.preferred && (
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold">
                          Preferred
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-sm mt-1 leading-6 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {item.subtitle}
                    </p>

                    {active && (
                      <div className="mt-3 inline-flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1 rounded-full text-[11px] font-bold">
                        <CheckCircle2 size={13} />
                        Selected for delivery
                      </div>
                    )}
                  </div>

                  {/* ACTIVE */}

                  {active && (
                    <CheckCircle2 size={22} className="text-green-500" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* NOTE */}

        <div
          className={`mt-6 rounded-[28px] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.05)] ${
            darkMode ? "bg-[#151d2d]" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-11 w-11 rounded-xl bg-[#fff4ef] text-[#ff6b57] flex items-center justify-center">
              <Navigation size={18} />
            </div>

            <div>
              <h2 className="font-black text-[16px]">Delivery Note</h2>

              <p
                className={`text-xs mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Landmark or gate details
              </p>
            </div>
          </div>

          <textarea
            rows="2"
            value={deliveryNote}
            onChange={(e) => setDeliveryNote(e.target.value)}
            placeholder="Flat number, gate number..."
            className={`w-full rounded-[22px] px-4 py-4 outline-none resize-none text-sm transition-all duration-300 focus:ring-2 focus:ring-orange-500/20 ${
              darkMode
                ? "bg-[#1f293d] text-white placeholder:text-gray-500"
                : "bg-[#f8fafc]"
            }`}
          />
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

      <div className="fixed bottom-[92px] left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
        <motion.button
          whileTap={{
            scale: 0.98,
          }}
          onClick={() => navigate("/checkout/payment")}
          className="w-full"
        >
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-[30px] px-5 py-4 shadow-[0_18px_50px_rgba(255,120,90,0.28)]">
            <div className="flex items-center justify-between">
              {/* LEFT */}

              <div className="text-left">
                <p className="text-xs text-orange-100">Delivering to</p>

                <h2 className="text-white text-[22px] font-black mt-1">
                  {addresses.find((item) => item.id === selectedAddress)?.title}
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
