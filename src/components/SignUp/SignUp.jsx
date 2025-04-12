import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import "./SignUp.css";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "user",
    phoneNumber: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear the error when user starts typing
    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name cannot contain numbers";
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
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

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Phone validation for contractors
    if (formData.userType === "contractor" && !formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required for contractors";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const emailExists = existingUsers.some(user => user.email === formData.email);

      if (emailExists) {
        setErrors({
          ...newErrors,
          email: "This email is already registered"
        });
        return;
      }

      // Create new user object without confirmPassword
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
        phoneNumber: formData.phoneNumber
      };

      // Add new user to existing users
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Remove any existing currentUser data to ensure user has to login
      localStorage.removeItem('currentUser');

      // Show success message
      alert('SignUp Successful! Please login to continue.');
      
      // Redirect to login page
      navigate('/login');
    }
  };

  return (
    <div className="container">
      <h1 className="heading">SignUp Here</h1>
      <CgProfile />
      <form onSubmit={handleSubmit}>
        <div className="fields">
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error-input" : ""}
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "error-input" : ""}
            required
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

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

          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
        <button type="submit" className="submit-btn">SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;
