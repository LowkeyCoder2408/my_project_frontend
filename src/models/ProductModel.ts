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
  soldQuantity?: number;
  listedPrice?: number;
  currentPrice?: number;
  discountPercent?: number;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  operatingSystem?: string;
  mainImage?: string;
  categoryId: number;
  brandId: number;
  reviewCount?: number;
  ratingCount?: number;
  averageRating?: number;
  relatedImages: string[];

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
    soldQuantity: number,
    listedPrice: number,
    currentPrice: number,
    discountPercent: number,
    length: number,
    width: number,
    height: number,
    weight: number,
    operatingSystem: string,
    mainImage: string,
    categoryId: number,
    brandId: number,
    reviewCount: number,
    ratingCount: number,
    averageRating: number,
    relatedImages: string[],
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
    this.soldQuantity = soldQuantity;
    this.listedPrice = listedPrice;
    this.currentPrice = currentPrice;
    this.discountPercent = discountPercent;
    this.length = length;
    this.width = width;
    this.height = height;
    this.weight = weight;
    this.operatingSystem = operatingSystem;
    this.mainImage = mainImage;
    this.categoryId = categoryId;
    this.brandId = brandId;
    this.reviewCount = reviewCount;
    this.ratingCount = ratingCount;
    this.averageRating = averageRating;
    this.relatedImages = relatedImages;
  }
}

export default ProductModel;
