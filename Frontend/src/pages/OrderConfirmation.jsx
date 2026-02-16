import React from "react";
import { Link } from "react-router-dom";

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-8">
      <div className="bg-white p-10 rounded shadow text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Order Confirmed!</h1>
        <p className="mb-6">Thank you for your order. Your order has been placed successfully.</p>
        <Link
          to="/orders"
          className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
}
