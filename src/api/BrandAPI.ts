import React from 'react';
import { backendEndpoint } from '../utils/Constant';
import BrandModel from '../models/BrandModel';
import { myRequest } from './MyRequest';
import CategoryModel from '../models/CategoryModel';
import { getProductByAlias } from './ProductAPI';

interface ResultInterface {
  brandList: BrandModel[];
  brand: BrandModel | null;
}

async function getBrands(url: string): Promise<ResultInterface> {
  const response = await myRequest(url);

  const brandList: any = response._embedded.brands.map((brand: any) => ({
    ...brand,
  }));

  return { brandList: brandList, brand: response.brand };
}

export async function getAllBrands(): Promise<ResultInterface> {
  const url: string = backendEndpoint + '/brand';
  return getBrands(url);
}

export async function getBrandById(id: number): Promise<BrandModel | null> {
  let result: BrandModel;
  const url = backendEndpoint + `/brand/search/findById?brandId=${id}`;
  try {
    // Gọi phương thức request()
    const response = await myRequest(url);

    // Kiểm tra xem dữ liệu url trả về có dữ liệu không
    if (response) {
      result = response;
      return result;
    } else {
      throw new Error('Thương hiệu không tồn tại');
    }
  } catch (error) {
    return null;
  }
}

export async function getBrandByProductId(
  id: number,
): Promise<ResultInterface> {
  const endpoint = backendEndpoint + `/product/${id}/brand`;
  return getBrands(endpoint);
}

export async function getBrandByAlias(
  productAlias: string,
): Promise<ResultInterface> {
  const product = await getProductByAlias(productAlias);
  if (!product) {
    console.error(`Không tìm thấy sản phẩm với alias ${productAlias}`);
    return { brandList: [], brand: null };
  }

  const endpoint = backendEndpoint + `/product/${product.id}/brand`;

  const response = await myRequest(endpoint);

  return { brand: response, brandList: response };
}
