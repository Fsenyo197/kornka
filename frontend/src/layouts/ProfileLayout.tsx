import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const ProfileLayout: React.FC = () => {
  const [_isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);

    if (!authStatus) {
      navigate('/auth/login');
    }
  }, [navigate]);

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Profile</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/profile/edit" className="hover:text-blue-300">
                Edit User Profile
              </Link>
            </li>
            <li>
              <Link to="/profile/settings" className="hover:text-blue-300">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileLayout;
