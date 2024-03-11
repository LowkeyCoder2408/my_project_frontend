import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchNotification.css';
import { faClose, faX } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useEffect, useState } from 'react';

interface SearchNotificationProps {
  keyword: string;
  numberOfProduct: number;
  categoryIdNumber: number;
}

function SearchNotification(props: SearchNotificationProps) {
  const [isSearchNotifyfyActive, setIsSearchNotifyActive] =
    useState<boolean>(false);
  useEffect(() => {
    if (props.keyword !== '' && props.keyword !== null) {
      const delayTimeoutId = setTimeout(() => {
        setIsSearchNotifyActive(true);
      }, 300);

      const timeoutId = setTimeout(() => {
        setIsSearchNotifyActive(false);
      }, 4000);

      return () => {
        clearTimeout(delayTimeoutId);
        clearTimeout(timeoutId);
      };
    }
  }, [props.keyword, props.categoryIdNumber]);

  return (
    <div
      className={`toast-notify pointer hover p-1 ${
        isSearchNotifyfyActive ? 'active' : ''
      }`}
    >
      <div className="toast-notify-content">
        <div className="message">
          <img
            src="https://res.cloudinary.com/dgdn13yur/image/upload/v1709302832/notify_search_ay8gv4.png"
            alt=""
            className="check"
          />
          <div className="tost-notify-information">
            <span className="">
              Kết quả tìm kiếm cho <strong>"{props.keyword}"</strong>
            </span>
            <span className="">
              Có <strong>{props.numberOfProduct}</strong> sản phẩm
            </span>
          </div>
        </div>
      </div>
      <i className="fa-solid fa-xmark close"></i>
      <div className="progress"></div>
    </div>
  );
}

export default SearchNotification;
