import CustomerModel from './CustomerModel';
import ProductModel from './ProductModel';

class FavoriteProductModel {
  id: number;
  product: ProductModel;
  customer: CustomerModel;

  constructor(id: number, product: ProductModel, customer: CustomerModel) {
    this.id = id;
    this.product = product;
    this.customer = customer;
  }
}

export default FavoriteProductModel;
