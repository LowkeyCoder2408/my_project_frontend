import CustomerModel from './CustomerModel';
import ProductModel from './ProductModel';

class ReviewModel {
  id: number;
  comment: string;
  rating: number;
  reviewTime: Date;
  product: ProductModel;
  customer: CustomerModel;

  constructor(
    id: number,
    comment: string,
    rating: number,
    reviewTime: Date,
    product: ProductModel,
    customer: CustomerModel,
  ) {
    this.id = id;
    this.comment = comment;
    this.rating = rating;
    this.reviewTime = reviewTime;
    this.product = product;
    this.customer = customer;
  }
}

export default ReviewModel;
