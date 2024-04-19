import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBagShopping, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductProps.css';
import FormatPrice from './FormatPrice';
import ProductModel from '../../../../models/ProductModel';
import Loader from '../Loader';
import { getNewestProducts } from '../../../../api/ProductAPI';
import { toast } from 'react-toastify';
import { useCartItem } from '../../../../utils/CartItemContext';
import { getUserIdByToken, isToken } from '../../../../utils/JwtService';
import { backendEndpoint } from '../../../../utils/Constant';

interface ProductPropsInterface {
  product: ProductModel;
}

const ProductProps: React.FC<ProductPropsInterface> = (props) => {
  const { setTotalCart, cartList } = useCartItem();
  const [isFavoriteProduct, setIsFavoriteProduct] = useState(false);
  const navigation = useNavigate();

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

  const handleAddAProductToCart = async (newProduct: ProductModel) => {
    const inStockQuantity =
      props.product && props.product.quantity ? props.product.quantity : 0;

    // Kiểm tra nếu chưa đăng nhập
    if (!isToken()) {
      // Hiển thị thông báo yêu cầu đăng nhập
      toast.error('Bạn cần đăng nhập để thực hiện chức năng này!');
      return;
    }

    // cái existingProduct này sẽ tham chiếu đến cái cart ở trên, nên khi update thì cart nó cũng update theo
    let existingProduct = cartList.find(
      (cartItem) => cartItem.product.id === newProduct.id,
    );
    // Thêm 1 sản phẩm vào giỏ hàng
    if (existingProduct) {
      if (
        existingProduct.quantity &&
        existingProduct.quantity + 1 <= inStockQuantity
      ) {
        if (existingProduct.quantity !== undefined) {
          // nếu có rồi thì sẽ tăng số lượng
          existingProduct.quantity += 1;
        }

        // Lưu vào csdl
        const request = {
          id: existingProduct.id,
          quantity: existingProduct.quantity,
        };
        const token = localStorage.getItem('token');
        fetch(backendEndpoint + `/cart-item/update-item`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify(request),
        }).catch((err) => console.log(err));
        // Thông báo toast
        toast.success('Thêm vào giỏ hàng thành công');
      } else {
        toast.error(
          `Số lượng sản phẩm trong giỏ vượt quá số lượng tồn kho (${inStockQuantity})`,
        );
      }
    } else {
      if (inStockQuantity >= 1) {
        // Lưu vào db
        try {
          const request = {
            quantity: 1,
            product: newProduct,
            customerId: getUserIdByToken(),
          };
          const token = localStorage.getItem('token');
          const response = await fetch(
            backendEndpoint + '/cart-item/add-item',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
              },
              body: JSON.stringify(request),
            },
          );

          if (response.ok) {
            const idCart = await response.json();
            cartList.push({
              id: idCart,
              quantity: 1,
              product: newProduct,
            });
          }
        } catch (error) {
          console.log('Lỗi là', error);
        }
        // Thông báo toast
        toast.success('Thêm vào giỏ hàng thành công');
      } else {
        toast.error(
          `Số lượng sản phẩm trong giỏ vượt quá số lượng tồn kho (${inStockQuantity})`,
        );
      }
    }
    // Lưu vào localStorage
    localStorage.setItem('cart', JSON.stringify(cartList));
    setTotalCart(cartList.length);
  };

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
            <div
              title="Thêm vào giỏ"
              onClick={() => handleAddAProductToCart(props.product)}
              className="product__item-quick-link-item"
            >
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
