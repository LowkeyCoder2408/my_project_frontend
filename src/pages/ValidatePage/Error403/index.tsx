import React from 'react';
import '../../ValidatePage/ErrorPage.css';
import { Link, useLocation } from 'react-router-dom';

const Error403 = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div id="error-page">
      <div className="content">
        <h2 className="header" data-text="403">
          403
        </h2>
        <h4 data-text="Opps! Bạn không có quyền truy cập vào trang này!">
          Opps! Bạn không có quyền truy cập vào trang này!
        </h4>
        <p>
          Trang này chỉ được phép truy cập khi bạn có vai trò là quản trị viên!
        </p>
        {!isAdminPath && (
          <div className="btns">
            <Link to={'/'}>về trang chủ</Link>
          </div>
        )}
        {isAdminPath && (
          <div className="btns">
            <Link to={'/admin/dashboard'}>về trang chủ</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Error403;
