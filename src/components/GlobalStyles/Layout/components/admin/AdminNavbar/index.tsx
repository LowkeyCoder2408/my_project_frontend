import React from 'react';
import './AdminNavbar.css';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAvatarByToken,
  getFullNameByToken,
  logout,
} from '../../../../../../utils/JwtService';
import { confirm, useConfirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../../../utils/AuthContext';

const AdminNavbar = () => {
  const userAvatar = getAvatarByToken();
  const userName = getFullNameByToken();
  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();
  const confirm = useConfirm();

  return (
    <div className="admin-navbar">
      <Link to={'/admin/dashboard'} className="admin-navbar__logo">
        <div className="text-white admin-navbar__logo-title">TechHubAdmin</div>
      </Link>
      <div className="admin-navbar__icons">
        <img src="/search.svg" alt="" className="admin-navbar__icon" />
        <img src="/app.svg" alt="" className="admin-navbar__icon" />
        <img src="/expand.svg" alt="" className="admin-navbar__icon" />
        <div className="admin-navbar__notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="admin-navbar__user">
          <img src={userAvatar} alt="" />
          <span>{userName}</span> -{' '}
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              confirm({
                title: <span style={{ fontSize: '20px' }}>ĐĂNG XUẤT</span>,
                description: (
                  <span style={{ fontSize: '16px' }}>
                    Bạn có chắc chắn là sẽ đăng xuất chứ?
                  </span>
                ),
                confirmationText: (
                  <span style={{ fontSize: '15px' }}>Đồng ý</span>
                ),
                cancellationText: <span style={{ fontSize: '15px' }}>Huỷ</span>,
              })
                .then(() => {
                  logout(navigate);
                  toast.success('Đăng xuất khỏi website thành công');
                  setLoggedIn(false);
                })
                .catch(() => {});
            }}
          >
            Thoát
          </span>
        </div>
        <img src="/settings.svg" alt="" className="admin-navbar__icon" />
      </div>
    </div>
  );
};

export default AdminNavbar;
