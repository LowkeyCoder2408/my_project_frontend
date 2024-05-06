import React from 'react';
import { backendEndpoint } from '../utils/Constant';
import OrderDetailModel from '../models/OrderDetailModel';
import { myRequest } from './MyRequest';

interface ResultInterface {
  orderDetailList: OrderDetailModel[];
  orderDetail: OrderDetailModel | null;
}

async function getOrderDetails(url: string): Promise<ResultInterface> {
  const response = await myRequest(url);

  const orderDetailList: any = response._embedded.orderDetails.map(
    (orderDetail: any) => ({
      ...orderDetail,
    }),
  );
  return {
    orderDetailList: orderDetailList,
    orderDetail: response.orderDetail,
  };
}

export async function getAllOrderDetails(): Promise<ResultInterface> {
  const url: string = backendEndpoint + '/order-detail';

  return getOrderDetails(url);
}

export async function getOrderDetailsByOrderId(
  id: number,
): Promise<ResultInterface> {
  const endpoint =
    backendEndpoint + `/order-detail/search/findByOrder_Id?orderId=${id}`;
  return getOrderDetails(endpoint);
}
