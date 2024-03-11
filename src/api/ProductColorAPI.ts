import { myRequest } from './MyRequest';
import { backendEndpoint } from '../utils/Constant';
import { getProductByAlias } from './ProductAPI';
import ProductColorModel from '../models/ProductColorModel';

export async function getProductColor(
  endpoint: string,
): Promise<ProductColorModel[]> {
  const response = await myRequest(endpoint);

  return response._embedded.productColors.map((colorData: any) => ({
    ...colorData,
  }));
}

export async function getAllColorByProduct(
  id: number,
): Promise<ProductColorModel[]> {
  // Xác định endpoint
  const endpoint: string = backendEndpoint + `/product/${id}/colors`;

  return getProductColor(endpoint);
}

export async function getAllColorByAlias(
  productAlias: string,
): Promise<ProductColorModel[]> {
  try {
    // Lấy thông tin sản phẩm từ alias
    const product = await getProductByAlias(productAlias);

    // Nếu sản phẩm không tồn tại, trả về mảng rỗng
    if (!product) {
      console.error(`Không tìm thấy sản phẩm với alias ${productAlias}`);
      return [];
    }

    // Lấy tất cả màu của sản phẩm
    return getAllColorByProduct(product.id);
  } catch (error) {
    console.error('Đã xảy ra lỗi khi lấy màu:', error);
    return [];
  }
}
