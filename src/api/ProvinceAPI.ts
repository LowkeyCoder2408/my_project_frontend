import DistrictModel from '../models/DistrictModel';
import ProvinceModel from '../models/ProvinceModel';
import { backendEndpoint } from '../utils/Constant';
import { myRequest } from './MyRequest';

export async function getProvince(endpoint: string): Promise<ProvinceModel[]> {
  const response = await myRequest(endpoint);

  const sortedProvinces = response._embedded.provinces.sort((a: any, b: any) =>
    a.name.localeCompare(b.name),
  );

  return sortedProvinces.map((provinceData: any) => ({
    ...provinceData,
  }));
}

export async function getAllProvince(): Promise<ProvinceModel[]> {
  // Xác định endpoint
  const endpoint: string = backendEndpoint + `/province?size=100`;

  return getProvince(endpoint);
}

export async function getProvinceById(
  id: number,
): Promise<ProvinceModel | null> {
  const url = backendEndpoint + `/province/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Gặp lỗi API');
    }
    const provinceData = await response.json();

    if (provinceData) {
      return {
        id: provinceData.id,
        name: provinceData.name,
        districts: provinceData.districts,
      };
    } else {
      throw new Error('Sản phẩm không tồn tại');
    }
  } catch (error) {
    console.error('Error', error);
    return null;
  }
}

export async function getProvinceByAddressId(
  addressId?: number,
): Promise<ProvinceModel | null> {
  const endpoint = backendEndpoint + `/address/${addressId}/province`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Gặp lỗi API');
    }
    const provinceData = await response.json();

    if (provinceData) {
      return {
        id: provinceData.id,
        name: provinceData.name,
        districts: provinceData.districts,
      };
    } else {
      throw new Error('Sản phẩm không tồn tại');
    }
  } catch (error) {
    console.error('Error', error);
    return null;
  }
}
