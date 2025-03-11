import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Home from '@/pages/Home';

const Layout: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header className="bg-blue-500 p-4 text-white">
          <nav className="container mx-auto">
            <ul className="flex gap-4">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <footer className="bg-blue-500 p-4 text-white text-center">
          Trade Manager © 2025
        </footer>
      </div>
    </Router>
  );
};

export default Layout;
