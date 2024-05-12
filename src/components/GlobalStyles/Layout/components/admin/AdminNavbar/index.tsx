import React from 'react';
import './AdminNavbar.css';
import { Link } from 'react-router-dom';
import {
  getAvatarByToken,
  getFullNameByToken,
} from '../../../../../../utils/JwtService';

const AdminNavbar = () => {
  const userAvatar = getAvatarByToken();
  const userName = getFullNameByToken();

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
          <span>{userName}</span>
        </div>
        <img src="/settings.svg" alt="" className="admin-navbar__icon" />
      </div>
    </div>
  );
};

export default AdminNavbar;
