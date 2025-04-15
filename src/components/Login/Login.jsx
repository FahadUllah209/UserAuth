import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "user",
    phoneNumber: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    general: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  
    setErrors(prev => ({
      ...prev,
      [name]: "",
      general: ""
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    let isValid = true;


    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

  
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (formData.userType === "contractor" && !formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required for contractors";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      const user = users.find(u => u.email === formData.email);

      if (!user) {
        setErrors(prev => ({
          ...prev,
          general: "User not found. Please sign up first."
        }));
        return;
      }

      if (user.password !== formData.password) {
        setErrors(prev => ({
          ...prev,
          general: "Invalid password"
        }));
        return;
      }

      if (user.userType !== formData.userType) {
        setErrors(prev => ({
          ...prev,
          general: "Invalid user type selected"
        }));
        return;
      }


      if (user.userType === "contractor" && user.phoneNumber !== formData.phoneNumber) {
        setErrors(prev => ({
          ...prev,
          phoneNumber: "Invalid phone number"
        }));
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify(user));
      
    
      alert('Login Successful!');


      navigate('/home');
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Login Here</h1>
      <CgProfile />
      <form onSubmit={handleSubmit}>
        <div className="fields">
          {errors.general && <p className="error-message">{errors.general}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error-input" : ""}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error-input" : ""}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
          {formData.userType === "contractor" && (
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? "error-input" : ""}
              required={formData.userType === "contractor"}
            />
          )}
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}

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

      

          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;