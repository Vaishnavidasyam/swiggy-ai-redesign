import useThemeStore from "../store/themeStore";

export default function CompactBillSummary({
  subtotal,
  taxes,
  deliveryFee,
  savings,
  total,
  appliedCoupon,
}) {
  const { darkMode } = useThemeStore();

  return (
    <div
      className={`mt-7 rounded-[30px] p-6 shadow-sm ${
        darkMode ? "bg-[#151d2d]" : "bg-white"
      }`}
    >
      {/* HEADER */}

      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-black text-2xl">Bill Summary</h2>

          <p
            className={`text-xs mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Transparent pricing
          </p>
        </div>

        {appliedCoupon && (
          <div className="bg-green-100 text-green-600 px-3 py-2 rounded-2xl text-xs font-bold">
            {appliedCoupon}
          </div>
        )}
      </div>

      {/* ROWS */}

      <BillRow label="Item Total" value={`₹${subtotal}`} darkMode={darkMode} />

      <BillRow
        label="Delivery Fee"
        value={deliveryFee === 0 ? "FREE 🎉" : `₹${deliveryFee}`}
        darkMode={darkMode}
        green={deliveryFee === 0}
      />

      <BillRow
        label="Taxes & Charges"
        value={`₹${taxes}`}
        darkMode={darkMode}
      />

      <BillRow
        label="Savings"
        value={`-₹${savings}`}
        darkMode={darkMode}
        green
      />

      {/* DIVIDER */}

      <div className="border-t border-white/10 my-5" />

      {/* TOTAL */}

      <div className="flex items-center justify-between">
        <div>
          <p
            className={`text-xs ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            To Pay
          </p>

          <h2 className="font-black text-4xl mt-1">₹{total}</h2>
        </div>

        <div className="text-right">
          <h3 className="text-green-500 font-black text-xl">₹{savings}</h3>

          <p className="text-xs text-green-500 font-semibold mt-1">You Saved</p>
        </div>
      </div>

      {/* TRUST */}

      <div
        className={`mt-5 rounded-2xl px-4 py-3 text-sm font-semibold ${
          darkMode ? "bg-[#1f293d] text-gray-300" : "bg-[#f8fafc] text-gray-600"
        }`}
      >
        🔒 100% secure payments & encrypted checkout
      </div>
    </div>
  );
}

function BillRow({ label, value, darkMode, green }) {
  return (
    <div className="flex items-center justify-between py-3">
      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        {label}
      </p>

      <p className={`font-bold ${green ? "text-green-500" : ""}`}>{value}</p>
    </div>
  );
}
