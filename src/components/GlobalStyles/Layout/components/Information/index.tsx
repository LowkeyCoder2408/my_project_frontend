import { Link } from 'react-router-dom';
import './Information.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

function Information() {
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
        </div>
      </div>
    </div>
  );
}

export default Information;
