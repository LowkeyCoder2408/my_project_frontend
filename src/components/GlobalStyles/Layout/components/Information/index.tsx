import { Link, useNavigate } from 'react-router-dom';
import './Information.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCartArrowDown,
  faCartFlatbed,
  faCartShopping,
  faExchange,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useAuth } from '../../../../../utils/AuthContext';
import {
  getAvatarByToken,
  getFullNameByToken,
  isToken,
  logout,
} from '../../../../../utils/JwtService';
import { Avatar, Button } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';

function Information() {
  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();
  const confirm = useConfirm();

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
              {/* <Link to={'/shopping-cart'}> */}
              {/* <FontAwesomeIcon
                  style={{ color: '#fff', width: '20px', height: '20px' }}
                  className="me-3"
                  icon={faCartShopping as IconProp}
                />
                <span className="badge rounded-pill badge-notification bg-danger">
                  0
                </span> */}
              <div className="information__cart">
                <div className="information__cart-wrap">
                  <FontAwesomeIcon
                    style={{ color: '#fff', width: '20px', height: '20px' }}
                    className="me-3"
                    icon={faCartShopping as IconProp}
                  />
                  <span className="information__cart-notice">5</span>
                  <div className="information__cart-list">
                    <img
                      src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102716/Testinomial_2_hzv7yq.png"
                      alt=""
                      className="information__cart-no-cart-img"
                    />
                    <p className="information__cart-list-no-cart-msg">
                      Chưa có sản phẩm
                    </p>

                    <h4 className="information__cart-heading">
                      Sản phẩm đã thêm
                    </h4>
                    <ul className="information__cart-list-item">
                      <li className="information__cart-item">
                        <img
                          src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102716/Testinomial_2_hzv7yq.png"
                          alt=""
                          className="information__cart-img"
                        />
                        <div className="information__cart-item-info">
                          <div className="information__cart-item-head">
                            <h5 className="information__cart-item-name">
                              Áo Bóng Đá Barca mẫu mới 2024 - Vải thái chuẩn áo
                              đáu phom 43-90kg
                            </h5>
                            <div className="information__cart-item-price-wrap">
                              <span className="information__cart-item-price">
                                179.000đ
                              </span>
                              <span className="information__cart-item-multiply">
                                x
                              </span>
                              <span className="information__cart-item-qnt">
                                22
                              </span>
                            </div>
                          </div>
                          <div className="information__cart-item-body">
                            <span className="information__cart-item-description">
                              Phân loại hàng: UNISEX
                            </span>
                            <span className="information__cart-item-remove">
                              Xóa
                            </span>
                          </div>
                        </div>
                      </li>

                      <li className="information__cart-item">
                        <img
                          src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102716/Testinomial_2_hzv7yq.png"
                          alt=""
                          className="information__cart-img"
                        />
                        <div className="information__cart-item-info">
                          <div className="information__cart-item-head">
                            <h5 className="information__cart-item-name">
                              Móc Khóa Kim Loại In Nổi 2 Mặt Các Đội Bóng Đá
                              Trên Thế Giới
                            </h5>
                            <div className="information__cart-item-price-wrap">
                              <span className="information__cart-item-price">
                                25.000đ
                              </span>
                              <span className="information__cart-item-multiply">
                                x
                              </span>
                              <span className="information__cart-item-qnt">
                                4
                              </span>
                            </div>
                          </div>
                          <div className="information__cart-item-body">
                            <span className="information__cart-item-description">
                              Phân loại hàng: BẠC
                            </span>
                            <span className="information__cart-item-remove">
                              Xóa
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <Link
                      to={'/shopping-cart'}
                      className="information__cart-view-cart"
                    >
                      <button className="information__cart-view-cart-btn btn btn-primary">
                        Xem giỏ hàng
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="information__notify">
                <div className="information__notify-wrap">
                  <FontAwesomeIcon
                    style={{ color: '#fff', width: '20px', height: '20px' }}
                    className="me-3"
                    icon={faBell as IconProp}
                  />
                  <span className="information__notify-notice">5</span>
                  <div className="information__notify-list">
                    <img
                      src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102716/Testinomial_2_hzv7yq.png"
                      alt=""
                      className="information__notify-no-notify-img"
                    />
                    <p className="information__notify-list-no-notify-msg">
                      Chưa có sản phẩm
                    </p>

                    <h4 className="information__notify-heading">
                      Sản phẩm đã thêm
                    </h4>
                    <ul className="information__notify-list-item">
                      <li className="information__notify-item">
                        <img
                          src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102716/Testinomial_2_hzv7yq.png"
                          alt=""
                          className="information__notify-img"
                        />
                        <div className="information__notify-item-info">
                          <div className="information__notify-item-head">
                            <h5 className="information__notify-item-name">
                              Áo Bóng Đá Barca mẫu mới 2024 - Vải thái chuẩn áo
                              đáu phom 43-90kg
                            </h5>
                            <div className="information__notify-item-price-wrap">
                              <span className="information__notify-item-price">
                                179.000đ
                              </span>
                              <span className="information__notify-item-multiply">
                                x
                              </span>
                              <span className="information__notify-item-qnt">
                                22
                              </span>
                            </div>
                          </div>
                          <div className="information__notify-item-body">
                            <span className="information__notify-item-description">
                              Phân loại hàng: UNISEX
                            </span>
                            <span className="information__notify-item-remove">
                              Xóa
                            </span>
                          </div>
                        </div>
                      </li>

                      <li className="information__notify-item">
                        <img
                          src="https://res.cloudinary.com/dgdn13yur/image/upload/v1708102716/Testinomial_2_hzv7yq.png"
                          alt=""
                          className="information__notify-img"
                        />
                        <div className="information__notify-item-info">
                          <div className="information__notify-item-head">
                            <h5 className="information__notify-item-name">
                              Móc Khóa Kim Loại In Nổi 2 Mặt Các Đội Bóng Đá
                              Trên Thế Giới
                            </h5>
                            <div className="information__notify-item-price-wrap">
                              <span className="information__notify-item-price">
                                25.000đ
                              </span>
                              <span className="information__notify-item-multiply">
                                x
                              </span>
                              <span className="information__notify-item-qnt">
                                4
                              </span>
                            </div>
                          </div>
                          <div className="information__notify-item-body">
                            <span className="information__notify-item-description">
                              Phân loại hàng: BẠC
                            </span>
                            <span className="information__notify-item-remove">
                              Xóa
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <Link
                      to={'/shopping-notify'}
                      className="information__notify-view-notify"
                    >
                      <button className="information__notify-view-notify-btn btn btn-primary">
                        Xem tất cả thông báo
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
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
              {/* <div className="dropdown">
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuAvatar"
                >
                  <li>
                    <Link to={'/profile'} className="dropdown-item">
                      Thông tin cá nhân
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/my-favorite-books">
                      Sách yêu thích của tôi
                    </Link>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        // setTotalCart(0);
                        logout(navigate);
                        // setLoggedIn(false);
                        // setCartList([]);
                      }}
                    >
                      Đăng xuất
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Information;
