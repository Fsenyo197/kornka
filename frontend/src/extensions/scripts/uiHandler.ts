export function setupUIListeners() {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.matches('#buyXauusdButton')) {
      chrome.runtime.sendMessage({
        action: 'execute_trade',
        tradeType: 'buy',
        symbol: 'XAUUSD',
      });
    }

    if (target.matches('#closeTradeButton')) {
      chrome.runtime.sendMessage({
        action: 'execute_trade',
        tradeType: 'close',
        symbol: 'XAUUSD',
      });
    }
  });
}
