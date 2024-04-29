import { FormEvent, useEffect, useState } from 'react';
import { backendEndpoint } from '../../../../../../utils/Constant';
import { getUserIdByToken } from '../../../../../../utils/JwtService';
import { Button, TextField, Typography } from '@mui/material';
import { Rating } from 'react-simple-star-rating';
import ProductModel from '../../../../../../models/ProductModel';

interface ReviewModalProps {
  product?: ProductModel;
}

export const ReviewModal: React.FC<ReviewModalProps> = (props) => {
  const [reviewId, setReviewId] = useState(0);
  const [ratingValue, setRatingValue] = useState(0);
  const [errorRating, setErrorRating] = useState('');
  const [comment, setComment] = useState('');

  // Xử lý thay đổi vote
  const handleRating = (rate: number) => {
    setErrorRating('');
    setRatingValue(rate);
  };

  // Xử lý submit
  function handleSubmitReview(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    event.stopPropagation();
    if (ratingValue === 0) {
      setErrorRating('Bạn chưa đánh giá!');
      return;
    }

    const token = localStorage.getItem('token');
    //     const endpoint = props.cartItem?.review
    //       ? '/review/update-review'
    //       : '/review/add-review';
    //     const method = props.cartItem?.review ? 'PUT' : 'POST';
    //     fetch(backendEndpoint + endpoint, {
    //       method: method,
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         'Comment-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         reviewId,
    //         customerId: getUserIdByToken(),
    //         productId: props.productId,
    //         ratingPoint: ratingValue,
    //         comment,
    //       }),
    //     })
    //       .then((response) => {
    //         props.cartItem?.review
    //           ? toast.success('Chỉnh sửa đánh giá thành công')
    //           : toast.success('Đánh giá sản phẩm thành công');
    //         props.handleCloseModal();
    //         props.handleCloseModalOrderDetail();
    //         props.setCartItem({ ...props.cartItem, review: true });
    //       })
    //       .catch((error) => {
    //         toast.error('Gặp lỗi trong quá trình đánh giá');
    //         props.handleCloseModal();
    //       });
  }

  // Lấy data review khi đã review rồi
  useEffect(() => {
    //     if (props.cartItem?.review) {
    //       const token = localStorage.getItem('token');
    //       fetch(backendEndpoint + `/review/get-review`, {
    //         method: 'POST',
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           'Comment-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           idOrder: props.idOrder,
    //           productId: props.productId,
    //         }),
    //       })
    //         .then((response) => response.json())
    //         .then((data) => {
    //           setRatingValue(data.ratingPoint);
    //           setComment(data.comment);
    //           setReviewId(data.reviewId);
    //         })
    //         .catch((error) => console.log(error));
    //     }
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleSubmitReview}>
        <h2 className="text-center">
          <strong>ĐÁNH GIÁ SẢN PHẨM</strong>
          <br />
          <h4 style={{ marginTop: '15px', fontWeight: '400' }}>
            <strong>Tên sản phẩm: </strong>
            {props.product?.name} - <strong>Đánh giá hiện tại: </strong>
            {props.product?.averageRating}
          </h4>
        </h2>
        <div className="d-flex align-items-center">
          <strong className="mt-2 me-4">Đánh giá của bạn: </strong>
          <Rating
            size={25}
            transition={true}
            initialValue={ratingValue}
            onClick={(e) => handleRating(e)}
          />
        </div>
        <p className="text-danger">{errorRating}</p>
        <TextField
          className="w-100 my-3"
          id="standard-basic"
          label="Nội dung đánh giá"
          variant="standard"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="d-flex flex-row-reverse">
          <button
            type="submit"
            className="btn btn-dark mt-4 px-4 py-2 rounded-5"
            style={{ fontSize: '1.6rem' }}
          >
            ĐÁNH GIÁ
          </button>
        </div>
      </form>
    </div>
  );
};
