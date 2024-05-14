import { GridColDef } from '@mui/x-data-grid';
import './Users.css';
import { useEffect, useState } from 'react';
import DataTable from '../../components/DataTable';
import Add from '../../components/Add';
import UserModel from '../../../models/UserModel';
import { getAllUsers } from '../../../api/UserAPI';
import { format } from 'date-fns';
import RoleModel from '../../../models/RoleModel';
import { getRoleByUserId } from '../../../api/RoleAPI';
import { useNavigate } from 'react-router-dom';
import { getRoleByToken, isToken } from '../../../utils/JwtService';
// import { useQuery } from "@tanstack/react-query";

const RoleCell = ({ userId }: { userId: number }) => {
  const [role, setRole] = useState<RoleModel | null>(null);

  useEffect(() => {
    getRoleByUserId(userId)
      .then((roleInfo) => {
        console.log('dddrole', roleInfo);
        setRole(roleInfo.role);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return <div className="text-center">{role?.name}</div>;
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 30 },
  {
    field: 'photos',
    headerName: 'Ảnh',
    width: 70,
    renderCell: (params) => {
      return <img src={params.row.photos || '/noavatar.png'} alt="" />;
    },
  },
  {
    field: 'fullName',
    type: 'string',
    headerName: 'Họ và tên',
    width: 170,
    renderCell: (params) => {
      return <>{params.row.lastName + ' ' + params.row.firstName} </>;
    },
  },
  {
    field: 'email',
    type: 'string',
    headerName: 'Email',
    width: 230,
  },
  {
    field: 'phoneNumber',
    type: 'string',
    headerName: 'Số điện thoại',
    width: 110,
  },
  {
    field: 'enabled',
    headerName: 'Đã kích hoạt',
    width: 180,
    type: 'boolean',
  },
  {
    field: 'authenticationType',
    headerName: 'Vai trò trong hệ thống',
    width: 170,
    type: 'string',
    renderCell: (params) => <RoleCell userId={3} />,
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);
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

  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    getAllUsers()
      .then((result) => {
        setUsers(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [users]);

  return (
    <div className="users">
      <div className="users__info">
        <h1 className="users__heading mt-5">DANH SÁCH QUẢN TRỊ VIÊN</h1>
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
      <DataTable slug="khách hàng" columns={columns} rows={users} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="khách hàng" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
