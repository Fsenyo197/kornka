import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import Input from '@/components/Inputs';
import Button from '@/components/Buttons';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Handle registration logic here
    console.log('Registering with', { email, password, confirmPassword });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">Register</h2>
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
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon={AiOutlineLock}
        />
        <Button label="Register" onClick={handleRegister} />
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
