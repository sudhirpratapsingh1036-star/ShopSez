import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create API client directly here
const apiClient = axios.create({
  baseURL: "https://shopsez.onrender.com/api/v1",
  withCredentials: true,
});

console.log("✅ API Client created with baseURL:", apiClient.defaults.baseURL);

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password.trim();

    console.log("Attempting login with:", { role: formData.role, email, password });

    try {
      const endpoint = formData.role === "customer" ? "/auth/user/login" : "/auth/owner/login";
      console.log("Making POST request to:", apiClient.defaults.baseURL + endpoint);
      
      const response = await apiClient.post(endpoint, { email, password });

      console.log("Login response:", response.data);

      if (response.data?.data?.accessToken) {
        localStorage.setItem("token", response.data.data.accessToken);
        formData.role === "owner" ? navigate("/admin-dashboard") : navigate("/");
      } else {
        alert("Login failed: No access token received");
      }
    } catch (error) {
      console.error("Login error details:", error);
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
      alert(error.response?.data?.message || "Login failed. Check your credentials");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-linear-to-br from-gray-900 via-slate-800 to-black flex items-center justify-center p-5">
      <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-md">
        <h2 className="text-2xl text-black font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
