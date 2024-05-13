import { GridColDef } from '@mui/x-data-grid';
import './Customers.css';
import { useEffect, useState } from 'react';
import DataTable from '../../components/DataTable';
import Add from '../../components/Add';
import CustomerModel from '../../../models/CustomerModel';
import { getAllCustomers } from '../../../api/CustomerAPI';
import { format } from 'date-fns';
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 30 },
  {
    field: 'avatar',
    headerName: 'Ảnh',
    width: 70,
    renderCell: (params) => {
      return <img src={params.row.avatar || '/noavatar.png'} alt="" />;
    },
  },
  {
    field: 'fullName',
    type: 'string',
    headerName: 'Họ và tên',
    width: 150,
  },
  {
    field: 'email',
    type: 'string',
    headerName: 'Email',
    width: 210,
  },
  {
    field: 'phoneNumber',
    type: 'string',
    headerName: 'Số điện thoại',
    width: 130,
  },
  {
    field: 'createdTime',
    headerName: 'Ngày thêm',
    width: 205,
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
    field: 'enabled',
    headerName: 'Đã kích hoạt',
    width: 120,
    type: 'boolean',
  },
  {
    field: 'authenticationType',
    headerName: 'Loại xác thực',
    width: 120,
    type: 'string',
  },
];

const Customers = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allcustomers"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/customers").then(
  //       (res) => res.json()
  //     ),
  // });

  const [customers, setCustomers] = useState<CustomerModel[]>([]);

  useEffect(() => {
    getAllCustomers()
      .then((result) => {
        setCustomers(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [customers]);

  return (
    <div className="customers">
      <div className="customers__info">
        <h1 className="customers__heading mt-5">DANH SÁCH KHÁCH HÀNG</h1>
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
      <DataTable slug="khách hàng" columns={columns} rows={customers} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="customers" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="khách hàng" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Customers;
