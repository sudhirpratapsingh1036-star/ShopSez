import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function OrderTracking() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
       const res = await api.get(`/api/v1/orders/${orderId}`, {
  headers: { Authorization: `Bearer ${token}` },
});
        setOrder(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        alert("Failed to fetch order");
      }
    };
    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) return <p className="text-center mt-10">Loading order...</p>;
  if (!order) return <p className="text-center mt-10">Order not found.</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Track Order</h1>
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Status:</strong> {order.status || "Pending"}</p>
        <p><strong>Total:</strong> ₹{order.totalPrice || order.total}</p>
        <p><strong>Items:</strong></p>
        <ul className="list-disc ml-6">
          {order.items?.map((item) => (
            <li key={item._id || item.id}>
              {item.name || item.food_name} - ₹{item.price} x {item.quantity || 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
