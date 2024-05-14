import { useNavigate } from 'react-router-dom';
import { singleUser } from '../../../data';
import Single from '../../components/Single';
import { useEffect } from 'react';
import { getRoleByToken, isToken } from '../../../utils/JwtService';

const User = () => {
  //Fetch data and send to Single Component
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

  return (
    <div className="user">
      <Single {...singleUser} />
    </div>
  );
};

export default User;
