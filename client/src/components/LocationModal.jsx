import { AnimatePresence, motion } from "framer-motion";

import { MapPin, X, LocateFixed } from "lucide-react";

import { useEffect, useState } from "react";

import LocationPicker from "./LocationPicker";

export default function LocationModal({ open, onClose, onSave, darkMode }) {
  const [position, setPosition] = useState(null);

  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAddress() {
      if (!position) return;

      try {
        setLoading(true);

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`,
        );

        const data = await res.json();

        setAddress(data.display_name);

        setLoading(false);
      } catch (err) {
        console.log(err);

        setLoading(false);
      }
    }

    fetchAddress();
  }, [position]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* OVERLAY */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[100]"
          />

          {/* SHEET */}

          <motion.div
            initial={{
              y: "100%",
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: "100%",
            }}
            transition={{
              type: "spring",
              damping: 24,
            }}
            className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto rounded-t-[34px] z-[101] overflow-hidden ${
              darkMode ? "bg-[#111827]" : "bg-white"
            }`}
          >
            {/* HANDLE */}

            <div className="flex justify-center pt-3">
              <div className="h-1.5 w-16 rounded-full bg-gray-300" />
            </div>

            {/* HEADER */}

            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">Select Location</h2>

                <p
                  className={`text-sm mt-1 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Drag pin for accurate delivery
                </p>
              </div>

              <button
                onClick={onClose}
                className="h-11 w-11 rounded-2xl bg-black/5 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            {/* MAP */}

            <div className="px-4 mt-5">
              <LocationPicker setPosition={setPosition} />
            </div>

            {/* ADDRESS */}

            <div className="px-4 mt-4">
              <div
                className={`rounded-[24px] p-4 ${
                  darkMode ? "bg-[#1f2937]" : "bg-[#f8fafc]"
                }`}
              >
                <div className="flex gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-black text-sm">Delivery Address</h2>

                      <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold">
                        Accurate
                      </div>
                    </div>

                    <p
                      className={`text-xs mt-2 leading-6 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {loading
                        ? "Fetching address..."
                        : address || "Move pin to detect address"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* BUTTON */}

            <div className="p-4 pb-8">
              <button
                onClick={() => {
                  if (!address) return;

                  onSave(address);

                  onClose();
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-5 rounded-[24px] font-black shadow-xl flex items-center justify-center gap-2"
              >
                <LocateFixed size={20} />
                Confirm Location
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
