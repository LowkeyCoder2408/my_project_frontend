import { useEffect, useState } from 'react';
import OrderModel from '../../../../models/OrderModel';
import OrderTrackModel from '../../../../models/OrderTrackModel';
import './OrderForm.css';
import { getOrderTracksByOrderId } from '../../../../api/ProductOrderTrackAPI';
import OrderStatus from '../../../../pages/MyOrder/components/OrderStatus';
import { format } from 'date-fns';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {
  orderStatusDescriptions,
  useOrderStatusList,
} from '../../../../models/OrderStatus';
import { backendEndpoint } from '../../../../utils/Constant';
import { toast } from 'react-toastify';

interface OrderFormProps {
  order: OrderModel;
}

function OrderForm(props: OrderFormProps) {
  const [orderTrackList, setOrderTrackList] = useState<
    OrderTrackModel[] | null
  >(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const orderStatusList = useOrderStatusList();

  useEffect(() => {
    if (props.order) {
      if (props.order.status) {
        setSelectedStatus(props.order.status);
      }

      getOrderTracksByOrderId(props.order?.id)
        .then((result) => {
          setOrderTrackList(result.orderTrackList);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.order]);

  useEffect(() => {
    console.log('selectedStatus ', selectedStatus);
  }, [selectedStatus]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value);
    try {
      const token = localStorage.getItem('token');
      const endpoint = `/order/update-order`;
      fetch(backendEndpoint + endpoint, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: props.order.id,
          status: event.target.value,
        }),
      }).then((response) => {
        if (!response.ok) {
          toast.error('Cập nhật trạng thái đơn hàng không thành công');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

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
                <strong>
                  {orderTrack.status
                    ? orderStatusDescriptions[orderTrack.status]
                    : ''}
                </strong>
                )
              </em>
            </li>
          ))}
        </ul>
      </div>
      <h2 className="mt-5">CẬP NHẬT TÌNH TRẠNG ĐƠN HÀNG</h2>
      <FormControl fullWidth variant="standard">
        <InputLabel id="status-select-label">Tình trạng đơn hàng</InputLabel>
        <Select
          required
          labelId="status-select-label"
          id="status-select"
          value={selectedStatus}
          onChange={handleStatusChange}
          label="Tình trạng đơn hàng"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {orderStatusList.map(({ status, description }) => (
            <MenuItem key={status} value={status}>
              {description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default OrderForm;
