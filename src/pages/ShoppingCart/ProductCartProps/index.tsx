import { useConfirm } from 'material-ui-confirm';
import CartItemModel from '../../../models/CartItemModel';
import { useCartItem } from '../../../utils/CartItemContext';
import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import SelectQuantity from '../../../components/GlobalStyles/Layout/components/SelectQuantity';
import ProductImageModel from '../../../models/ProductImageModel';
import { getAllImageByProduct } from '../../../api/ProductImageAPI';
import { isToken } from '../../../utils/JwtService';
import { backendEndpoint } from '../../../utils/Constant';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ProductCartProps.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMultiply, faRemove } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import FormatPrice from '../../ProductList/components/ProductProps/FormatPrice';
import CategoryModel from '../../../models/CategoryModel';
import { getCategoryByProductAlias } from '../../../api/CategoryAPI';
import BrandModel from '../../../models/BrandModel';
import { getBrandByAlias } from '../../../api/BrandAPI';

interface ProductCartProps {
  cartItem: CartItemModel;
  handleRemoveProduct: any;
  canChangeQuantity: boolean;
}

const ProductCartProps: React.FC<ProductCartProps> = (props) => {
  const [brand, setBrand] = useState<BrandModel | null>(null);
  const [category, setCategory] = useState<CategoryModel | null>(null);
  const { setCartList } = useCartItem();
  const confirm = useConfirm();
  const [quantity, setQuantity] = useState(
    props.cartItem.product.quantity !== undefined
      ? props.cartItem.quantity &&
        props.cartItem.quantity > props.cartItem.product.quantity
        ? props.cartItem.product.quantity
        : props.cartItem.quantity
      : props.cartItem.quantity,
  );

  const [imageList, setImageList] = useState<ProductImageModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [erroring, setErroring] = useState(null);

  useEffect(() => {
    if (props.cartItem.product.alias) {
      setLoading(true);
      Promise.all([
        getCategoryByProductAlias(props.cartItem.product.alias),
        getBrandByAlias(props.cartItem.product.alias),
      ])
        .then(([categoryResult, brandResult]) => {
          setCategory(categoryResult.category);
          setBrand(brandResult.brand);
          setLoading(false);
        })
        .catch((erroring) => {
          setErroring(erroring);
          setLoading(false);
        });
    }
  }, []);

  function handleConfirm() {
    confirm({
      title: <span style={{ fontSize: '20px' }}>XÓA SẢN PHẨM</span>,
      description: (
        <span style={{ fontSize: '16px' }}>
          Bạn có chắc chắn rằng sẽ loại bỏ sản phẩm này khỏi giỏ hàng?
        </span>
      ),
      confirmationText: <span style={{ fontSize: '15px' }}>Đồng ý</span>,
      cancellationText: <span style={{ fontSize: '15px' }}>Huỷ</span>,
    })
      .then(() => {
        props.handleRemoveProduct(props.cartItem.product.id);
        if (isToken()) {
          const token = localStorage.getItem('token');
          fetch(backendEndpoint + `/cart-item/${props.cartItem.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'content-type': 'application/json',
            },
          }).catch((err) => console.log('Lỗi khi xóa:', err));
        } else {
          toast.error('Bạn cần đăng nhập để thực hiện chức năng này!');
          return;
        }
      })
      .catch(() => {});
  }

  useEffect(() => {
    getAllImageByProduct(props.cartItem.product.id)
      .then((response) => {
        setImageList(response);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setErroring(error.message);
      });
  }, [props.cartItem.product.id]);

  const add = () => {
    if (quantity) {
      if (
        quantity <
        (props.cartItem.product.quantity ? props.cartItem.product.quantity : 1)
      ) {
        setQuantity(quantity + 1);
        handleModifiedQuantity(props.cartItem.product.id, 1);
      }
    }
  };

  const reduce = () => {
    if (quantity) {
      if (quantity - 1 === 0) {
        handleConfirm();
      } else if (quantity > 1) {
        setQuantity(quantity - 1);
        handleModifiedQuantity(props.cartItem.product.id, -1);
      }
    }
  };

  function handleModifiedQuantity(id: number, quantity: number) {
    const cartData: string | null = localStorage.getItem('cart');
    const cart: CartItemModel[] = cartData ? JSON.parse(cartData) : [];
    let existingProduct = cart.find((cartItem) => cartItem.product.id === id);
    if (existingProduct) {
      if (existingProduct && existingProduct.quantity !== undefined) {
        existingProduct.quantity += quantity;
      }

      if (isToken()) {
        const token = localStorage.getItem('token');
        fetch(backendEndpoint + `/cart-item/update-item`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            id: props.cartItem.id,
            quantity: existingProduct.quantity,
          }),
        }).catch((err) => console.log(err));
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartList(cart);
  }

  if (loading) {
    return (
      <>
        <Skeleton className="my-3" variant="rectangular" />
      </>
    );
  }

  if (erroring) {
    return (
      <>
        <h4>Lỗi ...</h4>
      </>
    );
  }
  return (
    <div
      className="product-cart-item bg-white mt-3"
      style={{ borderRadius: '7px' }}
    >
      {props.canChangeQuantity && (
        <FontAwesomeIcon
          className="product-cart-item__remove"
          icon={faRemove as IconProp}
          onClick={() => handleConfirm()}
        />
      )}
      <div className="row">
        <div className="d-flex justify-content-center  col col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-4">
          <Link to={`/product/${props.cartItem.product.alias}`}>
            <img
              src={props.cartItem.product.mainImage}
              className="product-cart-item__img my-3"
              alt={props.cartItem.product.name}
            />
          </Link>
        </div>
        <div className="product-cart-item__info my-2 d-flex flex-column justify-content-center col col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-8">
          <Link to={`/product/${props.cartItem.product.alias}`}>
            <div className="product-cart-item__name">
              {props.cartItem.product.name}
            </div>
          </Link>
          <div
            className="product-cart-item__category"
            style={{ color: '#000' }}
          >
            <strong>Danh mục: </strong>
            {category && category.name} - <strong>Thương hiệu: </strong>
            {brand && brand.name?.toUpperCase()}
          </div>
          <div className="d-flex gap-5">
            <div className="text-danger">
              <strong style={{ fontSize: '20px' }}>
                {props.cartItem.product.currentPrice && (
                  <FormatPrice price={props.cartItem.product.currentPrice} />
                )}
              </strong>
            </div>
            <div className="" style={{ marginTop: '4px' }}>
              <del style={{ fontSize: '17px', color: 'gray' }}>
                {props.cartItem.product.listedPrice && (
                  <FormatPrice price={props.cartItem.product.listedPrice} />
                )}
              </del>
            </div>
          </div>
        </div>
        {props.canChangeQuantity === true ? (
          <div className="max-720-padding text-center my-auto d-flex align-items-center justify-content-between col col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-5 py-3">
            <FontAwesomeIcon icon={faMultiply as IconProp} />
            <SelectQuantity
              max={props.cartItem.product.quantity}
              setQuantity={setQuantity}
              quantity={quantity}
              add={add}
              reduce={reduce}
              product={props.cartItem.product}
            />
          </div>
        ) : (
          <div className="max-720-padding text-center my-auto d-flex align-items-center justify-content-between col col-xxl-1 col-xl-2 col-lg-2 col-md-2 col-4 py-3">
            <FontAwesomeIcon icon={faMultiply as IconProp} />
            <strong>{quantity}</strong>
          </div>
        )}
        <div
          className={`text-center my-auto col col-5 ${
            props.canChangeQuantity === true ? 'col-xxl-2' : 'col-xxl-3'
          }`}
        >
          {quantity !== undefined &&
            props.cartItem.product.currentPrice !== undefined && (
              <span className="text-danger">
                <strong>
                  {quantity * props.cartItem.product.currentPrice && (
                    <FormatPrice
                      price={quantity * props.cartItem.product.currentPrice}
                    />
                  )}
                </strong>
              </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductCartProps;
