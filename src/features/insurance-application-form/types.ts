// Insurance Application Form Types

// Enums
export type InsuranceType = 'casco' | 'osago' | 'property' | 'life' | 'travel';
export type InsuredType = 'individual' | 'corporate';
export type PaymentType = 'single' | 'installments';
export type VehicleBodyType = 'sedan' | 'hatchback' | 'suv' | 'wagon' | 'coupe' | 'minivan' | 'pickup';
export type VehicleTransmission = 'manual' | 'automatic';
export type VehicleUsagePurpose = 'personal' | 'taxi' | 'training' | 'commercial';
export type PropertyType = 'apartment' | 'house' | 'townhouse' | 'commercial' | 'land';
export type PropertyWallMaterial = 'brick' | 'concrete' | 'wood' | 'panel' | 'monolithic' | 'other';
export type TravelDestination = 'europe' | 'asia' | 'us-canada' | 'cis' | 'worldwide';
export type TravelTripPurpose = 'tourism' | 'business' | 'study' | 'work' | 'other';
export type ClaimType = 'accident' | 'theft' | 'damage' | 'natural-disaster' | 'medical' | 'other';
export type RelationshipType = 'spouse' | 'child' | 'parent' | 'sibling' | 'other';

// Nested Interfaces
export interface PersonalData {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  gender: 'male' | 'female';
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

export interface VehicleData {
  vin: string;
  brand: string;
 model: string;
  year: number;
  mileage: number;
  enginePower: number;
  bodyType: VehicleBodyType;
  transmission: VehicleTransmission;
  marketValue: number | undefined;
  licensePlate: string;
  registrationCert: string;
  hasAntiTheft: boolean;
  antiTheftBrand: string;
  garageParking: boolean;
 usagePurpose: VehicleUsagePurpose;
}

export interface PropertyAddress {
  region: string;
  city: string;
  street: string;
  house: string;
 apartment: string;
}

export interface PropertyData {
  type: PropertyType;
 address: PropertyAddress;
  area: number;
  floors: number;
  floor: number | undefined;
  yearBuilt: number;
  wallMaterial: PropertyWallMaterial;
  marketValue: number;
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

export interface HealthData {
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

export interface TravelData {
  destination: TravelDestination;
  tripPurpose: TravelTripPurpose;
  departureDate: string;
  returnDate: string;
  tripDuration: number | undefined;
  isMultipleTrips: boolean;
}

export interface Traveler {
  fullName: string;
  birthDate: string;
  passportNumber: string;
}

export interface TravelCoverageOptions {
  medical: boolean;
  baggage: boolean;
 tripCancellation: boolean;
  flightDelay: boolean;
  carRental: boolean;
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
  relationship: RelationshipType;
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

// Main Form Interface
export interface InsuranceApplicationForm {
  // Step 1: Insurance Type and Parameters
  insuranceType: InsuranceType;
  insurancePeriod: 3 | 6 | 12 | 24 | 36;
  startDate: string;
  endDate: string; // computed
  coverageAmount: number | undefined;
  deductible: number | undefined;
  paymentType: PaymentType;
  installments: number | undefined;

  // Step 2: Insured Data
 insuredType: InsuredType;
  personalData: PersonalData;
  companyData: CompanyData;
 passportData: PassportData;
  phone: string;
  email: string;
  fullName: string; // computed
  age: number | undefined; // computed

  // Step 3: Insurance Object - Vehicle (for casco/osago)
  vehicle: VehicleData;

  // Step 3: Insurance Object - Property
  property: PropertyData;
  propertyCoverageOptions: PropertyCoverageOptions;

  // Step 3: Insurance Object - Health (for life)
  health: HealthData;
  lifeCoverageOptions: LifeCoverageOptions;

  // Step 3: Insurance Object - Travel
  travel: TravelData;
  travelers: Traveler[];
  travelCoverageOptions: TravelCoverageOptions;

  // Step 4: Drivers and Beneficiaries
  drivers: Driver[];
  unlimitedDrivers: boolean;
  minDriverAge: number | undefined; // computed
  minDriverExperience: number | undefined; // computed
  beneficiaries: Beneficiary[];
  totalBeneficiaryShare: number | undefined; // computed

  // Step 5: History and Additional Info
  hasPreviousInsurance: boolean;
  previousInsurer: string;
  previousPolicyNumber: string;
  previousPolicyEndDate: string;
  hadClaims: boolean;
  claims: Claim[];
  promoCode: string;
  referralSource: 'internet' | 'friends' | 'tv' | 'agent' | 'other';
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