import React, { useEffect, useState } from 'react';
import avatar from './avatar.png';
import './ProductReviewList.css';
import StarRating from './components/StarRating';
import ProductModel from '../../../../models/ProductModel';
import ReviewModel from '../../../../models/ReviewModel';
import { format } from 'date-fns';
import { getAllReviewByProductId } from '../../../../api/ReviewAPI';
import Loader from '../Loader';

interface ProductReviewListProps {
  productId: number;
}

const ProductReviewList = (props: ProductReviewListProps) => {
  const [visibleProductReviews, setVisibleProductReviews] = useState(4);
  const [hiddenProductReviews, setHiddenProductReviews] = useState(0);
  const [reviewsList, setReviewsList] = useState<ReviewModel[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    getAllReviewByProductId(props.productId)
      .then((reviewListResponse) => {
        setReviewsList(reviewListResponse);
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

  const loadMoreProductReviews = () => {
    setVisibleProductReviews(
      (prevVisibleProductReviews) => prevVisibleProductReviews + 4,
    );
    setHiddenProductReviews(hiddenProductReviews + 4);
  };

  const hideProductReviews = () => {
    setVisibleProductReviews(4);
    setHiddenProductReviews(0);
  };

  return (
    <div className="product-details__review__wrapper">
      <div className="product-details__review__heading">
        <strong>Đánh giá sản phẩm</strong> ({reviewsList.length} đánh giá)
      </div>
      <div className="product-details__review__list-wrapper">
        {reviewsList.length > 0 ? (
          <div className="product-details__review__list">
            {reviewsList
              .slice(0, visibleProductReviews)
              .map((review, index) => (
                <div key={index} className="product-details__review">
                  <div className="product-details__review__avatar-wrap">
                    <img
                      src="https://res.cloudinary.com/dgdn13yur/image/upload/v1710904428/avatar_sjugj8.png"
                      alt="Avatar"
                      className="product-details__review__avatar"
                    />
                  </div>
                  <div className="product-details__review__main">
                    <div className="product-details__review__info">
                      <div className="product-details__review__header">
                        <span className="product-details__review__name">
                          {/* {review.customer} */}
                          Lâm
                        </span>
                        <span className="product-details__review__time">
                          {format(review.reviewTime, 'dd/MM/yyyy')}, lúc{' '}
                          {format(review.reviewTime, 'HH:mm:ss')}
                        </span>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="product-details__review__content">
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="product-details__review__no">
            <img
              src="https://res.cloudinary.com/dgdn13yur/image/upload/v1711643592/no_review_isqiad.png"
              alt=""
            />
            <span>Chưa có đánh giá nào cho sản phẩm này</span>
          </div>
        )}
      </div>
      <div className="product-details__review__footer">
        <div className="product-details__review__show">
          {visibleProductReviews < reviewsList.length && (
            <div
              className="product-details__review__show-option"
              onClick={loadMoreProductReviews}
            >
              Xem thêm...
            </div>
          )}
          {hiddenProductReviews > 0 && (
            <div
              className="product-details__review__show-option"
              onClick={hideProductReviews}
            >
              Ẩn bớt
            </div>
          )}
        </div>
        <div className="product-details__review__show-option">
          Viết đánh giá
        </div>
      </div>
    </div>
  );
};

export default ProductReviewList;
