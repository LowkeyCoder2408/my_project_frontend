import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './AdminLayout.css';
import AdminNavbar from '../components/admin/AdminNavbar';
import AdminMenu from '../components/admin/AdminMenu';
import { useEffect } from 'react';
import { getRoleByToken, isToken } from '../../../../utils/JwtService';
import { useNavigate } from 'react-router-dom';

const queryClient = new QueryClient();

interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="main">
      <AdminNavbar />
      <div className="container-menu">
        <div className="menuContainer">
          <AdminMenu />
        </div>
        <div className="contentContainer">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
