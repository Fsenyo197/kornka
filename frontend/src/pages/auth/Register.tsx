import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import Input from '@/components/Inputs';
import Button from '@/components/Buttons';
import axiosInstance from '@/utils/axiosInstance';
import { saveToken } from '@/utils/tokenStore';
import { useAuthStore } from '@/stores/useAuthStore';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { loading, error, setLoading, setError } = useAuthStore();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/register', {
        email: email,
        password: password,
      });

      await saveToken('access_token', response.data.access_token);
      console.log('Registration successful');
      navigate('/');
    } catch (error: any) {
      console.error('Registration failed', error);
      setError(
        error.response?.data?.message ||
          'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 flex items-center justify-center">
          Register
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
        <Button
          label={loading ? 'Loading...' : 'Register'}
          onClick={handleRegister}
          disabled={loading}
        />
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
