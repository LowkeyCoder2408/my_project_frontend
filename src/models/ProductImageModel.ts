import ProductModel from './ProductModel';

class ProductImageModel {
  id: number;
  name?: string;
  url?: string;
  product?: ProductModel;

  constructor(id: number, name: string, url: string, product: ProductModel) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.product = product;
  }
}

export default ProductImageModel;
