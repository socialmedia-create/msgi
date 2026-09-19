import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminMobileNav from './AdminMobileNav';
import ToastContainer from './ToastContainer';
import AdminLogin from '../../pages/admin/AdminLogin';

export const AdminLayout = ({ children }) => {
  const { isAuthenticated } = useAdmin();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="admin-body-wrap flex min-h-screen relative overflow-x-hidden bg-[#080807] text-[#F0E8D8]">
      {/* Desktop Sidebar */}
      <AdminSidebar />

      {/* Mobile Drawer */}
      <AdminMobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-b from-[#0F0D0A]/60 via-[#080807] to-[#080807]">
        {/* Header */}
        <AdminHeader onMobileNavToggle={() => setIsMobileNavOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1500px] w-full mx-auto space-y-6">
          {children}
        </main>
      </div>

      {/* Global Toast Stack */}
      <ToastContainer />
    </div>
  );
};

export default AdminLayout;
