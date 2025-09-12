import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => setCart([...cart, item]);
  const updateCart = (id, quantity) =>
    setCart(cart.map(i => i.id === id ? { ...i, quantity } : i));
  const removeFromCart = (id) =>
    setCart(cart.filter(i => i.id !== id));

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
