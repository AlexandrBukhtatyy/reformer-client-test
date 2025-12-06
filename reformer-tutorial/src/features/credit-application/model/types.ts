// model/types.ts - Типы данных формы заявки на кредит

// =============================================================================
// ENUMS / UNION TYPES
// =============================================================================

export type LoanType = 'consumer' | 'mortgage' | 'car' | 'business' | 'refinancing';
export type Gender = 'male' | 'female';
export type EmploymentStatus = 'employed' | 'selfEmployed' | 'unemployed' | 'retired' | 'student';
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';
export type Education = 'secondary' | 'specialized' | 'higher' | 'postgraduate';
export type PropertyType = 'apartment' | 'house' | 'land' | 'car' | 'other';

// Режим формы
export type FormMode = 'create' | 'edit' | 'view';

// =============================================================================
// NESTED INTERFACES
// =============================================================================

export interface PersonalData {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  gender: Gender;
  birthPlace: string;
}

export interface PassportData {
  series: string;
  number: string;
  issueDate: string;
  issuedBy: string;
  departmentCode: string;
}

export interface Address {
  region: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  postalCode: string;
}

export interface Property {
  type: PropertyType;
  description: string;
  estimatedValue: number | undefined;
  hasEncumbrance: boolean;
}

export interface ExistingLoan {
  bank: string;
  type: string;
  amount: number | undefined;
  remainingAmount: number | undefined;
  monthlyPayment: number | undefined;
  maturityDate: string;
}

export interface CoBorrower {
  personalData: PersonalData;
  phone: string;
  email: string;
  relationship: string;
  monthlyIncome: number | undefined;
}

// =============================================================================
// MAIN FORM INTERFACE
// =============================================================================

export interface CreditApplicationForm {
  // -------------------------------------------------------------------------
  // Step 1: Информация о кредите
  // -------------------------------------------------------------------------
  loanType: LoanType;
  loanAmount: number | undefined;
  loanTerm: number | undefined;
  loanPurpose: string;

  // Поля для ипотеки (условные)
  propertyValue: number | undefined;
  initialPayment: number | undefined; // Вычисляемое: 20% от propertyValue

  // Поля для автокредита (условные)
  carBrand: string;
  carModel: string;
  carYear: number | undefined;
  carPrice: number | undefined;

  // -------------------------------------------------------------------------
  // Step 2: Персональные данные
  // -------------------------------------------------------------------------
  personalData: PersonalData;
  passportData: PassportData;
  inn: string;
  snils: string;

  // -------------------------------------------------------------------------
  // Step 3: Контактная информация
  // -------------------------------------------------------------------------
  phoneMain: string;
  phoneAdditional: string;
  email: string;
  emailAdditional: string;
  registrationAddress: Address;
  sameAsRegistration: boolean;
  residenceAddress: Address;

  // -------------------------------------------------------------------------
  // Step 4: Информация о занятости
  // -------------------------------------------------------------------------
  employmentStatus: EmploymentStatus;

  // Поля для работающих (условные)
  companyName: string;
  companyInn: string;
  companyPhone: string;
  companyAddress: string;
  position: string;

  // Общие поля занятости
  workExperienceTotal: number | undefined;
  workExperienceCurrent: number | undefined;
  monthlyIncome: number | undefined;
  additionalIncome: number | undefined;
  additionalIncomeSource: string;

  // Поля для самозанятых (условные)
  businessType: string;
  businessInn: string;
  businessActivity: string;

  // -------------------------------------------------------------------------
  // Step 5: Дополнительная информация
  // -------------------------------------------------------------------------
  maritalStatus: MaritalStatus;
  dependents: number | undefined;
  education: Education;

  // Имущество
  hasProperty: boolean;
  properties: Property[];

  // Существующие кредиты
  hasExistingLoans: boolean;
  existingLoans: ExistingLoan[];

  // Созаёмщики
  hasCoBorrower: boolean;
  coBorrowers: CoBorrower[];

  // -------------------------------------------------------------------------
  // Step 6: Подтверждение и согласия
  // -------------------------------------------------------------------------
  agreePersonalData: boolean;
  agreeCreditHistory: boolean;
  agreeMarketing: boolean;
  agreeTerms: boolean;
  confirmAccuracy: boolean;
  electronicSignature: string; // SMS-код

  // -------------------------------------------------------------------------
  // Вычисляемые поля (readonly)
  // -------------------------------------------------------------------------
  interestRate: number | undefined;
  monthlyPayment: number | undefined;
  fullName: string;
  age: number | undefined;
  totalIncome: number | undefined;
  paymentToIncomeRatio: number | undefined;
  coBorrowersIncome: number | undefined;
}

// =============================================================================
// API TYPES
// =============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  group?: string;
}

export interface DictionariesResponse {
  banks: SelectOption[];
  regions: SelectOption[];
  propertyTypes: SelectOption[];
}

export interface CitiesResponse {
  cities: SelectOption[];
}

export interface CarModelsResponse {
  models: SelectOption[];
}

export interface SubmitApplicationResponse {
  id: string;
  status: string;
}
