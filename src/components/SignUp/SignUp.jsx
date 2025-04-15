import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "user",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    let isValid = true;

    // --- Validation logic ---
    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name cannot contain numbers";
      isValid = false;
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (formData.userType === "contractor" && !formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required for contractors";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        // --- Save to MongoDB (backend) ---
        const response = await axios.post("http://localhost:5000/api/auth/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
          phoneNumber: formData.phoneNumber,
        });

        // --- Save to localStorage (frontend-only) ---
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Avoid duplicate emails
        const alreadyExists = existingUsers.some((u) => u.email === formData.email);
        if (alreadyExists) {
          setErrors((prev) => ({ ...prev, email: "Email already exists locally" }));
          return;
        }

        const newUser = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
          phoneNumber: formData.phoneNumber,
        };

        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        alert("Signup successful! Please log in.");
        navigate("/login");

      } catch (error) {
        if (error.response?.data?.error) {
          setErrors((prev) => ({ ...prev, email: error.response.data.error }));
        } else {
          alert("Something went wrong!");
        }
      }
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
              required
            />
          )}
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}

          <div className="user-type-buttons">
            <button
              type="button"
              className={`user-type-btn ${formData.userType === "user" ? "active" : ""}`}
              onClick={() => setFormData((prev) => ({ ...prev, userType: "user", phoneNumber: "" }))}
            >
              User
            </button>
            <button
              type="button"
              className={`user-type-btn ${formData.userType === "contractor" ? "active" : ""}`}
              onClick={() => setFormData((prev) => ({ ...prev, userType: "contractor" }))}
            >
              Contractor
            </button>
          </div>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
        <button type="submit" className="submit-btn">SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;
