import './ProductItem.css';
import ProductModel from '../../../../../../models/ProductModel';
import { useEffect, useState } from 'react';
import BrandModel from '../../../../../../models/BrandModel';
import { getAllImageByAlias } from '../../../../../../api/ProductImageAPI';
import { getCategoryByProductAlias } from '../../../../../../api/CategoryAPI';
import { getBrandByAlias } from '../../../../../../api/BrandAPI';
import ProductImageModel from '../../../../../../models/ProductImageModel';
import CategoryModel from '../../../../../../models/CategoryModel';
import { Link } from 'react-router-dom';
import ProductRating from '../../../../../ProductList/components/ProductDetail/components/ProductRating';
import FormatPrice from '../../../../../ProductList/components/ProductProps/FormatPrice';

interface ProductItemProps {
  product: ProductModel;
}

const ProductItem = (props: ProductItemProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [brand, setBrand] = useState<BrandModel | null>(null);
  const [images, setImages] = useState<ProductImageModel[] | null>(null);
  const [category, setCategory] = useState<CategoryModel | null>(null);

  useEffect(() => {
    if (props.product.alias) {
      setIsLoading(true);
      Promise.all([
        getAllImageByAlias(props.product.alias),
        getCategoryByProductAlias(props.product.alias),
        getBrandByAlias(props.product.alias),
      ])
        .then(([imageResponse, categoryResponse, brandResponse]) => {
          setImages(imageResponse);
          setCategory(categoryResponse.category);
          setBrand(brandResponse.brand);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }
  }, [props.product.alias]);

  const formatCurrency = (number: number) => {
    return number.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };

  const percentageSold =
    props.product.soldQuantity && props.product.quantity
      ? (props.product.soldQuantity / props.product.quantity) * 100
      : 0;
  return (
    <div className="product-deal-item">
      <Link
        to={`/product/${props.product.alias}`}
        className="product-deal-item__img"
        title="Click để xem thông tin"
      >
        <img src={props.product.mainImage} alt="Book Image" />
      </Link>
      <div className="product-deal-item__info">
        <div className="product-deal-item-meta">
          <Link
            to={`/product/${props.product.alias}`}
            className="product-deal-item-meta__title"
          >
            {props.product.name}
          </Link>
        </div>
        <div className="product-deal-item__reference">
          <a>
            <div className="rating">
              {props.product.averageRating && (
                <ProductRating rating={props.product.averageRating} />
              )}
            </div>
          </a>
        </div>
        <div className="product-deal-item__vendor">
          Thương hiệu: {brand?.name}
        </div>
        <div className="product-deal-item__price">
          <span>
            <FormatPrice price={props.product.currentPrice} />
          </span>{' '}
          {props.product.listedPrice && props.product.currentPrice && (
            <span
              style={{ fontSize: '14px', color: '#444', fontWeight: '450' }}
            >
              (Giảm{' '}
              {formatCurrency(
                props.product.listedPrice - props.product.currentPrice,
              )}
              )
            </span>
          )}
        </div>
        <div className="product-deal-item__deal-progress">
          <div className="progress-bar">
            <div
              className="progress-value"
              style={{ width: `${percentageSold}%` }}
            ></div>
            <div className="product-deal-item__deal-quantity">
              Đã bán: {props.product.soldQuantity}/{props.product.quantity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
