import React, { useEffect, useState } from 'react';
import './ProductReviewList.css';
import ProductModel from '../../../../models/ProductModel';
import ReviewModel from '../../../../models/ReviewModel';
import { format } from 'date-fns';
import {
  getAllReviewByProductId,
  getCustomerReviewByProduct,
} from '../../../../api/ReviewAPI';
import Loader from '../Loader';
import { ReviewModal } from '../ProductDetail/components/ReviewModal';
import { FadeModal } from '../../../../utils/FadeModal';
import { getProductById } from '../../../../api/ProductAPI';
import ProductReviewItem from './components/ProductReviewItem';
import { getUserIdByToken, isToken } from '../../../../utils/JwtService';
import { toast } from 'react-toastify';

interface ProductReviewListProps {
  productId: number;
}

const ProductReviewList = (props: ProductReviewListProps) => {
  const [customerReview, setCustomerReview] = useState<ReviewModel | null>(
    null,
  );
  const [visibleProductReviews, setVisibleProductReviews] = useState(4);
  const [hiddenProductReviews, setHiddenProductReviews] = useState(0);
  const [reviewsList, setReviewsList] = useState<ReviewModel[]>([]);
  const [product, setProduct] = useState<ProductModel | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    Promise.all([
      getAllReviewByProductId(props.productId),
      getProductById(props.productId),
    ])
      .then(([reviewListResponse, productResponse]) => {
        setReviewsList(reviewListResponse.reviewList);
        setProduct(productResponse);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, [reviewsList]);

  useEffect(() => {
    const customerId = getUserIdByToken();
    getCustomerReviewByProduct(customerId, props.productId)
      .then((result) => {
        console.log(result);
        setCustomerReview(result.review);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reviewsList]);

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
        <strong>Đánh giá sản phẩm</strong> ({reviewsList.length} lượt đánh giá)
      </div>
      <div className="product-details__review__list-wrapper">
        {reviewsList.length > 0 ? (
          <div className="product-details__review__list">
            {reviewsList
              .slice(0, visibleProductReviews)
              .map((review, index) => (
                <ProductReviewItem key={index} review={review} />
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
        {customerReview === null ||
          (customerReview === undefined && (
            <div
              onClick={() => {
                if (!isToken()) {
                  toast.error('Bạn cần đăng nhập để đánh giá!');
                  return;
                }
                setOpenModal(true);
              }}
              className="product-details__review__show-option"
            >
              Viết đánh giá
            </div>
          ))}
      </div>
      <FadeModal
        open={openModal}
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
      >
        {product && (
          <ReviewModal product={product} handleCloseModal={handleCloseModal} />
        )}
      </FadeModal>
    </div>
  );
};

export default ProductReviewList;
