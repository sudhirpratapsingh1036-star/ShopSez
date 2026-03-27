import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../Api";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "customer", // default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine correct backend endpoint based on role
    const endpoint =
      formData.role === "customer"
        ? "/api/v1/auth/user/register"
        : "/api/v1/auth/owner/register";

    try {
      const response = await api.post(endpoint, {
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phone, // match backend
        password: formData.password,
      });

      alert(`Signup successful for ${formData.email}`);
      navigate("/login"); // redirect after signup
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Signup failed. Make sure backend is running"
      );
    }
  };

  return (
    <div className="w-screen min-h-screen bg-linear-to-br from-gray-900 via-slate-800 to-black flex items-center justify-center p-5">
      <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-md">
        <h2 className="text-2xl text-black font-bold text-center mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full border-2 text-black border-gray-300 rounded-lg px-3 py-2"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border-2 text-black border-gray-300 rounded-lg px-3 py-2"
            required
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border-2 text-black border-gray-300 rounded-lg px-3 py-2"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border-2 text-black border-gray-300 rounded-lg px-3 py-2"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border-2 text-black border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="customer">Customer</option>
            <option value="owner">Owner</option>
          </select>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg mt-2"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
