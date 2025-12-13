// Insurance Application Form Type Definitions

// =====================
// Enum Types
// =====================
export type InsuranceType = 'casco' | 'osago' | 'property' | 'life' | 'travel';
export type InsuredType = 'individual' | 'company';
export type PaymentType = 'single' | 'installments';
export type Gender = 'male' | 'female';
export type BodyType = 'sedan' | 'hatchback' | 'suv' | 'wagon' | 'coupe' | 'minivan' | 'pickup';
export type Transmission = 'manual' | 'automatic';
export type UsagePurpose = 'personal' | 'taxi' | 'education' | 'commercial';
export type PropertyType = 'apartment' | 'house' | 'townhouse' | 'commercial' | 'land';
export type WallMaterial = 'brick' | 'concrete' | 'wood' | 'panel' | 'monolith' | 'other';
export type TravelDestination = 'europe' | 'asia' | 'usa_canada' | 'cis' | 'worldwide';
export type TripPurpose = 'tourism' | 'business' | 'education' | 'work' | 'other';
export type Relationship = 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
export type ClaimType = 'accident' | 'theft' | 'damage' | 'natural_disaster' | 'medical' | 'other';
export type ReferralSource = 'internet' | 'friends' | 'tv' | 'agent' | 'other';

// =====================
// Nested Types
// =====================
export interface PersonalData {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  gender: Gender;
}

export interface CompanyData {
  name: string;
  inn: string;
  ogrn: string;
  kpp: string;
  ceoName: string;
}

export interface PassportData {
  series: string;
  number: string;
  issueDate: string;
  issuedBy: string;
}

export interface Vehicle {
  vin: string;
  brand: string;
  model: string;
  year: number | undefined;
  mileage: number | undefined;
  enginePower: number | undefined;
  bodyType: BodyType;
  transmission: Transmission;
  marketValue: number | undefined;
  licensePlate: string;
  registrationCert: string;
  hasAntiTheft: boolean;
  antiTheftBrand: string;
  garageParking: boolean;
  usagePurpose: UsagePurpose;
}

export interface PropertyAddress {
  region: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
}

export interface Property {
  type: PropertyType;
  address: PropertyAddress;
  area: number | undefined;
  floors: number | undefined;
  floor: number | undefined;
  yearBuilt: number | undefined;
  wallMaterial: WallMaterial;
  marketValue: number | undefined;
  hasAlarm: boolean;
  hasFireAlarm: boolean;
  ownershipDoc: string;
}

export interface PropertyCoverageOptions {
  structure: boolean;
  interior: boolean;
  movables: boolean;
  liability: boolean;
}

export interface Health {
  height: number | undefined;
  weight: number | undefined;
  bmi: number | undefined;
  bloodPressure: string;
  isSmoker: boolean;
  smokingYears: number | undefined;
  hasChronicDiseases: boolean;
  chronicDiseases: string;
  hadSurgeries: boolean;
  surgeries: string;
  occupation: string;
  isHighRiskJob: boolean;
  practicesSports: boolean;
  extremeSports: boolean;
}

export interface LifeCoverageOptions {
  death: boolean;
  disability: boolean;
  criticalIllness: boolean;
  accident: boolean;
}

export interface Travel {
  destination: TravelDestination;
  tripPurpose: TripPurpose;
  departureDate: string;
  returnDate: string;
  tripDuration: number | undefined;
  isMultipleTrips: boolean;
}

export interface TravelCoverageOptions {
  medical: boolean;
  baggage: boolean;
  tripCancellation: boolean;
  flightDelay: boolean;
  carRental: boolean;
}

export interface Traveler {
  fullName: string;
  birthDate: string;
  passportNumber: string;
}

export interface Driver {
  fullName: string;
  birthDate: string;
  licenseNumber: string;
  licenseIssueDate: string;
  drivingExperience: number | undefined;
  accidentsCount: number;
  isMainDriver: boolean;
}

export interface Beneficiary {
  fullName: string;
  birthDate: string;
  relationship: Relationship;
  share: number | undefined;
  phone: string;
}

export interface Claim {
  date: string;
  type: ClaimType;
  description: string;
  amount: number | undefined;
  atFault: boolean;
}

// =====================
// Main Form Type
// =====================
export interface InsuranceApplicationForm {
  // Step 1: Insurance Type and Basic Parameters
  insuranceType: InsuranceType;
  insurancePeriod: number;
  startDate: string;
  endDate: string; // computed
  coverageAmount: number | undefined;
  deductible: number | undefined;
  paymentType: PaymentType;
  installments: number | undefined;

  // Step 2: Policyholder Data
  insuredType: InsuredType;
  personalData: PersonalData;
  companyData: CompanyData;
  passportData: PassportData;
  phone: string;
  email: string;
  fullName: string; // computed
  age: number | undefined; // computed

  // Step 3: Insurance Object
  vehicle: Vehicle;
  property: Property;
  propertyCoverageOptions: PropertyCoverageOptions;
  health: Health;
  lifeCoverageOptions: LifeCoverageOptions;
  travel: Travel;
  travelCoverageOptions: TravelCoverageOptions;
  travelers: Traveler[];

  // Step 4: Drivers/Beneficiaries
  drivers: Driver[];
  unlimitedDrivers: boolean;
  minDriverAge: number | undefined; // computed
  minDriverExperience: number | undefined; // computed
  beneficiaries: Beneficiary[];
  totalBeneficiaryShare: number | undefined; // computed

  // Step 5: History
  hasPreviousInsurance: boolean;
  previousInsurer: string;
  previousPolicyNumber: string;
  previousPolicyEndDate: string;
  hadClaims: boolean;
  claims: Claim[];
  promoCode: string;
  referralSource: ReferralSource;
  agentCode: string;
  additionalNotes: string;

  // Step 6: Calculation and Confirmation
  basePremium: number | undefined; // computed
  ageCoefficient: number | undefined; // computed
  experienceCoefficient: number | undefined; // computed
  regionCoefficient: number | undefined; // computed
  claimsCoefficient: number | undefined; // computed
  deductibleDiscount: number | undefined; // computed
  promoDiscount: number | undefined; // computed
  multiPolicyDiscount: number | undefined; // computed
  totalPremium: number | undefined; // computed
  installmentAmount: number | undefined; // computed
  agreePersonalData: boolean;
  agreeTerms: boolean;
  agreeElectronicPolicy: boolean;
  agreeMarketing: boolean;
  confirmAccuracy: boolean;
  electronicSignature: string;
}
