import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must log in first!");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
