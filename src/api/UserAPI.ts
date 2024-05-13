import UserModel from '../models/UserModel';
import { backendEndpoint } from '../utils/Constant';
import { myRequest } from './MyRequest';

async function getUser(endpoint: string): Promise<UserModel> {
  const response = await myRequest(endpoint);
  return response;
}

export async function getAllUsers(): Promise<UserModel[]> {
  try {
    // Xác định endpoint để lấy tất cả khách hàng
    const endpoint: string = backendEndpoint + '/user';

    // Gửi yêu cầu đến endpoint và lấy dữ liệu trả về
    const response = await myRequest(endpoint);

    // Trích xuất danh sách khách hàng từ response
    const users = response._embedded.users;

    // Xử lý dữ liệu trả về thành mảng các đối tượng UserModel
    const allUsers: UserModel[] = users.map((user: UserModel) => {
      return user;
    });

    return allUsers;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách khách hàng:', error);
    throw error;
  }
}

// export async function getUserById(id: any): Promise<UserModel> {
//   const endpoint = backendEndpoint + `/user/${id}`;
//   const responseUser = await myRequest(endpoint);
//   //   const responseRole = await getRoleByIdUser(id);

//   const user: UserModel = {
//     id: responseUser.id,
//     email: responseUser.email,
//     password: responseUser.password,
//     fullName: responseUser.fullName,
//     phoneNumber: responseUser.phoneNumber,
//     avatar: responseUser.avatar,
//     enabled: responseUser.enabled,
//     authenticationType: responseUser.authenticationType,
//     verificationCode: responseUser.verificationCode,
//     resetPasswordToken: responseUser.resetPasswordToken,
//     createdTime: responseUser.createdTime,
//   };

//   return user;
// }

// export async function getUserByOrderId(id: number): Promise<UserModel> {
//   // Xác định endpoint
//   const endpoint: string = backendEndpoint + `/order/${id}/user`;

//   return getUser(endpoint);
// }

// export async function getUserByReviewId(
//   id: number,
// ): Promise<UserModel> {
//   // Xác định endpoint
//   const endpoint: string = backendEndpoint + `/review/${id}/user`;

//   return getUser(endpoint);
// }

// export async function findDistinctUsers(): Promise<UserModel[]> {
//   try {
//     // Xác định endpoint
//     const endpoint: string =
//       backendEndpoint + '/order/search/findDistinctUsers';

//     // Gửi yêu cầu đến endpoint và lấy dữ liệu trả về
//     const response = await myRequest(endpoint);

//     // Trích xuất danh sách khách hàng từ response
//     const users = response._embedded.users;

//     // Xử lý dữ liệu trả về thành mảng các đối tượng UserModel
//     const distinctUsers: UserModel[] = users.map(
//       (user: UserModel) => {
//         return user;
//       },
//     );

//     return distinctUsers;
//   } catch (error) {
//     console.error('Lỗi khi tìm khách hàng duy nhất:', error);
//     throw error;
//   }
// }
