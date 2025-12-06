/**
 * Типы формы заявки на кредит
 */

// ============================================================================
// Вспомогательные типы
// ============================================================================

/** Адрес */
export interface Address {
  region: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  postalCode: string;
}

/** Персональные данные */
export interface PersonalData {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  gender: 'male' | 'female';
  birthPlace: string;
}

/** Паспортные данные */
export interface PassportData {
  series: string;
  number: string;
  issueDate: string;
  issuedBy: string;
  departmentCode: string;
}

/** Имущество */
export interface Property {
  type: 'apartment' | 'house' | 'land' | 'car' | 'other';
  description: string;
  estimatedValue: number | undefined;
  hasEncumbrance: boolean;
}

/** Существующий кредит */
export interface ExistingLoan {
  bank: string;
  type: string;
  amount: number | undefined;
  remainingAmount: number | undefined;
  monthlyPayment: number | undefined;
  maturityDate: string;
}

/** Созаемщик */
export interface CoBorrower {
  personalData: PersonalData;
  phone: string;
  email: string;
  relationship: string;
  monthlyIncome: number | undefined;
}

// ============================================================================
// Типы кредита
// ============================================================================

export type LoanType = 'consumer' | 'mortgage' | 'car' | 'business' | 'refinancing';

export type EmploymentStatus = 'employed' | 'selfEmployed' | 'unemployed' | 'retired' | 'student';

export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';

export type Education = 'secondary' | 'specialized' | 'higher' | 'postgraduate';

// ============================================================================
// Форма заявки на кредит
// ============================================================================

export interface CreditApplicationForm {
  // Шаг 1: Основная информация о кредите
  loanType: LoanType;
  loanAmount: number | undefined;
  loanTerm: number;
  loanPurpose: string;

  // Ипотека (условные поля)
  propertyValue: number | undefined;
  initialPayment: number | undefined;

  // Автокредит (условные поля)
  carBrand: string;
  carModel: string;
  carYear: number | undefined;
  carPrice: number | undefined;

  // Вычисляемые поля
  interestRate: number | undefined;
  monthlyPayment: number | undefined;

  // Шаг 2: Персональные данные
  personalData: PersonalData;
  passportData: PassportData;
  inn: string;
  snils: string;

  // Вычисляемые поля
  fullName: string;
  age: number | undefined;

  // Шаг 3: Контактная информация
  phoneMain: string;
  phoneAdditional: string;
  email: string;
  emailAdditional: string;

  registrationAddress: Address;
  sameAsRegistration: boolean;
  residenceAddress: Address;

  // Шаг 4: Информация о занятости
  employmentStatus: EmploymentStatus;

  // Работа по найму (условные поля)
  companyName: string;
  companyInn: string;
  companyPhone: string;
  companyAddress: string;
  position: string;

  // ИП (условные поля)
  businessType: string;
  businessInn: string;
  businessActivity: string;

  // Стаж и доход
  workExperienceTotal: number | undefined;
  workExperienceCurrent: number | undefined;
  monthlyIncome: number | undefined;
  additionalIncome: number | undefined;
  additionalIncomeSource: string;

  // Вычисляемые поля
  totalIncome: number | undefined;

  // Шаг 5: Дополнительная информация
  maritalStatus: MaritalStatus;
  dependents: number;
  education: Education;

  hasProperty: boolean;
  properties: Property[];

  hasExistingLoans: boolean;
  existingLoans: ExistingLoan[];

  hasCoBorrower: boolean;
  coBorrowers: CoBorrower[];

  // Вычисляемые поля
  paymentToIncomeRatio: number | undefined;
  coBorrowersIncome: number | undefined;

  // Шаг 6: Подтверждение и согласия
  agreePersonalData: boolean;
  agreeCreditHistory: boolean;
  agreeMarketing: boolean;
  agreeTerms: boolean;
  confirmAccuracy: boolean;
  electronicSignature: string;
}