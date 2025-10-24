import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, selectedColor = null) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.selectedColor === selectedColor
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { ...product, quantity, selectedColor }];
    });
  };

  const removeFromCart = (productId, selectedColor) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.id === productId && item.selectedColor === selectedColor)
      )
    );
  };

  const updateQuantity = (productId, selectedColor, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
