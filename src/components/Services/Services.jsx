import React, { useState } from "react";
import "./Services.css";
import RoomEstimate from "./RoomEstimate";
import BudgetSelector from "./BudgetSelector";

const Services = () => {
  const [showEstimate, setShowEstimate] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [savedRooms, setSavedRooms] = useState([]);
  const [showTotalSummary, setShowTotalSummary] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [budgetRates, setBudgetRates] = useState(null);
  const [roomDetails, setRoomDetails] = useState({
    roomName: "",
    width: "",
    height: "",
    windows: [{ width: "", height: "" }],
    doors: [{ width: "", height: "" }],
  });

  const handleBudgetSelect = (budgetKey, budgetDetails) => {
    setSelectedBudget(budgetKey);
    setBudgetRates(budgetDetails);
  };

  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWindowChange = (index, field, value) => {
    const updatedWindows = [...roomDetails.windows];
    updatedWindows[index] = {
      ...updatedWindows[index],
      [field]: value,
    };
    setRoomDetails((prev) => ({
      ...prev,
      windows: updatedWindows,
    }));
  };

  const handleDoorChange = (index, field, value) => {
    const updatedDoors = [...roomDetails.doors];
    updatedDoors[index] = {
      ...updatedDoors[index],
      [field]: value,
    };
    setRoomDetails((prev) => ({
      ...prev,
      doors: updatedDoors,
    }));
  };

  const addWindow = () => {
    setRoomDetails((prev) => ({
      ...prev,
      windows: [...prev.windows, { width: "", height: "" }],
    }));
  };

  const addDoor = () => {
    setRoomDetails((prev) => ({
      ...prev,
      doors: [...prev.doors, { width: "", height: "" }],
    }));
  };

  const removeWindow = (index) => {
    setRoomDetails((prev) => ({
      ...prev,
      windows: prev.windows.filter((_, i) => i !== index),
    }));
  };

  const removeDoor = (index) => {
    setRoomDetails((prev) => ({
      ...prev,
      doors: prev.doors.filter((_, i) => i !== index),
    }));
  };

  const handleCalculate = () => {
    if (!roomDetails.width || !roomDetails.height) {
      alert("Please enter room dimensions first");
      return;
    }
    if (!selectedBudget) {
      alert("Please select a budget tier first");
      return;
    }
    setShowResults(true);
  };

  const handleSaveRoom = (estimate) => {
    if (!roomDetails.roomName) {
      alert("Please enter a room name before saving");
      return;
    }
    
    setSavedRooms(prev => [...prev, {
      ...roomDetails,
      estimate: estimate,
      budgetTier: selectedBudget
    }]);

    // Reset form for next room
    setRoomDetails({
      roomName: "",
      width: "",
      height: "",
      windows: [{ width: "", height: "" }],
      doors: [{ width: "", height: "" }],
    });
    setShowResults(false);
  };

  const calculateTotalCost = () => {
    return savedRooms.reduce((total, room) => total + room.estimate.totalCost, 0);
  };

  const handleRemoveRoom = (index) => {
    setSavedRooms(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="services-container">
      <h1 className="services-title">Our Services</h1>
      
      {savedRooms.length > 0 && (
        <div className="saved-rooms-summary">
          <h2>Saved Rooms</h2>
          <div className="saved-rooms-list">
            {savedRooms.map((room, index) => (
              <div key={index} className="saved-room-card">
                <h3>{room.roomName}</h3>
                <p>Dimensions: {room.width}ft x {room.height}ft</p>
                <p>Budget Tier: {room.budgetTier}</p>
                <p>Total Cost: PKR {room.estimate.totalCost.toLocaleString()}</p>
                <button 
                  className="remove-room-btn"
                  onClick={() => handleRemoveRoom(index)}
                >
                  Remove Room
                </button>
              </div>
            ))}
          </div>
          <div className="total-summary">
            <button 
              className="show-total-btn"
              onClick={() => setShowTotalSummary(!showTotalSummary)}
            >
              {showTotalSummary ? 'Hide Total Summary' : 'Show Total Summary'}
            </button>
            {showTotalSummary && (
              <div className="total-cost-summary">
                <h3>Total Project Cost</h3>
                <p className="total-amount">PKR {calculateTotalCost().toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="services-grid">
        <div className="service-card">
          <h2>Room Painting Estimate</h2>
          <p>Get an accurate estimate for your room painting project</p>
          <button 
            className="estimate-btn"
            onClick={() => setShowEstimate(!showEstimate)}
          >
            {showEstimate ? "Hide Estimate" : "Get Estimate"}
          </button>
        </div>
      </div>

      {showEstimate && (
        <div className="estimate-form">
          <BudgetSelector 
            selectedBudget={selectedBudget}
            onBudgetSelect={handleBudgetSelect}
          />

          <h2>Room Details</h2>
          <div className="form-group">
            <label>Room Name:</label>
            <input
              type="text"
              name="roomName"
              value={roomDetails.roomName}
              onChange={handleRoomChange}
              placeholder="e.g., Living Room"
            />
          </div>

          <div className="form-group">
            <label>Room Width (ft):</label>
            <input
              type="number"
              name="width"
              value={roomDetails.width}
              onChange={handleRoomChange}
              placeholder="Enter width"
            />
          </div>

          <div className="form-group">
            <label>Room Height (ft):</label>
            <input
              type="number"
              name="height"
              value={roomDetails.height}
              onChange={handleRoomChange}
              placeholder="Enter height"
            />
          </div>

          <div className="windows-section">
            <h3>Windows</h3>
            {roomDetails.windows.map((window, index) => (
              <div key={index} className="window-input-group">
                <h4>Window {index + 1}</h4>
                <div className="form-group">
                  <label>Width (ft):</label>
                  <input
                    type="number"
                    value={window.width}
                    onChange={(e) => handleWindowChange(index, "width", e.target.value)}
                    placeholder="Window width"
                  />
                </div>
                <div className="form-group">
                  <label>Height (ft):</label>
                  <input
                    type="number"
                    value={window.height}
                    onChange={(e) => handleWindowChange(index, "height", e.target.value)}
                    placeholder="Window height"
                  />
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeWindow(index)}
                >
                  Remove Window
                </button>
              </div>
            ))}
            <button className="add-btn" onClick={addWindow}>
              Add Window
            </button>
          </div>

          <div className="doors-section">
            <h3>Doors</h3>
            {roomDetails.doors.map((door, index) => (
              <div key={index} className="door-input-group">
                <h4>Door {index + 1}</h4>
                <div className="form-group">
                  <label>Width (ft):</label>
                  <input
                    type="number"
                    value={door.width}
                    onChange={(e) => handleDoorChange(index, "width", e.target.value)}
                    placeholder="Door width"
                  />
                </div>
                <div className="form-group">
                  <label>Height (ft):</label>
                  <input
                    type="number"
                    value={door.height}
                    onChange={(e) => handleDoorChange(index, "height", e.target.value)}
                    placeholder="Door height"
                  />
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeDoor(index)}
                >
                  Remove Door
                </button>
              </div>
            ))}
            <button className="add-btn" onClick={addDoor}>
              Add Door
            </button>
          </div>

          <div className="calculate-section">
            <button 
              className="calculate-btn"
              onClick={handleCalculate}
            >
              Calculate Estimate
            </button>
          </div>

          {showResults && (
            <RoomEstimate 
              roomDetails={roomDetails}
              budgetRates={budgetRates}
              onSave={handleSaveRoom}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Services; 