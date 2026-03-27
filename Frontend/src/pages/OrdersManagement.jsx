import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
      const res = await api.get(
  "/api/v1/orders/all",
  { headers: { Authorization: `Bearer ${token}` } }
);
        setOrders(res.data.data || []);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch orders");
      }
    };
    fetchAllOrders();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">All Orders</h1>
      <div className="space-y-4 max-w-5xl mx-auto">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded shadow p-4 flex justify-between items-center"
          >
            <div>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>User:</strong> {order.user?.email || "Unknown"}</p>
              <p><strong>Total:</strong> ₹{order.totalPrice || order.total}</p>
              <p><strong>Status:</strong> {order.status || "Pending"}</p>
            </div>
            <button className="bg-green-500 text-white px-3 py-1 rounded">
              Update Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
