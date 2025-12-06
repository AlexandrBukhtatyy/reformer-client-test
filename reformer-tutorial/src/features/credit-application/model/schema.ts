/**
 * Схема формы заявки на кредит
 * Использует @reformer/core для определения структуры формы
 *
 * FormSchema требует FieldConfig с value и component для каждого поля
 */

import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { RadioGroup } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { InputMask } from '@/components/ui/input-mask';
import type {
  CreditApplicationForm,
  PersonalData,
  PassportData,
  Address,
  Property,
  ExistingLoan,
  CoBorrower,
} from './types';
import {
  LOAN_TYPES,
  EMPLOYMENT_STATUSES,
  MARITAL_STATUSES,
  EDUCATION_LEVELS,
  GENDER_OPTIONS,
  PROPERTY_TYPES,
  MASKS,
  LOAN_AMOUNT_MIN,
  LOAN_AMOUNT_MAX,
  LOAN_AMOUNT_STEP,
  LOAN_TERM_MIN,
  LOAN_TERM_MAX,
  CAR_YEAR_MIN,
  CAR_YEAR_MAX,
  DEPENDENTS_MAX,
} from './constants';

// ============================================================================
// Под-схемы для переиспользуемых групп полей
// ============================================================================

export const personalDataSchema: FormSchema<PersonalData> = {
  lastName: {
    value: '',
    component: Input,
    componentProps: { label: 'Фамилия', placeholder: 'Введите фамилию' },
  },
  firstName: {
    value: '',
    component: Input,
    componentProps: { label: 'Имя', placeholder: 'Введите имя' },
  },
  middleName: {
    value: '',
    component: Input,
    componentProps: { label: 'Отчество', placeholder: 'Введите отчество' },
  },
  birthDate: {
    value: '',
    component: Input,
    componentProps: { label: 'Дата рождения', type: 'date' },
  },
  gender: {
    value: 'male',
    component: RadioGroup,
    componentProps: { label: 'Пол', options: GENDER_OPTIONS },
  },
  birthPlace: {
    value: '',
    component: Input,
    componentProps: { label: 'Место рождения', placeholder: 'Введите место рождения' },
  },
};

export const passportDataSchema: FormSchema<PassportData> = {
  series: {
    value: '',
    component: InputMask,
    componentProps: { label: 'Серия паспорта', mask: MASKS.passportSeries, placeholder: '12 34' },
  },
  number: {
    value: '',
    component: InputMask,
    componentProps: { label: 'Номер паспорта', mask: MASKS.passportNumber, placeholder: '123456' },
  },
  issueDate: {
    value: '',
    component: Input,
    componentProps: { label: 'Дата выдачи', type: 'date' },
  },
  issuedBy: {
    value: '',
    component: Input,
    componentProps: { label: 'Кем выдан', placeholder: 'Введите название органа' },
  },
  departmentCode: {
    value: '',
    component: InputMask,
    componentProps: { label: 'Код подразделения', mask: MASKS.departmentCode, placeholder: '123-456' },
  },
};

export const addressSchema: FormSchema<Address> = {
  region: {
    value: '',
    component: Input,
    componentProps: { label: 'Регион', placeholder: 'Введите регион' },
  },
  city: {
    value: '',
    component: Input,
    componentProps: { label: 'Город', placeholder: 'Введите город' },
  },
  street: {
    value: '',
    component: Input,
    componentProps: { label: 'Улица', placeholder: 'Введите улицу' },
  },
  house: {
    value: '',
    component: Input,
    componentProps: { label: 'Дом', placeholder: '№' },
  },
  apartment: {
    value: '',
    component: Input,
    componentProps: { label: 'Квартира', placeholder: '№' },
  },
  postalCode: {
    value: '',
    component: InputMask,
    componentProps: { label: 'Индекс', mask: MASKS.postalCode, placeholder: '000000' },
  },
};

// ============================================================================
// Схемы для элементов массивов
// ============================================================================

