import SettingModel from './SettingModel';

class SettingBagModel {
  listSettings: SettingModel[];

  constructor(listSettings: SettingModel[]) {
    this.listSettings = listSettings;
  }
}

export default SettingBagModel;
