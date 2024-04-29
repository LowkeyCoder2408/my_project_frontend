import React, { useEffect, useState } from 'react';
import './OrderModal.css';
import OrderModel from '../../../models/OrderModel';
import CustomerModel from '../../../models/CustomerModel';
import { getCustomerByOrderId } from '../../../api/CustomerAPI';
import { format } from 'date-fns';

interface OrderModalProps {
  order: OrderModel;
}

const OrderModal = (props: OrderModalProps) => {
  // const [customer, setCustomer] = useState<CustomerModel | null>(null);

  // useEffect(() => {
  //   getCustomerByOrderId(props.order.id)
  //     .then((result) => {
  //       setCustomer(result);
  //     })
  //     .catch((error) => {
  //       console.log('Lỗi khi lấy khách hàng của đơn hàng: ', error);
  //     });
  // }, []);

  useEffect(() => {
    const rows =
      document.querySelectorAll<HTMLTableRowElement>('.table tbody tr');

    let totalPrice = 0;

    rows.forEach((row) => {
      const priceElement = row.querySelector('td:nth-child(4)');
      const quantityElement = row.querySelector('td:nth-child(5)');
      const totalPriceElement = row.querySelector('td:nth-child(6)');

      if (priceElement && quantityElement && totalPriceElement) {
        const price = parseFloat(priceElement.textContent!.replace(/\D/g, ''));
        const quantity = parseFloat(quantityElement.textContent!);
        const subtotal = price * quantity;
        totalPriceElement.textContent = subtotal.toLocaleString();
        totalPrice += subtotal;
      }
    });

    const totalElement = document.querySelector<HTMLTableCellElement>(
      '.table tbody tr:last-child td:last-child',
    );
    if (totalElement) {
      totalElement.textContent = totalPrice.toLocaleString();
    }
  }, []);

  return (
    <div className="container">
      <div className="order">
        <div className="order__track-order">
          <div className="order-header">
            <div className="track-order__heading">THEO DÕI ĐƠN HÀNG</div>
          </div>
          <div className="order-info">
            <div className="track-order__progress-bar">
              <ul id="progressbar">
                <li className="active step0"></li>
                <li className="active step0"></li>
                <li className="active step0"></li>
                <li className="step0"></li>
              </ul>
            </div>
            <div className="track-order__list">
              <div className="track-order__item">
                <img
                  src="https://res.cloudinary.com/dmuoa2owy/image/upload/v1714005305/x081amdttouh3opkbg3b.png"
                  alt="Processed"
                  className="track-order__img"
                />
                <p className="track-order__name">Xử Lý</p>
              </div>
              <div className="track-order__item">
                <img
                  src="https://res.cloudinary.com/dmuoa2owy/image/upload/v1714005305/owxhq16efygulpbj4xqn.png"
                  alt="Packed"
                  className="track-order__img"
                />
                <p className="track-order__name">Đóng Gói</p>
              </div>
              <div className="track-order__item">
                <img
                  src="https://res.cloudinary.com/dmuoa2owy/image/upload/v1714005305/rasydpdl8ax2qgmfnnsk.png"
                  alt="Shipped"
                  className="track-order__img"
                />
                <p className="track-order__name">Vận Chuyển</p>
              </div>
              <div className="track-order__item">
                <img
                  src="https://res.cloudinary.com/dmuoa2owy/image/upload/v1714005305/x1gaxxtae5w9hsbrmtn6.png"
                  alt="Delivered"
                  className="track-order__img"
                />
                <p className="track-order__name">Đến Nơi</p>
              </div>
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
                  <tr>
                    <th scope="row">1</th>
                    <td>
                      <img
                        src="https://images.olx.com.pk/thumbnails/448365461-600x450.jpeg"
                        alt=""
                        className="table__img"
                      />
                    </td>
                    <td>Điện thoại Oppo</td>
                    <td>2.200.000</td>
                    <td>1</td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>
                      <img
                        src="https://bizweb.dktcdn.net/100/184/165/files/1441283015-sac-zin-iphone-full.jpg?v=1505964010220"
                        alt=""
                        className="table__img"
                      />
                    </td>
                    <td>Sạc Nhanh Iphone 20W</td>
                    <td>100.000</td>
                    <td>2</td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>
                      <img
                        src="https://indexiq.ru/storage/photo/resized/xy_1500x1500/c/d25fepigm12mb3r_edaa1ded.jpg.webp"
                        alt=""
                        className="table__img"
                      />
                    </td>
                    <td>Ốp Lưng Iphone</td>
                    <td>50.000</td>
                    <td>6</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="table__total" colSpan={5}>
                      Tổng:
                    </td>
                    <td></td>
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
