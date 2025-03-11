import { useState } from 'react';

export default function Popup() {
  const [tradeCount, setTradeCount] = useState(0);

  return (
    <div className="p-4 w-64">
      <h1 className="text-xl font-bold">Trade Manager</h1>
      <p>Active Trades: {tradeCount}</p>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setTradeCount(tradeCount + 1)}
      >
        Add Trade
      </button>
    </div>
  );
}
