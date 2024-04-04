import { Link, useNavigate } from 'react-router-dom';
import './Information.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useAuth } from '../../../../../utils/AuthContext';
import {
  getAvatarByToken,
  getFullNameByToken,
  getRoleByToken,
  isToken,
  logout,
} from '../../../../../utils/JwtService';
import { Avatar, Button } from '@mui/material';

function Information() {
  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container-fluid bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-12 text-center-mobile py-3">
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
            <div className="col-md-6 col-sm-6 col-xs-12 text-center-mobile text-end py-3">
              {/* <!-- Notifications --> */}
              {/* <div className="dropdown">
                <a
                  className="text-reset me-3 dropdown-toggle hidden-arrow"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-bell"></i>
                  <span className="badge rounded-pill badge-notification bg-danger">
                    1
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Some news
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another news
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div> */}
              {/* <!-- Avatar --> */}
              <Avatar
                style={{ fontSize: '14px' }}
                alt={getFullNameByToken()}
                src={getAvatarByToken()}
                sx={{ width: 30, height: 30 }}
              />
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
