import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { token, setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);

  // Fetch user profile
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data.data.user);
        setOrders(res.data.data.orders || []); // If backend sends orders with profile
      } catch (err) {
        console.error(err);
        alert("Failed to fetch profile. Please login again.");
        setToken(null);
        setUser(null);
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [token, navigate, setUser, setToken]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  if (!user) return <div className="text-center mt-20 text-2xl">Loading profile...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Personal Info */}
      <div className="border p-4 rounded mb-6 shadow">
        <h2 className="text-xl font-bold mb-2">Personal Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>

      {/* Addresses */}
      <div className="border p-4 rounded mb-6 shadow">
        <h2 className="text-xl font-bold mb-2">Shipping Addresses</h2>
        {user.addresses && user.addresses.length > 0 ? (
          user.addresses.map((addr, index) => (
            <div key={`${addr.street}-${index}`} className="border p-2 rounded mb-2">
              <p>{addr.street}, {addr.city}, {addr.zip}</p>
            </div>
          ))
        ) : (
          <p>No saved addresses</p>
        )}
      </div>

      {/* Order History */}
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Order History</h2>
        {orders.length > 0 ? (
          orders.map(order => (
            <div key={order._id} className="border p-2 rounded mb-2">
              <p>Order ID: {order._id}</p>
              <p>Status: {order.status}</p>
              <p>Total: ₹{order.total}</p>
            </div>
          ))
        ) : (
          <p>No orders yet</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
