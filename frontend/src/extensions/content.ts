console.log('Trade Manager Content Script Loaded');

// Example: Modify a trade input field in the trading platform
const tradeInputs = document.querySelectorAll("input[type='number']");
tradeInputs.forEach((input) => {
  input.style.border = '2px solid red'; // Highlight input fields
});
