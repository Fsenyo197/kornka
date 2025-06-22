import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteToken } from '@/utils/tokenStore';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await deleteToken('access_token');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="text-red-500 hover:underline">
      Logout
    </button>
  );
};

export default Logout;
