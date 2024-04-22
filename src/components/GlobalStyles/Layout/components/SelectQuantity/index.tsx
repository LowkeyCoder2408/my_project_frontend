import React from 'react';
import './SelectQuantity.css';
import Icon from '@mui/material/Icon';
import ProductModel from '../../../../../models/ProductModel';
import CartItemModel from '../../../../../models/CartItemModel';
import { isToken } from '../../../../../utils/JwtService';
import { backendEndpoint } from '../../../../../utils/Constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faRemove,
  faSubtract,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface SelectQuantityProps {
  max: number | undefined;
  setQuantity?: any;
  quantity?: number;
  add?: any;
  reduce?: any;
  product?: ProductModel;
}

const SelectQuantity: React.FC<SelectQuantityProps> = (props) => {
  // Xử lý khi thay đổi input quantity bằng bàn phím
  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 1 &&
      newQuantity <= (props.max ? props.max : 1)
    ) {
      props.setQuantity(newQuantity);
      const cartData: string | null = localStorage.getItem('cart');
      const cart: CartItemModel[] = cartData ? JSON.parse(cartData) : [];
      // cái isExistBook này sẽ tham chiếu đến cái cart ở trên, nên khi update thì cart nó cũng update theo
      let isExistBook = cart.find(
        (cartItem) => cartItem.product.id === props.product?.id,
      );
      // Thêm 1 sản phẩm vào giỏ hàng
      if (isExistBook) {
        // nếu có rồi thì sẽ gán là số lượng mới
        isExistBook.quantity = newQuantity;

        // Cập nhật trong db
        if (isToken()) {
          const token = localStorage.getItem('token');
          fetch(backendEndpoint + `/cart-item/update-item`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              idCart: isExistBook.id,
              quantity: isExistBook.quantity,
            }),
          }).catch((err) => console.log(err));
        }
      }
      // Cập nhật lại
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  return (
    <div
      className="wrapper-select-quantity d-flex align-items-center rounded"
      // style={{ width: '110px' }}
    >
      <button
        type="button"
        className="d-flex align-items-center justify-content-center p-2 btn-dark btn"
        onClick={() => props.reduce()}
        style={{
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        }}
      >
        <FontAwesomeIcon
          style={{ fontSize: '12px', color: '#000' }}
          icon={faSubtract as IconProp}
        />
      </button>
      <input
        type="number"
        className="inp-number p-0 m-0"
        value={props.quantity}
        onChange={handleQuantity}
        min={1}
        max={props.max}
      />
      <button
        type="button"
        className="d-flex align-items-center justify-content-center p-2 btn-dark btn"
        disabled={props.quantity === props.max}
        onClick={() => props.add()}
        style={{
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        }}
      >
        <FontAwesomeIcon
          style={{ fontSize: '12px', color: '#000' }}
          icon={faPlus as IconProp}
        />
      </button>
    </div>
  );
};

export default SelectQuantity;
