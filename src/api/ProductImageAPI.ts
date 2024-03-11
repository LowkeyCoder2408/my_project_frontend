import ProductImageModel from '../models/ProductImageModel';
import { myRequest } from './MyRequest';
import { backendEndpoint } from '../utils/Constant';
import { getProductByAlias } from './ProductAPI';

export async function getProductImage(
  endpoint: string,
): Promise<ProductImageModel[]> {
  const response = await myRequest(endpoint);

  return response._embedded.productImages.map((imageData: any) => ({
    ...imageData,
  }));
}

export async function getAllImageByProduct(
  id: number,
): Promise<ProductImageModel[]> {
  // Xác định endpoint
  const endpoint: string = backendEndpoint + `/product/${id}/images`;

  return getProductImage(endpoint);
}

export async function getAllImageByAlias(
  productAlias: string,
): Promise<ProductImageModel[]> {
  try {
    // Lấy thông tin sản phẩm từ alias
    const product = await getProductByAlias(productAlias);

    // Nếu sản phẩm không tồn tại, trả về mảng rỗng
    if (!product) {
      console.error(`Không tìm thấy sản phẩm với alias ${productAlias}`);
      return [];
    }

    // Lấy tất cả hình ảnh của sản phẩm
    return getAllImageByProduct(product.id);
  } catch (error) {
    console.error('Đã xảy ra lỗi khi lấy hình ảnh:', error);
    return [];
  }
}
