// src/pages/Payment.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Payment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/v1/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);

  const shipping = cartItems.length > 0 ? 50 : 0;
  const total = subtotal + shipping;

  const handlePayment = () => {
    alert("This is a placeholder for online payment integration!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Payment</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
              <div className="flex justify-between mb-1">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 transition"
            >
              Pay Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
