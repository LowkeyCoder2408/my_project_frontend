import { Link } from 'react-router-dom';
import './AdminMenu.css';

export const menu = [
  {
    id: 1,
    title: 'CHÍNH',
    listItems: [
      {
        id: 1,
        title: 'Trang Chủ',
        url: '/admin/dashboard',
        icon: 'home.svg',
      },
      {
        id: 2,
        title: 'Hồ Sơ',
        url: '/users/1',
        icon: 'user.svg',
      },
    ],
  },
  {
    id: 2,
    title: 'DANH SÁCH',
    listItems: [
      {
        id: 1,
        title: 'Người dùng',
        url: '/admin/view-users',
        icon: 'user.svg',
      },
      {
        id: 2,
        title: 'Sản Phẩm',
        url: '/admin/view-products',
        icon: 'product.svg',
      },
      {
        id: 3,
        title: 'Đơn Hàng',
        url: '/admin/view-orders',
        icon: 'order.svg',
      },
      {
        id: 4,
        title: 'Bài Đăng',
        url: '/admin/view-blogs',
        icon: 'post.svg',
      },
    ],
  },
  {
    id: 3,
    title: 'Tổng Quan',
    listItems: [
      {
        id: 1,
        title: 'Thành Phần',
        url: '/',
        icon: 'element.svg',
      },
      {
        id: 2,
        title: 'Ghi Chú',
        url: '/',
        icon: 'note.svg',
      },
      {
        id: 3,
        title: 'Hình Thức',
        url: '/',
        icon: 'form.svg',
      },
      {
        id: 4,
        title: 'Lịch Trình',
        url: '/',
        icon: 'calendar.svg',
      },
    ],
  },
  {
    id: 4,
    title: 'Bảo Trì',
    listItems: [
      {
        id: 1,
        title: 'Cài Đặt',
        url: '/',
        icon: 'setting.svg',
      },
      {
        id: 2,
        title: 'Sao Lưu',
        url: '/',
        icon: 'backup.svg',
      },
    ],
  },
  {
    id: 5,
    title: 'Phân Tích',
    listItems: [
      {
        id: 1,
        title: 'Biểu Đồ',
        url: '/',
        icon: 'chart.svg',
      },
      {
        id: 2,
        title: 'Nhật Ký',
        url: '/',
        icon: 'log.svg',
      },
    ],
  },
];

const AdminMenu = () => {
  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="menu__item" key={item.id}>
          <span className="menu__title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link
              to={listItem.url}
              className="menu__listItem"
              key={listItem.id}
            >
              {/* <FontAwesomeIcon icon={listItem.icon as IconProp} /> */}
              <img src={`/${listItem.icon}`} alt="" />
              <span className="menu__listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminMenu;
