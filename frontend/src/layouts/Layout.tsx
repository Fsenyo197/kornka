import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Trade from '@/pages/dashboard/Trade';
import Analytics from '@/pages/dashboard/Analytics';
import DashboardLayout from '@/layouts/DashboardLayout';
import EditProfile from '@/pages/profile/EditProfile';
import Settings from '@/pages/profile/Settings';

const Layout: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/auth/*" element={<AuthLayout />} />
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Trade />} />
              <Route path="trade" element={<Trade />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>
            {/* Profile Routes */}
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/settings" element={<Settings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default Layout;
