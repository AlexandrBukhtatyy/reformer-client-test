/**
 * Схема формы заявки на кредит
 */

import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import { InputMask } from '@/components/ui/input-mask';
import { Select } from '@/components/ui/select';
import { RadioGroup } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

import type {
  CreditApplicationForm,
  Address,
  PersonalData,
  PassportData,
  Property,
  ExistingLoan,
  CoBorrower,
} from './types';

import {
  LOAN_TYPE_OPTIONS,
  EMPLOYMENT_STATUS_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  EDUCATION_OPTIONS,
  GENDER_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  LOAN_LIMITS,
  CAR_LIMITS,
  MASKS,
} from './constants';

// ============================================================================
// Вложенные схемы
// ============================================================================

/** Схема адреса */
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

/** Схема персональных данных */
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

/** Схема паспортных данных */
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

/** Схема имущества */
export const propertySchema: FormSchema<Property> = {
  type: {
    value: 'apartment',
    component: Select,
    componentProps: { label: 'Тип имущества', options: PROPERTY_TYPE_OPTIONS },
  },
  description: {
    value: '',
    component: Textarea,
    componentProps: { label: 'Описание', placeholder: 'Опишите имущество', rows: 2 },
  },
  estimatedValue: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Оценочная стоимость (₽)', type: 'number', min: 0, placeholder: '0' },
  },
  hasEncumbrance: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Имеется обременение (залог)' },
  },
};

/** Схема существующего кредита */
export const existingLoanSchema: FormSchema<ExistingLoan> = {
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
    value: undefined,
    component: Input,
    componentProps: { label: 'Сумма кредита (₽)', type: 'number', min: 0, placeholder: '0' },
  },
  remainingAmount: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Остаток задолженности (₽)', type: 'number', min: 0, placeholder: '0' },
  },
  monthlyPayment: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Ежемесячный платеж (₽)', type: 'number', min: 0, placeholder: '0' },
  },
  maturityDate: {
    value: '',
    component: Input,
    componentProps: { label: 'Дата погашения', type: 'date' },
  },
};

/** Схема созаемщика */
export const coBorrowerSchema: FormSchema<CoBorrower> = {
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
    value: undefined,
    component: Input,
    componentProps: { label: 'Ежемесячный доход (₽)', type: 'number', min: 0, placeholder: '0' },
  },
};

// ============================================================================
// Основная схема формы
// ============================================================================

