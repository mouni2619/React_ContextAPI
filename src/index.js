import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './CartContext';
const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <CartProvider>
    <App />
  </CartProvider>,

);




