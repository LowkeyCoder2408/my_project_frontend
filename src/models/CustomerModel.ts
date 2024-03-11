import AuthenticationType from './AuthenticationType';

class CustomerModel {
  id: number;
  email?: string;
  password?: string;
  fullName?: string;
  phoneNumber?: string;
  verificationCode?: string;
  resetPasswordToken?: string;
  enabled?: boolean;
  createdTime?: Date;
  authenticationType?: AuthenticationType;

  constructor(
    id: number,
    email: string,
    password: string,
    fullName: string,
    phoneNumber: string,
    enabled: boolean,
    authenticationType: AuthenticationType,
    verificationCode: string,
    resetPasswordToken: string,
    createdTime: Date,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.enabled = enabled;
    this.authenticationType = authenticationType;
    this.verificationCode = verificationCode;
    this.resetPasswordToken = resetPasswordToken;
    this.createdTime = createdTime;
  }
}

export default CustomerModel;
