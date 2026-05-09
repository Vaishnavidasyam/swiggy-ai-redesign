import { ArrowRight, Loader2 } from "lucide-react";

import { motion } from "framer-motion";

export default function StickyPayBar({
  total,
  paymentMethod,
  selectedTip,
  processing,
  onPay,
}) {
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
      <motion.button
        whileTap={
          !processing
            ? {
                scale: 0.98,
              }
            : {}
        }
        disabled={processing}
        onClick={onPay}
        className={`w-full rounded-[28px] px-5 py-5 shadow-[0_15px_45px_rgba(255,120,90,0.28)] transition-all duration-300 ${
          processing
            ? "bg-orange-400"
            : "bg-gradient-to-r from-orange-500 to-pink-500"
        } text-white`}
      >
        <div className="flex items-center justify-between">
          {/* LEFT */}

          <div className="text-left">
            <p className="text-xs text-orange-100">To Pay</p>

            <h2 className="text-3xl font-black mt-1">₹{total}</h2>

            {selectedTip > 0 && (
              <p className="text-[11px] text-orange-100 mt-1">
                Includes ₹{selectedTip} tip
              </p>
            )}
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-2 font-black text-lg">
            {processing ? (
              <>
                Processing
                <Loader2 size={20} className="animate-spin" />
              </>
            ) : (
              <>
                Pay via {paymentMethod}
                <ArrowRight size={22} />
              </>
            )}
          </div>
        </div>
      </motion.button>
    </div>
  );
}
