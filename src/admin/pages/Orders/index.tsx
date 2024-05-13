import { useEffect, useState } from 'react';
import './Orders.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import FormatPrice from '../../../pages/ProductList/components/ProductProps/FormatPrice';
import { format } from 'date-fns';
import { getAllOrders, getOrderById } from '../../../api/ProductOrderAPI';
import OrderModel from '../../../models/OrderModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHistory } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FadeModal } from '../../../utils/FadeModal';
import OrderModal from '../../../pages/MyOrder/components/OrderModal';
import OrderTrack from '../../../pages/MyOrder/components/OrderTrack';

const Orders = () => {
  // Tạo biến để lấy tất cả data đơn hàng
  const [data, setData] = useState<OrderModel[]>([]);
  // Xử lý order table
  const [id, setId] = useState<number>(0);
  const [order, setOrder] = useState<OrderModel>();
  const [openOrderModal, setOpenOrderModal] = useState<boolean>(false);
  const [openOrderTrackModal, setOpenOrderTrackModal] =
    useState<boolean>(false);

  const handleOpenOrderModal = () => setOpenOrderModal(true);
  const handleCloseOrderModal = () => setOpenOrderModal(false);
  const handleOpenOrderTrackModal = () => setOpenOrderTrackModal(true);
  const handleCloseOrderTrackModal = () => setOpenOrderTrackModal(false);

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
            statusText = 'Shipper nhận hàng';
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
          <div className="d-flex gap-2">
            <div
              style={{
                cursor: 'pointer',
                padding: '10px',
                color: '#4646a1',
                display: 'flex',
                gap: '20px',
              }}
            >
              <FontAwesomeIcon
                title="Xem chi tiết đơn hàng"
                onClick={() => {
                  setId(Number(item.id));
                  handleOpenOrderModal();
                }}
                icon={faEye as IconProp}
              />
            </div>
            <div
              style={{
                cursor: 'pointer',
                padding: '10px',
                color: '#4646a1',
                display: 'flex',
                gap: '20px',
              }}
            >
              <FontAwesomeIcon
                title="Theo dõi lịch sử đơn hàng"
                onClick={() => {
                  setId(Number(item.id));
                  handleOpenOrderTrackModal();
                }}
                icon={faHistory as IconProp}
              />
            </div>
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
    getAllOrders()
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
      <h1 className="products__heading mt-4">DANH SÁCH ĐƠN HÀNG</h1>
      <div style={{ height: 400, width: '100%' }} className="mt-0">
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
        open={openOrderModal}
        handleOpen={handleOpenOrderModal}
        handleClose={handleCloseOrderModal}
      >
        {order && <OrderModal order={order} />}
      </FadeModal>
      <FadeModal
        open={openOrderTrackModal}
        handleOpen={handleOpenOrderTrackModal}
        handleClose={handleCloseOrderTrackModal}
      >
        {order && <OrderTrack order={order} />}
      </FadeModal>
    </div>
  );
};

export default Orders;
