import React, { useState, useEffect } from 'react';
import { dbank2_backend } from '../../declarations/dbank2_backend';
import logo from '../assets/dbank_logo.png';

const App = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const balance = await dbank2_backend.checkBalance();
      setCurrentBalance(balance);
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError('Failed to load balance');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const topUpAmount = parseFloat(form.elements.topUp.value) || 0;
    const withdrawalAmount = parseFloat(form.elements.withdraw.value) || 0;

    if (topUpAmount < 0 || withdrawalAmount < 0) {
      setError('Amounts cannot be negative');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      if (topUpAmount > 0) {
        await dbank2_backend.increaseValue(topUpAmount);
      }
      if (withdrawalAmount > 0) {
        await dbank2_backend.decreaseValue(withdrawalAmount);
      }

      await fetchBalance();
      form.reset();
    } catch (err) {
      console.error('Transaction error:', err);
      setError(`Transaction failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="DBank logo" width="100" />
      <h1>Current Balance: <span id="value">{currentBalance.toFixed(2)}</span></h1>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="divider"></div>
      
      <form onSubmit={handleSubmit}>
        <h2>Amount to Top Up</h2>
        <input
          type="number"
          step="0.01"
          min="0"
          name="topUp"
          required
        />
        
        <h2>Amount to Withdraw</h2>
        <input
          type="number"
          name="withdraw"
          step="0.01"
          min="0"
          required
        />
        
        <button
          type="submit"
          disabled={isLoading}
          aria-label="Finalise Transaction"
        >
          {isLoading ? 'Processing...' : 'Finalise Transaction'}
        </button>
      </form>
    </div>
  );
};

export default App;
