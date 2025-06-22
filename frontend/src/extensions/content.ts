import { handleTradeExecution } from './scripts/tradeActions';
import { setupUIListeners } from './scripts/uiHandler';

// Listen for trade execution messages
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'execute_trade') {
    handleTradeExecution(message);
  }
});

// Initialize UI handlers
setupUIListeners();
