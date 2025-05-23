import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedPage({ children }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/login" />;
}