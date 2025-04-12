import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1>Welcome, {currentUser.name}!</h1>
      <p>You are logged in as a {currentUser.userType}</p>
      
      {currentUser.userType === "contractor" && (
        <div className="contractor-info">
          <p>Company: {currentUser.companyName}</p>
          <p>Phone: {currentUser.phoneNumber}</p>
        </div>
      )}

      <div className="features">
        <div className="feature-card">
          <h3>Profile</h3>
          <p>View and edit your profile information</p>
          <button className="action-btn">View Profile</button>
        </div>

        <div className="feature-card">
          <h3>Messages</h3>
          <p>Check your messages and notifications</p>
          <button className="action-btn">View Messages</button>
        </div>

        {currentUser.userType === "contractor" && (
          <div className="feature-card">
            <h3>Projects</h3>
            <p>Manage your ongoing projects</p>
            <button className="action-btn">View Projects</button>
          </div>
        )}

        <div className="feature-card">
          <h3>Settings</h3>
          <p>Update your account settings</p>
          <button className="action-btn">Settings</button>
        </div>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;