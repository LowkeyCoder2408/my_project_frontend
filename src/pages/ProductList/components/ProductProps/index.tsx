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
import {
  getHottestProducts,
  getNewestProducts,
} from '../../../../api/ProductAPI';
import { toast } from 'react-toastify';

interface ProductPropsInterface {
  product: ProductModel;
}

const ProductProps: React.FC<ProductPropsInterface> = (props) => {
  const [newestProducts, setNewestProducts] = useState<ProductModel[]>([]);
  const [hottestProducts, setHottestProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInNewestProducts, setIsInNewestProducts] = useState<boolean>(false);
  const [isInHottestProducts, setIsInHottestProducts] =
    useState<boolean>(false);

  useEffect(() => {
    getNewestProducts(12)
      .then((result) => {
        setNewestProducts(result.result);
        setLoading(false);
        // Kiểm tra xem sản phẩm hiện tại có trong newestProducts không
        const isInNewest = result.result.some(
          (product) => product.id === props.product.id,
        );
        setIsInNewestProducts(isInNewest);
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Lấy danh sách sản phẩm mới không thành công!');
      });
  }, []);

  // useEffect(() => {
  //   getHottestProducts(12)
  //     .then((result) => {
  //       setHottestProducts(result.result);
  //       setLoading(false);
  //       // Kiểm tra xem sản phẩm hiện tại có trong hottestProducts không
  //       const isInHottest = result.result.some(
  //         (product) => product.id === props.product.id,
  //       );
  //       setIsInHottestProducts(isInHottest);
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       toast.error('Lấy danh sách sản phẩm hot không thành công!');
  //     });
  // }, []);

  if (loading) {
    return <Loader />;
  }

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
          {/* {isInHottestProducts && (
            <div className="box-label-hot">
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1711559870/hot_label_w9arf3.png"
                alt=""
              />
            </div>
          )} */}
          {isInNewestProducts && (
            <div className="box-label-new">
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1711558575/new_label_rizpn7.png"
                alt=""
              />
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
