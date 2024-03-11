import CustomerModel from './CustomerModel';
import ProductModel from './ProductModel';

class CartItemModel {
  id: number;
  customer?: CustomerModel;
  product?: ProductModel;
  quantity?: number;

  constructor(
    id: number,
    customer: CustomerModel,
    product: ProductModel,
    quantity: number,
  ) {
    this.id = id;
    this.customer = customer;
    this.product = product;
    this.quantity = quantity;
  }
}

export default CartItemModel;
