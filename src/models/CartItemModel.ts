import CustomerModel from './CustomerModel';
import ProductModel from './ProductModel';

class CartItemModel {
  id?: number;
  customerId?: number;
  product: ProductModel;
  quantity?: number;

  constructor(product: ProductModel, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }
}

export default CartItemModel;
