import { Routes, Route } from "react-router-dom";

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

import useThemeStore from "./store/themeStore";

import Browse from "./pages/Browse";

import AIPage from "./pages/AIPage";

export default function App() {
  const { darkMode } = useThemeStore();

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-[#0b0d11] text-white" : "bg-[#f8f9fc] text-black"
      }`}
    >
      <Layout>
        {/* HEADER */}

        <Header />

        {/* ROUTES */}

        <Routes>
          <Route path="/" element={<RestaurantList />} />

          <Route path="/restaurant/:id" element={<RestaurantMenu />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout/address" element={<CheckoutAddress />} />

          <Route path="/checkout/payment" element={<CheckoutPayment />} />

          <Route path="/order/:id" element={<OrderDetails />} />

          <Route path="/auth" element={<Auth />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/browse" element={<Browse />} />

          <Route path="/ai" element={<AIPage />} />
        </Routes>

        {/* FLOATING BOTTOM NAV */}

        <BottomNav />
      </Layout>
    </div>
  );
}
