import BrandModel from './BrandModel';
import CategoryModel from './CategoryModel';
import ProductDetailModel from './ProductDetailModel';
import ProductImageModel from './ProductImageModel';

class ProductModel {
  id: number;
  name?: string;
  alias?: string;
  shortDescription?: string;
  fullDescription?: string;
  createdTime?: Date;
  updatedTime?: Date;
  enabled?: boolean;
  quantity?: number;
  listedPrice?: number;
  currentPrice?: number;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  mainImage?: string;
  categoryId: number;
  brandId: number;
  reviewCount?: number;
  ratingCount?: number;
  averageRating?: number;

  constructor(
    id: number,
    name: string,
    alias: string,
    shortDescription: string,
    fullDescription: string,
    createdTime: Date,
    updatedTime: Date,
    enabled: boolean,
    quantity: number,
    listedPrice: number,
    currentPrice: number,
    length: number,
    width: number,
    height: number,
    weight: number,
    mainImage: string,
    categoryId: number,
    brandId: number,
    reviewCount: number,
    ratingCount: number,
    averageRating: number,
  ) {
    this.id = id;
    this.name = name;
    this.alias = alias;
    this.shortDescription = shortDescription;
    this.fullDescription = fullDescription;
    this.createdTime = createdTime;
    this.updatedTime = updatedTime;
    this.enabled = enabled;
    this.quantity = quantity;
    this.listedPrice = listedPrice;
    this.currentPrice = currentPrice;
    this.length = length;
    this.width = width;
    this.height = height;
    this.weight = weight;
    this.mainImage = mainImage;
    this.categoryId = categoryId;
    this.brandId = brandId;
    this.reviewCount = reviewCount;
    this.ratingCount = ratingCount;
    this.averageRating = averageRating;
  }
}

export default ProductModel;