export const creditApplicationSchema: FormSchema<CreditApplicationForm> = {
  // ============================================================================
  // Шаг 1: Основная информация о кредите
  // ============================================================================
  loanType: {
    value: 'consumer',
    component: Select,
    componentProps: { label: 'Тип кредита', options: LOAN_TYPE_OPTIONS, placeholder: 'Выберите тип кредита' },
  },
  loanAmount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Сумма кредита (₽)',
      type: 'number',
      min: LOAN_LIMITS.minAmount,
      max: LOAN_LIMITS.maxAmount,
      step: LOAN_LIMITS.amountStep,
      placeholder: 'Введите сумму',
    },
  },
  loanTerm: {
    value: 12,
    component: Input,
    componentProps: {
      label: 'Срок кредита (месяцев)',
      type: 'number',
      min: LOAN_LIMITS.minTerm,
      max: LOAN_LIMITS.maxTerm,
      placeholder: 'Введите срок',
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

  // Ипотека (условные поля)
  propertyValue: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Стоимость недвижимости (₽)',
      type: 'number',
      min: 1000000,
      placeholder: 'Введите стоимость',
    },
  },
  initialPayment: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Первоначальный взнос (₽)',
      type: 'number',
      min: 0,
      placeholder: 'Автоматически рассчитывается',
      disabled: true,
    },
  },

  // Автокредит (условные поля)
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
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Год выпуска',
      type: 'number',
      min: CAR_LIMITS.minYear,
      max: CAR_LIMITS.maxYear,
      placeholder: '2020',
    },
  },
  carPrice: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Стоимость автомобиля (₽)',
      type: 'number',
      min: CAR_LIMITS.minPrice,
      max: CAR_LIMITS.maxPrice,
      placeholder: 'Введите стоимость',
    },
  },

  // Вычисляемые поля
  interestRate: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Процентная ставка (%)',
      type: 'number',
      disabled: true,
      placeholder: 'Рассчитывается автоматически',
    },
  },
  monthlyPayment: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Ежемесячный платеж (₽)',
      type: 'number',
      disabled: true,
      placeholder: 'Рассчитывается автоматически',
    },
  },

  // ============================================================================
  // Шаг 2: Персональные данные
  // ============================================================================
  personalData: personalDataSchema,
  passportData: passportDataSchema,
  inn: {
    value: '',
    component: InputMask,
    componentProps: { label: 'ИНН', mask: MASKS.inn, placeholder: '123456789012' },
  },
  snils: {
    value: '',
    component: InputMask,
    componentProps: { label: 'СНИЛС', mask: MASKS.snils, placeholder: '123-456-789 00' },
  },

  // Вычисляемые поля
  fullName: {
    value: '',
    component: Input,
    componentProps: { label: 'Полное имя', disabled: true, placeholder: 'Фамилия Имя Отчество' },
  },
  age: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Возраст (лет)', type: 'number', disabled: true, placeholder: '0' },
  },

  // ============================================================================
  // Шаг 3: Контактная информация
  // ============================================================================
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

  registrationAddress: addressSchema,
  sameAsRegistration: {
    value: true,
    component: Checkbox,
    componentProps: { label: 'Адрес проживания совпадает с адресом регистрации' },
  },
  residenceAddress: addressSchema,

  // ============================================================================
  // Шаг 4: Информация о занятости
  // ============================================================================
  employmentStatus: {
    value: 'employed',
    component: RadioGroup,
    componentProps: { label: 'Статус занятости', options: EMPLOYMENT_STATUS_OPTIONS },
  },

  // Работа по найму (условные поля)
  companyName: {
    value: '',
    component: Input,
    componentProps: { label: 'Название компании', placeholder: 'Введите название' },
  },
  companyInn: {
    value: '',
    component: InputMask,
    componentProps: { label: 'ИНН компании', mask: MASKS.companyInn, placeholder: '1234567890' },
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

  // ИП (условные поля)
  businessType: {
    value: '',
    component: Input,
    componentProps: { label: 'Тип бизнеса', placeholder: 'ИП, ООО и т.д.' },
  },
  businessInn: {
    value: '',
    component: InputMask,
    componentProps: { label: 'ИНН ИП', mask: MASKS.inn, placeholder: '123456789012' },
  },
  businessActivity: {
    value: '',
    component: Textarea,
    componentProps: { label: 'Вид деятельности', placeholder: 'Опишите вид деятельности', rows: 2 },
  },

  // Стаж и доход
  workExperienceTotal: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Общий стаж работы (месяцев)', type: 'number', min: 0, placeholder: '0' },
  },
  workExperienceCurrent: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Стаж на текущем месте (месяцев)', type: 'number', min: 0, placeholder: '0' },
  },
  monthlyIncome: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Ежемесячный доход (₽)', type: 'number', min: 10000, placeholder: '0' },
  },
  additionalIncome: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Дополнительный доход (₽)', type: 'number', min: 0, placeholder: '0' },
  },
  additionalIncomeSource: {
    value: '',
    component: Input,
    componentProps: { label: 'Источник дополнительного дохода', placeholder: 'Опишите источник' },
  },

  // Вычисляемые поля
  totalIncome: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Общий доход (₽)',
      type: 'number',
      disabled: true,
      placeholder: 'Рассчитывается автоматически',
    },
  },

  // ============================================================================
  // Шаг 5: Дополнительная информация
  // ============================================================================
  maritalStatus: {
    value: 'single',
    component: RadioGroup,
    componentProps: { label: 'Семейное положение', options: MARITAL_STATUS_OPTIONS },
  },
  dependents: {
    value: 0,
    component: Input,
    componentProps: { label: 'Количество иждивенцев', type: 'number', min: 0, max: 10, placeholder: '0' },
  },
  education: {
    value: 'higher',
    component: Select,
    componentProps: { label: 'Образование', options: EDUCATION_OPTIONS, placeholder: 'Выберите уровень образования' },
  },

  hasProperty: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'У меня есть имущество' },
  },
  properties: [propertySchema],

  hasExistingLoans: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'У меня есть другие кредиты' },
  },
  existingLoans: [existingLoanSchema],

  hasCoBorrower: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Добавить созаемщика' },
  },
  coBorrowers: [coBorrowerSchema],

  // Вычисляемые поля
  paymentToIncomeRatio: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Процент платежа от дохода (%)',
      type: 'number',
      disabled: true,
      placeholder: 'Рассчитывается автоматически',
    },
  },
  coBorrowersIncome: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Доход созаемщиков (₽)',
      type: 'number',
      disabled: true,
      placeholder: 'Рассчитывается автоматически',
    },
  },

  // ============================================================================
  // Шаг 6: Подтверждение и согласия
  // ============================================================================
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
};
