import React from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";

function Home() {
  
  return (
    <>
        <Navbar/>
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Our Website</h1>
        <p>Explore amazing features and join us today!</p>
        <div className="button-group">
          <button className="logout-button">Logout</button>
        </div>
      </header>
    </div>
    </>
  );
}

export default Home;
