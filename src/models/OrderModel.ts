import CustomerModel from './CustomerModel';
import OrderDetailModel from './OrderDetailModel';
import OrderStatus from './OrderStatus';
import OrderTrackModel from './OrderTrackModel';
import PaymentMethod from './PaymentMethod';

class OrderModel {
  id: number;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  addressLine?: string;
  province?: string;
  district?: string;
  ward?: string;
  orderTime?: Date;
  total?: number;
  paymentMethod?: PaymentMethod;
  status?: OrderStatus;
  customer?: CustomerModel;
  orderDetails?: OrderDetailModel[];
  orderTracks?: OrderTrackModel[];
  note?: string;

  constructor(
    id: number,
    fullName: string,
    phoneNumber: string,
    email: string,
    addressLine: string,
    province: string,
    district: string,
    ward: string,
    orderTime: Date,
    total: number,
    paymentMethod: PaymentMethod,
    status: OrderStatus,
    customer: CustomerModel,
    orderDetails: OrderDetailModel[],
    orderTracks: OrderTrackModel[],
    note: string,
  ) {
    this.id = id;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.addressLine = addressLine;
    this.province = province;
    this.district = district;
    this.ward = ward;
    this.orderTime = orderTime;
    this.total = total;
    this.paymentMethod = paymentMethod;
    this.status = status;
    this.customer = customer;
    this.orderDetails = orderDetails;
    this.orderTracks = orderTracks;
    this.note = note;
  }
}

export default OrderModel;
