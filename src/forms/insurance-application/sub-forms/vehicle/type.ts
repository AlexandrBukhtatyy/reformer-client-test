export type BodyType = 'sedan' | 'hatchback' | 'suv' | 'wagon' | 'coupe' | 'minivan' | 'pickup';
export type TransmissionType = 'manual' | 'automatic';
export type UsagePurpose = 'personal' | 'taxi' | 'learning' | 'other';

export interface VehicleData {
  vin: string;
  brand: string;
  model: string;
  year: number | undefined;
  mileage: number | undefined;
  enginePower: number | undefined;
  bodyType: BodyType;
  transmission: TransmissionType;
  marketValue: number | undefined;
  licensePlate: string;
  registrationCertificate: string;
  hasAntiTheft: boolean;
  antiTheftBrand: string;
  garageParking: boolean;
  usagePurpose: UsagePurpose;
}
