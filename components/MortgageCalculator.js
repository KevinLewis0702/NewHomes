import React, { useState, useEffect } from 'react';

function MortgageCalculator({ defaultLoanAmount }) {
  const [loanAmount, setLoanAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [interestRate, setInterestRate] = useState('5.2');
  const [loanTerm, setLoanTerm] = useState('25');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [depositPercentage, setDepositPercentage] = useState(0);

  useEffect(() => {
    const loanAmountNumeric = parseFloat(defaultLoanAmount.replace(/,/g, ''));
    if (!isNaN(loanAmountNumeric) && loanAmountNumeric > 0) {
      const initialDeposit = loanAmountNumeric * 0.1;
      setDepositAmount(formatNumberForDisplay(initialDeposit));
      setLoanAmount(formatNumberForDisplay(loanAmountNumeric));
    }
  }, [defaultLoanAmount]);

  useEffect(() => {
    const parsedLoanAmount = parseFloat(loanAmount.replace(/,/g, ''));
    const parsedDepositAmount = parseFloat(depositAmount.replace(/,/g, ''));
    if (!isNaN(parsedLoanAmount) && !isNaN(parsedDepositAmount) && parsedLoanAmount > 0) {
      const percentage = (parsedDepositAmount / parsedLoanAmount) * 100;
      setDepositPercentage(percentage);
    }
  }, [loanAmount, depositAmount]);

  const handleLoanAmountChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setLoanAmount(formatNumberForDisplay(Number(value)));
  };

  const handleDepositAmountChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setDepositAmount(formatNumberForDisplay(Number(value)));
  };

  const formatNumberForDisplay = (num) => {
    if (!isNaN(num)) {
      return num.toLocaleString();
    }
    return '';
  };

  const calculateMonthlyPayment = () => {
    const parsedLoanAmount = parseFloat(loanAmount.replace(/,/g, ''));
    const parsedDepositAmount = parseFloat(depositAmount.replace(/,/g, ''));
    console.log("Parsed loan amount for calculation:", parsedLoanAmount);
    console.log("Parsed deposit amount for calculation:", parsedDepositAmount);
  
    const principal = parsedLoanAmount - parsedDepositAmount;
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseFloat(loanTerm) * 12;
  
    const part1 = Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const monthly = (principal * monthlyInterestRate * part1) / (part1 - 1);

    const percentage = (parsedDepositAmount / parsedLoanAmount) * 100;
    setDepositPercentage(percentage);
  
    if (isFinite(monthly)) {
      setMonthlyPayment(monthly.toFixed(2));
    } else {
      alert('Please check your input values');
    }
  };

  const calculateStrokeDasharray = (percentage) => {
    const radius = 18; 
    const circumference = 2 * Math.PI * radius;
    return `${(circumference * percentage) / 100} ${circumference}`;
  };

  return (
    <div className="mortgage-calculator bg-white shadow-md rounded-lg p-4 my-6 max-w-xl">
    <h2 className="text-xl font-semibold mb-4">Mortgage Calculator</h2>
    <div className="calculator-inputs mb-4">
        <div className="mb-3 relative">
          <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">Property price </label>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2" style={{ top: '50%', transform: 'translateY(-12%)' }}>£</span>

          <input
            type="text" 
            id="loanAmount"
            name="loanAmount"
            className="mt-1 p-2 pl-6 w-full border border-gray-300 rounded-md shadow-sm" 
            value={loanAmount}
            onChange={handleLoanAmountChange}
          />
        </div>
        
        <div className="mb-3 relative">
          <label htmlFor="depositAmount" className="block text-sm font-medium text-gray-700">Deposit </label>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none" style={{ top: '35%', transform: 'translateY(-50%)' }}>£</span>
          <input
  type="text"
  id="depositAmount"
  name="depositAmount"
  className="mt-1 p-2 pl-6 w-full border border-gray-300 rounded-md shadow-sm"
  value={depositAmount} 
  onChange={handleDepositAmountChange}
/>

<div className="flex items-center justify-center mb-4 mt-3">
          <svg width="50" height="50" className="deposit-percentage-indicator mr-2">
            <circle cx="25" cy="25" r="18" fill="none" stroke="#d2d3d4" strokeWidth="4" />
            <circle cx="25" cy="25" r="18" fill="none" stroke="#4f8a8b" strokeWidth="4"
              strokeDasharray={calculateStrokeDasharray(depositPercentage)}
              transform="rotate(-90 25 25)" />
          </svg>
          <span className="text-sm font-medium text-gray-700">
            {depositPercentage.toFixed(2)}% of the property price
          </span>
        </div>

        </div>
        <div className="mb-3">
          <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
          <input
            type="number"
            step="0.01"
            id="interestRate"
            name="interestRate"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700">Repayment Period (years)</label>
          <input
            type="number"
            id="loanTerm"
            name="loanTerm"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
          />
        </div>
  
        <button
          className="calculate-btn w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-150"
          onClick={calculateMonthlyPayment}
        >
          Calculate
        </button>


        </div>
      {monthlyPayment && (
        <div className="calculated-result p-2 bg-blue-100 rounded-md text-blue-800">
          <p>Monthly Payment: <span>£{monthlyPayment}</span></p>
        </div>
      )}
    </div>
  );
}

export default MortgageCalculator;