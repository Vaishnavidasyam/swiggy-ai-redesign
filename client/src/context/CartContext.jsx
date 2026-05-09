import { createContext, useContext, useEffect, useState } from "react";

import api from "../api";

const CartContext = createContext();

export function CartProvider({ children }) {
  /* STATES */

  const [cartItems, setCartItems] = useState([]);

  const [cartCount, setCartCount] = useState(0);

  const [loading, setLoading] = useState(false);

  /* NORMALIZE */

  function normalizeItems(items = []) {
    return items.map((item) => ({
      _id: item.menuItemId?._id,

      quantity: item.quantity || 1,

      name: item.menuItemId?.name || "Food Item",

      imageUrl: item.menuItemId?.imageUrl || "",

      price: item.menuItemId?.price || 0,

      description: item.menuItemId?.description || "",
    }));
  }

  /* FETCH */

  async function fetchCart() {
    try {
      setLoading(true);

      const res = await api.get("/cart");

      const items = normalizeItems(res.data.items || []);

      setCartItems(items);

      const count = items.reduce((acc, item) => acc + item.quantity, 0);

      setCartCount(count);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  /* ADD */

  async function addToCart(menuItemId) {
    try {
      await api.post("/cart/add", {
        menuItemId,

        quantity: 1,
      });

      await fetchCart();
    } catch (err) {
      console.log(err);
    }
  }

  /* REMOVE */

  async function removeFromCart(menuItemId) {
    try {
      await api.delete(`/cart/${menuItemId}`);

      await fetchCart();
    } catch (err) {
      console.log(err);
    }
  }

  /* CLEAR */

  async function clearCart() {
    try {
      await api.delete("/cart/clear");

      setCartItems([]);

      setCartCount(0);
    } catch (err) {
      console.log(err);
    }
  }

  /* INCREASE */

  async function increaseQty(menuItemId) {
    try {
      const existing = cartItems.find((item) => item._id === menuItemId);

      if (!existing) return;

      await api.put("/cart/update", {
        menuItemId,

        quantity: existing.quantity + 1,
      });

      await fetchCart();
    } catch (err) {
      console.log(err);
    }
  }

  /* DECREASE */

  async function decreaseQty(menuItemId) {
    try {
      const existing = cartItems.find((item) => item._id === menuItemId);

      if (!existing) return;

      if (existing.quantity === 1) {
        await removeFromCart(menuItemId);

        return;
      }

      await api.put("/cart/update", {
        menuItemId,

        quantity: existing.quantity - 1,
      });

      await fetchCart();
    } catch (err) {
      console.log(err);
    }
  }

  /* TOTALS */

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const deliveryFee = subtotal >= 399 ? 0 : 40;

  const taxes = Math.round(subtotal * 0.05);

  const grandTotal = Number(subtotal) + Number(taxes) + Number(deliveryFee);

  /* LOAD */

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,

        cartCount,

        loading,

        subtotal,

        taxes,

        deliveryFee,

        grandTotal,

        addToCart,

        removeFromCart,

        clearCart,

        increaseQty,

        decreaseQty,

        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
