import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './ProductRating.css';

interface ProductRatingProps {
  rating: number;
}

const ProductRating: React.FC<ProductRatingProps> = ({ rating }) => {
  return (
    <div className="product-details__rating">
      {rating !== undefined && rating > 0 && (
        <>
          {[...Array(Math.floor(rating))].map((_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar as IconProp}
              style={{
                color: '#f5c31a',
              }}
            />
          ))}
          {rating % 1 >= 0.5 && rating % 1 < 1 && (
            <FontAwesomeIcon
              icon={faStarHalfStroke as IconProp}
              style={{
                color: '#f5c31a',
              }}
            />
          )}
        </>
      )}
      {(rating === undefined || rating == 0) && (
        <div className="product-details__no-rating">Chưa có đánh giá</div>
      )}
    </div>
  );
};

export default ProductRating;
