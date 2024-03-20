import React from 'react';
import { backendEndpoint } from '../utils/Constant';
import ProductModel from '../models/ProductModel';
import { myRequest } from './MyRequest';

interface ResultInterface {
  result: ProductModel[];
  numberOfPage: number;
  numberOfProduct: number;
  url: string;
}

async function getProducts(url: string): Promise<ResultInterface> {
  const result: ProductModel[] = [];
  const response = await myRequest(url);
  // Get product json
  const responseData = response._embedded.products;

  const numberOfPage: number = response.page.totalPages;

  const numberOfProduct: number = response.page.totalElements;

  for (const key in responseData) {
    result.push({
      id: responseData[key].id,
      name: responseData[key].name,
      alias: responseData[key].alias,
      shortDescription: responseData[key].shortDescription,
      fullDescription: responseData[key].fullDescription,
      createdTime: new Date(responseData[key].createdTime),
      updatedTime: new Date(responseData[key].updatedTime),
      enabled: responseData[key].enabled,
      quantity: responseData[key].quantity,
      listedPrice: responseData[key].listedPrice,
      currentPrice: responseData[key].currentPrice,
      length: responseData[key].length,
      width: responseData[key].width,
      height: responseData[key].height,
      weight: responseData[key].weight,
      mainImage: responseData[key].mainImage,
      categoryId: responseData[key].categoryId,
      brandId: responseData[key].brandId,
      reviewCount: responseData[key].reviewCount,
      ratingCount: responseData[key].ratingCount,
      averageRating: responseData[key].averageRating,
    });
  }

  return {
    result: result,
    numberOfPage: numberOfPage,
    numberOfProduct: numberOfProduct,
    url: url,
  };
}

export async function getAllProducts(
  numberOfProductPerPage: number,
  page: number,
  filter: number,
): Promise<ResultInterface> {
  let filterEndpoint = '';
  if (filter === 1) {
    filterEndpoint = `sort=id,desc`;
  } else if (filter === 2) {
    filterEndpoint = `sort=id,asc`;
  } else if (filter === 3) {
    filterEndpoint = `sort=currentPrice,asc`;
  } else if (filter === 4) {
    filterEndpoint = `sort=currentPrice,desc`;
  } else if (filter === 5) {
    filterEndpoint = `sort=name,asc`;
  } else if (filter === 6) {
    filterEndpoint = `sort=name,desc`;
  }

  const url: string =
    backendEndpoint +
    `/product?size=${numberOfProductPerPage}&page=${page}` +
    '&' +
    filterEndpoint;

  return getProducts(url);
}

export async function findProducts(
  numberOfProductPerPage: number,
  keyword: string,
  categoryIdNumber: number,
  page: number,
  filter: number,
): Promise<ResultInterface> {
  if (keyword) {
    keyword = keyword.trim();
  }

  const optionToDisplay = `size=${numberOfProductPerPage}&page=${page}`;

  let url = backendEndpoint + `/product?` + optionToDisplay;
  let filterEndpoint = '';
  if (filter === 1) {
    filterEndpoint = `sort=id,desc`;
  } else if (filter === 2) {
    filterEndpoint = `sort=id,asc`;
  } else if (filter === 3) {
    filterEndpoint = `sort=currentPrice,asc`;
  } else if (filter === 4) {
    filterEndpoint = `sort=currentPrice,desc`;
  } else if (filter === 5) {
    filterEndpoint = `sort=name,asc`;
  } else if (filter === 6) {
    filterEndpoint = `sort=name,desc`;
  }

  if (keyword !== '' && categoryIdNumber === 0) {
    url =
      backendEndpoint +
      `/product/search/findByNameContaining?` +
      optionToDisplay +
      `&productName=${keyword}` +
      '&' +
      filterEndpoint;
  } else if (keyword === '' && categoryIdNumber > 0) {
    url =
      backendEndpoint +
      `/product/search/findByCategory_Id?` +
      optionToDisplay +
      `&categoryId=${categoryIdNumber}` +
      '&' +
      filterEndpoint;
  } else {
    url =
      backendEndpoint +
      `/product/search/findByNameContainingAndCategory_Id?` +
      optionToDisplay +
      `&categoryId=${categoryIdNumber}&productName=${keyword}` +
      '&' +
      filterEndpoint;
  }
  return getProducts(url);
}

export async function getProductById(
  productId: number,
): Promise<ProductModel | null> {
  const url = backendEndpoint + `/product/${productId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Gặp lỗi API');
    }
    const productData = await response.json();

    if (productData) {
      return {
        id: productData.id,
        name: productData.name,
        alias: productData.alias,
        shortDescription: productData.shortDescription,
        fullDescription: productData.fullDescription,
        createdTime: new Date(productData.createdTime),
        updatedTime: new Date(productData.updatedTime),
        enabled: productData.enabled,
        quantity: productData.quantity,
        listedPrice: productData.listedPrice,
        currentPrice: productData.currentPrice,
        length: productData.length,
        width: productData.width,
        height: productData.height,
        weight: productData.weight,
        mainImage: productData.mainImage,
        categoryId: productData.categoryId,
        brandId: productData.brandId,
        reviewCount: productData.reviewCount,
        ratingCount: productData.ratingCount,
        averageRating: productData.averageRating,
      };
    } else {
      throw new Error('Sản phẩm không tồn tại');
    }
  } catch (error) {
    console.error('Error', error);
    return null;
  }
}

export async function getProductByAlias(
  productAlias: string,
): Promise<ProductModel | null> {
  const url =
    backendEndpoint +
    `/product/search/findByAlias?productAlias=${productAlias}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Gặp lỗi API: ${url}`);
    }
    const productData = await response.json();
    if (productData) {
      return {
        id: productData.id,
        name: productData.name,
        alias: productData.alias,
        shortDescription: productData.shortDescription,
        fullDescription: productData.fullDescription,
        createdTime: new Date(productData.createdTime),
        updatedTime: new Date(productData.updatedTime),
        enabled: productData.enabled,
        quantity: productData.quantity,
        listedPrice: productData.listedPrice,
        currentPrice: productData.currentPrice,
        length: productData.length,
        width: productData.width,
        height: productData.height,
        weight: productData.weight,
        mainImage: productData.mainImage,
        categoryId: productData.categoryId,
        brandId: productData.brandId,
        reviewCount: productData.reviewCount,
        ratingCount: productData.ratingCount,
        averageRating: productData.averageRating,
      };
    } else {
      throw new Error('Sản phẩm không tồn tại');
    }
  } catch (error) {
    console.log('Damn,', error);
    return null;
  }
}
