import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (!currentUser || !currentUser.email) {
    // If there's no user logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, render the protected component
  return children;
}

export default ProtectedRoute; 