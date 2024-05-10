import React from 'react';
import '../../ValidatePage/ErrorPage.css';
import { Link } from 'react-router-dom';

const Error403 = () => {
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
        <div className="btns">
          <Link to={'/'}>Về trang chủ</Link>
        </div>
      </div>
    </div>
  );
};

export default Error403;
