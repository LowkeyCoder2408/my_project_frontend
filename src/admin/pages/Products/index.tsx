import { useEffect, useState } from 'react';
import './Products.css';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable';
import Add from '../../components/Add';
import ProductModel from '../../../models/ProductModel';
import { getAllProductsNoFilter } from '../../../api/ProductAPI';
import FormatPrice from '../../../pages/ProductList/components/ProductProps/FormatPrice';
import { format } from 'date-fns';
import { getBrandByProductId } from '../../../api/BrandAPI';
import BrandModel from '../../../models/BrandModel';
import CategoryModel from '../../../models/CategoryModel';
import { getCategoryByProductId } from '../../../api/CategoryAPI';
import { useNavigate } from 'react-router-dom';
import { getRoleByToken, isToken } from '../../../utils/JwtService';

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
];

const Products = () => {
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

  const [open, setOpen] = useState(false);

  return (
    <div className="products">
      <div className="products__info">
        <h1 className="products__heading mt-4">DANH SÁCH SẢN PHẨM</h1>
        <button onClick={() => setOpen(true)}>
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
      {open && <Add slug="sản phẩm" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