export const propertyItemSchema: FormSchema<Property> = {
  type: {
    value: 'apartment',
    component: Select,
    componentProps: { label: 'Тип имущества', options: PROPERTY_TYPES, placeholder: 'Выберите тип' },
  },
  description: {
    value: '',
    component: Textarea,
    componentProps: { label: 'Описание', placeholder: 'Опишите имущество', rows: 2 },
  },
  estimatedValue: {
    value: null,
    component: Input,
    componentProps: { label: 'Оценочная стоимость (₽)', type: 'number', placeholder: '0', min: 0 },
  },
  hasEncumbrance: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Имеется обременение (залог)' },
  },
};

export const existingLoanItemSchema: FormSchema<ExistingLoan> = {
  bank: {
    value: '',
    component: Input,
    componentProps: { label: 'Банк', placeholder: 'Название банка' },
  },
  type: {
    value: '',
    component: Input,
    componentProps: { label: 'Тип кредита', placeholder: 'Тип кредита' },
  },
  amount: {
    value: null,
    component: Input,
    componentProps: { label: 'Сумма кредита (₽)', type: 'number', placeholder: '0', min: 0 },
  },
  remainingAmount: {
    value: null,
    component: Input,
    componentProps: { label: 'Остаток задолженности (₽)', type: 'number', placeholder: '0', min: 0 },
  },
  monthlyPayment: {
    value: null,
    component: Input,
    componentProps: { label: 'Ежемесячный платеж (₽)', type: 'number', placeholder: '0', min: 0 },
  },
  maturityDate: {
    value: '',
    component: Input,
    componentProps: { label: 'Дата погашения', type: 'date' },
  },
};

export const coBorrowerItemSchema: FormSchema<CoBorrower> = {
  personalData: personalDataSchema,
  phone: {
    value: '',
    component: InputMask,
    componentProps: { label: 'Телефон', mask: MASKS.phone, placeholder: '+7 (___) ___-__-__' },
  },
  email: {
    value: '',
    component: Input,
    componentProps: { label: 'Email', type: 'email', placeholder: 'example@mail.com' },
  },
  relationship: {
    value: '',
    component: Input,
    componentProps: { label: 'Родство', placeholder: 'Укажите родство' },
  },
  monthlyIncome: {
    value: null,
    component: Input,
    componentProps: { label: 'Ежемесячный доход (₽)', type: 'number', placeholder: '0', min: 0 },
  },
};

// ============================================================================
// Основная схема формы
// ============================================================================

