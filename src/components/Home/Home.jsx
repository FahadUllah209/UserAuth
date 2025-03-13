import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <h1>Welcome to Our Website</h1>
        <p>Enjoy our amazing features!</p>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}

export default Home;