import React, { useState } from 'react';
import Button from '@/components/Buttons';
import Input from '@/components/Inputs';

const EditUserProfile: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    console.log('Profile updated:', { username, email });
    alert('Profile updated successfully!');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit User Profile</h2>
      <Input
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button label="Save Changes" onClick={handleSave} />
    </div>
  );
};

export default EditUserProfile;
