import React from 'react';
import { backendEndpoint } from '../utils/Constant';
import CategoryModel from '../models/CategoryModel';
import { myRequest } from './MyRequest';
import { getProductByAlias } from './ProductAPI';

interface ResultInterface {
  categoryList: CategoryModel[];
  category: CategoryModel | null;
}

async function getCategories(url: string): Promise<ResultInterface> {
  const response = await myRequest(url);

  const categoryList: any = response._embedded.categories.map(
    (category: any) => ({
      ...category,
    }),
  );
  return { categoryList: categoryList, category: response.category };
}

export async function getAllCategories(): Promise<ResultInterface> {
  const url: string = backendEndpoint + '/category';

  return getCategories(url);
}

// export async function getCategoryByAlias(id: number): Promise<ResultInterface> {
//   const endpoint = backendEndpoint + `/product/${id}/category`;
//   return getCategories(endpoint);
// }

export async function getCategoryByProductId(
  id: number,
): Promise<ResultInterface> {
  const endpoint = backendEndpoint + `/product/${id}/category`;
  return getCategories(endpoint);
}

export async function getCategoryByProductAlias(
  productAlias: string,
): Promise<ResultInterface> {
  const product = await getProductByAlias(productAlias);
  if (!product) {
    console.error(`Không tìm thấy sản phẩm với alias ${productAlias}`);
    return { categoryList: [], category: null };
  }

  const endpoint = backendEndpoint + `/product/${product.id}/category`;

  const response = await myRequest(endpoint);

  return { category: response, categoryList: response };
}
