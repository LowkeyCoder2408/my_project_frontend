import {
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from '@mui/x-data-grid';
import './Categories.css';
import { useEffect, useState } from 'react';
import DataTable from '../../components/DataTable';
import Add from '../../components/Add';
import CategoryModel from '../../../models/CategoryModel';
import { getAllCategories } from '../../../api/CategoryAPI';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { getRoleByToken, isToken } from '../../../utils/JwtService';
import {
  findProductsByCategoryId,
  getTotalProductQuantity,
} from '../../../api/ProductAPI';
import { quantityOfCategory } from '../../../utils/Constant';

const QuantityCell: React.FC<{ id: number }> = ({ id }) => {
  const [quantity, setQuantity] = useState<number | null>(null);

  useEffect(() => {
    const fetchQuantity = async () => {
      const result = await quantityOfCategory(id);
      setQuantity(result);
    };
    fetchQuantity();
  }, [id]);

  return (
    <div className="text-center">
      {quantity !== null ? quantity : 'Loading...'}
    </div>
  );
};

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Mã danh mục',
    width: 110,
    renderCell: (params) => {
      return <div className="text-center">CAT - {params.row.id}</div>;
    },
  },
  {
    field: 'avatar',
    headerName: 'Ảnh biểu trưng',
    width: 120,
    renderCell: (params) => {
      return (
        <div className="text-center">
          <img src={params.row.image} alt="" />
        </div>
      );
    },
  },
  {
    field: 'name',
    type: 'string',
    headerName: 'Tên danh mục',
    width: 190,
  },
  {
    field: 'quantity',
    type: 'string',
    headerName: 'Lượng hàng tồn kho',
    width: 150,
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>,
    ) => {
      return <QuantityCell id={params.row.id} />;
    },
  },
  {
    field: 'enabled',
    headerName: 'Đã kích hoạt',
    width: 130,
    type: 'boolean',
  },
];

const Categories = () => {
  const [open, setOpen] = useState(false);

  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [productQuantities, setProductQuantities] = useState<number[]>([]);

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
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategories(categories.categoryList);
        // Calculate total product quantity for each category and save to state
        const quantities = await Promise.all(
          categories.categoryList.map((category) =>
            quantityOfCategory(category.id),
          ),
        );
        setProductQuantities(quantities);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [categories]);

  return (
    <div className="categories">
      <div className="categories__info">
        <h1 className="categories__heading mt-5">DANH MỤC SẢN PHẨM</h1>
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
      <DataTable slug="danh mục" columns={columns} rows={categories} />
      {open && <Add slug="danh mục" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Categories;
