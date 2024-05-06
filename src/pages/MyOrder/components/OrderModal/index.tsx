import React, { useEffect, useState } from 'react';
import './OrderModal.css';
import OrderModel from '../../../../models/OrderModel';
import { format } from 'date-fns';
import OrderStatus from '../OrderStatus';
import OrderDetailModel from '../../../../models/OrderDetailModel';
import { getOrderDetailsByOrderId } from '../../../../api/ProductOrderDetailAPI';
import { toast } from 'react-toastify';
import OrderDetailRow from '../OrderDetailRow';
import FormatPrice from '../../../ProductList/components/ProductProps/FormatPrice';

interface OrderModalProps {
  order: OrderModel;
}

const OrderModal = (props: OrderModalProps) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetailModel[]>([]);

  const totalSubtotal = orderDetails.reduce(
    (total, orderDetail) => total + (orderDetail.subtotal ?? 0),
    0,
  );

  useEffect(() => {
    getOrderDetailsByOrderId(props.order.id)
      .then((result) => {
        console.log(result.orderDetailList);
        setOrderDetails(result.orderDetailList);
      })
      .catch((error) => {
        toast.error('Đã xảy ra lỗi khi truy xuất đến chi tiết đơn hàng!');
        console.log(error);
      });
  }, [props.order.id]);

  return (
    <div className="container">
      <div className="order">
        <div className="order__track-order">
          <div className="order-header">
            <div className="track-order__heading">THEO DÕI ĐƠN HÀNG</div>
          </div>
          <div className="order-info">
            <div className="mt-5">
              <OrderStatus order={props.order} />
            </div>
          </div>
        </div>

        <div className="order__shipping-address">
          <div className="order-header">
            <div className="shipping-address__heading">THÔNG TIN GIAO HÀNG</div>
          </div>
          <div className="order-info">
            <div className="info-customer">
              <div className="row">
                <div className="col col-xxl-4 col-xl-4  col-lg-6 col-12 my-2">
                  <strong>Mã đơn hàng: </strong> THO-{props.order.id}
                </div>
                <div className="col col-xxl-4 col-xl-4  col-lg-6 col-12 my-2">
                  <strong>Ngày tạo: </strong>{' '}
                  {format(
                    new Date(props.order.orderTime || 0),
                    'HH:mm:ss, dd/MM/yyyy',
                  )}
                </div>
                <div className="col col-xxl-4 col-xl-4  col-lg-6 col-12 my-2">
                  <strong>Phương thức thanh toán: </strong>
                  {props.order.paymentMethod}
                </div>
                <div className="col col-xxl-4 col-xl-4  col-lg-6 col-12 my-2">
                  <strong>Tên khách hàng:</strong> {props.order.fullName}
                </div>
                <div className="col col-xxl-4 col-xl-4  col-lg-6 col-12 my-2">
                  <strong>Số điện thoại:</strong> {props.order.phoneNumber}
                </div>
                <div className="col col-xxl-4 col-xl-4  col-lg-6 col-12 my-2">
                  <strong>Email: </strong> {props.order.email}
                </div>
                <div className="col col-xxl-12 col-xl-12 col-lg-6 col-12 my-2">
                  <strong>Địa chỉ nhận hàng: </strong>
                  {props.order.addressLine +
                    ', ' +
                    props.order.ward +
                    ', ' +
                    props.order.district +
                    ', ' +
                    props.order.province}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order__list">
          <div className="order-header">
            <div className="list__heading">DANH SÁCH SẢN PHẨM</div>
          </div>
          <div className="order-info">
            <div className="table-responsive">
              <table className="table table-bordered text-center align-middle">
                <thead className="table-primary">
                  <tr className="align-middle">
                    <th scope="col">STT</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số Lượng</th>
                    <th scope="col">Thành Tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.map((orderDetail, index) => (
                    <>
                      <OrderDetailRow
                        orderNumber={index + 1}
                        orderDetail={orderDetail}
                      />
                    </>
                  ))}
                  <tr>
                    <td className="table__total" colSpan={5}>
                      Tổng:
                    </td>
                    <td>
                      <FormatPrice price={totalSubtotal} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
