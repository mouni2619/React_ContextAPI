import React, { createContext, useContext, useState } from 'react';

// Create a new context for the cart
const CartContext = createContext();

// Custom hook to access the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Provider component to wrap the application and provide cart functionality
export const CartProvider = ({ children }) => {
  // State to store the cart items
  const [cartItems, setCartItems] = useState([]);

  // Function to get the total number of unique products in the cart
  const getTotalUniqueProducts = () => {
    return cartItems.length;
  };

  // Function to add a product to the cart
  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // Function to increase the quantity of a product in the cart
  const increaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  // Function to decrease the quantity of a product in the cart
  const decreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  // Function to get the total quantity of all products in the cart
  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Function to get the total amount of the cart, including discounts
  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price - (item.price * (item.discountPercentage / 100))) * item.quantity, 0).toFixed(2);
  };

  // Function to get the total savings from all products in the cart
  const getTotalSavings = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = item.price - (item.price * (item.discountPercentage / 100));
      const savings = item.price - discountedPrice;
      return total + savings * item.quantity;
    }, 0).toFixed(2);
  };

  // Provide the cart state and functions to children components
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, getTotalQuantity, getTotalAmount, getTotalSavings, getTotalUniqueProducts }}>
      {children}
    </CartContext.Provider>
  );
};

