import { ShoppingCart, Moon, Sun } from "lucide-react";

import { Link } from "react-router-dom";

import useThemeStore from "../store/themeStore";

import { useCart } from "../context/CartContext";

export default function Header() {
  const { darkMode, toggleDarkMode } = useThemeStore();

  const { cartCount } = useCart();

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-2xl border-b transition-all duration-300 ${
        darkMode
          ? "bg-[#10141f]/90 border-white/5"
          : "bg-white/75 border-gray-100"
      }`}
    >
      <div className="px-5 py-4 flex items-center justify-between">
        {/* LOCATION */}

        <div>
          <p
            className={`text-xs ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Deliver to
          </p>

          <h2
            className={`font-black text-[28px] leading-none mt-1 ${
              darkMode ? "text-white" : "text-[#111827]"
            }`}
          >
            Hyderabad 📍
          </h2>
        </div>

        {/* ACTIONS */}

        <div className="flex items-center gap-3">
          {/* DARK MODE */}

          <button
            onClick={toggleDarkMode}
            className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
              darkMode
                ? "bg-[#1a2030] text-yellow-400 border border-white/5"
                : "bg-white text-black"
            }`}
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          {/* CART */}

          <Link to="/cart">
            <div
              className={`relative h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
                darkMode
                  ? "bg-[#1a2030] text-white border border-white/5"
                  : "bg-white text-black"
              }`}
            >
              <ShoppingCart size={22} />

              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[10px] h-5 w-5 rounded-full flex items-center justify-center font-black shadow-lg">
                  {cartCount}
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
