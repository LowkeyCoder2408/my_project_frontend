import CartItemModel from '../models/CartItemModel';
import OrderModel from '../models/OrderModel';
import { backendEndpoint } from '../utils/Constant';
import { myRequest } from './MyRequest';

export async function getAllOrders(): Promise<OrderModel[]> {
  try {
    const endpoint: string = backendEndpoint + '/order?sort=id,desc';
    const response = await myRequest(endpoint);

    const dataReponses = await Promise.all(
      response._embedded.orders.map(async (dataResponse: any) => {
        return {
          id: dataResponse.id,
          fullName: dataResponse.fullName,
          phoneNumber: dataResponse.phoneNumber,
          email: dataResponse.email,
          addressLine: dataResponse.addressLine,
          province: dataResponse.province,
          district: dataResponse.district,
          ward: dataResponse.ward,
          orderTime: dataResponse.orderTime,
          total: dataResponse.total,
          paymentMethod: dataResponse.paymentMethod,
          status: dataResponse.status,
          note: dataResponse.note,
        };
      }),
    );

    return dataReponses;
  } catch (error) {
    console.error('Lỗi trong quá trình get đơn hàng:', error);
    throw error;
  }
}

export async function getAllOrdersByIdUser(
  idUser: number,
): Promise<OrderModel[]> {
  const endpoint =
    backendEndpoint + `/order/search/findByCustomer_Id?customerId=${idUser}`;
  const response = await myRequest(endpoint);
  const dataReponses = await Promise.all(
    response._embedded.orders.map(async (dataResponse: any) => {
      const order: OrderModel = {
        id: dataResponse.id,
        fullName: dataResponse.fullName,
        phoneNumber: dataResponse.phoneNumber,
        email: dataResponse.email,
        addressLine: dataResponse.addressLine,
        province: dataResponse.province,
        district: dataResponse.district,
        ward: dataResponse.ward,
        orderTime: dataResponse.orderTime,
        total: dataResponse.total,
        paymentMethod: dataResponse.paymentMethod,
        status: dataResponse.status,
        note: dataResponse.note,
      };
      return order;
    }),
  );

  return dataReponses;
}

export async function getOrderById(idOrder: number): Promise<OrderModel> {
  const endpoint: string = backendEndpoint + `/order/${idOrder}`;
  const responseOrder = await myRequest(endpoint);

  const order: OrderModel = {
    id: responseOrder.id,
    fullName: responseOrder.fullName,
    phoneNumber: responseOrder.phoneNumber,
    email: responseOrder.email,
    addressLine: responseOrder.addressLine,
    province: responseOrder.province,
    district: responseOrder.district,
    ward: responseOrder.ward,
    orderTime: responseOrder.orderTime,
    total: responseOrder.total,
    paymentMethod: responseOrder.paymentMethod,
    status: responseOrder.status,
    note: responseOrder.note,
  };

  return order;
}
