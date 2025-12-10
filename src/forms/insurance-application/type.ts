// Enums
export type InsuranceType = 'casco' | 'osago' | 'property' | 'life' | 'travel';
export type InsurancePeriod = 3 | 6 | 12 | 24 | 36;
export type PaymentType = 'single' | 'installments';
export type InsuredType = 'individual' | 'company';
export type Gender = 'male' | 'female';
export type VehicleBodyType = 'sedan' | 'hatchback' | 'suv' | 'wagon' | 'coupe' | 'minivan' | 'pickup';
export type VehicleTransmission = 'manual' | 'automatic';
export type VehicleUsagePurpose = 'personal' | 'taxi' | 'training' | 'commercial';
export type PropertyType = 'apartment' | 'house' | 'townhouse' | 'commercial' | 'land';
export type WallMaterial = 'brick' | 'concrete' | 'wood' | 'panel' | 'monolithic' | 'other';
export type TripPurpose = 'tourism' | 'business' | 'study' | 'work' | 'other';
export type TravelDestination = 'europe' | 'asia' | 'us-canada' | 'cis' | 'worldwide';
export type ClaimType = 'accident' | 'theft' | 'damage' | 'natural-disaster' | 'medical' | 'other';
export type Relationship = 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
export type ReferralSource = 'internet' | 'friend' | 'tv' | 'agent' | 'other';

// Nested interfaces
export interface PersonalData {
  lastName: string;
  firstName: string;
 middleName?: string;
  birthDate: string; // ISO date string
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
 issueDate: string; // ISO date string
  issuedBy: string;
}

export interface Vehicle {
  vin: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  enginePower: number;
  bodyType: VehicleBodyType;
  transmission: VehicleTransmission;
  marketValue?: number;
  licensePlate: string;
  registrationCert: string;
  hasAntiTheft: boolean;
  antiTheftBrand?: string;
  garageParking: boolean;
  usagePurpose: VehicleUsagePurpose;
}

export interface PropertyAddress {
  region: string;
  city: string;
  street: string;
  house: string;
 apartment?: string;
}

export interface Property {
  type: PropertyType;
  address: PropertyAddress;
  area: number;
  floors: number;
 floor?: number; // Only for apartments
  yearBuilt: number;
  wallMaterial: WallMaterial;
  marketValue: number;
  ownershipDoc: string;
}

export interface PropertyCoverageOptions {
  structure: boolean;
  interior: boolean;
  movables: boolean;
  liability: boolean;
}

export interface HealthData {
 height: number;
 weight: number;
  bmi: number; // Computed
  bloodPressure?: string;
  isSmoker: boolean;
  smokingYears?: number;
  hasChronicDiseases: boolean;
  chronicDiseases?: string;
  hadSurgeries: boolean;
  surgeries?: string;
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
  departureDate: string; // ISO date string
  returnDate: string; // ISO date string
  tripDuration: number; // Computed
  isMultipleTrips: boolean;
}

export interface Traveler {
  fullName: string;
  birthDate: string; // ISO date string
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
  birthDate: string; // ISO date string
  licenseNumber: string;
  licenseIssueDate: string; // ISO date string
  drivingExperience: number; // Computed
  accidentsCount: number;
 isMainDriver: boolean;
}

export interface Beneficiary {
  fullName: string;
  birthDate: string; // ISO date string
  relationship: Relationship;
 share: number;
  phone: string;
}

export interface Claim {
  date: string; // ISO date string
  type: ClaimType;
  description: string;
 amount: number;
 atFault: boolean;
}

// Main form interface
export interface InsuranceApplicationForm {
  // Step 1: Insurance Type and Parameters
  insuranceType: InsuranceType;
  insurancePeriod: InsurancePeriod;
  startDate: string; // ISO date string
  endDate: string; // Computed: startDate + insurancePeriod months
  coverageAmount: number;
 deductible?: number;
  paymentType: PaymentType;
  installments?: number;

  // Step 2: Insured Person Data
  insuredType: InsuredType;
  personalData: PersonalData;
  companyData: CompanyData;
  passportData: PassportData;
  phone: string;
  email: string;
  fullName: string; // Computed: lastName + firstName + middleName
  age: number; // Computed: from birthDate

  // Step 3: Insurance Object (depends on insuranceType)
 // Vehicle fields (for casco/osago)
  vehicle: Vehicle;
  // Property fields (for property)
  property: Property;
  propertyCoverageOptions: PropertyCoverageOptions;
  // Health fields (for life)
 health: HealthData;
 lifeCoverageOptions: LifeCoverageOptions;
  // Travel fields (for travel)
  travel: Travel;
  travelers: Traveler[];
  travelCoverageOptions: TravelCoverageOptions;

  // Step 4: Drivers/Beneficiaries (depends on insuranceType)
  drivers: Driver[];
  unlimitedDrivers: boolean;
 minDriverAge: number; // Computed
  minDriverExperience: number; // Computed
 beneficiaries: Beneficiary[];
  totalBeneficiaryShare: number; // Computed

  // Step 5: History and Additional Info
  hasPreviousInsurance: boolean;
 previousInsurer: string;
  previousPolicyNumber: string;
 previousPolicyEndDate: string; // ISO date string
  hadClaims: boolean;
  claims: Claim[];
  promoCode: string;
  referralSource: ReferralSource;
  agentCode: string;
  additionalNotes: string;

  // Step 6: Calculation and Confirmation
  // Computed premium fields
  basePremium: number;
  ageCoefficient: number;
  experienceCoefficient: number;
  regionCoefficient: number;
  claimsCoefficient: number;
  deductibleDiscount: number;
  promoDiscount: number;
  multiPolicyDiscount: number;
  totalPremium: number;
  installmentAmount: number;

  // Confirmation fields
  agreePersonalData: boolean;
 agreeTerms: boolean;
  agreeElectronicPolicy: boolean;
  agreeMarketing: boolean;
  confirmAccuracy: boolean;
  electronicSignature: string;
}