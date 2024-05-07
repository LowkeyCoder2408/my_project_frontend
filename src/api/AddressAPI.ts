import AddressModel from '../models/AddressModel';
import { backendEndpoint } from '../utils/Constant';
import { myRequest } from './MyRequest';

interface ResultInterface {
  addressList: AddressModel[];
  address: AddressModel | null;
}

async function getAddresses(url: string): Promise<ResultInterface> {
  const response = await myRequest(url);

  const addressList: any = response._embedded.addresses.map((address: any) => ({
    ...address,
  }));

  return { addressList: addressList, address: addressList[0] };
}

export async function getAddressByIdUser(
  idUser: number,
): Promise<ResultInterface> {
  const endpoint =
    backendEndpoint + `/address/search/findByCustomer_Id?customerId=${idUser}`;
  return getAddresses(endpoint);
}

export async function getDefaultAddressByIdUser(
  idUser: number,
): Promise<ResultInterface> {
  const endpoint =
    backendEndpoint +
    `/address/search/findByIsDefaultAddressTrueAndCustomer_id?customerId=${idUser}`;
  return getAddresses(endpoint);
}
