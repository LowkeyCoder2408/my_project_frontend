import { useEffect, useState } from 'react';
import './Products.css';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable';
import ProductModel from '../../../models/ProductModel';
import { getAllProductsNoFilter } from '../../../api/ProductAPI';
import FormatPrice from '../../../pages/ProductList/components/ProductProps/FormatPrice';
import { format } from 'date-fns';
import { getBrandByProductId } from '../../../api/BrandAPI';
import BrandModel from '../../../models/BrandModel';
import CategoryModel from '../../../models/CategoryModel';
import { getCategoryByProductId } from '../../../api/CategoryAPI';
import { Link, useNavigate } from 'react-router-dom';
import { getRoleByToken, isToken } from '../../../utils/JwtService';
import { FadeModal } from '../../../utils/FadeModal';
import { ProductForm } from '../../components/ActionForm/ProductForm';
import { useConfirm } from 'material-ui-confirm';
import { backendEndpoint } from '../../../utils/Constant';
import { toast } from 'react-toastify';

const BrandCell = ({ productId }: { productId: number }) => {
  const [brand, setBrand] = useState<BrandModel | null>(null);

  useEffect(() => {
    getBrandByProductId(productId)
      .then((brandInfo) => {
        console.log('dddbrand', brandInfo.brand);
        setBrand(brandInfo.brand);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);

  return <div className="text-center">{brand?.name}</div>;
};

const CategoryCell = ({ productId }: { productId: number }) => {
  const [category, setCategory] = useState<CategoryModel | null>(null);

  useEffect(() => {
    getCategoryByProductId(productId)
      .then((categoryInfo) => {
        console.log('dddcategory', categoryInfo.category);
        setCategory(categoryInfo.category);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);

  return <div className="text-center">{category?.name}</div>;
};

const Products = () => {
  const [id, setId] = useState<number>(0);
  const [option, setOption] = useState('');

  const confirm = useConfirm();

  useEffect(() => {
    console.log(id, option);
  }, [id, option]);

  const handleDelete = async (productId: number) => {
    try {
      confirm({
        title: <span style={{ fontSize: '20px' }}>XÓA SẢN PHẨM</span>,
        description: (
          <span style={{ fontSize: '16px' }}>
            Bạn có chắc chắn rằng sẽ xóa sản phẩm này?
          </span>
        ),
        confirmationText: <span style={{ fontSize: '15px' }}>Đồng ý</span>,
        cancellationText: <span style={{ fontSize: '15px' }}>Huỷ</span>,
      })
        .then(() => {
          if (isToken()) {
            const token = localStorage.getItem('token');

            const endpoint = `/product/${productId}`;
            fetch(backendEndpoint + endpoint, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            })
              .then((response) => {
                if (response.ok) {
                  toast.success('Xóa sản phẩm thành công!');
                } else {
                  toast.error(
                    'Không thể xóa do tồn tại đơn hàng của sản phẩm này!',
                  );
                }
              })
              .catch((error) => {
                toast.error('Gặp lỗi trong quá trình xóa sản phẩm!');
              });
          } else {
            toast.error('Bạn cần đăng nhập để thực hiện chức năng này!');
            return;
          }
        })
        .catch(() => {});
    } catch (error) {
      console.log(error);
      toast.error('Đã xảy ra lỗi khi xóa sản phẩm!');
    }
  };

  // Data của bảng
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 30 },
    {
      field: 'mainImage',
      headerName: 'Ảnh',
      width: 60,
      renderCell: (params) => {
        return <img src={params.row.mainImage} alt="" />;
      },
    },
    {
      field: 'name',
      type: 'string',
      headerName: 'Tên sản phẩm',
      width: 250,
    },
    {
      field: 'currentPrice',
      type: 'string',
      headerName: 'Giá',
      width: 120,
      renderCell: (params) => {
        return <FormatPrice price={params.value} />;
      },
    },
    {
      field: 'category',
      headerName: 'Danh mục',
      type: 'string',
      width: 130,
      renderCell: (params) => <CategoryCell productId={params.row.id} />,
    },
    {
      field: 'brand',
      headerName: 'Thương hiệu',
      type: 'string',
      width: 110,
      renderCell: (params) => <BrandCell productId={params.row.id} />,
    },
    {
      field: 'createdTime',
      headerName: 'Ngày nhập',
      width: 190,
      type: 'string',
      renderCell: (params) => {
        const createdDateTime = new Date(params.row.createdTime);
        const formattedDateTime = format(
          createdDateTime,
          "HH:mm:ss, 'ngày' dd/MM/yyyy",
        );
        return formattedDateTime;
      },
    },
    {
      field: 'soldQuantity',
      headerName: 'Đã bán',
      width: 70,
      type: 'string',
      renderCell: (params) => {
        return <div className="text-center">{params.row.soldQuantity}</div>;
      },
    },
    {
      field: 'inStock',
      headerName: 'Tồn kho',
      width: 80,
      type: 'string',
      renderCell: (params) => {
        return <div className="text-center">{params.row.quantity}</div>;
      },
    },
    {
      field: 'action',
      headerName: 'Các thao tác',
      width: 100,
      renderCell: (params) => {
        return (
          <div className="dataTable__action d-flex justify-content-center align-items-center">
            <img
              src="/view.svg"
              alt=""
              onClick={() => {
                setOption('update');
                setId(params.row.id);
                handleOpenModal();
              }}
            />
            <div
              className="dataTable__delete"
              onClick={() => handleDelete(params.row.id)}
            >
              <img src="/delete.svg" alt="" />
            </div>
          </div>
        );
      },
    },
  ];

  const [products, setProducts] = useState<ProductModel[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      !isToken() ||
      (getRoleByToken()?.length === 1 &&
        getRoleByToken()?.includes('Khách hàng'))
    ) {
      navigate('/403-error');
      return;
    }
  }, []);

  useEffect(() => {
    getAllProductsNoFilter()
      .then((result) => {
        setProducts(result.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [products]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="products">
      <div className="products__info">
        <h1 className="products__heading mt-4">DANH SÁCH SẢN PHẨM</h1>
        <button
          onClick={() => {
            setIsOpen(true);
            setId(0);
            setOption('add');
          }}
        >
          <svg
            width="22px"
            height="22px"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <DataTable slug="sản phẩm" columns={columns} rows={products} />
      <FadeModal
        open={isOpen}
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
      >
        <ProductForm
          handleCloseModal={handleCloseModal}
          option={option}
          id={id}
        />
      </FadeModal>
    </div>
  );
};

export default Products;
