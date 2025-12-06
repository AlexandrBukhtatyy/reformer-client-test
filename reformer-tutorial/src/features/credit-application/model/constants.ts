/**
 * Константы для формы заявки на кредит
 */

import type { LoanType, EmploymentStatus, MaritalStatus, Education, Gender, PropertyType } from './types';

// ============================================================================
// Опции для Select и RadioGroup
// ============================================================================

export const LOAN_TYPES: Array<{ value: LoanType; label: string }> = [
  { value: 'consumer', label: 'Потребительский кредит' },
  { value: 'mortgage', label: 'Ипотека' },
  { value: 'car', label: 'Автокредит' },
  { value: 'business', label: 'Бизнес-кредит' },
  { value: 'refinancing', label: 'Рефинансирование' },
];

export const EMPLOYMENT_STATUSES: Array<{ value: EmploymentStatus; label: string }> = [
  { value: 'employed', label: 'Работаю по найму' },
  { value: 'selfEmployed', label: 'Индивидуальный предприниматель' },
  { value: 'unemployed', label: 'Не работаю' },
  { value: 'retired', label: 'Пенсионер' },
  { value: 'student', label: 'Студент' },
];

export const MARITAL_STATUSES: Array<{ value: MaritalStatus; label: string }> = [
  { value: 'single', label: 'Не женат/не замужем' },
  { value: 'married', label: 'Женат/замужем' },
  { value: 'divorced', label: 'В разводе' },
  { value: 'widowed', label: 'Вдовец/вдова' },
];

export const EDUCATION_LEVELS: Array<{ value: Education; label: string }> = [
  { value: 'secondary', label: 'Среднее' },
  { value: 'specialized', label: 'Среднее специальное' },
  { value: 'higher', label: 'Высшее' },
  { value: 'postgraduate', label: 'Аспирантура/докторантура' },
];

export const GENDER_OPTIONS: Array<{ value: Gender; label: string }> = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
];

export const PROPERTY_TYPES: Array<{ value: PropertyType; label: string }> = [
  { value: 'apartment', label: 'Квартира' },
  { value: 'house', label: 'Дом' },
  { value: 'land', label: 'Земельный участок' },
  { value: 'car', label: 'Автомобиль' },
  { value: 'commercial', label: 'Коммерческая недвижимость' },
  { value: 'other', label: 'Другое' },
];

// ============================================================================
// Базовые процентные ставки по типам кредита
// ============================================================================

export const BASE_INTEREST_RATES: Record<LoanType, number> = {
  consumer: 15,
  mortgage: 8,
  car: 12,
  business: 18,
  refinancing: 14,
};

// ============================================================================
// Лимиты полей
// ============================================================================

export const LOAN_AMOUNT_MIN = 50000;
export const LOAN_AMOUNT_MAX = 10000000;
export const LOAN_AMOUNT_STEP = 10000;

export const LOAN_TERM_MIN = 6;
export const LOAN_TERM_MAX = 240;
export const LOAN_TERM_DEFAULT = 12;

export const PROPERTY_VALUE_MIN = 1000000;

export const CAR_PRICE_MIN = 300000;
export const CAR_PRICE_MAX = 10000000;
export const CAR_YEAR_MIN = 2000;
export const CAR_YEAR_MAX = new Date().getFullYear() + 1;

export const MONTHLY_INCOME_MIN = 10000;
export const DEPENDENTS_MAX = 10;

export const AGE_MIN = 18;
export const AGE_MAX = 70;

export const PAYMENT_TO_INCOME_RATIO_MAX = 50;
export const PAYMENT_TO_INCOME_RATIO_WARNING = 40;

// ============================================================================
// Маски для полей
// ============================================================================

export const MASKS = {
  phone: '+7 (999) 999-99-99',
  passportSeries: '99 99',
  passportNumber: '999999',
  departmentCode: '999-999',
  inn12: '999999999999',
  inn10: '9999999999',
  snils: '999-999-999 99',
  postalCode: '999999',
  smsCode: '999999',
};

// ============================================================================
// Значения по умолчанию для формы
// ============================================================================

export const DEFAULT_PERSONAL_DATA = {
  lastName: '',
  firstName: '',
  middleName: '',
  birthDate: '',
  gender: 'male' as Gender,
  birthPlace: '',
};

export const DEFAULT_PASSPORT_DATA = {
  series: '',
  number: '',
  issueDate: '',
  issuedBy: '',
  departmentCode: '',
};

export const DEFAULT_ADDRESS = {
  region: '',
  city: '',
  street: '',
  house: '',
  apartment: '',
  postalCode: '',
};

export const DEFAULT_PROPERTY = {
  type: 'apartment' as PropertyType,
  description: '',
  estimatedValue: undefined,
  hasEncumbrance: false,
};

export const DEFAULT_EXISTING_LOAN = {
  bank: '',
  type: '',
  amount: undefined,
  remainingAmount: undefined,
  monthlyPayment: undefined,
  maturityDate: '',
};

export const DEFAULT_CO_BORROWER = {
  personalData: { ...DEFAULT_PERSONAL_DATA },
  phone: '',
  email: '',
  relationship: '',
  monthlyIncome: undefined,
};

export const DEFAULT_FORM_VALUES = {
  // Шаг 1
  loanType: 'consumer' as const,
  loanAmount: undefined,
  loanTerm: LOAN_TERM_DEFAULT,
  loanPurpose: '',
  propertyValue: undefined,
  initialPayment: undefined,
  carBrand: '',
  carModel: '',
  carYear: undefined,
  carPrice: undefined,

  // Шаг 2
  personalData: { ...DEFAULT_PERSONAL_DATA },
  passportData: { ...DEFAULT_PASSPORT_DATA },
  inn: '',
  snils: '',

  // Шаг 3
  phoneMain: '',
  phoneAdditional: '',
  email: '',
  emailAdditional: '',
  sameEmail: false,
  registrationAddress: { ...DEFAULT_ADDRESS },
  sameAsRegistration: true,
  residenceAddress: { ...DEFAULT_ADDRESS },

  // Шаг 4
  employmentStatus: 'employed' as const,
  companyName: '',
  companyInn: '',
  companyPhone: '',
  companyAddress: '',
  position: '',
  workExperienceTotal: undefined,
  workExperienceCurrent: undefined,
  monthlyIncome: undefined,
  additionalIncome: undefined,
  additionalIncomeSource: '',
  businessType: '',
  businessInn: '',
  businessActivity: '',

  // Шаг 5
  maritalStatus: 'single' as const,
  dependents: 0,
  education: 'higher' as const,
  hasProperty: false,
  properties: [],
  hasExistingLoans: false,
  existingLoans: [],
  hasCoBorrower: false,
  coBorrowers: [],

  // Шаг 6
  agreePersonalData: false,
  agreeCreditHistory: false,
  agreeMarketing: false,
  agreeTerms: false,
  confirmAccuracy: false,
  electronicSignature: '',

  // Вычисляемые поля
  interestRate: undefined,
  monthlyPayment: undefined,
  fullName: '',
  age: undefined,
  totalIncome: undefined,
  paymentToIncomeRatio: undefined,
  coBorrowersIncome: undefined,
};
