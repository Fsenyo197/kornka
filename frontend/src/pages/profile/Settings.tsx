import React, { useState } from 'react';
import Button from '@/components/Buttons';

const Settings: React.FC = () => {
  const [notification, setNotification] = useState(true);
  const [theme, setTheme] = useState('light');

  const handleSave = () => {
    console.log('Settings updated:', { notification, theme });
    alert('Settings updated successfully!');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="mb-4">
        <label className="block mb-1">Notifications</label>
        <input
          type="checkbox"
          checked={notification}
          onChange={() => setNotification(!notification)}
          className="mr-2"
        />
        Enable Notifications
      </div>
      <div className="mb-4">
        <label className="block mb-1">Theme</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <Button label="Save Settings" onClick={handleSave} />
    </div>
  );
};

export default Settings;
