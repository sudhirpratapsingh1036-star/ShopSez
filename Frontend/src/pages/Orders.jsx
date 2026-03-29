import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://shopsez.onrender.com/api/v1",
  withCredentials: true,
});

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
  const res = await api.get("/api/v1/orders", {
  headers: { Authorization: `Bearer ${token}` },
});
        setOrders(res.data.data || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        alert("Failed to fetch orders");
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (!orders.length) return <p className="text-center mt-10">No orders found.</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
      <div className="space-y-4 max-w-4xl mx-auto">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded shadow p-4 flex justify-between items-center"
          >
            <div>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total:</strong> ₹{order.totalPrice || order.total}</p>
              <p><strong>Status:</strong> {order.status || "Pending"}</p>
            </div>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => window.location.href = `/order-tracking?id=${order._id}`}
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
