// model/schema.ts - Схема формы заявки на кредит

import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup } from '@/components/ui/radio-group';
import { InputMask } from '@/components/ui/input-mask';
import { Textarea } from '@/components/ui/textarea';

import type { CreditApplicationForm, Gender, PropertyType } from './types';

import {
  LOAN_TYPE_OPTIONS,
  GENDER_OPTIONS,
  EMPLOYMENT_STATUS_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  EDUCATION_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  LOAN_LIMITS,
} from './constants';

// =============================================================================
// ПЕРЕИСПОЛЬЗУЕМЫЕ СХЕМЫ
// =============================================================================

/**
 * Схема адреса
 */
export const addressSchema = {
  region: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Регион',
      placeholder: 'Введите регион',
      testId: 'region',
    },
  },
  city: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Город',
      placeholder: 'Введите город',
      testId: 'city',
    },
  },
  street: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Улица',
      placeholder: 'Введите улицу',
      testId: 'street',
    },
  },
  house: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дом',
      placeholder: 'Номер дома',
      testId: 'house',
    },
  },
  apartment: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Квартира',
      placeholder: 'Номер квартиры',
      testId: 'apartment',
    },
  },
  postalCode: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Почтовый индекс',
      mask: '999999',
      placeholder: '123456',
      testId: 'postalCode',
    },
  },
};

/**
 * Схема персональных данных
 */
export const personalDataSchema = {
  lastName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Фамилия',
      placeholder: 'Введите фамилию',
      testId: 'lastName',
    },
  },
  firstName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Имя',
      placeholder: 'Введите имя',
      testId: 'firstName',
    },
  },
  middleName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Отчество',
      placeholder: 'Введите отчество',
      testId: 'middleName',
    },
  },
  birthDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата рождения',
      type: 'date',
      testId: 'birthDate',
    },
  },
  gender: {
    value: 'male' as Gender,
    component: RadioGroup,
    componentProps: {
      label: 'Пол',
      options: GENDER_OPTIONS,
      testId: 'gender',
    },
  },
  birthPlace: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Место рождения',
      placeholder: 'Введите место рождения',
      testId: 'birthPlace',
    },
  },
};

/**
 * Схема паспортных данных
 */
export const passportDataSchema = {
  series: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Серия',
      mask: '99 99',
      placeholder: '45 12',
      testId: 'passportSeries',
    },
  },
  number: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Номер',
      mask: '999999',
      placeholder: '123456',
      testId: 'passportNumber',
    },
  },
  issueDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата выдачи',
      type: 'date',
      testId: 'passportIssueDate',
    },
  },
  issuedBy: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Кем выдан',
      placeholder: 'Введите название органа',
      testId: 'passportIssuedBy',
    },
  },
  departmentCode: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Код подразделения',
      mask: '999-999',
      placeholder: '770-001',
      testId: 'passportDepartmentCode',
    },
  },
};

/**
 * Схема имущества (для массива)
 */
export const propertySchema = {
  type: {
    value: 'apartment' as PropertyType,
    component: Select,
    componentProps: {
      label: 'Тип имущества',
      options: PROPERTY_TYPE_OPTIONS,
      placeholder: 'Выберите тип',
      testId: 'propertyType',
    },
  },
  description: {
    value: '',
    component: Textarea,
    componentProps: {
      label: 'Описание',
      placeholder: 'Опишите имущество',
      rows: 2,
      testId: 'propertyDescription',
    },
  },
  estimatedValue: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Оценочная стоимость',
      type: 'number',
      placeholder: '0',
      min: 0,
      testId: 'propertyValue',
    },
  },
  hasEncumbrance: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Есть обременение (залог)',
      testId: 'propertyEncumbrance',
    },
  },
};

/**
 * Схема существующего кредита (для массива)
 */
export const existingLoanSchema = {
  bank: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Банк',
      placeholder: 'Название банка',
      testId: 'loanBank',
    },
  },
  type: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Тип кредита',
      placeholder: 'Потребительский, ипотека и т.д.',
      testId: 'loanType',
    },
  },
  amount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Сумма кредита',
      type: 'number',
      placeholder: '0',
      min: 0,
      testId: 'loanAmount',
    },
  },
  remainingAmount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Остаток долга',
      type: 'number',
      placeholder: '0',
      min: 0,
      testId: 'loanRemaining',
    },
  },
  monthlyPayment: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Ежемесячный платёж',
      type: 'number',
      placeholder: '0',
      min: 0,
      testId: 'loanMonthlyPayment',
    },
  },
  maturityDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата погашения',
      type: 'date',
      testId: 'loanMaturityDate',
    },
  },
};

