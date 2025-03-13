import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { CgProfile } from "react-icons/cg";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let foundUser = users.find((user) => user.email === email && user.password === password);

    if (foundUser) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      alert("Login Successful");
      navigate("/home");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Login</h1>
        <CgProfile />
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;