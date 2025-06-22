import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Header: React.FC = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-blue-500 p-4 text-white sticky top-0 w-full z-50 shadow-md">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">Kornka</div>
        <ul className="flex gap-4 items-center relative">
          {isAuthenticated ? (
            <li className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                <FaUserCircle className="text-2xl hover:text-gray-200" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
                  <Link
                    to="/profile/edit"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="/profile/settings"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem('isAuthenticated');
                      window.location.reload();
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link to="/auth/login" className="hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/auth/register" className="hover:underline">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
