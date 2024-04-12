import './LongWidthProduct.css';
import ProductModel from '../../../../../../models/ProductModel';
import ProductRating from '../../../../../ProductList/components/ProductDetail/components/ProductRating';
import { useEffect, useState } from 'react';
import { getBrandByAlias } from '../../../../../../api/BrandAPI';
import { Link } from 'react-router-dom';

interface LongWidthProductProps {
  product: ProductModel;
}

const LongWidthProduct = (props: LongWidthProductProps) => {
  const [productList, setProductList] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const percentageSold =
    props.product.soldQuantity && props.product.quantity
      ? (props.product.soldQuantity / props.product.quantity) * 100
      : 0;
  return (
    <Link
      to={`/product/${props.product.alias}`}
      className="long-width-product bg-white"
    >
      <div className="long-width-product__icon">
        <img
          className="long-width-product__img"
          src={props.product.mainImage}
          alt="Brand Logo"
        />
      </div>
      <div className="long-width-product__info">
        <div className="long-width-product__info__collection-name">
          {props.product.name}
        </div>
        {/* <span className="count"> (Đã bán: {props.product.soldQuantity})</span> */}

        {props.product.ratingCount !== undefined &&
        props.product.ratingCount > 0 ? (
          <div className="long-width-product__info__rate">
            {props.product.averageRating && (
              <div
                className="d-flex justify-content-center align-items-center gap-2"
                style={{ fontWeight: '520' }}
              >
                <ProductRating rating={props.product.averageRating} />(
                {props.product.averageRating})
              </div>
            )}
            <div className="long-width-product-progress-quantity">
              Đã bán: {props.product.soldQuantity}/{props.product.quantity}
            </div>
          </div>
        ) : (
          <div className="long-width-product__info__rate">
            <div className="long-width-product__rating-quantity">
              (Chưa có đánh giá)
            </div>
            <div className="long-width-product-progress-quantity">
              Đã bán: {props.product.soldQuantity}/{props.product.quantity}
            </div>
          </div>
        )}
        <div className="long-width-product-progress">
          <div className="long-width-product-progress-bar">
            <div
              className="long-width-product-progress-value"
              style={{ width: `${percentageSold}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LongWidthProduct;
