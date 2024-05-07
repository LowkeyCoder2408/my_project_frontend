export enum OrderStatus {
  NEW = "NEW",
  PROCESSING = "PROCESSING",
  PACKAGED = "PACKAGED",
  PICKED = "PICKED",
  SHIPPING = "SHIPPING",
  DELIVERED = "DELIVERED",
  PAID = "PAID"
}

interface OrderStatusDescriptionMap {
  [key: string]: string;
}

export const orderStatusDescriptions: OrderStatusDescriptionMap = {
  NEW: "VỪA ĐƯỢC KHỞI TẠO",
  PROCESSING: "ĐANG ĐƯỢC XỬ LÝ",
  PACKAGED: "ĐÃ ĐÓNG GÓI VÀ CHUẨN BỊ GIAO",
  PICKED: "SHIPPER ĐÃ NHẬN HÀNG",
  SHIPPING: "ĐANG ĐƯỢC GIAO",
  DELIVERED: "ĐÃ ĐƯỢC GIAO",
  PAID: "ĐÃ THANH TOÁN"
};

export const getOrderStatusDescription = (status: OrderStatus): string => {
  return orderStatusDescriptions[status];
};

export default OrderStatus;