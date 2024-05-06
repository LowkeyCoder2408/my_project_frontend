import OrderModel from './OrderModel';
import OrderStatus from './OrderStatusModel';

class OrderTrackModel {
  id: number;
  notes?: string;
  updatedTime?: Date;
  status?: OrderStatus;
  order?: OrderModel;

  constructor(
    id: number,
    updatedTime: Date,
    status: OrderStatus,
    order: OrderModel,
    notes: string,
  ) {
    this.id = id;
    this.notes = notes;
    this.updatedTime = updatedTime;
    this.status = status;
    this.order = order;
  }
}

export default OrderTrackModel;
