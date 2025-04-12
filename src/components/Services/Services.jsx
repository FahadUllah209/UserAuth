import React, { useState } from "react";
import './Services.css';

const Services = () => {
  const [dimensions, setDimensions] = useState({
    length: "",
    width: "",
    height: "",
    windows: "",
    doors: ""
  });
  const [paintQuality, setPaintQuality] = useState("standard");
  const [result, setResult] = useState(null);

  const paintPrices = {
    standard: 25,  // price per square meter
    premium: 35,
    luxury: 45
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDimensions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePaintCost = (e) => {
    e.preventDefault();
    
    // Convert string inputs to numbers
    const length = parseFloat(dimensions.length);
    const width = parseFloat(dimensions.width);
    const height = parseFloat(dimensions.height);
    const windows = parseFloat(dimensions.windows) || 0;
    const doors = parseFloat(dimensions.doors) || 0;

    // Calculate total wall area
    const totalWallArea = 2 * (length * height + width * height);
    
    // Standard deductions for windows and doors
    const windowArea = windows * 1.5; // Assuming standard window size of 1.5 sq meters
    const doorArea = doors * 2;   // Assuming standard door size of 2 sq meters
    
    // Calculate paintable area
    const paintableArea = totalWallArea - (windowArea + doorArea);
    
    // Calculate paint needed (assuming 1 liter covers 10 sq meters)
    const litersNeeded = Math.ceil(paintableArea / 10);
    
    // Calculate cost
    const costPerLiter = paintPrices[paintQuality];
    const totalCost = litersNeeded * costPerLiter;

    setResult({
      paintableArea: paintableArea.toFixed(2),
      litersNeeded,
      totalCost: totalCost.toFixed(2)
    });
  };

  return (
    <div className="services-container">
      <h1>Our Services</h1>
      
      <div className="paint-calculator">
        <h2>Paint Calculator</h2>
        <p>Calculate the amount of paint needed for your room</p>
        
        <form onSubmit={calculatePaintCost} className="calculator-form">
          <div className="dimensions-inputs">
            <div className="input-group">
              <label>Room Length (meters)</label>
              <input
                type="number"
                name="length"
                value={dimensions.length}
                onChange={handleChange}
                required
                min="0"
                step="0.1"
              />
            </div>

            <div className="input-group">
              <label>Room Width (meters)</label>
              <input
                type="number"
                name="width"
                value={dimensions.width}
                onChange={handleChange}
                required
                min="0"
                step="0.1"
              />
            </div>

            <div className="input-group">
              <label>Room Height (meters)</label>
              <input
                type="number"
                name="height"
                value={dimensions.height}
                onChange={handleChange}
                required
                min="0"
                step="0.1"
              />
            </div>

            <div className="input-group">
              <label>Number of Windows</label>
              <input
                type="number"
                name="windows"
                value={dimensions.windows}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="input-group">
              <label>Number of Doors</label>
              <input
                type="number"
                name="doors"
                value={dimensions.doors}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="paint-quality">
            <label>Paint Quality</label>
            <select value={paintQuality} onChange={(e) => setPaintQuality(e.target.value)}>
              <option value="standard">Standard (₹25/liter)</option>
              <option value="premium">Premium (₹35/liter)</option>
              <option value="luxury">Luxury (₹45/liter)</option>
            </select>
          </div>

          <button type="submit" className="calculate-btn">Calculate Cost</button>
        </form>

        {result && (
          <div className="calculation-result">
            <h3>Calculation Results</h3>
            <p>Total Wall Area to Paint: {result.paintableArea} square meters</p>
            <p>Paint Required: {result.litersNeeded} liters</p>
            <p>Estimated Cost: ₹{result.totalCost}</p>
          </div>
        )}
      </div>

      <div className="services-grid">
        <div className="service-card">
          <h3>Interior Painting</h3>
          <p>Professional interior painting services for your home or office</p>
        </div>
        <div className="service-card">
          <h3>Exterior Painting</h3>
          <p>Weather-resistant exterior painting solutions</p>
        </div>
        <div className="service-card">
          <h3>Commercial Painting</h3>
          <p>Large-scale commercial painting projects</p>
        </div>
        <div className="service-card">
          <h3>Decorative Painting</h3>
          <p>Custom decorative painting and finishes</p>
        </div>
      </div>
    </div>
  );
};

export default Services; 