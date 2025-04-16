import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaPhone, FaEnvelope, FaBuilding, FaEdit } from 'react-icons/fa';
import './ContractorProfile.css';

const ContractorProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [contractor, setContractor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    experience: '',
    specialization: '',
    address: ''
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser || currentUser.userType !== 'contractor') {
      navigate('/login');
      return;
    }
    setContractor(currentUser);
    setFormData({
      name: currentUser.name || '',
      email: currentUser.email || '',
      phoneNumber: currentUser.phoneNumber || '',
      companyName: currentUser.companyName || '',
      experience: currentUser.experience || '',
      specialization: currentUser.specialization || '',
      address: currentUser.address || ''
    });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedContractor = { ...contractor, ...formData };
    localStorage.setItem('currentUser', JSON.stringify(updatedContractor));
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(user => 
      user.email === contractor.email ? updatedContractor : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    setContractor(updatedContractor);
    setIsEditing(false);
  };

  if (!contractor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Contractor Profile</h1>
        <button 
          className="edit-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          <FaEdit /> {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Years of Experience:</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g., 5 years"
            />
          </div>

          <div className="form-group">
            <label>Specialization:</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="e.g., Interior Painting, Exterior Painting"
            />
          </div>

          <div className="form-group">
            <label>Business Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your business address"
            />
          </div>

          <button type="submit" className="save-button">
            Save Changes
          </button>
        </form>
      ) : (
        <div className="profile-info">
          <div className="info-group">
            <FaUserTie className="icon" />
            <div>
              <h3>Name</h3>
              <p>{contractor.name}</p>
            </div>
          </div>

          <div className="info-group">
            <FaEnvelope className="icon" />
            <div>
              <h3>Email</h3>
              <p>{contractor.email}</p>
            </div>
          </div>

          <div className="info-group">
            <FaPhone className="icon" />
            <div>
              <h3>Phone Number</h3>
              <p>{contractor.phoneNumber}</p>
            </div>
          </div>

          <div className="info-group">
            <FaBuilding className="icon" />
            <div>
              <h3>Company</h3>
              <p>{contractor.companyName || 'Not specified'}</p>
            </div>
          </div>

          {contractor.experience && (
            <div className="info-group">
              <div>
                <h3>Experience</h3>
                <p>{contractor.experience}</p>
              </div>
            </div>
          )}

          {contractor.specialization && (
            <div className="info-group">
              <div>
                <h3>Specialization</h3>
                <p>{contractor.specialization}</p>
              </div>
            </div>
          )}

          {contractor.address && (
            <div className="info-group">
              <div>
                <h3>Business Address</h3>
                <p>{contractor.address}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContractorProfile; 