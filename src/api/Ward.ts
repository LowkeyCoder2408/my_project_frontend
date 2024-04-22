import WardModel from '../models/WardModel';
import { backendEndpoint } from '../utils/Constant';
import { myRequest } from './MyRequest';

export async function getWard(endpoint: string): Promise<WardModel[]> {
  const response = await myRequest(endpoint);

  const sortedWards = response._embedded.wards.sort((a: any, b: any) =>
    a.name.localeCompare(b.name),
  );

  return sortedWards.map((wardData: any) => ({
    ...wardData,
  }));
}

export async function getAllWardsByDistrictId(
  id: number | null,
): Promise<WardModel[]> {
  // Xác định endpoint
  const endpoint: string = backendEndpoint + `/district/${id}/wards?size=1000`;

  return getWard(endpoint);
}
