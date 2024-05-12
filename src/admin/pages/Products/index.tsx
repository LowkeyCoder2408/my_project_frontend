import { useState } from 'react';
import './Products.css';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable';
import { products } from '../../../data';
import Add from '../../components/Add';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'img',
    headerName: 'Ảnh',
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || '/noavatar.png'} alt="" />;
    },
  },
  {
    field: 'title',
    type: 'string',
    headerName: 'Tên Sản Phẩm',
    width: 230,
  },
  {
    field: 'color',
    type: 'string',
    headerName: 'Màu',
    width: 100,
  },
  {
    field: 'price',
    type: 'string',
    headerName: 'Giá',
    width: 130,
  },
  {
    field: 'producer',
    headerName: 'Nhà Sản Xuất',
    type: 'string',
    width: 150,
  },
  {
    field: 'createdAt',
    headerName: 'Ngày Thêm',
    width: 100,
    type: 'string',
  },
  {
    field: 'inStock',
    headerName: 'Còn Hàng',
    width: 150,
    type: 'boolean',
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allproducts"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/products").then(
  //       (res) => res.json()
  //     ),
  // });

  return (
    <div className="products">
      <div className="products__info">
        <h1 className="products__heading">SẢN PHẨM</h1>
        <button onClick={() => setOpen(true)}>
          <svg
            width="22px"
            height="22px"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <DataTable slug="sản phẩm" columns={columns} rows={products} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="sản phẩm" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
