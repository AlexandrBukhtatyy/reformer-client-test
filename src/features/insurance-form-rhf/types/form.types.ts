// Типы страхования
export type InsuranceType = 'casco' | 'osago' | 'property' | 'life' | 'travel';
export type InsuredType = 'individual' | 'corporate';
export type PaymentType = 'single' | 'installments';
export type Gender = 'male' | 'female';

// Типы для транспорта
export type BodyType = 'sedan' | 'hatchback' | 'suv' | 'wagon' | 'coupe' | 'minivan' | 'pickup';
export type Transmission = 'manual' | 'automatic';
export type UsagePurpose = 'personal' | 'taxi' | 'training' | 'commercial';

// Типы для недвижимости
export type PropertyType = 'apartment' | 'house' | 'townhouse' | 'commercial' | 'land';
export type WallMaterial = 'brick' | 'concrete' | 'wood' | 'panel' | 'monolith' | 'other';

// Типы для путешествий
export type TravelDestination = 'europe' | 'asia' | 'usa_canada' | 'cis' | 'worldwide';
export type TripPurpose = 'tourism' | 'business' | 'study' | 'work' | 'other';

// Типы для выгодоприобретателей
export type Relationship = 'spouse' | 'child' | 'parent' | 'sibling' | 'other';

// Типы для страховых случаев
export type ClaimType = 'accident' | 'theft' | 'damage' | 'natural_disaster' | 'medical' | 'other';

// Типы для источника рекомендации
export type ReferralSource = 'internet' | 'friends' | 'tv' | 'agent' | 'other';

// Персональные данные
export interface PersonalData {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  gender: Gender;
}

// Данные компании
export interface CompanyData {
  name: string;
  inn: string;
  ogrn: string;
  kpp: string;
  ceoName: string;
}

// Паспортные данные
export interface PassportData {
  series: string;
  number: string;
  issueDate: string;
  issuedBy: string;
}

// Данные транспорта
export interface VehicleData {
  vin: string;
  brand: string;
  model: string;
  year: number | null;
  mileage: number | null;
  enginePower: number | null;
  bodyType: BodyType;
  transmission: Transmission;
  marketValue: number | null;
  licensePlate: string;
  registrationCert: string;
  hasAntiTheft: boolean;
  antiTheftBrand: string;
  garageParking: boolean;
  usagePurpose: UsagePurpose;
}

// Адрес недвижимости
export interface PropertyAddress {
  region: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
}

// Данные недвижимости
export interface PropertyData {
  type: PropertyType;
  address: PropertyAddress;
  area: number | null;
  floors: number | null;
  floor: number | null;
  yearBuilt: number | null;
  wallMaterial: WallMaterial;
  marketValue: number | null;
  hasAlarm: boolean;
  hasFireAlarm: boolean;
  ownershipDoc: string;
}

// Опции покрытия недвижимости
export interface PropertyCoverageOptions {
  structure: boolean;
  interior: boolean;
  movables: boolean;
  liability: boolean;
}

// Данные здоровья
export interface HealthData {
  height: number | null;
  weight: number | null;
  bmi: number | null; // Computed
  bloodPressure: string;
  isSmoker: boolean;
  smokingYears: number | null;
  hasChronicDiseases: boolean;
  chronicDiseases: string;
  hadSurgeries: boolean;
  surgeries: string;
  occupation: string;
  isHighRiskJob: boolean;
  practicesSports: boolean;
  extremeSports: boolean;
}

// Опции покрытия жизни
export interface LifeCoverageOptions {
  death: boolean;
  disability: boolean;
  criticalIllness: boolean;
  accident: boolean;
}

// Данные путешествия
export interface TravelData {
  destination: TravelDestination;
  tripPurpose: TripPurpose;
  departureDate: string;
  returnDate: string;
  tripDuration: number | null; // Computed
  isMultipleTrips: boolean;
}

// Опции покрытия путешествий
export interface TravelCoverageOptions {
  medical: boolean;
  baggage: boolean;
  tripCancellation: boolean;
  flightDelay: boolean;
  carRental: boolean;
}

// Главный тип формы
export interface InsuranceFormData {
  // Шаг 1: Тип страхования
  insuranceType: InsuranceType;
  insurancePeriod: number;
  startDate: string;
  endDate: string; // Computed
  coverageAmount: number | null;
  deductible: number | null;
  paymentType: PaymentType;
  installments: number | null;

  // Шаг 2: Данные страхователя
  insuredType: InsuredType;
  personalData: PersonalData;
  companyData: CompanyData;
  passportData: PassportData;
  phone: string;
  email: string;
  fullName: string; // Computed
  age: number | null; // Computed

  // Шаг 3: Объект страхования
  vehicle: VehicleData;
  property: PropertyData;
  propertyCoverageOptions: PropertyCoverageOptions;
  health: HealthData;
  lifeCoverageOptions: LifeCoverageOptions;
  travel: TravelData;
  travelCoverageOptions: TravelCoverageOptions;
  travelers: Traveler[];

  // Шаг 4: Водители / Выгодоприобретатели
  drivers: Driver[];
  unlimitedDrivers: boolean;
  minDriverAge: number | null; // Computed
  minDriverExperience: number | null; // Computed
  beneficiaries: Beneficiary[];
  totalBeneficiaryShare: number | null; // Computed

  // Шаг 5: История
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

  // Шаг 6: Расчет и подтверждение
  basePremium: number | null; // Computed
  ageCoefficient: number | null; // Computed
  experienceCoefficient: number | null; // Computed
  regionCoefficient: number | null; // Computed
  claimsCoefficient: number | null; // Computed
  deductibleDiscount: number | null; // Computed
  promoDiscount: number | null; // Computed
  multiPolicyDiscount: number | null; // Computed
  totalPremium: number | null; // Computed
  installmentAmount: number | null; // Computed
  agreePersonalData: boolean;
  agreeTerms: boolean;
  agreeElectronicPolicy: boolean;
  agreeMarketing: boolean;
  confirmAccuracy: boolean;
  electronicSignature: string;
}

// Водитель
export interface Driver {
  id: string;
  fullName: string;
  birthDate: string;
  licenseNumber: string;
  licenseIssueDate: string;
  drivingExperience: number | null; // Computed
  accidentsCount: number;
  isMainDriver: boolean;
}

// Выгодоприобретатель
export interface Beneficiary {
  id: string;
  fullName: string;
  birthDate: string;
  relationship: Relationship;
  share: number | null;
  phone: string;
}

// Путешественник
export interface Traveler {
  id: string;
  fullName: string;
  birthDate: string;
  passportNumber: string;
}

// Страховой случай
export interface Claim {
  id: string;
  date: string;
  type: ClaimType;
  description: string;
  amount: number | null;
  atFault: boolean;
}

// Режим формы
export type FormMode = 'view' | 'edit' | 'create';
