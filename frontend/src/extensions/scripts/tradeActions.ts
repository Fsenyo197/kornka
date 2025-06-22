export function handleTradeExecution(message: {
  tradeType: string;
  symbol: string;
}) {
  console.log(`Executing ${message.tradeType} trade for ${message.symbol}`);

  // Simulate button click if the element exists
  const tradeButton = document.querySelector(
    `#${message.tradeType}XauusdButton`
  ) as HTMLElement;
  tradeButton?.click();
}
