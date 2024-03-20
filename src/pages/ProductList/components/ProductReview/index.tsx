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
    <div className="review-list">
      {reviewList.map((review) => (
        <div className="review">
          <div className="review__avatar-wrap">
            <img
              src="https://res.cloudinary.com/dgdn13yur/image/upload/v1710904428/avatar_sjugj8.png"
              alt="Avatar"
              className="review__avatar"
            />
          </div>
          <div className="review__main">
            <div className="review__info">
              <div className="review__header">
                {/* <span className="review__name">{review.}</span> */}
                <span className="review__time">
                  {review.reviewTime.toLocaleString()}
                </span>
              </div>
            </div>
            <p className="review__content">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductReview;
