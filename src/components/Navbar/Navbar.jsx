import React, { useState } from "react";
import './Navbar.css'

import {Link , NavLink} from "react-router-dom"


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <nav className="navbar">
        <div className="logo">MyBrand</div>
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
        <ul className={isOpen ? "nav-links open" : "nav-links"}>
          <li><NavLink to="">Home</NavLink></li>
          <li><NavLink to="">About</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/">SignUp</NavLink></li>
        </ul>
      </nav>
      
    )
}

export default Navbar;
