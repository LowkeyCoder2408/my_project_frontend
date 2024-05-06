import React from 'react';
import { backendEndpoint } from '../utils/Constant';
import { myRequest } from './MyRequest';
import OrderTrackModel from '../models/OrderTrackModel';

interface ResultInterface {
  orderTrackList: OrderTrackModel[];
  orderTrack: OrderTrackModel | null;
}

async function getOrderTracks(url: string): Promise<ResultInterface> {
  const response = await myRequest(url);

  const orderTrackList: any = response._embedded.orderTracks.map(
    (orderTrack: any) => ({
      ...orderTrack,
    }),
  );
  return {
    orderTrackList: orderTrackList,
    orderTrack: response.orderTrack,
  };
}

export async function getOrderTracksByOrderId(
  id: number,
): Promise<ResultInterface> {
  const endpoint =
    backendEndpoint + `/order-track/search/findByOrder_Id?orderId=${id}`;
  return getOrderTracks(endpoint);
}
