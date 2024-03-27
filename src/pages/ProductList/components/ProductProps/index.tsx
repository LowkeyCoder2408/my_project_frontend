import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBagShopping, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductProps.css';
import FormatPrice from './FormatPrice';
import ProductModel from '../../../../models/ProductModel';
import ProductImageModel from '../../../../models/ProductImageModel';
import { getProductImage } from '../../../../api/ProductImageAPI';
import Loader from '../Loader';

interface ProductPropsInterface {
  product: ProductModel;
}

const ProductProps: React.FC<ProductPropsInterface> = (props) => {
  // const id: number = props.product.id;
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState(null);

  // if (loading) {
  //   return <Loader />;
  // }

  // if (error) {
  //   return (
  //     <div>
  //       <h1>Gặp lỗi: {error}</h1>
  //     </div>
  //   );
  // }
  return (
    <div className="product__item-wrapper">
      <div className="product__item">
        <div className="product__item-thumb">
          <Link to={`/product/${props.product.alias}`}>
            <img
              src={props.product.mainImage}
              alt=""
              className="product__item-img"
            />
          </Link>
          <div className="product__item-quick-link">
            <div title="Yêu thích" className="product__item-quick-link-item">
              <FontAwesomeIcon icon={faHeart as IconProp} />
            </div>
            <div title="Thêm vào giỏ" className="product__item-quick-link-item">
              <FontAwesomeIcon icon={faBagShopping as IconProp} />
            </div>
          </div>
          {props.product.discountPercent &&
            props.product.discountPercent > 0 && (
              <div className="box-label">
                <div className="label-product label_sale">
                  <span>-{props.product.discountPercent}%</span>
                </div>
              </div>
            )}
        </div>
        <div className="product__item-caption">
          <Link
            to={`/product/${props.product.alias}`}
            className="product__item-caption-name"
          >
            <h4>
              {props.product.id} - {props.product.name}
            </h4>
          </Link>
          <div className="product__item-caption-price">
            <span className="product__item-caption-price__current">
              <FormatPrice price={props.product.currentPrice} />
            </span>
            <span className="product__item-caption-price__old">
              <FormatPrice price={props.product.listedPrice} />
            </span>
          </div>
          <div className="product__item-caption-summary">
            <div className="product__item-caption-rating">
              {props.product.averageRating &&
              props.product.averageRating > 0 ? (
                <>
                  {props.product.averageRating}
                  <FontAwesomeIcon
                    icon={faStar as IconProp}
                    style={{ color: '#f5c31a' }}
                  />
                  <div style={{ color: '#444', marginRight: '10px' }}>
                    ({props.product.ratingCount})
                  </div>
                </>
              ) : (
                <div style={{ color: '#444', marginRight: '10px' }}>
                  0 đánh giá
                </div>
              )}
            </div>

            <div className="product__item-caption-sell-quantity">
              Đã bán: 73
            </div>
          </div>
          <div title="Mua và thanh toán ngay" className="btn-cart btn btn-dark">
            <span>Mua ngay</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductProps;
