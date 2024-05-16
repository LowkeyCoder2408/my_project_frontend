import { useState, useEffect } from 'react';

// Enum và các mô tả đã có sẵn
export enum OrderStatus {
  NEW = 'NEW',
  PROCESSING = 'PROCESSING',
  PACKAGED = 'PACKAGED',
  PICKED = 'PICKED',
  SHIPPING = 'SHIPPING',
  DELIVERED = 'DELIVERED',
  PAID = 'PAID',
  // CANCELED = 'CANCELED',
}

interface OrderStatusDescriptionMap {
  [key: string]: string;
}

export const orderStatusDescriptions: OrderStatusDescriptionMap = {
  NEW: 'VỪA ĐƯỢC KHỞI TẠO',
  PROCESSING: 'ĐANG ĐƯỢC XỬ LÝ',
  PACKAGED: 'ĐÃ ĐÓNG GÓI VÀ CHUẨN BỊ GIAO',
  PICKED: 'SHIPPER ĐÃ NHẬN HÀNG',
  SHIPPING: 'ĐANG ĐƯỢC GIAO',
  DELIVERED: 'ĐÃ ĐƯỢC GIAO',
  PAID: 'ĐÃ THANH TOÁN',
  // CANCELED: 'ĐÃ BỊ HỦY',
};

export const getOrderStatusDescription = (status: OrderStatus): string => {
  return orderStatusDescriptions[status];
};

export default OrderStatus;

// Hook để lấy danh sách OrderStatus và mô tả tương ứng
const useOrderStatusList = () => {
  const [orderStatusList, setOrderStatusList] = useState<
    { status: OrderStatus; description: string }[]
  >([]);

  useEffect(() => {
    const statuses = Object.values(OrderStatus).map((status) => ({
      status,
      description: getOrderStatusDescription(status),
    }));
    setOrderStatusList(statuses);
  }, []);

  return orderStatusList;
};

export { useOrderStatusList };
