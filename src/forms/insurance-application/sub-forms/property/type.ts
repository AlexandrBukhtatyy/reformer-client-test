export type PropertyType = 'apartment' | 'house' | 'townhouse' | 'cottage' | 'commercial';
export type WallMaterial = 'brick' | 'panel' | 'monolith' | 'wood' | 'block';

export interface PropertyData {
  propertyType: PropertyType;
  address: string;
  area: number | undefined;
  floor: number | undefined;
  totalFloors: number | undefined;
  buildYear: number | undefined;
  wallMaterial: WallMaterial;
  marketValue: number | undefined;
  cadastralNumber: string;
  hasAlarm: boolean;
  hasSprinkler: boolean;
  isRented: boolean;
}
