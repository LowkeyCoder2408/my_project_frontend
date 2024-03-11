import ProductModel from './ProductModel';

class ProductDetailModel {
  id: number;
  name?: string;
  value?: string;
  product?: ProductModel;

  constructor(id: number, name: string, value: string, product: ProductModel) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.product = product;
  }
}

export default ProductDetailModel;
