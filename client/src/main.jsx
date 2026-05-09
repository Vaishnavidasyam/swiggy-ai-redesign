import React, { useEffect } from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { CartProvider } from "./context/CartContext";

import App from "./App";

import "./index.css";

import "leaflet/dist/leaflet.css";

/* NOTIFICATION COMPONENT */

function RootApp() {
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <React.StrictMode>
      <CartProvider>
        <BrowserRouter>
          <App />

          <Toaster position="top-center" />
        </BrowserRouter>
      </CartProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<RootApp />);
