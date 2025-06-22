import React, { useState } from 'react';

interface Tab {
  id: number;
  title: string;
  url: string;
}

const TabCapturer: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [selectedTabs, setSelectedTabs] = useState<number[]>([]);

  const captureTabs = () => {
    chrome.runtime.sendMessage({ action: 'capture_tabs' }, (response) => {
      if (response && response.success) {
        setTabs(response.tabs);
      }
    });
  };

  const handleSelection = (tabId: number) => {
    setSelectedTabs((prev) =>
      prev.includes(tabId)
        ? prev.filter((id) => id !== tabId)
        : [...prev, tabId]
    );
  };

  const groupSelectedTabs = () => {
    chrome.runtime.sendMessage(
      { action: 'group_tabs', tabIds: selectedTabs },
      (response) => {
        if (response && response.success) {
          alert('Selected tabs grouped!');
        }
      }
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Tab Capturer</h2>
      <button
        className="bg-blue-500 text-white p-2 rounded mb-4"
        onClick={captureTabs}
      >
        Capture Tabs
      </button>
      <ul>
        {tabs.map((tab) => (
          <li key={tab.id} className="mb-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedTabs.includes(tab.id)}
                onChange={() => handleSelection(tab.id)}
              />
              {tab.title} - {tab.url}
            </label>
          </li>
        ))}
      </ul>
      {selectedTabs.length > 0 && (
        <button
          className="bg-green-500 text-white p-2 rounded mt-4"
          onClick={groupSelectedTabs}
        >
          Group Selected Tabs
        </button>
      )}
    </div>
  );
};

export default TabCapturer;
