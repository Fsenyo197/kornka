import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Logout from '@/pages/auth/Logout';

const AuthLayout: React.FC = () => {
  return (
    <div>
      <div>
        <Outlet />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
};

export default AuthLayout;
