import AddressModel from '../models/AddressModel';
import { backendEndpoint } from '../utils/Constant';
import { myRequest } from './MyRequest';

export async function getAddress(endpoint: string): Promise<AddressModel[]> {
  const response = await myRequest(endpoint);

  const addressDatas = response._embedded.addresses;

  return addressDatas.map((addressData: any) => ({
    ...addressData,
  }));
}

export async function getAddressByIdUser(
  idUser: number,
): Promise<AddressModel[]> {
  const endpoint =
    backendEndpoint + `/address/search/findByCustomer_Id?customerId=${idUser}`;
  return getAddress(endpoint);
}
