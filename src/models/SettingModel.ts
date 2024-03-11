import SettingCategory from './SettingCategory';

class SettingModel {
  key: string;
  value?: string;
  category?: SettingCategory;

  constructor(key: string, value: string, category: SettingCategory) {
    this.key = key;
    this.value = value;
    this.category = category;
  }
}

export default SettingModel;
