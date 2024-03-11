import RoleModel from './RoleModel';

class UserModel {
  id: number;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  photos?: string;
  enabled?: boolean;
  role?: RoleModel;

  constructor(
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    photos: string,
    enabled: boolean,
    role: RoleModel,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.photos = photos;
    this.enabled = enabled;
    this.role = role;
  }
}

export default UserModel;
