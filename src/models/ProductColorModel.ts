import ProductModel from './ProductModel';

class ProductColorModel {
  id: number;
  name?: string;
  colorCode?: string;
  products?: ProductModel[];

  constructor(
    id: number,
    name: string,
    colorCode: string,
    products: ProductModel[],
  ) {
    this.id = id;
    this.name = name;
    this.colorCode = colorCode;
    this.products = products;
  }
}

export default ProductColorModel;
