import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import './Header.css';
import CategoryModel from '../../../../../models/CategoryModel';
import { getAllCategories } from '../../../../../api/CategoryAPI';
import { getRoleByToken } from '../../../../../utils/JwtService';

interface HeaderProps {
  keyword: string;
  setKeyword: (word: string) => void;
}

function Header({ keyword, setKeyword }: HeaderProps) {
  const userRoles = getRoleByToken();
  const pathname = useLocation();
  const navLinksRef = useRef<HTMLDivElement>(null);
  const [categoryList, setCategoryList] = useState<CategoryModel[]>([]);

  const [isSearchClose, setisSearchClose] = useState(true);
  const [tempKeyword, setTempKeyword] = useState<string>('');
  const searchBoxRef = useRef<HTMLDivElement>(null);
  // Sidebar show handle
  const [isSidebarClose, setIsSidebarClose] = useState(true);
  const navigate = useNavigate();
  if (!isSidebarClose) {
    if (navLinksRef.current) {
      // Kiểm tra ref trước khi sử dụng
      navLinksRef.current.style.left = '0';
    }
  } else {
    if (navLinksRef.current) {
      navLinksRef.current.style.left = '-100%';
    }
  }

  // Category show handle
  const [isCategoryClose, setIsCategoryClose] = useState(true);
  if (!isCategoryClose) {
    if (navLinksRef.current) {
      navLinksRef.current.classList.add('show1');
    }
  } else {
    if (navLinksRef.current) {
      while (navLinksRef.current.classList.contains('show1')) {
        navLinksRef.current.classList.remove('show1');
      }
    }
  }

  // Accessory show handle
  const [isAccessoryClose, setIsAccessoryClose] = useState(true);
  if (!isAccessoryClose) {
    if (navLinksRef.current) {
      navLinksRef.current.classList.add('show2');
    }
  } else {
    if (navLinksRef.current) {
      while (navLinksRef.current.classList.contains('show2')) {
        navLinksRef.current.classList.remove('show2');
      }
    }
  }

  useEffect(() => {
    setIsSidebarClose(true);
    setisSearchClose(true);
    getAllCategories().then((result) => {
      setCategoryList(result.categoryList);
    });
  }, [pathname]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Kiểm tra nếu click không phải là search-box hoặc con của search-box thì đóng search-box
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setisSearchClose(true);
      }
    };

    // Thêm sự kiện mousedown để xử lý click bên ngoài search-box
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      // Cleanup: loại bỏ sự kiện mousedown khi component bị unmount
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempKeyword(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(tempKeyword);
    navigate('/product-list');
    setTempKeyword('');
  };

  useEffect(() => {
    // Kiểm tra nếu form không đóng và input được tìm thấy
    if (!isSearchClose && searchBoxRef.current) {
      // Focus vào input
      searchBoxRef.current.querySelector('input')?.focus();
    }
  }, [isSearchClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Kiểm tra nếu người dùng nhấn Ctrl + F
      if (event.ctrlKey && event.key === 'f') {
        // Ngăn chặn hành vi mặc định của trình duyệt khi tìm kiếm
        event.preventDefault();
        // Mở form tìm kiếm
        setisSearchClose(false);
        // Focus vào input của form tìm kiếm
        if (searchBoxRef.current) {
          searchBoxRef.current.querySelector('input')?.focus();
        }
      }
    };

    // Thêm sự kiện keydown để bắt lấy sự kiện phím
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      // Cleanup: loại bỏ sự kiện keydown khi component bị unmount
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="container-fluid p-0 bg-white">
      <div className="container p-0">
        <nav>
          <div className="navbar">
            <i
              onClick={() => {
                setIsSidebarClose(false);
              }}
              className="bx bx-menu btn-show"
            ></i>
            <div className="logo hide-on-mobile">
              <Link to="/">
                <img
                  className="logo-img"
                  src="https://res.cloudinary.com/dgdn13yur/image/upload/v1707592447/logo_main_tes0gp.png"
                  alt=""
                />
              </Link>
            </div>
            <div className="nav-links" ref={navLinksRef}>
              <div className="sidebar-logo">
                <i
                  onClick={() => {
                    setIsSidebarClose(true);
                    setIsCategoryClose(true);
                    setIsAccessoryClose(true);
                  }}
                  className="bx bx-x btn-show"
                ></i>
              </div>
              <ul className="links">
                <li className="links-list-item">
                  <a
                    onClick={() => {
                      setIsCategoryClose(!isCategoryClose);
                      if (isCategoryClose) {
                        setIsAccessoryClose(true);
                      }
                    }}
                  >
                    DANH MỤC SẢN PHẨM
                    <i className="bx bxs-chevron-down category-arrow arrow"></i>
                  </a>
                  <ul className="accessory-menu sub-menu">
                    {categoryList.map((category, index) => (
                      <li key={category.id}>
                        <Link
                          onClick={() => setKeyword('')}
                          className="link-cat text-dark"
                          to={`/product-list/${category.id}`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="links-list-item">
                  <Link onClick={() => setKeyword('')} to={'/product-list'}>
                    KHO HÀNG
                  </Link>
                </li>
                <li className="links-list-item">
                  <Link to={'/about-us'}>GIỚI THIỆU</Link>
                </li>
                <li className="links-list-item">
                  <Link to={'/faq'}>HỎI & ĐÁP</Link>
                </li>
                {userRoles &&
                userRoles.length === 1 &&
                userRoles.includes('Khách hàng') ? (
                  <li className="links-list-item">
                    <Link to={'/contact'}>LIÊN HỆ</Link>
                  </li>
                ) : (
                  userRoles && (
                    <li className="links-list-item">
                      <Link to={'/admin/dashboard'}>TRANG QUẢN TRỊ</Link>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="search-box" ref={searchBoxRef}>
              {isSearchClose ? (
                <i
                  onClick={() => {
                    setisSearchClose(false);
                  }}
                  className="bx bx-search btn-show"
                ></i>
              ) : (
                <i
                  onClick={() => {
                    setisSearchClose(true);
                  }}
                  className="bx bx-x btn-show"
                ></i>
              )}

              <form
                onSubmit={handleSearch}
                className={`input-box ${isSearchClose ? 'hide' : ''}`}
              >
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Tìm kiếm sản phẩm tại đây..."
                  aria-label="Search"
                  onChange={onSearchInputChange}
                  value={tempKeyword}
                />
                <button type="submit" className="">
                  <i className="bx bx-search text-white"></i>
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
