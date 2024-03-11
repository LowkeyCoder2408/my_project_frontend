import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { useEffect, useState } from 'react';
import { getProductByAlias } from '../../../../api/ProductAPI';
import ProductModel from '../../../../models/ProductModel';
import Loader from '../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faCircleCheck,
  faCreditCard,
  faStar,
  faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ProductImageModel from '../../../../models/ProductImageModel';
import {
  getAllImageByAlias,
  getAllImageByProduct,
} from '../../../../api/ProductImageAPI';
import FormatPrice from '../ProductProps/FormatPrice';
import ProductReview from '../ProductReview';
import BrandModel from '../../../../models/BrandModel';
import { getCategoryByAlias } from '../../../../api/CategoryAPI';
import CategoryModel from '../../../../models/CategoryModel';
import { getBrandByAlias } from '../../../../api/BrandAPI';

interface ProductDetailInterface {}

function ProductDetail(props: ProductDetailInterface) {
  const { productAlias } = useParams();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [images, setImages] = useState<ProductImageModel[] | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [category, setCategory] = useState<CategoryModel | null>(null);
  const [brand, setBrand] = useState<BrandModel | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (productAlias) {
      getProductByAlias(productAlias)
        .then((result) => {
          setProduct(result);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }
  }, [productAlias]);

  useEffect(() => {
    if (productAlias) {
      setIsLoading(true);
      Promise.all([
        getAllImageByAlias(productAlias),
        getCategoryByAlias(productAlias),
        getBrandByAlias(productAlias),
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
  }, [productAlias]);

  const increaseQuantity = () => {
    if (quantity < (product && product.quantity ? product.quantity : 1)) {
      setQuantity(quantity + 1);
    }
  };

  const descreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    const inStockQuantity = product && product.quantity ? product.quantity : 0;
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 1 &&
      newQuantity <= inStockQuantity
    ) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {};

  const handleBuyNow = () => {};

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

  if (!product) {
    return (
      <div>
        <h1>Sản phẩm không tồn tại</h1>
      </div>
    );
  }

  const handleTab = (index: number) => {
    setSelectedImageIndex(index);
  };

  const salePercentage =
    product.listedPrice && product.currentPrice
      ? Math.round(
          ((product.listedPrice - product.currentPrice) / product.listedPrice) *
            100,
        )
      : 0;
  return (
    <div className="container mt-5">
      <div className="product-details row">
        <div className="col col-xxl-6 col-12">
          <div className="product-details__big-img">
            {images ? (
              images.length > 0 && (
                <img src={images[selectedImageIndex].url} alt="Ảnh chủ đạo" />
              )
            ) : (
              <img src={product.mainImage} alt="Ảnh chủ đạo" />
            )}
          </div>
          <div className="product-details__thumb">
            {images &&
              images.map((img, index) => (
                <img
                  onClick={() => handleTab(index)}
                  key={index}
                  src={img.url}
                  alt="Ảnh bổ sung"
                  className={index === selectedImageIndex ? 'active' : ''}
                />
              ))}
          </div>
        </div>
        <div className="col col-xxl-6 col-12">
          <div className="product-details__box">
            <div className="row">
              <h2 className="product-details__name">{product.name}</h2>
              <div className="product-details__rating">
                {product.averageRating && product.averageRating > 0 ? (
                  <>
                    {[...Array(Math.floor(product.averageRating))].map(
                      (_, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={faStar as IconProp}
                        />
                      ),
                    )}
                    {product.averageRating % 1 >= 0.5 &&
                      product.averageRating % 1 < 1 && (
                        <FontAwesomeIcon icon={faStarHalfStroke as IconProp} />
                      )}
                    <div className="product-details__rating-count">
                      ({product.averageRating})
                    </div>
                    <div className="product-details__rating-quantity">
                      {product.ratingCount} lượt đánh giá
                    </div>
                  </>
                ) : (
                  <div className="product-details__no-rating">
                    Sản phẩm chưa có đánh giá
                  </div>
                )}
              </div>

              <div className="product-details__price">
                <div className="product-details__price-current">
                  <FormatPrice price={product.currentPrice} />
                </div>
                <div className="product-details__price-listed">
                  <FormatPrice price={product.listedPrice} />
                </div>
                <div className="product-details__price-label">
                  {salePercentage > 0 ? (
                    <span>-{salePercentage}%</span>
                  ) : (
                    <span>KHÔNG GIẢM</span>
                  )}
                </div>
              </div>
            </div>

            <p className="product-details__full-description">
              <div className="product-details__title mb-2">
                <FontAwesomeIcon icon={faCircleCheck as IconProp} />

                <strong> Về sản phẩm này (mô tả ngắn):</strong>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.shortDescription
                    ? product.shortDescription
                    : 'Không có thông tin',
                }}
              />
              <div className="mt-4 product-details__information">
                <div className="product-details__information-brand">
                  <div className="product-details__title mb-2">
                    <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                    <strong> Thương hiệu:</strong>{' '}
                    {brand ? brand.name : 'Chưa cập nhật'}
                  </div>
                </div>
                <div className="product-details__information-category">
                  <div className="product-details__title mb-2">
                    <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                    <strong> Danh mục:</strong>{' '}
                    {category ? category.name : 'Chưa cập nhật'}
                  </div>
                </div>
                {product.quantity !== undefined && product.quantity === 0 ? (
                  <div className="product-details__information-status">
                    <div className="product-details__title mb-2">
                      <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                      <strong> Trạng thái:</strong> Đã hết hàng
                    </div>
                  </div>
                ) : (
                  <div className="product-details__information-status">
                    <div className="product-details__title mb-2">
                      <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                      <strong> Trạng thái:</strong> Còn {product.quantity} sản
                      phẩm
                    </div>
                  </div>
                )}
                <div className="product-details__information-quantity mt-4 d-flex align-items-center">
                  <div className="mb-2">
                    <strong>Số lượng:</strong>
                  </div>
                  <div
                    className="input-group"
                    style={{
                      width: '130px',
                      marginLeft: '20px',
                    }}
                  >
                    <button
                      style={{
                        width: '35px',
                        height: '35px',
                        fontSize: '1.7rem',
                      }}
                      onClick={descreaseQuantity}
                      type="button"
                      className="input-group-text d-flex justify-content-center align-items-center"
                    >
                      -
                    </button>
                    <input
                      style={{ height: '35px' }}
                      value={quantity}
                      type="text"
                      min={1}
                      className="form-control text-center"
                      onChange={handleQuantityChange}
                    />
                    <button
                      style={{
                        width: '35px',
                        height: '35px',
                        fontSize: '1.7rem',
                      }}
                      onClick={increaseQuantity}
                      type="button"
                      className="input-group-text d-flex justify-content-center align-items-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="product-details__information-quantity">
                  <strong className="">Tạm tính: </strong>
                  {product.currentPrice && (
                    <strong
                      className="mt-2"
                      style={{
                        fontSize: '2.5rem',
                        color: '#3737a9',
                        marginLeft: '5px',
                      }}
                    >
                      <FormatPrice price={quantity * product.currentPrice} />
                    </strong>
                  )}
                </div>

                <div className="product-details__information-freeship mt-3">
                  <div className="product-details__title mb-2">
                    <img
                      src="https://res.cloudinary.com/dgdn13yur/image/upload/v1710137569/freeship_yke7sb.png"
                      style={{ width: '40px' }}
                      alt=""
                    />
                    <i className="mt-5">
                      {' '}
                      Miễn phí ship (áp dụng trên toàn quốc)
                    </i>
                  </div>
                </div>
              </div>
            </p>

            <div className="product-details__buy mt-5">
              <button
                className="product-details__cart"
                onClick={handleAddToCart}
              >
                <FontAwesomeIcon icon={faBagShopping as IconProp} />
                Thêm vào giỏ hàng
              </button>
              <button
                className="product-details__buy-now"
                onClick={handleBuyNow}
              >
                <FontAwesomeIcon icon={faCreditCard as IconProp} />
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="product-details__review">
        <ProductReview productId={product.id} />
      </div>
    </div>
  );
}

export default ProductDetail;
