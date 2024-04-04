import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import './ProductItem.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ProductModel from '../../../../../../models/ProductModel';
import { useEffect, useState } from 'react';
import BrandModel from '../../../../../../models/BrandModel';
import { getAllImageByAlias } from '../../../../../../api/ProductImageAPI';
import { getCategoryByProductAlias } from '../../../../../../api/CategoryAPI';
import { getBrandByAlias } from '../../../../../../api/BrandAPI';
import ProductImageModel from '../../../../../../models/ProductImageModel';
import CategoryModel from '../../../../../../models/CategoryModel';
// type Props = Product;

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

  const percentageSold =
    props.product.soldQuantity && props.product.quantity
      ? (props.product.soldQuantity / props.product.quantity) * 100
      : 0;
  return (
    <div className="product-item">
      <div className="product-item__img">
        <img src={props.product.mainImage} alt="Book Image" />
      </div>
      <div className="product-item__info">
        <div className="product-item-meta">
          <a href="" className="product-item-meta__title">
            {props.product.name}
          </a>
        </div>
        <div className="product-item__reference">
          <a>
            <div className="rating">
              <div
                className="rating__stars"
                role="img"
                aria-label="4.0 out of 5.0 stars"
              >
                <FontAwesomeIcon
                  icon={solidStar as IconProp}
                  className="star-icon"
                />
                <FontAwesomeIcon
                  icon={solidStar as IconProp}
                  className="star-icon"
                />
                <FontAwesomeIcon
                  icon={solidStar as IconProp}
                  className="star-icon"
                />
                <FontAwesomeIcon
                  icon={regularStar as IconProp}
                  className="star-icon"
                />
                <FontAwesomeIcon
                  icon={regularStar as IconProp}
                  className="star-icon"
                />
              </div>
              <span className="rating__caption show">1</span>
            </div>
          </a>
        </div>
        <div className="product-item__vendor">{brand?.name}</div>
        <div className="product-item__price">
          <span> ${props.product.currentPrice}</span>
        </div>
        <div className="product-item__deal-progress">
          Already sold: {props.product.soldQuantity}/{props.product.quantity}
          <div className="progress-bar">
            <div
              className="progress-value"
              style={{ width: `${percentageSold}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
