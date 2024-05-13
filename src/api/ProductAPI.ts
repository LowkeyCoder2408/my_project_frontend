import React from 'react';
import { backendEndpoint } from '../utils/Constant';
import ProductModel from '../models/ProductModel';
import { myRequest } from './MyRequest';

interface ResultInterface {
  result: ProductModel[];
  numberOfPage: number;
  numberOfProduct: number;
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
      soldQuantity: responseData[key].soldQuantity,
      listedPrice: responseData[key].listedPrice,
      currentPrice: responseData[key].currentPrice,
      discountPercent: responseData[key].discountPercent,
      length: responseData[key].length,
      width: responseData[key].width,
      height: responseData[key].height,
      weight: responseData[key].weight,
      operatingSystem: responseData[key].operatingSystem,
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
  };
}

export async function getAllProductsNoFilter(): Promise<ResultInterface> {
  const url = backendEndpoint + '/product?size=1000';
  return getProducts(url);
}

export async function getAllProducts(
  numberOfProductPerPage: number,
  page: number,
  filter: number,
  minPrice: number,
  maxPrice: number,
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
    filterEndpoint = `sort=discountPercent,desc`;
  } else if (filter === 6) {
    filterEndpoint = `sort=discountPercent,asc`;
  }

  const url: string =
    backendEndpoint +
    `/product/search/findByCurrentPriceBetween?minPrice=${minPrice}&maxPrice=${maxPrice}&size=${numberOfProductPerPage}&page=${page}` +
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
  minPrice: number,
  maxPrice: number,
): Promise<ResultInterface> {
  if (keyword) {
    keyword = keyword.trim();
  }

  const optionToDisplay = `size=${numberOfProductPerPage}&page=${page}`;

  let url =
    backendEndpoint +
    `/product/search/findByCurrentPriceBetween?minPrice=${minPrice}&maxPrice=${maxPrice}&` +
    optionToDisplay;
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
    filterEndpoint = `sort=discountPercent,desc`;
  } else if (filter === 6) {
    filterEndpoint = `sort=discountPercent,asc`;
  }

  if (keyword !== '' && categoryIdNumber === 0) {
    url =
      backendEndpoint +
      `/product/search/findByNameContainingAndCurrentPriceBetween?` +
      optionToDisplay +
      `&productName=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}` +
      '&' +
      filterEndpoint;
  } else if (keyword === '' && categoryIdNumber > 0) {
    url =
      backendEndpoint +
      `/product/search/findByCategory_IdAndCurrentPriceBetween?` +
      optionToDisplay +
      `&categoryId=${categoryIdNumber}&minPrice=${minPrice}&maxPrice=${maxPrice}` +
      '&' +
      filterEndpoint;
  } else {
    url =
      backendEndpoint +
      `/product/search/findByNameContainingAndCategory_IdAndCurrentPriceBetween?` +
      optionToDisplay +
      `&categoryId=${categoryIdNumber}&productName=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}` +
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
        soldQuantity: productData.soldQuantity,
        listedPrice: productData.listedPrice,
        currentPrice: productData.currentPrice,
        discountPercent: productData.discountPercent,
        length: productData.length,
        width: productData.width,
        height: productData.height,
        weight: productData.weight,
        operatingSystem: productData.operatingSystem,
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
        soldQuantity: productData.soldQuantity,
        listedPrice: productData.listedPrice,
        currentPrice: productData.currentPrice,
        discountPercent: productData.discountPercent,
        length: productData.length,
        width: productData.width,
        height: productData.height,
        weight: productData.weight,
        operatingSystem: productData.operatingSystem,
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

export async function getNewestProducts(
  numberOfProduct: number,
): Promise<ResultInterface> {
  const url: string =
    backendEndpoint + `/product?sort=id,desc&size=${numberOfProduct}`;

  return getProducts(url);
}

export async function getHottestProducts(
  numberOfProduct: number,
): Promise<ResultInterface> {
  const url: string =
    backendEndpoint +
    `/product?sort=averageRating,desc&size=${numberOfProduct}`;

  return getProducts(url);
}

export async function getDealProducts(
  numberOfProduct: number,
): Promise<ResultInterface> {
  const url: string =
    backendEndpoint +
    `/product/search/findProductsByPriceDifferencePrice?size=${numberOfProduct}`;

  return getProducts(url);
}

// http://localhost:8080/product/search/findByBrand_Id?brandId=12

export async function findProductsByBrandId(
  brandId: number,
): Promise<ResultInterface> {
  const url = `${backendEndpoint}/product/search/findByBrand_Id?brandId=${brandId}`;

  return getProducts(url);
}

export async function findProductsByCategoryId(
  categoryId: number,
): Promise<ResultInterface> {
  const url = `${backendEndpoint}/product/search/findByCategory_Id?categoryId=${categoryId}&size=1000`;

  return getProducts(url);
}

export function getTotalProductQuantity(products: ProductModel[]): number {
  let totalQuantity = 0;
  for (const product of products) {
    if (product.quantity) {
      totalQuantity += product.quantity;
    }
  }
  return totalQuantity;
}

export async function getTopSoldProducts(
  numberOfProduct: number,
): Promise<ResultInterface> {
  const url: string =
    backendEndpoint + `/product?sort=soldQuantity,desc&size=${numberOfProduct}`;

  return getProducts(url);
}

export async function getProductByCartItemId(
  idCart: number,
): Promise<ProductModel | null> {
  const endpoint = backendEndpoint + `/cart-item/${idCart}/product`;

  try {
    // Gọi phương thức request()
    const response = await myRequest(endpoint);

    // Kiểm tra xem dữ liệu endpoint trả về có dữ liệu không
    if (response) {
      // Trả về sản phẩm
      return response;
    } else {
      throw new Error('Sản phẩm không tồn tại');
    }
  } catch (error) {
    console.error('Error: ', error);
    return null;
  }
}

export async function getProductByReviewId(
  id: number,
): Promise<ProductModel | null> {
  const endpoint = backendEndpoint + `/review/${id}/product`;

  try {
    // Gọi phương thức request()
    const response = await myRequest(endpoint);

    // Kiểm tra xem dữ liệu endpoint trả về có dữ liệu không
    if (response) {
      // Trả về sản phẩm
      return response;
    } else {
      throw new Error('Sản phẩm không tồn tại');
    }
  } catch (error) {
    console.error('Error: ', error);
    return null;
  }
}

export async function getProductByOrderDetailId(
  id: number,
): Promise<ProductModel | null> {
  const endpoint = backendEndpoint + `/order-detail/${id}/product`;

  try {
    // Gọi phương thức request()
    const response = await myRequest(endpoint);

    // Kiểm tra xem dữ liệu endpoint trả về có dữ liệu không
    if (response) {
      // Trả về sản phẩm
      return response;
    } else {
      throw new Error('Sản phẩm không tồn tại');
    }
  } catch (error) {
    console.error('Error: ', error);
    return null;
  }
}

export async function getProductByFavoriteProductId(
  id: number,
): Promise<ProductModel | null> {
  const endpoint = backendEndpoint + `/favorite-product/${id}/product`;

  try {
    // Gọi phương thức request()
    const response = await myRequest(endpoint);

    // Kiểm tra xem dữ liệu endpoint trả về có dữ liệu không
    if (response) {
      // Trả về sản phẩm
      return response;
    } else {
      throw new Error('Sản phẩm không tồn tại');
    }
  } catch (error) {
    console.error('Error: ', error);
    return null;
  }
}
