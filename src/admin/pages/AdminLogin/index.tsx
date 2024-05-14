import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoleByToken, isToken } from '../../../utils/JwtService';

const AdminLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !isToken() ||
      (getRoleByToken()?.length === 1 &&
        getRoleByToken()?.includes('Khách hàng'))
    ) {
      navigate('/403-error');
      return;
    }
  }, []);
  return <div>AdminLogin</div>;
};

export default AdminLogin;
