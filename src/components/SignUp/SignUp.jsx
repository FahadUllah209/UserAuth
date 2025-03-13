import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { CgProfile } from "react-icons/cg";
import "./SignUp.css";

function SignUp() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    
    let newErrors = {};
    if (!data.name) newErrors.name = "Name is required.";
    if (!data.email) newErrors.email = "Email is required.";
    else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email))
      newErrors.email = "Invalid email format.";
    
    if (!data.password) newErrors.password = "Password is required.";
    else if (data.password.length < 8 || !/[!@#$%^&*]/.test(data.password))
      newErrors.password = "Password must be 8+ characters & include a special character.";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));

    alert("SignUp Successful!");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Sign Up</h1>
        <CgProfile />
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleInput} />
          {error.name && <p className="error">{error.name}</p>}
          
          <input type="email" name="email" placeholder="Email" onChange={handleInput} />
          {error.email && <p className="error">{error.email}</p>}
          
          <input type="password" name="password" placeholder="Password" onChange={handleInput} />
          {error.password && <p className="error">{error.password}</p>}

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default SignUp;