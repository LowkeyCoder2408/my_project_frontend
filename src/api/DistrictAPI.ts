import DistrictModel from '../models/DistrictModel';
import ProvinceModel from '../models/ProvinceModel';
import { backendEndpoint } from '../utils/Constant';
import { myRequest } from './MyRequest';

export async function getDistrict(endpoint: string): Promise<DistrictModel[]> {
  const response = await myRequest(endpoint);

  const sortedDistricts = response._embedded.districts.sort((a: any, b: any) =>
    a.name.localeCompare(b.name),
  );

  return sortedDistricts.map((districtData: any) => ({
    ...districtData,
  }));
}

export async function getAllDistrictsByProvinceId(
  id: number | null,
): Promise<DistrictModel[]> {
  // Xác định endpoint
  const endpoint: string =
    backendEndpoint + `/province/${id}/districts?size=1000`;

  return getDistrict(endpoint);
}

export async function getDistrictById(
  id: number,
): Promise<DistrictModel | null> {
  const url = backendEndpoint + `/district/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Gặp lỗi API');
    }
    const districtData = await response.json();

    if (districtData) {
      return {
        id: districtData.id,
        name: districtData.name,
        province: districtData.province,
        wards: districtData.wards,
      };
    } else {
      throw new Error('Huyện không tồn tại');
    }
  } catch (error) {
    console.error('Error', error);
    return null;
  }
}
