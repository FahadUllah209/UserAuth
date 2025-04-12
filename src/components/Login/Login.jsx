import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "user",
    phoneNumber: ""
  });
  const [error, setError] = useState({ email: "", password: "", phoneNumber: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear the error when user starts typing
    setError({
      ...error,
      [name]: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    let isValid = true;

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
      isValid = false;
    } else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one special character (!@#$%^&*)";
      isValid = false;
    }

    // Phone validation for contractors
    if (formData.userType === "contractor") {
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required for contractors';
        isValid = false;
      }
    }

    setError(newErrors);

    if (isValid) {
      const existingUsers = JSON.parse(localStorage.getItem("user") || "[]");
      const user = existingUsers.find(
        (user) => 
          user.email === formData.email && 
          user.password === formData.password &&
          user.userType === formData.userType &&
          (formData.userType === "user" || (formData.userType === "contractor" && user.phoneNumber === formData.phoneNumber))
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Login Successfully");
        navigate("/home");
      } else {
        setError({ email: "Invalid credentials or user type." });
      }
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Login Here</h1>
      <CgProfile />
      <form onSubmit={handleSubmit}>
        <div className="fields">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className={error.email ? 'error-input' : ''} />
          {error.email && <p className="error-message" style={{ color: "red" }}>{error.email}</p>}

          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className={error.password ? 'error-input' : ''} />
          {error.password && <p className="error-message" style={{ color: "red" }}>{error.password}</p>}

          {formData.userType === "contractor" && (
            <>
              <input 
                type="tel" 
                name="phoneNumber" 
                placeholder="Phone Number" 
                onChange={handleChange}
                required={formData.userType === "contractor"}
                className={error.phoneNumber ? 'error-input' : ''}
              />
              {error.phoneNumber && <p className="error-message" style={{ color: "red" }}>{error.phoneNumber}</p>}
            </>
          )}

          <div className="user-type-buttons">
            <button
              type="button"
              className={`user-type-btn ${formData.userType === "user" ? "active" : ""}`}
              onClick={() => setFormData(prev => ({ ...prev, userType: "user", phoneNumber: "" }))}
            >
              User
            </button>
            <button
              type="button"
              className={`user-type-btn ${formData.userType === "contractor" ? "active" : ""}`}
              onClick={() => setFormData(prev => ({ ...prev, userType: "contractor" }))}
            >
              Contractor
            </button>
          </div>

          <p>Don't have an account? <Link to="/signup">SignUp</Link></p>
        </div>
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;