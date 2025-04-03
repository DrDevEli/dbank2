import { html, render } from 'lit-html';
import  {dbank2_backend}  from '../../declarations/dbank2_backend';
import logo from '../assets/dbank_logo.png';

class App {

  constructor() {
    this.currentBalance = 0; // Initialize balance
    this.backend = dbank2_backend; // Ensure backend is properly referenced
    this.#initialize();
  }

  async #initialize() {
    await this.#fetchBalance();
    this.#attachEventListeners();
    this.#render();
  }

  ///Fetch balance from backend
  async #fetchBalance(){
    try{
      this.currentBalance = await dbank2_backend.checkBalance();
      this.#render(); 
    } catch(error){
      console.log('Error fetching balance', error);
    }
  }
   // Handle form submission
   async #handleFormSubmit(event) {
    event.preventDefault();
    const topUpAmount = parseFloat(document.getElementById('input-amount').value) || 0;
    const withdrawalAmount = parseFloat(document.getElementById('withdrawal-amount').value) || 0;

    try {
      if (topUpAmount > 0) {
        await dbank2_backend.increaseValue(topUpAmount); // Example backend call
      }
      if (withdrawalAmount > 0) {
        await dbank2_backend.decreaseValue(withdrawalAmount); // Example backend call
      }

      // Re-fetch the updated balance
      await this.#fetchBalance();
    } catch (error) {
      console.error('Transaction error:', error);
    }
  }
  // Attach event listeners
  #attachEventListeners() {
    const form = document.getElementById("transaction-form");
    if (form) {
      form.addEventListener("submit", (event) => this.#handleFormSubmit(event));
    }
  }

  #render() {
    let body = html`
      <div class="container">
      <img src= ${logo} alt="DBank logo" width="100"/>
      <h1>Current Balance: <span id="value">${this.currentBalance}</span></h1>
      <div class="divider"></div>
      <form id="transaction-form">
      <h2>Amount to Top Up</h2>
      <input id="input-amount" type="number" step="0.01" min=0 name="topUp" value=""/>
      <h2>Amount to Withdraw</h2>
      <input id="withdrawal-amount" type="number" name="withdraw" step="0.01" min=0 value=""/>
      <input id="submit-btn" type="submit" value="Finalise Transaction" />
    </form>
    </div>
    `;
    const rootElement = document.getElementById('root');
    if (rootElement) {
      render(body, rootElement);

      // Attach form event listener
      document
        .getElementById('transaction-form')
        .addEventListener('submit', this.#handleFormSubmit.bind(this));
    } else {
      console.error('Root element not found.');
    }
  }
};
  


export default App;
