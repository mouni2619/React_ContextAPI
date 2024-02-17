import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ data }) => {
  const { addToCart, cartItems, removeFromCart } = useCart();// Import the useCart hook from CartContext
  const [addedToCartMap, setAddedToCartMap] = useState({});// Initialize the addedToCartMap state to track which products are added to the cart

  // Update addedToCartMap when cartItems change
  useEffect(() => {
    const newMap = {};
    cartItems.forEach(item => {
      newMap[item.id] = true;
    });
    setAddedToCartMap(newMap);
  }, [cartItems]);// Run this effect whenever cartItems change
  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    setAddedToCartMap(prevMap => ({
      ...prevMap,
      [product.id]: true// Mark the product as added to the cart
    }));
    addToCart(product);// Add the product to the cart
  };
  // Function to handle removing a product from the cart
  const handleRemoveFromCart = (productId) => {
    setAddedToCartMap(prevMap => ({
      ...prevMap,
      [productId]: false// Mark the product as removed from the cart
    }));
    removeFromCart(productId); // Remove the product from the cart
  };

  return (
    <div className='row allcardsmap'>
      {data.map(product => {
        const discountedPrice = product.price - (product.price * (product.discountPercentage / 100));

        const isAddedToCart = addedToCartMap[product.id];// Check if the product is added to the cart

        return (
          <div key={product.id} className="col-md-4 col-lg-4 col-sm-6 mb-4 mt-4" style={{ width: "18rem" }}>
            <div className="card h-100 maincard">
              <img src={product.thumbnail} alt={product.title} className="card-img-top" style={{ width: '100%', height: "200px", marginBottom: '10px' }} />
              <div className="card-body p-4">
                <div className='titleRating'>
                  <h4>{product.title}</h4>
                  <span>{product.rating}</span>
                </div>
                <p>{product.description}</p>
                <span><span style={{ color: "red", fontWeight: "600" }}>Special Price: </span> <h6>${discountedPrice.toFixed(2)}</h6> </span>
                <div className='MRPPrice'>
                  <p className='cardmrp'>MRP: <span className='pricelinethrough'>${product.price}</span></p>
                  <p style={{ color: "rgb(24, 183, 24)", fontWeight: "600" }}>{product.discountPercentage}% off</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  {isAddedToCart ? ( // If the product is added to the cart, show Remove and Go To Cart buttons
                    <>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleRemoveFromCart(product.id)}
                      >
                        Remove
                      </button>
                      <Link
                        to="/cart"
                        className="btn btn-success ms-2"
                      >
                        Go To Cart
                      </Link>
                    </>
                  ) : ( // If the product is not added to the cart, show Add to Cart button
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;

