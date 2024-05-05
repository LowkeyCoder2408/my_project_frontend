import { useEffect, useState } from 'react';
import { useCartItem } from '../../../utils/CartItemContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import ProductCartProps from '../ProductCartProps';
import { isToken } from '../../../utils/JwtService';
import FormatPrice from '../../ProductList/components/ProductProps/FormatPrice';
import './ProductCartList.css';
import { Checkout } from '../../Checkout';

interface ProductCartListProps {}

const ProductCartList: React.FC<ProductCartListProps> = () => {
  const { setTotalCart, cartList, setCartList } = useCartItem();
  const [totalPriceProduct, setTotalPriceProduct] = useState(0);

  useEffect(() => {
    const total = cartList.reduce((totalPrice, cartItem) => {
      const itemQuantity = cartItem.quantity ?? 0; // Gán giá trị mặc định là 0 nếu cartItem.quantity là undefined
      const itemPrice = cartItem.product?.currentPrice ?? 0; // Gán giá trị mặc định là 0 nếu cartItem.product hoặc cartItem.product.currentPrice là undefined
      return totalPrice + itemQuantity * itemPrice;
    }, 0);

    setTotalPriceProduct(total);
    setTotalCart(cartList.length);
  }, [cartList, setTotalCart]); // Khúc này đang bị overloading

  const navigation = useNavigate();
  function handleRemoveProduct(idProduct: number) {
    // Kiểm tra nếu chưa đăng nhập
    if (!isToken()) {
      // Hiển thị thông báo yêu cầu đăng nhập
      toast.error('Bạn cần đăng nhập để thực hiện chức năng này!');
      return;
    }
    const newCartList = cartList.filter(
      (cartItem) => cartItem.product.id !== idProduct,
    );
    localStorage.setItem('cart', JSON.stringify(newCartList));
    setCartList(newCartList);
    setTotalCart(newCartList.length);
    toast.success('Xoá sản phẩm thành công');
  }

  // Thanh toán
  const [isCheckout, setIsCheckout] = useState(false);

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      {!isCheckout ? (
        <div>
          {cartList.length !== 0 ? (
            ''
          ) : (
            <div
              style={{ marginTop: '50px' }}
              className="d-flex align-items-center justify-content-center flex-column"
            >
              <img
                src="https://res.cloudinary.com/dgdn13yur/image/upload/v1713619417/cart_empty_hxwhlc.png"
                alt=""
                width="35%"
              />
              <h2 className="mt-5 text-center" style={{ fontWeight: '550' }}>
                GIỎ HÀNG CỦA BẠN CHƯA CÓ SẢN PHẨM NÀO
              </h2>
              <Link to={'/product-list'} className="mt-5">
                <div
                  className="btn btn-dark py-2 px-4"
                  style={{ fontSize: '16px', fontWeight: '450' }}
                >
                  MUA SẮM NGAY
                </div>
              </Link>
            </div>
          )}
          <div
            className="row"
            style={
              cartList.length === 0 ? { display: 'none' } : { display: 'flex' }
            }
          >
            <div className="col col-xxl-8 col-xl-8 col-12">
              <h2 className="mb-4 mt-4">GIỎ HÀNG CỦA BẠN</h2>
              {cartList.map((cartItem) => {
                return (
                  <ProductCartProps
                    cartItem={cartItem}
                    handleRemoveProduct={handleRemoveProduct}
                    canChangeQuantity={true}
                    key={cartItem.product.id}
                  />
                );
              })}
            </div>
            <div
              className="col col-xxl-4 col-xl-4 col-12"
              style={{ height: 'fit-content' }}
            >
              <h2 className="mb-4 mt-4">THÔNG TIN XÁC NHẬN</h2>
              <div className="confirm-information bg-white px-4 py-5">
                <div className="d-flex align-items-center justify-content-between">
                  <span>Thành tiền:</span>
                  <span>
                    <strong>
                      {totalPriceProduct && (
                        <FormatPrice price={totalPriceProduct} />
                      )}
                    </strong>
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <span>Phí giao hàng:</span>
                  <span>
                    <strong>
                      {totalPriceProduct && <FormatPrice price={0} />}
                    </strong>
                  </span>
                </div>
                <hr className="my-3" />
                <div className="d-flex align-items-center justify-content-between">
                  <span>
                    <strong>Tổng cộng:</strong>
                  </span>
                  <span className="text-danger">
                    <strong>
                      {totalPriceProduct && (
                        <FormatPrice price={totalPriceProduct} />
                      )}
                    </strong>
                  </span>
                </div>
                <div
                  className="confirm-information-btn btn w-100 py-2 mt-4"
                  style={{
                    fontSize: '1.4rem',
                    background: '#3b71ca',
                    color: '#fff',
                  }}
                  onClick={() => {
                    if (isToken()) {
                      setIsCheckout(true);
                    } else {
                      toast.warning(
                        'Bạn cần đăng nhập để thực hiện chức năng này',
                      );
                      navigation('/login');
                    }
                  }}
                >
                  ĐẶT HÀNG NGAY
                </div>
                <div className="mt-4">
                  Tech Hub hỗ trợ các phương thức thanh toán:
                  <div className="confirm-information__payment-method d-flex gap-3 mt-2">
                    <img
                      src="https://res.cloudinary.com/dgdn13yur/image/upload/v1713686301/cod_payment_owh4ih.png"
                      alt=""
                    />
                    <img
                      src="https://res.cloudinary.com/dgdn13yur/image/upload/v1713686269/visa_payment_bbuee2.png"
                      alt=""
                    />
                    <img
                      src="https://res.cloudinary.com/dgdn13yur/image/upload/v1713686269/vnpay_payment_p5eiis.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Checkout
          setIsCheckout={setIsCheckout}
          cartList={cartList}
          totalPriceProduct={totalPriceProduct}
        />
      )}
    </div>
  );
};

export default ProductCartList;