/**
 * Схема созаёмщика (для массива)
 */
export const coBorrowerSchema = {
  personalData: personalDataSchema,
  phone: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Телефон',
      mask: '+7 (999) 999-99-99',
      placeholder: '+7 (999) 999-99-99',
      testId: 'coBorrowerPhone',
    },
  },
  email: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Email',
      type: 'email',
      placeholder: 'email@example.com',
      testId: 'coBorrowerEmail',
    },
  },
  relationship: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Отношение к заёмщику',
      placeholder: 'Супруг/супруга, родственник и т.д.',
      testId: 'coBorrowerRelationship',
    },
  },
  monthlyIncome: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Ежемесячный доход',
      type: 'number',
      placeholder: '0',
      min: 0,
      testId: 'coBorrowerIncome',
    },
  },
};

// =============================================================================
// ОСНОВНАЯ СХЕМА ФОРМЫ
// =============================================================================

export const creditApplicationSchema = {
  // ===========================================================================
  // Step 1: Информация о кредите
  // ===========================================================================
  loanType: {
    value: 'consumer' as CreditApplicationForm['loanType'],
    component: Select,
    componentProps: {
      label: 'Тип кредита',
      options: LOAN_TYPE_OPTIONS,
      placeholder: 'Выберите тип кредита',
      testId: 'loanType',
    },
  },
  loanAmount: {
    value: undefined as CreditApplicationForm['loanAmount'],
    component: Input,
    componentProps: {
      label: 'Сумма кредита',
      type: 'number',
      placeholder: 'Введите сумму',
      min: LOAN_LIMITS.amount.min,
      max: LOAN_LIMITS.amount.max,
      step: LOAN_LIMITS.amount.step,
      testId: 'loanAmount',
    },
  },
  loanTerm: {
    value: undefined as CreditApplicationForm['loanTerm'],
    component: Input,
    componentProps: {
      label: 'Срок кредита (месяцев)',
      type: 'number',
      placeholder: 'Введите срок',
      min: LOAN_LIMITS.term.min,
      max: LOAN_LIMITS.term.max,
      testId: 'loanTerm',
    },
  },
  loanPurpose: {
    value: '',
    component: Textarea,
    componentProps: {
      label: 'Цель кредита',
      placeholder: 'Опишите цель получения кредита',
      rows: 3,
      maxLength: 500,
      testId: 'loanPurpose',
    },
  },

  // Поля для ипотеки
  propertyValue: {
    value: undefined as CreditApplicationForm['propertyValue'],
    component: Input,
    componentProps: {
      label: 'Стоимость недвижимости',
      type: 'number',
      placeholder: 'Введите стоимость',
      min: LOAN_LIMITS.propertyValue.min,
      testId: 'propertyValue',
    },
  },
  initialPayment: {
    value: undefined as CreditApplicationForm['initialPayment'],
    component: Input,
    componentProps: {
      label: 'Первоначальный взнос',
      type: 'number',
      placeholder: 'Рассчитывается автоматически',
      disabled: true,
      testId: 'initialPayment',
    },
  },

  // Поля для автокредита
  carBrand: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Марка автомобиля',
      placeholder: 'Введите марку',
      testId: 'carBrand',
    },
  },
  carModel: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Модель автомобиля',
      placeholder: 'Введите модель',
      testId: 'carModel',
    },
  },
  carYear: {
    value: undefined as CreditApplicationForm['carYear'],
    component: Input,
    componentProps: {
      label: 'Год выпуска',
      type: 'number',
      placeholder: 'Введите год',
      min: LOAN_LIMITS.carYear.min,
      max: LOAN_LIMITS.carYear.max,
      testId: 'carYear',
    },
  },
  carPrice: {
    value: undefined as CreditApplicationForm['carPrice'],
    component: Input,
    componentProps: {
      label: 'Стоимость автомобиля',
      type: 'number',
      placeholder: 'Введите стоимость',
      min: LOAN_LIMITS.carPrice.min,
      max: LOAN_LIMITS.carPrice.max,
      testId: 'carPrice',
    },
  },

  // ===========================================================================
  // Step 2: Персональные данные
  // ===========================================================================
  personalData: personalDataSchema,
  passportData: passportDataSchema,
  inn: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'ИНН',
      mask: '999999999999',
      placeholder: '123456789012',
      testId: 'inn',
    },
  },
  snils: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'СНИЛС',
      mask: '999-999-999 99',
      placeholder: '123-456-789 00',
      testId: 'snils',
    },
  },

  // ===========================================================================
  // Step 3: Контактная информация
  // ===========================================================================
  phoneMain: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Основной телефон',
      mask: '+7 (999) 999-99-99',
      placeholder: '+7 (999) 999-99-99',
      testId: 'phoneMain',
    },
  },
  phoneAdditional: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Дополнительный телефон',
      mask: '+7 (999) 999-99-99',
      placeholder: '+7 (999) 999-99-99',
      testId: 'phoneAdditional',
    },
  },
  email: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Email',
      type: 'email',
      placeholder: 'email@example.com',
      testId: 'email',
    },
  },
  emailAdditional: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дополнительный email',
      type: 'email',
      placeholder: 'email@example.com',
      testId: 'emailAdditional',
    },
  },
  registrationAddress: addressSchema,
  sameAsRegistration: {
    value: true,
    component: Checkbox,
    componentProps: {
      label: 'Адрес проживания совпадает с адресом регистрации',
      testId: 'sameAsRegistration',
    },
  },
  residenceAddress: addressSchema,

  // ===========================================================================
  // Step 4: Информация о занятости
  // ===========================================================================
  employmentStatus: {
    value: 'employed' as CreditApplicationForm['employmentStatus'],
    component: RadioGroup,
    componentProps: {
      label: 'Статус занятости',
      options: EMPLOYMENT_STATUS_OPTIONS,
      testId: 'employmentStatus',
    },
  },

  // Поля для работающих
  companyName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Название компании',
      placeholder: 'Введите название организации',
      testId: 'companyName',
    },
  },
  companyInn: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'ИНН компании',
      mask: '9999999999',
      placeholder: '1234567890',
      testId: 'companyInn',
    },
  },
  companyPhone: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Телефон компании',
      mask: '+7 (999) 999-99-99',
      placeholder: '+7 (495) 123-45-67',
      testId: 'companyPhone',
    },
  },
  companyAddress: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Адрес компании',
      placeholder: 'Введите адрес',
      testId: 'companyAddress',
    },
  },
  position: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Должность',
      placeholder: 'Введите должность',
      testId: 'position',
    },
  },

  // Общие поля занятости
  workExperienceTotal: {
    value: undefined as CreditApplicationForm['workExperienceTotal'],
    component: Input,
    componentProps: {
      label: 'Общий стаж (месяцев)',
      type: 'number',
      placeholder: 'Введите стаж в месяцах',
      min: 0,
      testId: 'workExperienceTotal',
    },
  },
  workExperienceCurrent: {
    value: undefined as CreditApplicationForm['workExperienceCurrent'],
    component: Input,
    componentProps: {
      label: 'Стаж на текущем месте (месяцев)',
      type: 'number',
      placeholder: 'Введите стаж в месяцах',
      min: 0,
      testId: 'workExperienceCurrent',
    },
  },
  monthlyIncome: {
    value: undefined as CreditApplicationForm['monthlyIncome'],
    component: Input,
    componentProps: {
      label: 'Ежемесячный доход',
      type: 'number',
      placeholder: 'Введите сумму',
      min: LOAN_LIMITS.income.min,
      testId: 'monthlyIncome',
    },
  },
  additionalIncome: {
    value: undefined as CreditApplicationForm['additionalIncome'],
    component: Input,
    componentProps: {
      label: 'Дополнительный доход',
      type: 'number',
      placeholder: 'Введите сумму (если есть)',
      min: 0,
      testId: 'additionalIncome',
    },
  },
  additionalIncomeSource: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Источник дополнительного дохода',
      placeholder: 'Фриланс, аренда и т.д.',
      testId: 'additionalIncomeSource',
    },
  },

  // Поля для самозанятых
  businessType: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Форма бизнеса',
      placeholder: 'ИП, ООО и т.д.',
      testId: 'businessType',
    },
  },
  businessInn: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'ИНН бизнеса',
      mask: '999999999999',
      placeholder: '123456789012',
      testId: 'businessInn',
    },
  },
  businessActivity: {
    value: '',
    component: Textarea,
    componentProps: {
      label: 'Описание деятельности',
      placeholder: 'Опишите вид деятельности',
      rows: 2,
      testId: 'businessActivity',
    },
  },

  // ===========================================================================
  // Step 5: Дополнительная информация
  // ===========================================================================
  maritalStatus: {
    value: 'single' as CreditApplicationForm['maritalStatus'],
    component: RadioGroup,
    componentProps: {
      label: 'Семейное положение',
      options: MARITAL_STATUS_OPTIONS,
      testId: 'maritalStatus',
    },
  },
  dependents: {
    value: undefined as CreditApplicationForm['dependents'],
    component: Input,
    componentProps: {
      label: 'Количество иждивенцев',
      type: 'number',
      placeholder: '0',
      min: LOAN_LIMITS.dependents.min,
      max: LOAN_LIMITS.dependents.max,
      testId: 'dependents',
    },
  },
  education: {
    value: 'higher' as CreditApplicationForm['education'],
    component: Select,
    componentProps: {
      label: 'Образование',
      options: EDUCATION_OPTIONS,
      placeholder: 'Выберите уровень образования',
      testId: 'education',
    },
  },

  // Имущество
  hasProperty: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'У меня есть имущество',
      testId: 'hasProperty',
    },
  },
  properties: [propertySchema] as [typeof propertySchema],

  // Существующие кредиты
  hasExistingLoans: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'У меня есть действующие кредиты',
      testId: 'hasExistingLoans',
    },
  },
  existingLoans: [existingLoanSchema] as [typeof existingLoanSchema],

  // Созаёмщики
  hasCoBorrower: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Добавить созаёмщика',
      testId: 'hasCoBorrower',
    },
  },
  coBorrowers: [coBorrowerSchema] as [typeof coBorrowerSchema],

  // ===========================================================================
  // Step 6: Подтверждение и согласия
  // ===========================================================================
  agreePersonalData: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Согласен на обработку персональных данных',
      testId: 'agreePersonalData',
    },
  },
  agreeCreditHistory: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Согласен на проверку кредитной истории',
      testId: 'agreeCreditHistory',
    },
  },
  agreeMarketing: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Согласен на получение рекламных материалов',
      testId: 'agreeMarketing',
    },
  },
  agreeTerms: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Согласен с условиями кредитования',
      testId: 'agreeTerms',
    },
  },
  confirmAccuracy: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Подтверждаю достоверность указанных данных',
      testId: 'confirmAccuracy',
    },
  },
  electronicSignature: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'SMS-код подтверждения',
      mask: '999999',
      placeholder: '123456',
      testId: 'electronicSignature',
    },
  },

  // ===========================================================================
  // Вычисляемые поля (readonly)
  // ===========================================================================
  interestRate: {
    value: undefined as CreditApplicationForm['interestRate'],
    component: Input,
    componentProps: {
      label: 'Процентная ставка (%)',
      type: 'number',
      disabled: true,
      testId: 'interestRate',
    },
  },
  monthlyPayment: {
    value: undefined as CreditApplicationForm['monthlyPayment'],
    component: Input,
    componentProps: {
      label: 'Ежемесячный платёж',
      type: 'number',
      disabled: true,
      testId: 'monthlyPaymentCalc',
    },
  },
  fullName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'ФИО',
      disabled: true,
      testId: 'fullName',
    },
  },
  age: {
    value: undefined as CreditApplicationForm['age'],
    component: Input,
    componentProps: {
      label: 'Возраст',
      type: 'number',
      disabled: true,
      testId: 'age',
    },
  },
  totalIncome: {
    value: undefined as CreditApplicationForm['totalIncome'],
    component: Input,
    componentProps: {
      label: 'Общий доход',
      type: 'number',
      disabled: true,
      testId: 'totalIncome',
    },
  },
  paymentToIncomeRatio: {
    value: undefined as CreditApplicationForm['paymentToIncomeRatio'],
    component: Input,
    componentProps: {
      label: 'Отношение платежа к доходу (%)',
      type: 'number',
      disabled: true,
      testId: 'paymentToIncomeRatio',
    },
  },
  coBorrowersIncome: {
    value: undefined as CreditApplicationForm['coBorrowersIncome'],
    component: Input,
    componentProps: {
      label: 'Доход созаёмщиков',
      type: 'number',
      disabled: true,
      testId: 'coBorrowersIncome',
    },
  },
};

export type CreditApplicationSchema = typeof creditApplicationSchema;
