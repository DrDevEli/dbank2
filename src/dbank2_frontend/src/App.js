import { html, render } from 'lit-html';
import { dbank2_backend } from '../../declarations/dbank2_backend';
import logo from '../assets/dbank_logo.png';

class App {
  constructor() {
    this.currentBalance = 0;
    this.backend = dbank2_backend;
    this.#initialize();
  }

  async #initialize() {
    await this.#fetchBalance();
    this.#attachEventListeners();
    this.#render();
  }

  async #fetchBalance() {
    try {
      this.currentBalance = await this.backend.checkBalance();
      this.#render();
    } catch (error) {
      console.error('Error fetching balance:', error);
      this.#showError('Failed to load balance');
    }
  }

  async #handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('#submit-btn');
    
    try {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');

      const topUpAmount = parseFloat(form.elements['topUp'].value) || 0;
      const withdrawalAmount = parseFloat(form.elements['withdraw'].value) || 0;

      if (topUpAmount > 0) {
        await this.backend.increaseValue(topUpAmount);
      }
      if (withdrawalAmount > 0) {
        await this.backend.decreaseValue(withdrawalAmount);
      }

      await this.#fetchBalance();
      form.reset(); // Clear form after successful transaction
    } catch (error) {
      console.error('Transaction error:', error);
      this.#showError(`Transaction failed: ${error.message}`);
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    }
  }

  #attachEventListeners() {
    const form = document.getElementById('transaction-form');
    if (form) {
      form.addEventListener('submit', (e) => this.#handleFormSubmit(e));
    }
  }

  #showError(message) {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      setTimeout(() => errorElement.style.display = 'none', 5000);
    }
  }

  #render() {
    const template = html`
      <div class="container">
        <img src=${logo} alt="DBank logo" width="100" />
        <h1>Current Balance: <span id="value">${this.currentBalance.toFixed(2)}</span></h1>
        <div id="error-message" class="error-message" style="display:none;"></div>
        <div class="divider"></div>
        <form id="transaction-form">
          <h2>Amount to Top Up</h2>
          <input 
            id="input-amount" 
            type="number" 
            step="0.01" 
            min="0" 
            name="topUp" 
            required
          />
          <h2>Amount to Withdraw</h2>
          <input 
            id="withdrawal-amount" 
            type="number" 
            name="withdraw" 
            step="0.01" 
            min="0" 
            required
          />
          <button 
            id="submit-btn" 
            type="submit"
            aria-label="Finalise Transaction"
          >
            Finalise Transaction
          </button>
        </form>
      </div>
    `;

    const rootElement = document.getElementById('root');
    if (rootElement) {
      render(template, rootElement);
    } else {
      console.error('Root element not found');
    }
  }
}

export default App;