import DistrictModel from './DistrictModel';

class WardModel {
  id: number;
  district?: DistrictModel;
  name?: string;

  constructor(id: number, district: DistrictModel, name: string) {
    this.id = id;
    this.district = district;
    this.name = name;
  }
}

export default WardModel;
