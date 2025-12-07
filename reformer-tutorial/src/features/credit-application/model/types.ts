/**
 * Типы для формы заявки на кредит
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
  type: 'apartment' | 'house' | 'car' | 'land' | 'other';
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
// Основной тип формы
// ============================================================================

export interface CreditApplicationForm {
  // Шаг 1: Основная информация о кредите
  loanType: 'consumer' | 'mortgage' | 'car' | 'business' | 'refinancing';
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

  // Вычисляемые поля (Шаг 1)
  interestRate: number | undefined;
  monthlyPayment: number | undefined;

  // Шаг 2: Персональные данные
  personalData: PersonalData;
  passportData: PassportData;
  inn: string;
  snils: string;

  // Вычисляемые поля (Шаг 2)
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
  employmentStatus: 'employed' | 'selfEmployed' | 'unemployed' | 'retired' | 'student';

  // Поля для работающих по найму
  companyName: string;
  companyInn: string;
  companyPhone: string;
  companyAddress: string;
  position: string;

  // Поля для ИП
  businessType: string;
  businessInn: string;
  businessActivity: string;

  // Стаж и доход
  workExperienceTotal: number | undefined;
  workExperienceCurrent: number | undefined;
  monthlyIncome: number | undefined;
  additionalIncome: number | undefined;
  additionalIncomeSource: string;

  // Вычисляемые поля (Шаг 4)
  totalIncome: number | undefined;

  // Шаг 5: Дополнительная информация
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  dependents: number;
  education: 'secondary' | 'specialized' | 'higher' | 'postgraduate';

  hasProperty: boolean;
  properties: Property[];

  hasExistingLoans: boolean;
  existingLoans: ExistingLoan[];

  hasCoBorrower: boolean;
  coBorrowers: CoBorrower[];

  // Вычисляемые поля (Шаг 5)
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
