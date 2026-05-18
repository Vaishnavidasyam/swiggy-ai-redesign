// src/components/Layout.jsx

import useThemeStore from "../store/themeStore";

import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const { darkMode } = useThemeStore();

  const location = useLocation();

  /* FULL WIDTH PAGES */

  const isLanding =
    location.pathname === "/welcome" ||
    location.pathname === "/" ||
    location.pathname === "/auth";

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-[#111827]" : "bg-[#f8f8f8]"
      }`}
    >
      {/* FULL WIDTH */}

      {isLanding ? (
        <div className="w-full min-h-screen">{children}</div>
      ) : (
        /* APP LAYOUT */

        <div
          className={`w-full max-w-7xl mx-auto min-h-screen transition-all duration-300 ${
            darkMode ? "bg-[#111827] text-white" : "bg-[#f8f8f8] text-black"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
