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
  const location = useLocation();

  const { darkMode } = useThemeStore();

  const cartContext = useCart();

  const cartItems = cartContext?.cartItems || [];

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

    /* ADMIN ADDED TO MOBILE ALSO */

    {
      icon: LayoutDashboard,
      label: "Admin",
      path: "/admin",
    },
  ];

  return (
    <>
      {/* ================= MOBILE NAV ================= */}

      <div
        className="
          fixed
          bottom-3
          left-1/2
          -translate-x-1/2
          z-[999]
          w-[95%]
          max-w-2xl
          xl:hidden
        "
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div
          className={`
            rounded-[30px]
            border
            backdrop-blur-2xl
            shadow-[0_15px_40px_rgba(0,0,0,0.15)]
            px-2
            py-2
            transition-all
            duration-300
            ${
              darkMode
                ? "bg-[#101826]/92 border-white/10"
                : "bg-white/85 border-white/60"
            }
          `}
        >
          <div className="grid grid-cols-6 gap-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;

              const active = location.pathname === item.path;

              return (
                <Link key={index} to={item.path}>
                  <div
                    className={`
                      relative
                      flex
                      flex-col
                      items-center
                      justify-center
                      rounded-[20px]
                      py-3
                      transition-all
                      duration-300
                      ${
                        active
                          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-[0_10px_25px_rgba(255,120,100,0.35)]"
                          : darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                      }
                    `}
                  >
                    {/* ACTIVE GLOW */}

                    {active && (
                      <div className="absolute inset-0 rounded-[20px] bg-white/10 blur-xl" />
                    )}

                    {/* CART BADGE */}

                    {item.label === "Cart" && cartCount > 0 && (
                      <div
                        className="
                          absolute
                          top-1
                          right-2
                          bg-white
                          text-[#ff6b57]
                          text-[9px]
                          h-4
                          min-w-[16px]
                          px-1
                          rounded-full
                          flex
                          items-center
                          justify-center
                          font-black
                          shadow-md
                          z-20
                        "
                      >
                        {cartCount}
                      </div>
                    )}

                    {/* ICON */}

                    <Icon
                      size={20}
                      strokeWidth={active ? 2.8 : 2.2}
                      className={`relative z-10 ${
                        active ? "scale-110 text-white" : ""
                      }`}
                    />

                    {/* LABEL */}

                    <span
                      className={`
                        text-[10px]
                        mt-1.5
                        font-semibold
                        relative
                        z-10
                        ${
                          active
                            ? "text-white"
                            : darkMode
                              ? "text-gray-400"
                              : "text-gray-500"
                        }
                      `}
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

      {/* ================= DESKTOP SIDEBAR ================= */}

      <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-50">
        <div
          className={`
            w-[112px]
            rounded-[36px]
            p-4
            border
            backdrop-blur-2xl
            shadow-[0_12px_40px_rgba(0,0,0,0.08)]
            ${
              darkMode
                ? "bg-[#161b27]/92 border-white/5"
                : "bg-white/85 border-white/60"
            }
          `}
        >
          {/* LOGO */}

          <div className="flex flex-col items-center pb-5 mb-5 border-b border-white/10">
            {/* FAVICON */}

            <div
              className="
                h-16
                w-16
                rounded-[22px]
                overflow-hidden
                shadow-lg
                bg-white
                flex
                items-center
                justify-center
              "
            >
              <img
                src="/icons8-swiggy-50.png"
                alt="Swiggy AI"
                className="h-full w-full object-cover"
              />
            </div>

            <h2 className="text-sm font-black mt-3">Swiggy AI</h2>
          </div>

          {/* NAVIGATION */}

          <div className="space-y-3">
            {navItems.map((item, index) => {
              const Icon = item.icon;

              const active = location.pathname === item.path;

              return (
                <Link key={index} to={item.path}>
                  <div
                    className={`
                      relative
                      flex
                      flex-col
                      items-center
                      justify-center
                      py-4
                      rounded-[24px]
                      transition-all
                      duration-300
                      ${
                        active
                          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-[0_10px_30px_rgba(255,120,100,0.35)]"
                          : darkMode
                            ? "text-gray-400 hover:bg-white/5 hover:text-white"
                            : "text-gray-500 hover:bg-gray-100"
                      }
                    `}
                  >
                    {/* BADGE */}

                    {item.label === "Cart" && cartCount > 0 && (
                      <div
                        className="
                          absolute
                          top-2
                          right-4
                          bg-white
                          text-[#ff6b57]
                          text-[10px]
                          h-5
                          min-w-[18px]
                          px-1
                          rounded-full
                          flex
                          items-center
                          justify-center
                          font-black
                          shadow-md
                        "
                      >
                        {cartCount}
                      </div>
                    )}

                    {/* ICON */}

                    <Icon
                      size={22}
                      strokeWidth={active ? 2.8 : 2.2}
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
        </div>
      </div>
    </>
  );
}
