import { CheckCircle2, AlertCircle } from "lucide-react";

import { motion } from "framer-motion";

export default function PaymentMethodCard({
  icon,
  title,
  subtitle,
  active,
  recommended,
  disabled,
  disabledReason,
  darkMode,
  onClick,
}) {
  return (
    <motion.button
      whileTap={
        !disabled
          ? {
              scale: 0.98,
            }
          : {}
      }
      disabled={disabled}
      onClick={onClick}
      className={`w-full rounded-[26px] p-4 border transition-all duration-300 text-left ${
        active
          ? "border-[#ff6b57]"
          : darkMode
            ? "border-white/5"
            : "border-gray-100"
      } ${darkMode ? "bg-[#151b29]" : "bg-white"} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        {/* ICON */}

        <div
          className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${
            active
              ? "bg-[#fff3ef] text-[#ff6b57]"
              : darkMode
                ? "bg-[#20283b] text-gray-300"
                : "bg-[#f8fafc] text-gray-600"
          }`}
        >
          {icon}
        </div>

        {/* CONTENT */}

        <div className="flex-1">
          {/* TOP */}

          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-black text-[16px]">{title}</h2>

            {recommended && (
              <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold">
                Recommended
              </div>
            )}
          </div>

          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {subtitle}
          </p>

          {/* DISABLED */}

          {disabled && (
            <div className="flex items-center gap-1 mt-2 text-red-500 text-xs font-medium">
              <AlertCircle size={13} />
              {disabledReason}
            </div>
          )}
        </div>

        {/* RADIO */}

        <div
          className={`h-6 w-6 rounded-full border-2 flex items-center justify-center mt-1 ${
            active ? "border-[#ff6b57]" : "border-gray-300"
          }`}
        >
          {active && <div className="h-3 w-3 rounded-full bg-[#ff6b57]" />}
        </div>
      </div>
    </motion.button>
  );
}
