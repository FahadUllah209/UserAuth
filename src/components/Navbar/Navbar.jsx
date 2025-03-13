import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">MyBrand</div>
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>☰</div>
      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        <li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="/">SignUp</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        
      </ul>
    </nav>
  );
}

export default Navbar;