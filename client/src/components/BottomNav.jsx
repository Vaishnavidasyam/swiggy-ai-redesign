// src/components/BottomNav.jsx

import {
  House,
  Search,
  ShoppingCart,
  ReceiptText,
  Sparkles,
  LayoutDashboard,
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
      path: "/home",
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
    <>
      {/* MOBILE/TABLET NAV */}

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl xl:hidden">
        <div
          className={`rounded-[32px] px-3 py-4 border backdrop-blur-2xl transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.08)] ${
            darkMode
              ? "bg-[#161b27]/92 border-white/5"
              : "bg-white/82 border-white/60"
          }`}
        >
          {/* NAV */}

          <div className="flex items-center justify-between gap-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;

              const active = location.pathname === item.path;

              return (
                <Link key={index} to={item.path} className="flex-1">
                  {/* ITEM */}

                  <div
                    className={`relative flex flex-col items-center justify-center py-3 rounded-[22px] transition-all duration-300 ${
                      active
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-[0_8px_25px_rgba(255,120,100,0.35)]"
                        : darkMode
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-400 hover:text-[#ff6b57]"
                    }`}
                  >
                    {/* GLOW */}

                    {active && (
                      <div className="absolute inset-0 rounded-[22px] bg-white/10 blur-xl" />
                    )}

                    {/* BADGE */}

                    {item.label === "Cart" && cartCount > 0 && (
                      <div className="absolute top-1 right-3 bg-white text-[#ff6b57] text-[9px] h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center font-black shadow-md z-20">
                        {cartCount}
                      </div>
                    )}

                    {/* ICON */}

                    <Icon
                      size={20}
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
                      className={`relative z-10 text-[11px] mt-1.5 font-semibold tracking-wide ${
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

      {/* DESKTOP SIDEBAR */}

      <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-50">
        <div
          className={`w-[110px] rounded-[36px] p-4 border backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] ${
            darkMode
              ? "bg-[#161b27]/92 border-white/5"
              : "bg-white/85 border-white/60"
          }`}
        >
          {/* LOGO */}

          <div className="flex flex-col items-center pb-5 mb-5 border-b border-white/10">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-white text-2xl font-black shadow-lg">
              S
            </div>

            <h2 className="text-sm font-black mt-3">Swiggy AI</h2>
          </div>

          {/* NAV */}

          <div className="space-y-3">
            {navItems.map((item, index) => {
              const Icon = item.icon;

              const active = location.pathname === item.path;

              return (
                <Link key={index} to={item.path}>
                  <div
                    className={`relative flex flex-col items-center justify-center py-4 rounded-[24px] transition-all duration-300 ${
                      active
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-[0_10px_30px_rgba(255,120,100,0.35)]"
                        : darkMode
                          ? "text-gray-400 hover:bg-white/5 hover:text-white"
                          : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {/* BADGE */}

                    {item.label === "Cart" && cartCount > 0 && (
                      <div className="absolute top-2 right-4 bg-white text-[#ff6b57] text-[10px] h-5 min-w-[18px] px-1 rounded-full flex items-center justify-center font-black shadow-md">
                        {cartCount}
                      </div>
                    )}

                    {/* ICON */}

                    <Icon
                      size={22}
                      strokeWidth={active ? 2.7 : 2.1}
                      className={`transition-all duration-300 ${
                        active ? "scale-110 text-white" : ""
                      }`}
                    />

                    {/* LABEL */}

                    <span className="text-[11px] font-semibold mt-2 tracking-wide">
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ADMIN */}

          <div className="pt-5 mt-5 border-t border-white/10">
            <Link to="/admin">
              <div
                className={`flex flex-col items-center justify-center py-4 rounded-[24px] transition-all duration-300 ${
                  location.pathname === "/admin"
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                    : darkMode
                      ? "text-gray-400 hover:bg-white/5 hover:text-white"
                      : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <LayoutDashboard size={22} />

                <span className="text-[11px] font-semibold mt-2 tracking-wide">
                  Admin
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
