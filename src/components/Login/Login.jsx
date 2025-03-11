import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "", general: "" });

  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError({ email: "", password: "", general: "" });

    if (email === "") {
      setError((prev) => ({ ...prev, email: "Email is required." }));
      return;
    }

    if (password === "") {
      setError((prev) => ({ ...prev, password: "Password is required." }));
      return;
    }

    let getDetail = JSON.parse(localStorage.getItem("user")) || [];
    let found = getDetail.find((curValue) => curValue.email === email && curValue.password === password);

    if (found) {
      alert("Login Successful");
      navigation("/home");
    } else {
      setError((prev) => ({ ...prev, general: "Email and Password are incorrect." }));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="heading">Login Here</h1>
        <CgProfile />
        <form onSubmit={handleSubmit}>
          <div className="fields">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              onChange={handleInput}
            />
            {error.email && <p className="error-message" style={{ color: "red" }}>{error.email}</p>}
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              onChange={handleInput}
            />
            {error.password && <p className="error-message" style={{ color: "red" }}>{error.password}</p>}
            {error.general && <p className="error-message" style={{ color: "red" }}>{error.general}</p>}
            <p>
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
