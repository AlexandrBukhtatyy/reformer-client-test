/**
 * Типы данных для формы заявки на кредит
 */

// ============================================================================
// Union типы
// ============================================================================

export type LoanType = 'consumer' | 'mortgage' | 'car' | 'business' | 'refinancing';

export type EmploymentStatus = 'employed' | 'selfEmployed' | 'unemployed' | 'retired' | 'student';

export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';

export type Education = 'secondary' | 'specialized' | 'higher' | 'postgraduate';

export type Gender = 'male' | 'female';

export type PropertyType = 'apartment' | 'house' | 'land' | 'car' | 'commercial' | 'other';

// ============================================================================
// Вложенные интерфейсы
// ============================================================================

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

// ============================================================================
// Основная форма заявки на кредит
// ============================================================================

export interface CreditApplicationForm {
  // Шаг 1: Информация о кредите
  loanType: LoanType;
  loanAmount: number | undefined;
  loanTerm: number;
  loanPurpose: string;

  // Условные поля для ипотеки
  propertyValue: number | undefined;
  initialPayment: number | undefined;

  // Условные поля для автокредита
  carBrand: string;
  carModel: string;
  carYear: number | undefined;
  carPrice: number | undefined;

  // Шаг 2: Персональные данные
  personalData: PersonalData;
  passportData: PassportData;
  inn: string;
  snils: string;

  // Шаг 3: Контактная информация
  phoneMain: string;
  phoneAdditional: string;
  email: string;
  emailAdditional: string;
  sameEmail: boolean;
  registrationAddress: Address;
  sameAsRegistration: boolean;
  residenceAddress: Address;

  // Шаг 4: Информация о занятости
  employmentStatus: EmploymentStatus;

  // Условные поля для работающих по найму
  companyName: string;
  companyInn: string;
  companyPhone: string;
  companyAddress: string;
  position: string;

  // Стаж
  workExperienceTotal: number | undefined;
  workExperienceCurrent: number | undefined;

  // Доход
  monthlyIncome: number | undefined;
  additionalIncome: number | undefined;
  additionalIncomeSource: string;

  // Условные поля для ИП
  businessType: string;
  businessInn: string;
  businessActivity: string;

  // Шаг 5: Дополнительная информация
  maritalStatus: MaritalStatus;
  dependents: number;
  education: Education;

  // Имущество
  hasProperty: boolean;
  properties: Property[];

  // Существующие кредиты
  hasExistingLoans: boolean;
  existingLoans: ExistingLoan[];

  // Созаемщики
  hasCoBorrower: boolean;
  coBorrowers: CoBorrower[];

  // Шаг 6: Согласия
  agreePersonalData: boolean;
  agreeCreditHistory: boolean;
  agreeMarketing: boolean;
  agreeTerms: boolean;
  confirmAccuracy: boolean;
  electronicSignature: string;

  // Вычисляемые поля (readonly)
  interestRate: number | undefined;
  monthlyPayment: number | undefined;
  fullName: string;
  age: number | undefined;
  totalIncome: number | undefined;
  paymentToIncomeRatio: number | undefined;
  coBorrowersIncome: number | undefined;
}

// ============================================================================
// Режимы формы
// ============================================================================

export type FormMode = 'create' | 'edit' | 'view';

// ============================================================================
// API типы
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface DictionaryData {
  banks: Array<{ value: string; label: string }>;
  cities: Array<{ value: string; label: string }>;
  propertyTypes: Array<{ value: string; label: string }>;
}
