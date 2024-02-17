import React from 'react';
import { useCart } from './CartContext'; // Import the useCart hook from CartContext
const CartPage = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, getTotalQuantity, getTotalAmount, getTotalSavings } = useCart(); // Destructure the cartItems, removeFromCart, increaseQuantity, decreaseQuantity, getTotalQuantity, getTotalAmount, and getTotalSavings functions from the useCart hook

  return (
    <div className="container">
      {cartItems.length === 0 ? ( // Check if the cart is empty
        <div className="mt-5 mb-5 ">
          <h1 style={{ color: "red", textAlign: "center" }}>Your cart is empty🙁</h1>
          <p style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src="https://www.hamropharma.com/f8039202dbc38a84732a9b1a90435e49.gif" height={"200px"} width={"200px"} alt="EmptyCartGif" />
            <a href="/" className='continueShopping'>Continue Shopping</a>
          </p>
        </div>
      ) : (
        <>
          {cartItems.map(item => { // Map over each item in the cart
            const discountedPrice = item.price - (item.price * (item.discountPercentage / 100)); // Calculate the discounted price
            return (
              <div key={item.id} className="card mb-3 mt-5" style={{ fontSize: "16px" }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={item.thumbnail} alt={item.title} className="img-fluid" style={{ height: "360px" }} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className='titleRating'>
                        <h5 className="card-title">{item.title}</h5>
                        <h6 className="card-title">{item.rating}</h6>
                      </div>
                      <p className="card-text">{item.description}</p>
                      <button className="btn btn-outline-primary btn-sm me-2" onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button className="btn btn-outline-primary btn-sm ms-2" onClick={() => increaseQuantity(item.id)}>+</button>
                      <br />
                      <br />
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <p className='cartspecialprice'>${discountedPrice.toFixed(2)} </p>
                        <p className="card-text cartprice"> ${item.price}</p>
                        <p className="card-text cartpercent"> ({item.discountPercentage}%)</p>
                      </div>
                      <p className='cartsaving'>You save:  ${((item.quantity * item.price) - (item.quantity * discountedPrice)).toFixed(2)}</p>
                      <hr />
                      <div className="d-flex align-items-center">
                        <div style={{ marginLeft: "10px" }}>
                          <p><span className='totaldetails'>Total MRP<span style={{ color: "rgb(12, 162, 12)" }}>({item.quantity}items)</span>:</span> ${item.quantity * item.price}</p>
                          <p><span className='totaldetails'>Discount: </span>{item.discountPercentage}%</p>
                          <p><span className='totaldetails'>Total Price: </span>${(item.quantity * discountedPrice).toFixed(2)}</p>
                        </div>
                        <button className="btn btn-danger ms-auto" onClick={() => removeFromCart(item.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="border-top mt-4 pt-3" style={{ display: "flex", flexDirection: "column" }}>
            <h4 className="mb-1">Order Details</h4>
            <p className="mb-1"><span className='orderdetails'>Bag Total:</span> ${getTotalAmount()}</p>
            <p className="mb-1"><span className='orderdetails'>Bag Quantity:</span> {getTotalQuantity()} Items</p>
            <p className="mb-1"><span className='orderdetails'>Bag Savings:</span> <span className='totalsavings'>${getTotalSavings()}</span></p>
            <p className="mb-1"><span className='orderdetails'>Shipping:</span> FREE <span className='cartshipping'>$2</span> </p>
            <p className="text-warning">Get Daily Cash With Nespola Card</p>
            <h5 className="mb-1 text-success text-center">🥳Cheers! You Saved ${getTotalSavings()}🥳</h5>
            <button className="btn btn-primary" >Proceed to Payment</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
