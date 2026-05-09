import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  /* DEMO CART ITEMS */

  const [cartItems, setCartItems] = useState([
    {
      _id: "1",

      quantity: 1,

      name: "Chicken Biryani",

      imageUrl:
        "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?q=80&w=1200&auto=format&fit=crop",

      price: 299,

      description: "Hyderabadi Dum Biryani",
    },

    {
      _id: "2",

      quantity: 2,

      name: "Paneer Butter Masala",

      imageUrl:
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1200&auto=format&fit=crop",

      price: 249,

      description: "Creamy North Indian Curry",
    },

    {
      _id: "3",

      quantity: 1,

      name: "Chocolate Brownie",

      imageUrl:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",

      price: 149,

      description: "Hot Chocolate Dessert",
    },
  ]);

  const [cartCount, setCartCount] = useState(0);

  const [loading, setLoading] = useState(false);

  /* UPDATE COUNT */

  useEffect(() => {
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    setCartCount(count);
  }, [cartItems]);

  /* ADD ITEM */

  function addToCart(item) {
    const exists = cartItems.find((cartItem) => cartItem._id === item._id);

    if (exists) {
      increaseQty(item._id);

      return;
    }

    setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
  }

  /* REMOVE ITEM */

  function removeFromCart(menuItemId) {
    setCartItems((prev) => prev.filter((item) => item._id !== menuItemId));
  }

  /* CLEAR CART */

  function clearCart() {
    setCartItems([]);
  }

  /* INCREASE QUANTITY */

  function increaseQty(menuItemId) {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === menuItemId
          ? {
              ...item,

              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  }

  /* DECREASE QUANTITY */

  function decreaseQty(menuItemId) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === menuItemId
            ? {
                ...item,

                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  /* TOTALS */

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const deliveryFee = subtotal >= 399 ? 0 : 40;

  const taxes = Math.round(subtotal * 0.05);

  const grandTotal = Number(subtotal) + Number(taxes) + Number(deliveryFee);

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
