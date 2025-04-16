import React from 'react';

const BudgetSelector = ({ selectedBudget, onBudgetSelect }) => {
  const budgetOptions = {
    standard: {
      name: 'Standard',
      description: 'Basic quality materials and standard finish',
      laborRate: {
        base: 40, // PKR per square foot
        ceiling: 50,
        preparation: 25,
      },
      paintPrices: {
        base: 1500, // PKR per gallon
        primer: 1000,
        finish: 2000,
      },
      features: [
        'Standard quality paint',
        'Basic surface preparation',
        'Standard finish',
        'Regular labor team'
      ]
    },
    medium: {
      name: 'Medium',
      description: 'Mid-range quality with enhanced durability',
      laborRate: {
        base: 60,
        ceiling: 70,
        preparation: 35,
      },
      paintPrices: {
        base: 2000,
        primer: 1500,
        finish: 2500,
      },
      features: [
        'Medium-grade paint quality',
        'Thorough surface preparation',
        'Enhanced finish',
        'Experienced labor team'
      ]
    },
    premium: {
      name: 'Premium',
      description: 'High-end materials with premium finish',
      laborRate: {
        base: 80,
        ceiling: 90,
        preparation: 45,
      },
      paintPrices: {
        base: 2500,
        primer: 2000,
        finish: 3000,
      },
      features: [
        'Premium quality paint',
        'Professional surface preparation',
        'Premium finish with coating',
        'Expert labor team'
      ]
    }
  };

  return (
    <div className="budget-selector">
      <h3>Select Your Budget Tier</h3>
      <div className="budget-options">
        {Object.entries(budgetOptions).map(([key, budget]) => (
          <div 
            key={key}
            className={`budget-card ${selectedBudget === key ? 'selected' : ''}`}
            onClick={() => onBudgetSelect(key, budget)}
          >
            <div className="budget-header">
              <h4>{budget.name}</h4>
              <p className="description">{budget.description}</p>
            </div>
            <div className="budget-details">
              <h5>Features:</h5>
              <ul>
                {budget.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="price-examples">
                <p>Labor Rate: PKR {budget.laborRate.base}/sq ft</p>
                <p>Paint: PKR {budget.paintPrices.base}/gallon</p>
              </div>
            </div>
            <button 
              className={`select-budget-btn ${selectedBudget === key ? 'selected' : ''}`}
            >
              {selectedBudget === key ? 'Selected' : 'Select This Budget'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetSelector; 