import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (!currentUser || !currentUser.email) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute; 