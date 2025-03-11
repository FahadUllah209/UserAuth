import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import "./SignUp.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const Userdata = {
    name: "",
    password: "",
    email: "",
  };
  const [data, setData] = useState(Userdata);
  const [error, setError] = useState({ name: "", password: "", email: "" });
  const navigation = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError({ name: "", password: "", email: "" });

    let newErrors = {};
    if (data.name === "") {
      newErrors.name = "Username is required.";
    }
    if (data.password === "") {
      newErrors.password = "Password is required.";
    } else if (data.password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
      newErrors.password = "Password must be at least 8 characters long and contain a special character.";
    }
    if (data.email === "") {
      newErrors.email = "Email is required.";
    } else {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(data.email)) {
        newErrors.email = "Please enter a valid email.";
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    const getdata = JSON.parse(localStorage.getItem("user") || "[]");
    let arr = [...getdata, data];
    localStorage.setItem("user", JSON.stringify(arr));

    alert("SignUp Successfully");
    navigation("/login");
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="heading">SignUp Here</h1>
        <CgProfile />
        <form onSubmit={handleSubmit}>
          <div className="fields">
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              onChange={handleInput}
            />
            {error.name && <p className="error-message" style={{ color: "red" }}>{error.name}</p>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInput}
            />
            {error.password && <p className="error-message" style={{ color: "red" }}>{error.password}</p>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInput}
            />
            {error.email && <p className="error-message" style={{ color: "red" }}>{error.email}</p>}
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
          <button type="submit">SignUp</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
