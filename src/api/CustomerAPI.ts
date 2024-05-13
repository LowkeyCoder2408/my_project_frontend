import CustomerModel from '../models/CustomerModel';
import { backendEndpoint } from '../utils/Constant';
import { myRequest } from './MyRequest';

async function getCustomer(endpoint: string): Promise<CustomerModel> {
  const response = await myRequest(endpoint);
  return response;
}

export async function getAllCustomers(): Promise<CustomerModel[]> {
  try {
    // Xác định endpoint để lấy tất cả khách hàng
    const endpoint: string = backendEndpoint + '/customer';

    // Gửi yêu cầu đến endpoint và lấy dữ liệu trả về
    const response = await myRequest(endpoint);

    // Trích xuất danh sách khách hàng từ response
    const customers = response._embedded.customers;

    // Xử lý dữ liệu trả về thành mảng các đối tượng CustomerModel
    const allCustomers: CustomerModel[] = customers.map(
      (customer: CustomerModel) => {
        return customer;
      },
    );

    return allCustomers;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách khách hàng:', error);
    throw error;
  }
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

export async function getCustomerByOrderId(id: number): Promise<CustomerModel> {
  // Xác định endpoint
  const endpoint: string = backendEndpoint + `/order/${id}/customer`;

  return getCustomer(endpoint);
}

export async function getCustomerByReviewId(
  id: number,
): Promise<CustomerModel> {
  // Xác định endpoint
  const endpoint: string = backendEndpoint + `/review/${id}/customer`;

  return getCustomer(endpoint);
}

export async function findDistinctCustomers(): Promise<CustomerModel[]> {
  try {
    // Xác định endpoint
    const endpoint: string =
      backendEndpoint + '/order/search/findDistinctCustomers';

    // Gửi yêu cầu đến endpoint và lấy dữ liệu trả về
    const response = await myRequest(endpoint);

    // Trích xuất danh sách khách hàng từ response
    const customers = response._embedded.customers;

    // Xử lý dữ liệu trả về thành mảng các đối tượng CustomerModel
    const distinctCustomers: CustomerModel[] = customers.map(
      (customer: CustomerModel) => {
        return customer;
      },
    );

    return distinctCustomers;
  } catch (error) {
    console.error('Lỗi khi tìm khách hàng duy nhất:', error);
    throw error;
  }
}
