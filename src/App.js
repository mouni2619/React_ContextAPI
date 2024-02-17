import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './CartContext'; // Import the CartProvider from your CartContext
import ProductCard from './ProductCard'; // Import the ProductCard component
import CartPage from './CartPage'; // Import the CartPage component
import data from './data'; // Import your product data
import './App.css'; // Import your CSS file

import { useCart } from './CartContext'; // Import the useCart hook from your CartContext

// Navbar component to display navigation links and cart badge
const Navbar = () => {
  const { getTotalUniqueProducts } = useCart(); // Get the total number of unique products in the cart

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "blue" }}>
      <div className="container-fluid">
        <img
          src="https://e7.pngegg.com/pngimages/982/467/png-clipart-shopping-cart-software-online-shopping-computer-icons-shopping-logo-design-love-retail-thumbnail.png"
          alt="Shopping Cart"
          style={{ width: '50px', height: '50px', borderRadius: '25px', objectFit: 'cover' }}
        />
        <h6 className="navbar-brand text-light" style={{ paddingLeft: '20px' }}>
          MY SHOPPING CART
        </h6>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light">
                <i className="bi bi-house-door"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link text-light">
                <i className="bi bi-cart4"></i> Cart
                <span className="badge bg-danger text-white ms-1 rounded-pill">{getTotalUniqueProducts()}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// App component to set up the routes and render the Navbar and other components
const App = () => {
  return (
    <Router>
      <CartProvider>
        <div>
          <Navbar />
          <Routes>
            {/*Render the ProductCard component for the home route */}
            <Route exact path="/" element={<ProductCard data={data} />} />
            {/* Render the CartPage component for the cart route */}
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App; // Export the App component as the default export
