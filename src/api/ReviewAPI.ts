import ReviewModel from '../models/ReviewModel';
import { myRequest } from './MyRequest';
import { backendEndpoint } from '../utils/Constant';
import { getProductByAlias } from './ProductAPI';

interface ResultInterface {
  reviewList: ReviewModel[];
  review: ReviewModel | null;
}

export async function getReview(endpoint: string): Promise<ResultInterface> {
  const response = await myRequest(endpoint);

  const reviewList = response._embedded.reviews.map((reviewData: any) => ({
    ...reviewData,
  }));

  return { reviewList: reviewList, review: reviewList[0] };
}

export async function getAllReviewByProductId(
  id: number,
): Promise<ResultInterface> {
  // Xác định endpoint
  const endpoint: string =
    backendEndpoint + `/review/search/findByProduct_Id?productId=${id}`;

  return getReview(endpoint);
}

export async function getAllReviewByProductAlias(
  productAlias: string,
): Promise<ResultInterface> {
  try {
    // Lấy thông tin sản phẩm từ alias
    const product = await getProductByAlias(productAlias);

    // Nếu sản phẩm không tồn tại, trả về mảng rỗng
    if (!product) {
      console.error(`Không tìm thấy sản phẩm với alias ${productAlias}`);
      return { reviewList: [], review: null };
    }

    // Lấy tất cả hình ảnh của sản phẩm
    return getAllReviewByProductId(product.id);
  } catch (error) {
    console.error('Đã xảy ra lỗi khi lấy nhận xét:', error);
    return { reviewList: [], review: null };
  }
}

export async function getCustomerReviewByProduct(
  customerId?: number,
  productId?: number,
): Promise<ResultInterface> {
  // Xác định endpoint
  const endpoint: string =
    backendEndpoint +
    `/review/search/findByCustomer_IdAndProduct_Id?customerId=${customerId}&productId=${productId}`;

  return getReview(endpoint);
}
