import React from 'react';
import '../../ValidatePage/ErrorPage.css';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div id="error-page">
      <div className="content">
        <h2 className="header" data-text="404">
          404
        </h2>
        <h4 data-text="Opps! Trang không tồn tại">Opps! Trang không tồn tại</h4>
        <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
        <div className="btns">
          <Link to={'/'}>về trang chủ</Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
