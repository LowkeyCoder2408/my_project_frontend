import ProvinceModel from './ProvinceModel';
import WardModel from './WardModel';

class DistrictModel {
  id: number;
  province?: ProvinceModel;
  name?: string;
  wards?: WardModel[];

  constructor(
    id: number,
    province: ProvinceModel,
    name: string,
    wards: WardModel[],
  ) {
    this.id = id;
    this.province = province;
    this.name = name;
    this.wards = wards;
  }
}

export default DistrictModel;
