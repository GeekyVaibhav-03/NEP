import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminProtectedRoute({ children }) {
  const { adminUser, adminToken } = useAuth();

  if (!adminUser || !adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
