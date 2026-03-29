import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";

const api = axios.create({
  baseURL: "https://shopsez.onrender.com/api/v1",
  withCredentials: true,
});

const Checkout = () => {
  const token = localStorage.getItem("token");

  const cartItems = useSelector((state) => state.cart); // Redux cart
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    street: "",
    phone: "", 
    city: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleConfirmOrder = async () => {
    if (
      !shippingAddress.fullName ||
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.zipCode
    ) {
      alert("Please fill all shipping fields");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    // Convert Redux cart to backend format
    const items = cartItems.map((item) => ({
      product: item._id,
      quantity: item.qty,
    }));

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    try {
      const res = await api.post(
  "/api/v1/orders",
  {
    shippingAddress,
    paymentMethod: "COD",
    items,
    totalAmount,
  },
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);

      if (res.data.success) {
        alert("Order placed successfully!");
        navigate("/order-confirmation");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 min-h-screen bg-gray-50">
      <div className="flex-1 border p-6 rounded shadow space-y-4 bg-white">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

        <input
          name="fullName"
          placeholder="Full Name"
          value={shippingAddress.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
  type="text"
  name="phone"
  placeholder="Phone Number"
  value={shippingAddress.phone}
  onChange={handleChange}
  className="w-full p-2 border rounded"
/>
        <input
          name="street"
          placeholder="Street"
          value={shippingAddress.street}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="city"
          placeholder="City"
          value={shippingAddress.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="zipCode"
          placeholder="Zip"
          value={shippingAddress.zipCode}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex-1 border p-6 rounded shadow bg-white">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <p>Items: {cartItems.length}</p>
        <p>Total: ₹{cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)}</p>

        <button
          onClick={handleConfirmOrder}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
