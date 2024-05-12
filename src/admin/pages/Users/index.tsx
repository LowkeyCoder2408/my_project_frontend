import { GridColDef } from '@mui/x-data-grid';
import './Users.css';
import { useState } from 'react';
import DataTable from '../../components/DataTable';
import { userRows } from '../../../data';
import Add from '../../components/Add';
// import { useQuery } from "@tanstack/react-query";

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
    field: 'firstName',
    type: 'string',
    headerName: 'Họ Và Tên Lót',
    width: 150,
  },
  {
    field: 'lastName',
    type: 'string',
    headerName: 'Tên',
    width: 150,
  },
  {
    field: 'email',
    type: 'string',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'phone',
    type: 'string',
    headerName: 'Số Điện Thoại',
    width: 150,
  },
  {
    field: 'createdAt',
    headerName: 'Ngày Thêm',
    width: 100,
    type: 'string',
  },
  {
    field: 'verified',
    headerName: 'Đã Duyệt',
    width: 100,
    type: 'boolean',
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allusers"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/users").then(
  //       (res) => res.json()
  //     ),
  // });

  return (
    <div className="users">
      <div className="users__info">
        <h1 className="users__heading">NGƯỜI DÙNG</h1>
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
      <DataTable slug="người dùng" columns={columns} rows={userRows} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="người dùng" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
