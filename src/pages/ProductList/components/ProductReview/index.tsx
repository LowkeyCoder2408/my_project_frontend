import { useEffect, useState } from 'react';
import { getProductByAlias } from '../../../../api/ProductAPI';
import ProductModel from '../../../../models/ProductModel';
import './ProductReview.css';
import Loader from '../Loader';
import ReviewModel from '../../../../models/ReviewModel';
import { getAllReviewByProductId } from '../../../../api/ReviewAPI';

interface ProductReviewInterface {
  productId: number;
}

const ProductReview: React.FC<ProductReviewInterface> = (props) => {
  const productId: number = props.productId;
  const [reviewList, setReviewList] = useState<ReviewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    getAllReviewByProductId(productId)
      .then((reviewListResponse) => {
        setReviewList(reviewListResponse);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        <h1>Gặp lỗi: {error.message}</h1>
      </div>
    );
  }

  // if (!product) {
  //   return (
  //     <div>
  //       <h1>Sản phẩm không tồn tại</h1>
  //     </div>
  //   );
  // }

  return (
    <div className="container mt-5">
      <div className="row">
        {reviewList.map((review, index) => (
          <div key={index} className="">
            <h3>{review.rating}</h3>
            <h3>{review.comment}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;
