import OrderModel from './OrderModel';
import ProductModel from './ProductModel';

class OrderDetailModel {
  id: number;
  quantity?: number;
  subtotal?: number;
  product?: ProductModel;
  order?: OrderModel;

  constructor(
    id: number,
    quantity: number,
    subtotal: number,
    product: ProductModel,
    order: OrderModel,
  ) {
    this.id = id;
    this.quantity = quantity;
    this.subtotal = subtotal;
    this.product = product;
    this.order = order;
  }
}

export default OrderDetailModel;
