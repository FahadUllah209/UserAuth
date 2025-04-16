import React, { useState, useEffect } from 'react';

const RoomEstimate = ({ roomDetails, budgetRates, onSave }) => {
  const [estimate, setEstimate] = useState(null);

  useEffect(() => {
    if (roomDetails.width && roomDetails.height && budgetRates) {
      calculateEstimate();
    }
  }, [roomDetails, budgetRates]);

  const calculateEstimate = () => {
    // Convert string inputs to numbers and validate
    const width = parseFloat(roomDetails.width) || 0;
    const height = parseFloat(roomDetails.height) || 0;

    // Calculate total wall area (2 * (width + length) * height)
    const wallArea = 2 * (width + width) * height; // Using width twice since we don't have length
    
    // Calculate window areas with validation
    const windowArea = roomDetails.windows.reduce((total, window) => {
      const windowWidth = parseFloat(window.width) || 0;
      const windowHeight = parseFloat(window.height) || 0;
      return total + (windowWidth * windowHeight);
    }, 0);

    // Calculate door areas with validation
    const doorArea = roomDetails.doors.reduce((total, door) => {
      const doorWidth = parseFloat(door.width) || 0;
      const doorHeight = parseFloat(door.height) || 0;
      return total + (doorWidth * doorHeight);
    }, 0);

    // Calculate ceiling area
    const ceilingArea = width * width; // Using width as length since we're assuming square room

    // Calculate total paintable area
    const totalPaintableArea = Math.max(0, wallArea + ceilingArea - windowArea - doorArea);

    // Calculate paint required (1 gallon covers 400 sq ft)
    const paintRequired = Math.ceil(totalPaintableArea / 400) || 0;
    const primerRequired = Math.ceil(paintRequired * 0.5) || 0;

    // Use budget-specific rates for calculations
    const laborCosts = {
      baseLabor: Math.ceil(wallArea * budgetRates.laborRate.base),
      ceilingLabor: Math.ceil(ceilingArea * budgetRates.laborRate.ceiling),
      preparationLabor: Math.ceil(totalPaintableArea * budgetRates.laborRate.preparation),
      totalLaborCost: 0
    };

    laborCosts.totalLaborCost = Math.ceil(
      laborCosts.baseLabor +
      laborCosts.ceilingLabor +
      laborCosts.preparationLabor
    );

    const materialCosts = {
      basePaintCost: paintRequired * budgetRates.paintPrices.base,
      primerCost: primerRequired * budgetRates.paintPrices.primer,
      finishCost: paintRequired * budgetRates.paintPrices.finish,
      totalMaterialCost: 0
    };

    materialCosts.totalMaterialCost = 
      materialCosts.basePaintCost +
      materialCosts.primerCost +
      materialCosts.finishCost;

    const totalCost = laborCosts.totalLaborCost + materialCosts.totalMaterialCost;

    setEstimate({
      areas: {
        totalArea: totalPaintableArea.toFixed(2),
        wallArea: wallArea.toFixed(2),
        ceilingArea: ceilingArea.toFixed(2),
        windowArea: windowArea.toFixed(2),
        doorArea: doorArea.toFixed(2),
      },
      paintRequired: {
        basePaint: paintRequired,
        primerPaint: primerRequired,
        totalPaint: paintRequired + primerRequired,
      },
      laborCosts: {
        baseLabor: laborCosts.baseLabor,
        ceilingLabor: laborCosts.ceilingLabor,
        preparationLabor: laborCosts.preparationLabor,
        totalLaborCost: laborCosts.totalLaborCost,
      },
      materialCosts: {
        basePaintCost: materialCosts.basePaintCost,
        primerCost: materialCosts.primerCost,
        finishCost: materialCosts.finishCost,
        totalMaterialCost: materialCosts.totalMaterialCost,
      },
      totalCost,
    });
  };

  const handleSave = () => {
    if (estimate) {
      onSave(estimate);
    }
  };

  if (!estimate) return null;

  return (
    <div className="estimate-results">
      <h3>Estimate Results for {roomDetails.roomName || 'Room'}</h3>
      
      <div className="results-section">
        <h4>Area Breakdown</h4>
        <div className="results-grid">
          <p>Total Paintable Area: {estimate.areas.totalArea} sq ft</p>
          <p>Wall Area: {estimate.areas.wallArea} sq ft</p>
          <p>Ceiling Area: {estimate.areas.ceilingArea} sq ft</p>
          <p>Windows Area: {estimate.areas.windowArea} sq ft</p>
          <p>Doors Area: {estimate.areas.doorArea} sq ft</p>
        </div>
      </div>

      <div className="results-section">
        <h4>Paint Required</h4>
        <div className="results-grid">
          <p>Base Paint: {estimate.paintRequired.basePaint} gallons</p>
          <p>Primer: {estimate.paintRequired.primerPaint} gallons</p>
          <p>Total Paint: {estimate.paintRequired.totalPaint} gallons</p>
        </div>
      </div>

      <div className="results-section">
        <h4>Labor Costs (PKR)</h4>
        <div className="results-grid">
          <p>Base Labor: {estimate.laborCosts.baseLabor.toLocaleString()}</p>
          <p>Ceiling Labor: {estimate.laborCosts.ceilingLabor.toLocaleString()}</p>
          <p>Preparation: {estimate.laborCosts.preparationLabor.toLocaleString()}</p>
          <p className="total">Total Labor: {estimate.laborCosts.totalLaborCost.toLocaleString()}</p>
        </div>
      </div>

      <div className="results-section">
        <h4>Material Costs (PKR)</h4>
        <div className="results-grid">
          <p>Base Paint: {estimate.materialCosts.basePaintCost.toLocaleString()}</p>
          <p>Primer: {estimate.materialCosts.primerCost.toLocaleString()}</p>
          <p>Finish: {estimate.materialCosts.finishCost.toLocaleString()}</p>
          <p className="total">Total Materials: {estimate.materialCosts.totalMaterialCost.toLocaleString()}</p>
        </div>
      </div>

      <div className="total-cost">
        <h4>Total Estimated Cost (PKR)</h4>
        <p className="amount">{estimate.totalCost.toLocaleString()}</p>
      </div>

      <div className="save-section">
        <button className="save-btn" onClick={handleSave}>
          Save Room Estimate
        </button>
      </div>
    </div>
  );
};

export default RoomEstimate; 