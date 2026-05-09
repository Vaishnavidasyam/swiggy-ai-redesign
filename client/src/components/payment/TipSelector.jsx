import { motion } from "framer-motion";

export default function TipSelector({ selectedTip, setSelectedTip, darkMode }) {
  const tips = [0, 20, 40, 60];

  return (
    <div
      className={`rounded-[26px] p-5 ${darkMode ? "bg-[#151b29]" : "bg-white"}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-black text-lg">Delivery Tip</h2>

          <p
            className={`text-xs mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Support your delivery partner
          </p>
        </div>

        {selectedTip > 0 && (
          <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold">
            Includes ₹{selectedTip}
          </div>
        )}
      </div>

      {/* OPTIONS */}

      <div className="flex gap-3 mt-5 overflow-x-auto no-scrollbar">
        {tips.map((tip) => {
          const active = selectedTip === tip;

          return (
            <motion.button
              whileTap={{
                scale: 0.96,
              }}
              key={tip}
              onClick={() => setSelectedTip(tip)}
              className={`px-5 py-3 rounded-2xl whitespace-nowrap text-sm font-black transition-all duration-300 ${
                active
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                  : darkMode
                    ? "bg-[#20283b] text-gray-300"
                    : "bg-[#f8fafc]"
              }`}
            >
              {tip === 0 ? "No Tip" : `₹${tip}`}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
