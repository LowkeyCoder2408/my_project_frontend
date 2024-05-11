import { Link, useNavigate } from 'react-router-dom';
import './Information.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faExchange,
  faHeart,
  faList,
  faMoneyBill,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useAuth } from '../../../../../utils/AuthContext';
import {
  getAvatarByToken,
  getFullNameByToken,
  getUserIdByToken,
  isToken,
  logout,
} from '../../../../../utils/JwtService';
import { Avatar, Button } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';
import { useCartItem } from '../../../../../utils/CartItemContext';
import FavoriteProductModel from '../../../../../models/FavoriteProductModel';
import { useEffect, useState } from 'react';
import { getFavoriteProductsByCustomerId } from '../../../../../api/FavoriteProductAPI';
import WishlistProps from '../../../../../pages/Wishlist/components/WishlistProps';

function Information() {
  const customerId = getUserIdByToken();
  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { cartList } = useCartItem();
  const [favoriteProductList, setFavoriteProductList] = useState<
    FavoriteProductModel[]
  >([]);

  useEffect(() => {
    getFavoriteProductsByCustomerId(customerId)
      .then((result) => {
        console.log(result.favoriteProductList);
        setFavoriteProductList(result.favoriteProductList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [favoriteProductList]);

  return (
    <div className="container-fluid bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-12 text-center-mobile py-3 d-flex align-items-center">
            <span>
              Free ship trên toàn quốc | Miễn ship với hóa đơn từ{' '}
              <strong>5.000.000đ</strong> (ngoại quốc)
            </span>
          </div>
          {!isToken() ? (
            <div className="col-md-6 col-sm-6 col-xs-12 text-center-mobile text-end py-3">
              <span>
                <FontAwesomeIcon className="pe-3" icon={faUser as IconProp} />
                <Link className="text-white hover-yellow" to="/login">
                  ĐĂNG NHẬP
                </Link>
                {' | '}
                <Link className="text-white hover-yellow" to="/register">
                  ĐĂNG KÝ
                </Link>
              </span>
            </div>
          ) : (
            <div className="mobile-center col-md-6 col-sm-6 col-xs-12 d-flex justify-content-end align-items-center text-center-mobile text-end py-3 gap-3">
              <Link
                to={'/shopping-cart'}
                title="Giỏ hàng của bạn"
                className="information__cart"
              >
                <div className="information__cart-wrap">
                  <FontAwesomeIcon
                    style={{ color: '#fff', width: '20px', height: '20px' }}
                    className="me-3"
                    icon={faCartShopping as IconProp}
                  />
                  {cartList.length > 0 && (
                    <span className="information__cart-notice text-white">
                      {cartList.length}
                    </span>
                  )}
                </div>
              </Link>
              <Link
                to={'/wish-list'}
                title="Sản phẩm yêu thích"
                className="information__cart"
              >
                <div className="information__cart-wrap">
                  <FontAwesomeIcon
                    style={{ color: '#fff', width: '20px', height: '20px' }}
                    className="me-3"
                    icon={faHeart as IconProp}
                  />
                  {favoriteProductList.length > 0 && (
                    <span className="information__cart-notice text-white">
                      {favoriteProductList.length}
                    </span>
                  )}
                </div>
              </Link>
              {/* <Link to={} className="information__wishlist">
                <div className="information__wishlist-wrap">
                  <FontAwesomeIcon
                    style={{ color: '#fff', width: '20px', height: '20px' }}
                    className="me-3"
                    icon={faHeart as IconProp}
                  />
                  <span className="information__wishlist-notice">
                    {customerId}
                  </span>
                </div>
              </div> */}
              <div>{getFullNameByToken()}</div>
              {/* <!-- Avatar --> */}
              <Avatar
                style={{ fontSize: '14px' }}
                alt={getFullNameByToken()}
                src={getAvatarByToken()}
                sx={{ width: 30, height: 30 }}
              />
              <div className="btn-group">
                <button
                  style={{ backgroundColor: 'transparent' }}
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  data-bs-display="static"
                  aria-expanded="false"
                ></button>
                <ul className="dropdown-menu dropdown-menu-end mt-2">
                  <li
                    style={{
                      fontSize: '15px',
                      padding: '4px 6px',
                      color: '#666',
                    }}
                  >
                    <button
                      className="dropdown-item d-flex gap-3 align-items-center"
                      type="button"
                    >
                      <FontAwesomeIcon
                        style={{ width: '12px', height: '12px' }}
                        icon={faUser as IconProp}
                      />
                      Thông tin cá nhân
                    </button>
                  </li>

                  {/* <li
                    style={{
                      fontSize: '15px',
                      padding: '4px 6px',
                      color: '#666',
                    }}
                  >
                    <Link to={'/wish-list'}>
                      <button
                        className="dropdown-item d-flex gap-3 align-items-center"
                        type="button"
                      >
                        <FontAwesomeIcon
                          style={{ width: '12px', height: '12px' }}
                          icon={faList as IconProp}
                        />
                        Sản phẩm yêu thích
                      </button>
                    </Link>
                  </li> */}
                  <li
                    style={{
                      fontSize: '15px',
                      padding: '4px 6px',
                      color: '#666',
                    }}
                  >
                    <Link to={'/my-order'}>
                      <button
                        className="dropdown-item d-flex gap-3 align-items-center"
                        type="button"
                      >
                        <FontAwesomeIcon
                          style={{ width: '12px', height: '12px' }}
                          icon={faMoneyBill as IconProp}
                        />
                        Đơn hàng của tôi
                      </button>
                    </Link>
                  </li>
                  <li
                    style={{
                      fontSize: '15px',
                      padding: '4px 6px',
                      color: '#666',
                    }}
                  >
                    <button
                      className="dropdown-item d-flex gap-3 align-items-center"
                      type="button"
                    >
                      <FontAwesomeIcon
                        style={{ width: '12px', height: '12px' }}
                        icon={faExchange as IconProp}
                      />
                      Đổi mật khẩu
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li
                    style={{
                      fontSize: '15px',
                      padding: '4px 6px',
                      color: '#666',
                    }}
                  >
                    <button
                      className="dropdown-item d-flex gap-3 align-items-center"
                      type="button"
                      onClick={() => {
                        confirm({
                          title: (
                            <span style={{ fontSize: '20px' }}>ĐĂNG XUẤT</span>
                          ),
                          description: (
                            <span style={{ fontSize: '16px' }}>
                              Bạn có chắc chắn là sẽ đăng xuất chứ?
                            </span>
                          ),
                          confirmationText: (
                            <span style={{ fontSize: '15px' }}>Đồng ý</span>
                          ),
                          cancellationText: (
                            <span style={{ fontSize: '15px' }}>Huỷ</span>
                          ),
                        })
                          .then(() => {
                            logout(navigate);
                            toast.success('Đăng xuất khỏi website thành công');
                            setLoggedIn(false);
                          })
                          .catch(() => {});
                      }}
                    >
                      <FontAwesomeIcon
                        style={{ width: '12px', height: '12px' }}
                        icon={faSignOut as IconProp}
                      />
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Information;
