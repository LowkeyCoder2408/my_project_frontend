import { singleProduct } from '../../../data';
import Single from '../../components/Single';

const Product = () => {
  //Fetch data and send to Single Component
  return (
    <div className="product">
      <Single {...singleProduct} />
    </div>
  );
};

export default Product;
