import { createContext, useContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("foodhub_cart")) || []
  );

  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem("foodhub_cart", JSON.stringify(items));
  };

  const addToCart = (item) => {
    const existing = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existing) {
      const updated = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      saveCart(updated);
    } else {
      saveCart([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    saveCart(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    saveCart(
      cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    saveCart(cartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    saveCart([]);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 40;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + gst;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
        subtotal,
        deliveryFee,
        gst,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart(){
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}

export default CartProvider;