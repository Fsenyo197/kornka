import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import Input from '@/components/Inputs';
import Button from '@/components/Buttons';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Logging in with', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">Login</h2>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={AiOutlineMail}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={AiOutlineLock}
        />
        <Button label="Login" onClick={handleLogin} />
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
