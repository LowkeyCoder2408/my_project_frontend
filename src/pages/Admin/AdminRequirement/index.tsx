import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  id: any;
  role: string;
  avatar: string;
  fullName: string;
  email: string;
  enabled: boolean;
}

const AdminRequirement = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const WithAdminCheck: React.FC<P> = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');

      // Nếu chưa đăng nhập thì về trang /login
      if (!token) {
        navigate('/login');
        return;
      }

      // Giải mã token
      const decodedToken = jwtDecode(token) as JwtPayload;

      // Lấy thông tin từ token đó
      const role = decodedToken.role;

      // Kiểm tra quyền
      if (role !== 'Quản trị hệ thống') {
        navigate('/error-403');
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return WithAdminCheck || null;
};

export default AdminRequirement;
