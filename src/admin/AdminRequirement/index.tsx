import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  id: any;
  roles: string[];
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
      const roles = decodedToken.roles;

      // Kiểm tra quyền
      if (roles.length === 1 && roles.includes('Khách hàng')) {
        navigate('/403-error');
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return WithAdminCheck || null;
};

export default AdminRequirement;
