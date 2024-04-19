import { useEffect, useState } from 'react';
import { useCartItem } from '../../../utils/CartItemContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import ProductCartProps from '../ProductCartProps';
import { isToken } from '../../../utils/JwtService';

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
  // Xử lý xoá sách
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
    <div className="container">
      {!isCheckout ? (
        <div style={{ overflow: 'hidden' }}>
          {cartList.length !== 0 ? (
            ''
          ) : (
            <div className="d-flex align-items-center justify-content-center flex-column position-relative">
              <img
                src="https://newnet.vn/themes/newnet/assets/img/empty-cart.png"
                alt=""
                width="63%"
              />
              <Link
                to={'/product-list'}
                className="position-absolute"
                style={{ bottom: '100px' }}
              >
                <Button variant="contained">Mua sắm ngay</Button>
              </Link>
            </div>
          )}
          <div
            className="row my-4"
            style={
              cartList.length === 0 ? { display: 'none' } : { display: 'flex' }
            }
          >
            {/* Bên trái */}
            <h2 className="">
              GIỎ HÀNG <span>({cartList.length} sản phẩm)</span>
            </h2>
            <div className="col-lg-8 col-md-12 col-sm-12 ">
              <div className="container-product bg-light ">
                <div className="row px-4 py-3">
                  <div className="col">Sản phẩm</div>
                  <div className="col-3 text-center">Số lượng</div>
                  <div className="col-2 text-center">Số tiền</div>
                  <div className="col-2 text-center">Thao tác</div>
                </div>
              </div>
              <div className="container-product bg-light mt-lg-0 mt-md-3 mt-sm-3 px-3">
                <div className="row px-4 py-3">
                  {cartList.map((cartItem) => {
                    return (
                      <ProductCartProps
                        cartItem={cartItem}
                        handleRemoveProduct={handleRemoveProduct}
                        // setTotalCart={props.setTotalCart}
                        key={cartItem.product.id}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* <div
              className="container-product bg-light col-lg col-md-12 col-sm-12 px-5 pb-4 mt-lg-0 mt-md-3 mt-sm-3"
              style={{ height: 'fit-content' }}
            >
              <div className="d-flex align-items-center justify-content-between mt-3">
                <span>Thành tiền:</span>
                <span>
                  <strong>{totalPriceProduct.toLocaleString()} đ</strong>
                </span>
              </div>
              <hr className="my-2" />
              <div className="d-flex align-items-center justify-content-between">
                <span>
                  <strong>Tổng số tiền (gồm VAT):</strong>
                </span>
                <span className="text-danger fs-5">
                  <strong>{totalPriceProduct.toLocaleString()} đ</strong>
                </span>
              </div>

              <Button
                variant="contained"
                sx={{ width: '100%', marginTop: '30px' }}
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
                Thanh toán
              </Button>
            </div> */}
          </div>
        </div>
      ) : (
        <></>
        // <CheckoutPage
        //   setIsCheckout={setIsCheckout}
        //   cartList={cartList}
        //   totalPriceProduct={totalPriceProduct}
        // />
      )}
    </div>
  );
};

export default ProductCartList;
