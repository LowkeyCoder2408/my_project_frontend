import FavoriteProductModel from '../models/FavoriteProductModel';
import { backendEndpoint } from '../utils/Constant';
import { myRequest } from './MyRequest';

interface ResultInterface {
  favoriteProductList: FavoriteProductModel[];
  favoriteProduct: FavoriteProductModel | null;
}

async function getFavoriteProducts(url: string): Promise<ResultInterface> {
  const response = await myRequest(url);

  const favoriteProductList: any = response._embedded.favoriteProducts.map(
    (favoriteProduct: any) => ({
      ...favoriteProduct,
    }),
  );
  return {
    favoriteProductList: favoriteProductList,
    favoriteProduct: response.favoriteProduct,
  };
}

export async function getAllFavoriteProducts(): Promise<ResultInterface> {
  const url: string = backendEndpoint + '/favorite-product';

  return getFavoriteProducts(url);
}

export async function getFavoriteProductsByCustomerId(
  id: number,
): Promise<ResultInterface> {
  const endpoint =
    backendEndpoint +
    `/favorite-product/search/findByCustomer_Id?customerId=${id}`;
  return getFavoriteProducts(endpoint);
}
