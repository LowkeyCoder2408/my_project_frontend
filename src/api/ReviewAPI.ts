import ReviewModel from '../models/ReviewModel';
import { myRequest } from './MyRequest';
import { backendEndpoint } from '../utils/Constant';
import { getProductByAlias } from './ProductAPI';

export async function getReview(endpoint: string): Promise<ReviewModel[]> {
  const response = await myRequest(endpoint);

  return response._embedded.reviews.map((reviewData: any) => ({
    ...reviewData,
  }));
}

export async function getAllReviewByProductId(
  id: number,
): Promise<ReviewModel[]> {
  // Xác định endpoint
  const endpoint: string =
    backendEndpoint + `/review/search/findByProduct_Id?productId=${id}`;

  return getReview(endpoint);
}

export async function getAllReviewByProductAlias(
  productAlias: string,
): Promise<ReviewModel[]> {
  try {
    // Lấy thông tin sản phẩm từ alias
    const product = await getProductByAlias(productAlias);

    // Nếu sản phẩm không tồn tại, trả về mảng rỗng
    if (!product) {
      console.error(`Không tìm thấy sản phẩm với alias ${productAlias}`);
      return [];
    }

    // Lấy tất cả hình ảnh của sản phẩm
    return getAllReviewByProductId(product.id);
  } catch (error) {
    console.error('Đã xảy ra lỗi khi lấy nhận xét:', error);
    return [];
  }
}

export async function getAllReviewByCustomerId(
  id: number,
): Promise<ReviewModel[]> {
  // Xác định endpoint
  const endpoint: string =
    backendEndpoint + `/review/search/findByProduct_Id?productId=${id}`;

  return getReview(endpoint);
}
