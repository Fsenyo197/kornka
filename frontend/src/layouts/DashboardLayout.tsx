import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
  const [_isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    // Simulating an authentication check (Replace with actual auth logic)
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);

    if (!authStatus) {
      navigate('/auth/login');
    }
  }, [navigate]);

  return (
    <div className="flex h-screen">
      <aside className="w-28 bg-gray-800 text-white p-4 flex items-center flex-col sm:w-42 md:w-48 lg:w-64">
        <nav className="mt-4">
          <ul className="space-y-4">
            <li>
              <Link to="/trade" className="hover:text-blue-300 text-xl">
                Trade
              </Link>
            </li>
            <li>
              <Link to="/analytics" className="hover:text-blue-300 text-xl">
                Analytics
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

export default DashboardLayout;
