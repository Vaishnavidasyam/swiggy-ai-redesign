import { useState, useEffect } from "react";

import {
  MapPin,
  Plus,
  ChevronRight,
  Home,
  Briefcase,
  Navigation,
  CheckCircle2,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useNavigate } from "react-router-dom";

import useThemeStore from "../store/themeStore";

export default function CheckoutAddress() {
  const navigate = useNavigate();

  const { darkMode } = useThemeStore();

  /* STATES */

  const [selectedAddress, setSelectedAddress] = useState("home");

  const [showForm, setShowForm] = useState(false);

  const [loadingLocation, setLoadingLocation] = useState(false);

  const [currentLocation, setCurrentLocation] = useState("");

  const [deliveryNote, setDeliveryNote] = useState("");

  const [formData, setFormData] = useState({
    label: "",
    address: "",
  });

  const [addresses, setAddresses] = useState([
    {
      id: "home",

      type: "Home",

      icon: Home,

      address: "Madhapur, Hyderabad",

      selected: true,
    },

    {
      id: "office",

      type: "Office",

      icon: Briefcase,

      address: "Hitech City, Hyderabad",

      selected: false,
    },
  ]);

  /* AUTO SAVE */

  useEffect(() => {
    sessionStorage.setItem("selectedAddress", selectedAddress);
  }, [selectedAddress]);

  /* LOCATION */

  function detectLocation() {
    setLoadingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setCurrentLocation(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);

          setLoadingLocation(false);
        },

        () => {
          setLoadingLocation(false);
        },
      );
    }
  }

  /* SAVE ADDRESS */

  function handleSaveAddress() {
    if (!formData.label || !formData.address) return;

    const newAddress = {
      id: Date.now().toString(),

      type: formData.label,

      icon: Home,

      address: formData.address,
    };

    setAddresses([newAddress, ...addresses]);

    setSelectedAddress(newAddress.id);

    setFormData({
      label: "",
      address: "",
    });

    setShowForm(false);
  }

  return (
    <div
      className={`min-h-screen pb-[180px] transition-all duration-300 ${
        darkMode ? "bg-[#0b1220] text-white" : "bg-[#f5f7fb] text-black"
      }`}
    >
      {/* CONTAINER */}

      <div className="max-w-md mx-auto px-4">
        {/* HEADER */}

        <div className="pt-6">
          <h1 className="text-[28px] font-black">Delivery Address</h1>

          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Choose where your order should be delivered
          </p>
        </div>

        {/* CURRENT LOCATION */}

        <motion.div
          whileTap={{
            scale: 0.98,
          }}
          className={`mt-6 rounded-[22px] p-4 shadow-sm flex items-center justify-between ${
            darkMode ? "bg-[#151d2d]" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center">
              <Navigation size={20} />
            </div>

            <div>
              <h2 className="font-black text-[16px]">Use current location</h2>

              <p
                className={`text-xs mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {loadingLocation
                  ? "Detecting..."
                  : currentLocation || "Auto detect your address"}
              </p>
            </div>
          </div>

          <button
            onClick={detectLocation}
            className="bg-[#ff6b57] text-white px-4 py-2 rounded-xl text-sm font-bold"
          >
            Use
          </button>
        </motion.div>

        {/* SAVED */}

        <div className="mt-8 flex items-center justify-between">
          <h2 className="font-black text-xl">Saved Addresses</h2>

          <button className="text-[#ff6b57] text-sm font-bold">Manage</button>
        </div>

        {/* ADDRESS LIST */}

        <div className="space-y-4 mt-5">
          {addresses.map((address) => {
            const Icon = address.icon;

            const active = selectedAddress === address.id;

            return (
              <motion.button
                whileTap={{
                  scale: 0.98,
                }}
                key={address.id}
                onClick={() => setSelectedAddress(address.id)}
                className={`w-full rounded-[22px] p-4 border transition-all duration-300 text-left ${
                  active
                    ? darkMode
                      ? "bg-[#151d2d] border-[#ff6b57]"
                      : "bg-white border-[#ff6b57]"
                    : darkMode
                      ? "bg-[#151d2d] border-transparent"
                      : "bg-white border-transparent"
                } shadow-sm`}
              >
                <div className="flex items-start gap-4">
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

                  {/* INFO */}

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="font-black text-[17px]">{address.type}</h2>

                      {active && (
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold">
                          Delivering here
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-sm mt-1 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {address.address}
                    </p>
                  </div>

                  {/* RADIO */}

                  {active ? (
                    <CheckCircle2 size={22} className="text-green-500" />
                  ) : (
                    <ChevronRight
                      size={20}
                      className={darkMode ? "text-gray-500" : "text-gray-400"}
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* NOTE */}

        <div
          className={`mt-6 rounded-[22px] p-4 shadow-sm ${
            darkMode ? "bg-[#151d2d]" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-[#fff4ef] text-[#ff6b57] flex items-center justify-center">
              <MapPin size={18} />
            </div>

            <div>
              <h2 className="font-black text-[16px]">Delivery Note</h2>

              <p
                className={`text-xs ${
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
            className={`w-full rounded-2xl p-4 outline-none resize-none text-sm ${
              darkMode
                ? "bg-[#1f293d] text-white placeholder:text-gray-500"
                : "bg-[#f8fafc]"
            }`}
          />
        </div>

        {/* ADD NEW */}

        <motion.button
          whileTap={{
            scale: 0.98,
          }}
          onClick={() => setShowForm(!showForm)}
          className={`mt-6 w-full rounded-[22px] border border-dashed p-4 flex items-center justify-between ${
            darkMode
              ? "border-white/10 bg-[#151d2d]"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-[#fff4ef] text-[#ff6b57] flex items-center justify-center">
              <Plus size={20} />
            </div>

            <div className="text-left">
              <h2 className="font-black text-[16px]">Add New Address</h2>

              <p
                className={`text-xs mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Apartment, hostel or hotel
              </p>
            </div>
          </div>

          <ChevronRight size={20} />
        </motion.button>

        {/* FORM */}

        <AnimatePresence>
          {showForm && (
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
                className={`mt-4 rounded-[22px] p-4 shadow-sm ${
                  darkMode ? "bg-[#151d2d]" : "bg-white"
                }`}
              >
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Address label"
                    value={formData.label}
                    onChange={(e) =>
                      setFormData({
                        ...formData,

                        label: e.target.value,
                      })
                    }
                    className={`w-full rounded-2xl px-4 py-4 outline-none text-sm ${
                      darkMode
                        ? "bg-[#1f293d] text-white placeholder:text-gray-500"
                        : "bg-[#f8fafc]"
                    }`}
                  />

                  <textarea
                    rows="3"
                    placeholder="Complete address..."
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,

                        address: e.target.value,
                      })
                    }
                    className={`w-full rounded-2xl px-4 py-4 outline-none resize-none text-sm ${
                      darkMode
                        ? "bg-[#1f293d] text-white placeholder:text-gray-500"
                        : "bg-[#f8fafc]"
                    }`}
                  />

                  <button
                    onClick={handleSaveAddress}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-2xl font-black shadow-lg"
                  >
                    Save Address
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTTOM CTA */}

      <div className="fixed bottom-[92px] left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
        <motion.button
          whileTap={{
            scale: 0.98,
          }}
          onClick={() => navigate("/checkout/payment")}
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-[24px] px-5 py-4 shadow-xl flex items-center justify-between"
        >
          <div className="text-left">
            <p className="text-xs text-orange-100">Delivering to</p>

            <h2 className="font-black text-2xl mt-1">
              {addresses.find((a) => a.id === selectedAddress)?.type}
            </h2>
          </div>

          <div className="flex items-center gap-2 font-black">
            Continue
            <ChevronRight size={20} />
          </div>
        </motion.button>
      </div>
    </div>
  );
}