export const creditApplicationSchema: FormSchema<CreditApplicationForm> = {
  // -------------------------------------------------------------------------
  // Шаг 1: Информация о кредите
  // -------------------------------------------------------------------------
  loanType: {
    value: 'consumer',
    component: Select,
    componentProps: { label: 'Тип кредита', options: LOAN_TYPES, placeholder: 'Выберите тип кредита' },
  },
  loanAmount: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Сумма кредита (₽)',
      type: 'number',
      placeholder: 'Введите сумму',
      min: LOAN_AMOUNT_MIN,
      max: LOAN_AMOUNT_MAX,
      step: LOAN_AMOUNT_STEP,
    },
  },
  loanTerm: {
    value: 12,
    component: Input,
    componentProps: {
      label: 'Срок кредита (месяцев)',
      type: 'number',
      placeholder: 'Введите срок',
      min: LOAN_TERM_MIN,
      max: LOAN_TERM_MAX,
    },
  },
  loanPurpose: {
    value: '',
    component: Textarea,
    componentProps: {
      label: 'Цель кредита',
      placeholder: 'Опишите, на что планируете потратить средства',
      maxLength: 500,
      rows: 3,
    },
  },

  // Условные поля для ипотеки
  propertyValue: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Стоимость недвижимости (₽)',
      type: 'number',
      placeholder: 'Введите стоимость',
      min: 1000000,
    },
  },
  initialPayment: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Первоначальный взнос (₽)',
      type: 'number',
      placeholder: 'Автоматически вычисляется',
      disabled: true,
    },
  },

  // Условные поля для автокредита
  carBrand: {
    value: '',
    component: Input,
    componentProps: { label: 'Марка автомобиля', placeholder: 'Например: Toyota' },
  },
  carModel: {
    value: '',
    component: Input,
    componentProps: { label: 'Модель автомобиля', placeholder: 'Например: Camry' },
  },
  carYear: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Год выпуска',
      type: 'number',
      placeholder: '2020',
      min: CAR_YEAR_MIN,
      max: CAR_YEAR_MAX,
    },
  },
  carPrice: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Стоимость автомобиля (₽)',
      type: 'number',
      placeholder: 'Введите стоимость',
      min: 300000,
      max: 10000000,
    },
  },

  // -------------------------------------------------------------------------
  // Шаг 2: Персональные данные
  // -------------------------------------------------------------------------
  personalData: personalDataSchema,
  passportData: passportDataSchema,
  inn: {
    value: '',
    component: InputMask,
    componentProps: { label: 'ИНН', mask: MASKS.inn12, placeholder: '123456789012' },
  },
  snils: {
    value: '',
    component: InputMask,
    componentProps: { label: 'СНИЛС', mask: MASKS.snils, placeholder: '123-456-789 00' },
  },

  // -------------------------------------------------------------------------
  // Шаг 3: Контактная информация
  // -------------------------------------------------------------------------
  phoneMain: {
    value: '',
    component: InputMask,
    componentProps: { label: 'Основной телефон', mask: MASKS.phone, placeholder: '+7 (___) ___-__-__' },
  },
  phoneAdditional: {
    value: '',
    component: InputMask,
    componentProps: { label: 'Дополнительный телефон', mask: MASKS.phone, placeholder: '+7 (___) ___-__-__' },
  },
  email: {
    value: '',
    component: Input,
    componentProps: { label: 'Email', type: 'email', placeholder: 'example@mail.com' },
  },
  emailAdditional: {
    value: '',
    component: Input,
    componentProps: { label: 'Дополнительный email', type: 'email', placeholder: 'example@mail.com' },
  },
  sameEmail: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Дополнительный email совпадает с основным' },
  },
  registrationAddress: addressSchema,
  sameAsRegistration: {
    value: true,
    component: Checkbox,
    componentProps: { label: 'Адрес проживания совпадает с адресом регистрации' },
  },
  residenceAddress: addressSchema,

  // -------------------------------------------------------------------------
  // Шаг 4: Информация о занятости
  // -------------------------------------------------------------------------
  employmentStatus: {
    value: 'employed',
    component: RadioGroup,
    componentProps: { label: 'Статус занятости', options: EMPLOYMENT_STATUSES },
  },

  // Условные поля для работающих по найму
  companyName: {
    value: '',
    component: Input,
    componentProps: { label: 'Название компании', placeholder: 'Введите название' },
  },
  companyInn: {
    value: '',
    component: InputMask,
    componentProps: { label: 'ИНН компании', mask: MASKS.inn10, placeholder: '1234567890' },
  },
  companyPhone: {
    value: '',
    component: InputMask,
    componentProps: { label: 'Телефон компании', mask: MASKS.phone, placeholder: '+7 (___) ___-__-__' },
  },
  companyAddress: {
    value: '',
    component: Input,
    componentProps: { label: 'Адрес компании', placeholder: 'Полный адрес' },
  },
  position: {
    value: '',
    component: Input,
    componentProps: { label: 'Должность', placeholder: 'Ваша должность' },
  },

  // Стаж
  workExperienceTotal: {
    value: null,
    component: Input,
    componentProps: { label: 'Общий стаж работы (месяцев)', type: 'number', placeholder: '0', min: 0 },
  },
  workExperienceCurrent: {
    value: null,
    component: Input,
    componentProps: { label: 'Стаж на текущем месте (месяцев)', type: 'number', placeholder: '0', min: 0 },
  },

  // Доход
  monthlyIncome: {
    value: null,
    component: Input,
    componentProps: { label: 'Ежемесячный доход (₽)', type: 'number', placeholder: '0', min: 10000 },
  },
  additionalIncome: {
    value: null,
    component: Input,
    componentProps: { label: 'Дополнительный доход (₽)', type: 'number', placeholder: '0', min: 0 },
  },
  additionalIncomeSource: {
    value: '',
    component: Input,
    componentProps: { label: 'Источник дополнительного дохода', placeholder: 'Опишите источник' },
  },

  // Условные поля для ИП
  businessType: {
    value: '',
    component: Input,
    componentProps: { label: 'Тип бизнеса', placeholder: 'ИП, ООО и т.д.' },
  },
  businessInn: {
    value: '',
    component: InputMask,
    componentProps: { label: 'ИНН ИП', mask: MASKS.inn12, placeholder: '123456789012' },
  },
  businessActivity: {
    value: '',
    component: Textarea,
    componentProps: { label: 'Вид деятельности', placeholder: 'Опишите вид деятельности', rows: 2 },
  },

  // -------------------------------------------------------------------------
  // Шаг 5: Дополнительная информация
  // -------------------------------------------------------------------------
  maritalStatus: {
    value: 'single',
    component: RadioGroup,
    componentProps: { label: 'Семейное положение', options: MARITAL_STATUSES },
  },
  dependents: {
    value: 0,
    component: Input,
    componentProps: {
      label: 'Количество иждивенцев',
      type: 'number',
      placeholder: '0',
      min: 0,
      max: DEPENDENTS_MAX,
    },
  },
  education: {
    value: 'higher',
    component: Select,
    componentProps: { label: 'Образование', options: EDUCATION_LEVELS, placeholder: 'Выберите уровень образования' },
  },

  // Имущество
  hasProperty: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'У меня есть имущество' },
  },
  properties: [propertyItemSchema],

  // Существующие кредиты
  hasExistingLoans: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'У меня есть другие кредиты' },
  },
  existingLoans: [existingLoanItemSchema],

  // Созаемщики
  hasCoBorrower: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Добавить созаемщика' },
  },
  coBorrowers: [coBorrowerItemSchema],

  // -------------------------------------------------------------------------
  // Шаг 6: Согласия
  // -------------------------------------------------------------------------
  agreePersonalData: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Согласие на обработку персональных данных' },
  },
  agreeCreditHistory: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Согласие на проверку кредитной истории' },
  },
  agreeMarketing: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Согласие на получение маркетинговых материалов' },
  },
  agreeTerms: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Согласие с условиями кредитования' },
  },
  confirmAccuracy: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Подтверждаю точность введенных данных' },
  },
  electronicSignature: {
    value: '',
    component: InputMask,
    componentProps: { label: 'Код подтверждения из СМС', mask: MASKS.smsCode, placeholder: '123456' },
  },

  // -------------------------------------------------------------------------
  // Вычисляемые поля (readonly)
  // -------------------------------------------------------------------------
  interestRate: {
    value: null,
    component: Input,
    componentProps: { label: 'Процентная ставка (%)', type: 'number', disabled: true },
  },
  monthlyPayment: {
    value: null,
    component: Input,
    componentProps: { label: 'Ежемесячный платеж (₽)', type: 'number', disabled: true },
  },
  fullName: {
    value: '',
    component: Input,
    componentProps: { label: 'Полное имя', disabled: true },
  },
  age: {
    value: null,
    component: Input,
    componentProps: { label: 'Возраст (лет)', type: 'number', disabled: true },
  },
  totalIncome: {
    value: null,
    component: Input,
    componentProps: { label: 'Общий доход (₽)', type: 'number', disabled: true },
  },
  paymentToIncomeRatio: {
    value: null,
    component: Input,
    componentProps: { label: 'Процент платежа от дохода (%)', type: 'number', disabled: true },
  },
  coBorrowersIncome: {
    value: null,
    component: Input,
    componentProps: { label: 'Доход созаемщиков (₽)', type: 'number', disabled: true },
  },
};

// ============================================================================
// Дефолтные элементы для массивов (для добавления новых элементов)
// ============================================================================

export const defaultPropertyItem: Property = {
  type: 'apartment',
  description: '',
  estimatedValue: undefined,
  hasEncumbrance: false,
};

export const defaultExistingLoanItem: ExistingLoan = {
  bank: '',
  type: '',
  amount: undefined,
  remainingAmount: undefined,
  monthlyPayment: undefined,
  maturityDate: '',
};

export const defaultCoBorrowerItem: CoBorrower = {
  personalData: {
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: '',
    gender: 'male',
    birthPlace: '',
  },
  phone: '',
  email: '',
  relationship: '',
  monthlyIncome: undefined,
};
