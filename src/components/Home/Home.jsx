import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { FaPaintRoller, FaCalculator, FaUserTie, FaPalette, FaUser } from 'react-icons/fa';
import { MdSecurity, MdHighQuality } from 'react-icons/md';

function Home() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleGetEstimate = () => {
    navigate("/services");
  };

  const handleProfile = () => {
    navigate("/contractor-profile");
  };

  return (
    <div className="home-container">
      {/* Profile Navigation */}
      <div className="profile-nav">
        {currentUser.userType === "contractor" && (
          <button className="profile-btn" onClick={handleProfile}>
            <FaUser /> My Profile
          </button>
        )}
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="user-info">
            <h3>Welcome, {currentUser.name}</h3>
            <p>({currentUser.userType})</p>
          </div>
          <h1>Transform Your Space</h1>
          <p className="hero-text">
            Professional painting services with precise cost estimation. 
            Turn your vision into reality with our expert solutions.
          </p>
          <button className="cta-button" onClick={handleGetEstimate}>
            Get Free Estimate
          </button>
        </div>
      </div>

      {/* Services Highlights */}
      <div className="services-highlights">
        <h2>Our Premium Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <FaPaintRoller className="service-icon" />
            <h3>Interior Painting</h3>
            <p>Transform your indoor spaces with our expert interior painting services.</p>
          </div>
          <div className="service-card">
            <FaPalette className="service-icon" />
            <h3>Exterior Painting</h3>
            <p>Enhance your property's curb appeal with durable exterior finishes.</p>
          </div>
          <div className="service-card">
            <FaCalculator className="service-icon" />
            <h3>Cost Estimation</h3>
            <p>Get accurate cost estimates with our advanced calculation system.</p>
          </div>
          <div className="service-card">
            <MdHighQuality className="service-icon" />
            <h3>Quality Assurance</h3>
            <p>Premium quality materials and professional workmanship guaranteed.</p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="why-choose-us">
        <h2>Why Choose Our Services?</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Precise Estimation</h3>
            <p>Our advanced algorithm provides accurate cost estimates considering all factors.</p>
          </div>
          <div className="feature-card">
            <h3>Quality Materials</h3>
            <p>We use premium paints and materials for lasting results.</p>
          </div>
          <div className="feature-card">
            <h3>Expert Team</h3>
            <p>Skilled professionals with years of experience.</p>
          </div>
          <div className="feature-card">
            <h3>Satisfaction Guaranteed</h3>
            <p>Your satisfaction is our top priority.</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"The cost estimation was spot-on, and the work quality exceeded my expectations!"</p>
            <h4>- Sarah Johnson</h4>
          </div>
          <div className="testimonial-card">
            <p>"Professional team, excellent service, and beautiful results. Highly recommended!"</p>
            <h4>- Michael Chen</h4>
          </div>
          <div className="testimonial-card">
            <p>"The best painting service I've ever used. Their attention to detail is remarkable."</p>
            <h4>- Ahmed Khan</h4>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-section">
        <div className="stat-card">
          <h3>500+</h3>
          <p>Projects Completed</p>
        </div>
        <div className="stat-card">
          <h3>98%</h3>
          <p>Client Satisfaction</p>
        </div>
        <div className="stat-card">
          <h3>15+</h3>
          <p>Years Experience</p>
        </div>
        <div className="stat-card">
          <h3>100%</h3>
          <p>Quality Assurance</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h2>Ready to Transform Your Space?</h2>
        <p>Get your accurate cost estimate today and bring your vision to life!</p>
        <button className="cta-button" onClick={handleGetEstimate}>
          Start Your Project
        </button>
      </div>

      {/* Logout Button Container */}
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;