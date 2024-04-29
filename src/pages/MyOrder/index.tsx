import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './MyOrder.css';
import OrderModel from '../../models/OrderModel';
import { getUserIdByToken } from '../../utils/JwtService';
import { getAllOrdersByIdUser, getOrderById } from '../../api/ProductOrderAPI';
import { format } from 'date-fns';
import FormatPrice from '../ProductList/components/ProductProps/FormatPrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import OrderModal from './OrderModal';
import { useEffect, useState } from 'react';
import { FadeModal } from '../../utils/FadeModal';
export default function MyOrder() {
  // Tạo biến để lấy tất cả data đơn hàng
  const [data, setData] = useState<OrderModel[]>([]);
  // Xử lý order table
  const [id, setId] = useState<number>(0);
  const [order, setOrder] = useState<OrderModel>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Mã đơn hàng',
      width: 110,
      renderCell: (params) => {
        return <>THO-{params.value}</>;
      },
    },
    { field: 'customerName', headerName: 'Tên khách hàng', width: 140 },
    {
      field: 'orderTime',
      headerName: 'Thời gian khởi tạo',
      width: 170,
      renderCell: (params) => {
        const formattedDateTime = format(
          new Date(params.value),
          'HH:mm:ss, dd/MM/yyyy',
        );
        return <>{formattedDateTime}</>;
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 180,
    },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      width: 120,
    },
    {
      field: 'total',
      headerName: 'Tổng tiền',
      width: 110,
      renderCell: (params) => {
        return (
          <div style={{ color: 'rgb(231, 0, 0)', fontWeight: '600' }}>
            <FormatPrice price={params.value} />
          </div>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Trạng thái đơn hàng',
      width: 160,
      renderCell: (params) => {
        let color, statusText;
        switch (params.value) {
          case 'NEW':
            color = '#1976d2'; // Màu xanh đậm
            statusText = 'Vừa tạo';
            break;
          case 'CANCELED':
            color = '#f44336'; // Màu đỏ
            statusText = 'Đã hủy';
            break;
          case 'PROCESSING':
            color = '#ffc107'; // Màu vàng
            statusText = 'Đang xử lý';
            break;
          case 'PACKAGED':
            color = '#8bc34a'; // Màu xanh lá cây
            statusText = 'Đã đóng gói';
            break;
          case 'PICKED':
            color = '#ff9800'; // Màu cam
            statusText = 'Đã nhận hàng';
            break;
          case 'SHIPPING':
            color = '#2196f3'; // Màu xanh dương
            statusText = 'Đang giao hàng';
            break;
          case 'DELIVERED':
            color = '#4caf50'; // Màu xanh lá cây sáng
            statusText = 'Đã giao hàng';
            break;
          case 'RETURN_REQUESTED':
            color = '#9e9e9e'; // Màu xám
            statusText = 'Yêu cầu hoàn trả';
            break;
          case 'RETURNED':
            color = '#673ab7'; // Màu tím
            statusText = 'Đã hoàn trả';
            break;
          case 'PAID':
            color = '#00bcd4'; // Màu xanh dương nhạt
            statusText = 'Đã thanh toán';
            break;
          case 'REFUNDED':
            color = '#ff5722'; // Màu cam đậm
            statusText = 'Đã hoàn tiền';
            break;
          default:
            color = '#000'; // Màu đen
            statusText = 'Trạng thái không xác định';
        }
        return (
          <strong
            style={{
              color: `${color}`,
              border: `2px solid ${color}`,
              padding: '6px',
              borderRadius: '50px',
              transform: 'rotate(-15deg)',
            }}
          >
            {statusText}
          </strong>
        );
      },
    },

    {
      field: 'paymentMethod',
      headerName: 'Cách thanh toán',
      width: 170,

      renderCell: (params) => {
        let paymentMethodText, statusText;
        switch (params.value) {
          case 'COD':
            paymentMethodText = 'Trả khi nhận hàng';
            break;
          case 'VNPay':
            paymentMethodText = 'Cổng thanh toán VNPay';
            break;
            paymentMethodText = '#ff5722'; // Màu cam đậm
            statusText = 'Đã hoàn tiền';
            break;
          default:
            paymentMethodText = 'Không xác định';
        }
        return <>{paymentMethodText}</>;
      },
    },
    {
      field: 'action',
      headerName: 'Các thao tác',
      width: 140,
      type: 'actions',
      renderCell: (item) => {
        return (
          <div style={{ cursor: 'pointer', padding: '10px', color: '#4646a1' }}>
            <FontAwesomeIcon
              onClick={() => {
                setId(Number(item.id));
                handleOpenModal();
              }}
              icon={faEye as IconProp}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getOrderById(id)
      .then((result) => {
        console.log(result);
        setOrder(result);
      })
      .catch((error) => {
        console.log('Lỗi khi lấy đơn hàng: ', error);
      });
  }, [id]);

  useEffect(() => {
    const idUser = getUserIdByToken();
    getAllOrdersByIdUser(idUser)
      .then((response) => {
        const orders = response.map((order) => ({
          ...order,
          id: order.id,
          customerName: order.fullName,
        }));

        const ordersSort = orders.sort(
          (order1, order2) => order2.id - order1.id,
        );

        setData(ordersSort);
        // setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
      <FadeModal
        open={openModal}
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
      >
        {order && <OrderModal order={order} />}
      </FadeModal>
    </div>
  );
}
