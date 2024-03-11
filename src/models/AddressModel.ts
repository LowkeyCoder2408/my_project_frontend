import CustomerModel from './CustomerModel';
import DistrictModel from './DistrictModel';
import ProvinceModel from './ProvinceModel';
import WardModel from './WardModel';

class AddressModel {
  id: number;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  addressLine?: string;
  province?: ProvinceModel;
  district?: DistrictModel;
  ward?: WardModel;
  customer?: CustomerModel;
  defaultForShipping?: boolean;

  constructor(
    id: number,
    fullName: string,
    phoneNumber: string,
    email: string,
    addressLine: string,
    province: ProvinceModel,
    district: DistrictModel,
    ward: WardModel,
    customer: CustomerModel,
    defaultForShipping: boolean,
  ) {
    this.id = id;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.addressLine = addressLine;
    this.province = province;
    this.district = district;
    this.ward = ward;
    this.customer = customer;
    this.defaultForShipping = defaultForShipping;
  }
}

export default AddressModel;
