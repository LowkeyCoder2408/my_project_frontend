import { useNavigate } from 'react-router-dom';
import { singleProduct } from '../../../data';
import Single from '../../components/Single';
import { useEffect } from 'react';
import { getRoleByToken, isToken } from '../../../utils/JwtService';

const Product = () => {
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
  //Fetch data and send to Single Component
  return (
    <div className="product">
      <Single {...singleProduct} />
    </div>
  );
};

export default Product;
