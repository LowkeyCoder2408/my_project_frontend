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
  category?: CategoryModel;
  brand?: BrandModel;
  images?: ProductImageModel[];
  details?: ProductDetailModel[];
  reviewCount?: number;
  ratingCount?: number;
  averageRating?: number;
  customerCanReview?: boolean;
  reviewByCustomer?: boolean;

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
    category: CategoryModel,
    brand: BrandModel,
    images: ProductImageModel[],
    details: ProductDetailModel[],
    reviewCount: number,
    ratingCount: number,
    averageRating: number,
    customerCanReview: boolean,
    reviewByCustomer: boolean,
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
    this.category = category;
    this.brand = brand;
    this.images = images;
    this.details = details;
    this.reviewCount = reviewCount;
    this.ratingCount = ratingCount;
    this.averageRating = averageRating;
    this.customerCanReview = customerCanReview;
    this.reviewByCustomer = reviewByCustomer;
  }
}

export default ProductModel;
