/**
 * Константы для формы заявки на кредит
 */

// ============================================================================
// Количество шагов
// ============================================================================

export const TOTAL_STEPS = 6;

// ============================================================================
// Опции для Select и RadioGroup
// ============================================================================

export const LOAN_TYPE_OPTIONS = [
  { value: 'consumer', label: 'Потребительский кредит' },
  { value: 'mortgage', label: 'Ипотека' },
  { value: 'car', label: 'Автокредит' },
  { value: 'business', label: 'Бизнес-кредит' },
  { value: 'refinancing', label: 'Рефинансирование' },
];

export const EMPLOYMENT_STATUS_OPTIONS = [
  { value: 'employed', label: 'Работаю по найму' },
  { value: 'selfEmployed', label: 'Индивидуальный предприниматель' },
  { value: 'unemployed', label: 'Временно не работаю' },
  { value: 'retired', label: 'Пенсионер' },
  { value: 'student', label: 'Студент' },
];

export const MARITAL_STATUS_OPTIONS = [
  { value: 'single', label: 'Холост/не замужем' },
  { value: 'married', label: 'В браке' },
  { value: 'divorced', label: 'Разведен(а)' },
  { value: 'widowed', label: 'Вдовец/вдова' },
];

export const EDUCATION_OPTIONS = [
  { value: 'secondary', label: 'Среднее' },
  { value: 'specialized', label: 'Среднее специальное' },
  { value: 'higher', label: 'Высшее' },
  { value: 'postgraduate', label: 'Послевузовское' },
];

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
];

export const PROPERTY_TYPE_OPTIONS = [
  { value: 'apartment', label: 'Квартира' },
  { value: 'house', label: 'Дом' },
  { value: 'car', label: 'Автомобиль' },
  { value: 'land', label: 'Земельный участок' },
  { value: 'other', label: 'Другое' },
];

// ============================================================================
// Лимиты
// ============================================================================

export const LOAN_LIMITS = {
  minAmount: 50000,
  maxAmount: 10000000,
  amountStep: 10000,
  minTerm: 6,
  maxTerm: 240,
};

export const MORTGAGE_LIMITS = {
  minPropertyValue: 1000000,
  minInitialPaymentPercent: 20,
};

export const CAR_LIMITS = {
  minYear: 2000,
  maxYear: new Date().getFullYear() + 1,
  minPrice: 300000,
  maxPrice: 10000000,
};

export const AGE_LIMITS = {
  min: 18,
  max: 70,
};

// ============================================================================
// Базовые процентные ставки по типам кредита
// ============================================================================

export const BASE_INTEREST_RATES: Record<string, number> = {
  consumer: 15.9,
  mortgage: 10.5,
  car: 12.9,
  business: 18.5,
  refinancing: 13.9,
};

// ============================================================================
// Маски для InputMask
// ============================================================================

export const MASKS = {
  phone: '+7 (999) 999-99-99',
  passportSeries: '99 99',
  passportNumber: '999999',
  departmentCode: '999-999',
  inn: '999999999999',
  companyInn: '9999999999',
  snils: '999-999-999 99',
  postalCode: '999999',
  smsCode: '999999',
};
