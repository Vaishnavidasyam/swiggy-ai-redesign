// src/App.jsx

import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Layout from "./components/Layout";

import Header from "./components/Header";

import BottomNav from "./components/BottomNav";

import RestaurantList from "./pages/RestaurantList";

import RestaurantMenu from "./pages/RestaurantMenu";

import Cart from "./pages/Cart";

import CheckoutAddress from "./pages/CheckoutAddress";

import CheckoutPayment from "./pages/CheckoutPayment";

import OrderDetails from "./pages/OrderDetails";

import Orders from "./pages/Orders";

import Auth from "./pages/Auth";

import AdminDashboard from "./pages/AdminDashboard";

import Browse from "./pages/Browse";

import AIPage from "./pages/AIPage";

import SplashScreen from "./pages/SplashScreen";

import useThemeStore from "./store/themeStore";

export default function App() {
  const { darkMode } = useThemeStore();

  const location = useLocation();

  /* ROUTES */

  const isSplash = location.pathname === "/welcome";

  const isAuth = location.pathname === "/auth";

  /* HIDE NAVIGATION */

  const hideHeader = isSplash || isAuth;

  const hideBottomNav = isSplash || isAuth;

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-[#0b1220] text-white" : "bg-[#f5f7fb] text-black"
      }`}
    >
      <Layout>
        {/* HEADER */}

        {!hideHeader && <Header />}

        {/* ROUTES */}

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* DEFAULT */}

            <Route path="/" element={<Navigate to="/welcome" replace />} />

            {/* SPLASH */}

            <Route path="/welcome" element={<SplashScreen />} />

            {/* HOME */}

            <Route path="/home" element={<RestaurantList />} />

            {/* RESTAURANT */}

            <Route path="/restaurant/:id" element={<RestaurantMenu />} />

            {/* CART */}

            <Route path="/cart" element={<Cart />} />

            {/* CHECKOUT */}

            <Route path="/checkout/address" element={<CheckoutAddress />} />

            <Route path="/checkout/payment" element={<CheckoutPayment />} />

            {/* ORDERS */}

            <Route path="/orders" element={<Orders />} />

            <Route path="/order/:id" element={<OrderDetails />} />

            {/* BROWSE */}

            <Route path="/browse" element={<Browse />} />

            {/* AI */}

            <Route path="/ai" element={<AIPage />} />

            {/* AUTH */}

            <Route path="/auth" element={<Auth />} />

            {/* ADMIN */}

            <Route path="/admin" element={<AdminDashboard />} />

            {/* FALLBACK */}

            <Route path="*" element={<Navigate to="/welcome" replace />} />
          </Routes>
        </AnimatePresence>

        {/* BOTTOM NAV */}

        {!hideBottomNav && <BottomNav />}
      </Layout>
    </div>
  );
}
