import {
  findProductsByCategoryId,
  getTotalProductQuantity,
} from '../../api/ProductAPI';

export const backendEndpoint: string = 'http://localhost:8080';

export const quantityOfCategory = async (
  categoryId: number,
): Promise<number> => {
  try {
    const products = await findProductsByCategoryId(categoryId);
    const totalProducts = getTotalProductQuantity(products.result);
    return totalProducts;
  } catch (error) {
    console.error('Error calculating total products by category:', error);
    return 0;
  }
};
