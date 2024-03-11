import BrandModel from './BrandModel';

class CategoryModel {
  id: number;
  name?: string;
  image?: string;
  enabled?: boolean;
  brands?: BrandModel[];

  constructor(
    id: number,
    name: string,
    image: string,
    enabled: boolean,
    brands: BrandModel[],
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.enabled = enabled;
    this.brands = brands;
  }
}

export default CategoryModel;
