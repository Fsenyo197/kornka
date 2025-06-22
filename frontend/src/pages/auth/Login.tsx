import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import Input from '@/components/Inputs';
import Button from '@/components/Buttons';
import { saveToken } from '@/utils/tokenStore';
import { useAuthStore } from '@/stores/useAuthStore';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loading, error, setLoading, setError } = useAuthStore();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate successful login by saving a dummy token
      await saveToken('access_token', 'dummy_token');
      localStorage.setItem('isAuthenticated', 'true');
      console.log('Login successful');
      navigate('/trade');
    } catch (error: any) {
      console.error('Login failed', error);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 flex items-center justify-center">
          Login
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
        <Button
          label={loading ? 'Loading...' : 'Login'}
          onClick={handleLogin}
          disabled={loading}
        />
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
