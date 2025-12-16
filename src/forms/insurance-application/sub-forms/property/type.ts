export type PropertyType = 'apartment' | 'house' | 'townhouse' | 'cottage' | 'commercial';
export type WallMaterial = 'brick' | 'panel' | 'monolith' | 'wood' | 'block';

export interface PropertyAddress {
  region: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
}

export interface PropertyCoverageOptions {
  structure: boolean;    // Конструктивные элементы
  interior: boolean;     // Внутренняя отделка
  movables: boolean;     // Движимое имущество
  liability: boolean;    // Гражданская ответственность
}

export interface PropertyData {
  propertyType: PropertyType;
  address: PropertyAddress;
  area: number | undefined;
  floor: number | undefined;
  totalFloors: number | undefined;
  buildYear: number | undefined;
  wallMaterial: WallMaterial;
  marketValue: number | undefined;
  cadastralNumber: string;
  hasAlarm: boolean;
  hasSprinkler: boolean;
  hasFireAlarm: boolean;
  isRented: boolean;
  ownershipDoc: string;
  coverageOptions: PropertyCoverageOptions;
}
