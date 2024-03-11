import CategoryModel from './CategoryModel';

class BrandModel {
  id: number;
  name?: string;
  logo?: string;
  categories?: CategoryModel[];

  constructor(
    id: number,
    name: string,
    logo: string,
    categories: CategoryModel[],
  ) {
    this.id = id;
    this.name = name;
    this.logo = logo;
    this.categories = categories;
  }
}

export default BrandModel;
