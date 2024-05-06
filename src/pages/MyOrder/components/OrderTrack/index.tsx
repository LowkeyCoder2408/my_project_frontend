import { useEffect, useState } from 'react';
import OrderModel from '../../../../models/OrderModel';
import OrderStatus from '../OrderStatus';
import './OrderTrack.css';
import OrderTrackModel from '../../../../models/OrderTrackModel';
import { getOrderTracksByOrderId } from '../../../../api/ProductOrderTrackAPI';
import { format } from 'date-fns';

interface OrderTrackProps {
  order?: OrderModel;
}

function OrderTrack(props: OrderTrackProps) {
  const [orderTrackList, setOrderTrackList] = useState<
    OrderTrackModel[] | null
  >(null);

  useEffect(() => {
    if (props.order) {
      getOrderTracksByOrderId(props.order?.id)
        .then((result) => {
          setOrderTrackList(result.orderTrackList);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.order]);

  return (
    <>
      <h2>TÌNH TRẠNG ĐƠN HÀNG</h2>
      <div className="my-5">
        <OrderStatus order={props.order} />
      </div>
      <h2>LỊCH SỬ ĐƠN HÀNG</h2>
      <div className="mt-4">
        <ul className="px-5">
          {orderTrackList?.map((orderTrack, index) => (
            <li className="pb-3" key={index}>
              <em>
                Dấu thời gian:{' '}
                {format(
                  orderTrack.updatedTime ?? new Date(),
                  "HH':'mm':'ss, 'ngày' dd/MM/yyyy",
                )}{' '}
                (tình trạng đơn hàng đã được thay đổi thành{' '}
                <strong>{orderTrack.status}</strong>)
              </em>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default OrderTrack;
