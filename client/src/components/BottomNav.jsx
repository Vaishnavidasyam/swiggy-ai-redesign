import {
  House,
  Search,
  ShoppingCart,
  ReceiptText,
  Sparkles,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import useThemeStore from "../store/themeStore";

import { useCart } from "../context/CartContext";

export default function BottomNav() {
  /* LOCATION */

  const location = useLocation();

  /* THEME */

  const { darkMode } = useThemeStore();

  /* CART */

  const cartContext = useCart();

  const cartItems = cartContext?.cartItems || [];

  /* COUNT */

  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0)
    : 0;

  /* NAV ITEMS */
  const navItems = [
    {
      icon: House,
      label: "Home",
      path: "/",
    },

    {
      icon: Search,
      label: "Browse",
      path: "/browse",
    },

    {
      icon: Sparkles,
      label: "AI",
      path: "/ai",
    },

    {
      icon: ReceiptText,
      label: "Orders",
      path: "/orders",
    },

    {
      icon: ShoppingCart,
      label: "Cart",
      path: "/cart",
    },
  ];
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md safe-bottom">
      {/* CONTAINER */}

      <div
        className={`rounded-[34px] px-2 py-3 backdrop-blur-2xl border transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.08)] ${
          darkMode
            ? "bg-[#161b27]/92 border-white/5"
            : "bg-white/82 border-white/60"
        }`}
      >
        {/* NAV */}

        <div className="flex items-center justify-between gap-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;

            const active = location.pathname === item.path;

            return (
              <Link key={index} to={item.path} className="flex-1">
                {/* ITEM */}

                <div
                  className={`relative flex flex-col items-center justify-center py-2.5 rounded-[22px] transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-[0_8px_25px_rgba(255,120,100,0.35)]"
                      : darkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-400 hover:text-[#ff6b57]"
                  }`}
                >
                  {/* ACTIVE GLOW */}

                  {active && (
                    <div className="absolute inset-0 rounded-[22px] bg-white/10 blur-xl" />
                  )}

                  {/* CART BADGE */}

                  {item.label === "Cart" && cartCount > 0 && (
                    <div className="absolute top-1 right-3 bg-white text-[#ff6b57] text-[9px] h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center font-black shadow-md z-20">
                      {cartCount}
                    </div>
                  )}

                  {/* ICON */}

                  <Icon
                    size={19}
                    strokeWidth={active ? 2.7 : 2.1}
                    className={`relative z-10 transition-all duration-300 ${
                      active
                        ? "scale-110 text-white"
                        : darkMode
                          ? "text-gray-400"
                          : "text-gray-400"
                    }`}
                  />

                  {/* LABEL */}

                  <span
                    className={`relative z-10 text-[10px] mt-1 font-semibold tracking-wide ${
                      active
                        ? "text-white"
                        : darkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
