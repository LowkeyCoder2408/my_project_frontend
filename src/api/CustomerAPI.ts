import CustomerModel from '../models/CustomerModel';
import { backendEndpoint } from '../utils/Constant';
import { myRequest } from './MyRequest';

async function getCustomer(endpoint: string): Promise<CustomerModel> {
  const response = await myRequest(endpoint);
  return response;
}

export async function getCustomerById(id: any): Promise<CustomerModel> {
  const endpoint = backendEndpoint + `/customer/${id}`;
  const responseCustomer = await myRequest(endpoint);
  //   const responseRole = await getRoleByIdCustomer(id);

  const customer: CustomerModel = {
    id: responseCustomer.id,
    email: responseCustomer.email,
    password: responseCustomer.password,
    fullName: responseCustomer.fullName,
    phoneNumber: responseCustomer.phoneNumber,
    avatar: responseCustomer.avatar,
    enabled: responseCustomer.enabled,
    authenticationType: responseCustomer.authenticationType,
    verificationCode: responseCustomer.verificationCode,
    resetPasswordToken: responseCustomer.resetPasswordToken,
    createdTime: responseCustomer.createdTime,
  };

  return customer;
}

export async function getCustomerByReviewId(
  id: number,
): Promise<CustomerModel> {
  // Xác định endpoint
  const endpoint: string = backendEndpoint + `/review/${id}/customer`;

  return getCustomerById(endpoint);
}

export async function getCustomerByOrderId(id: number): Promise<CustomerModel> {
  // Xác định endpoint
  const endpoint: string = backendEndpoint + `/order/${id}/customer`;

  return getCustomer(endpoint);
}
