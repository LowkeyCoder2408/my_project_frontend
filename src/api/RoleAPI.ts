import RoleModel from '../models/RoleModel';
import { backendEndpoint } from '../utils/Constant';
import { myRequest } from './MyRequest';

interface ResultInterface {
  roleList: RoleModel[];
  role: RoleModel | null;
}

export async function getRoleByUserId(
  userId: number,
): Promise<ResultInterface> {
  const endpoint = backendEndpoint + `/user/${userId}/role`;
  const response = await myRequest(endpoint);
  return { role: response, roleList: response };
}
