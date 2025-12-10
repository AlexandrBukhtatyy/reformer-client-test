import type { FormSchema } from '@reformer/core';
import { Input } from '@/components/ui/input';
import { InputMask } from '@/components/ui/input-mask';
import { Select } from '@/components/ui/select';
import { RadioGroup } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import type { InsuranceApplicationForm } from './type';

// Options for selects and radio groups
const INSURANCE_TYPES = [
  { value: 'casco', label: 'КАСКО' },
  { value: 'osago', label: 'ОСАГО' },
  { value: 'property', label: 'Недвижимость' },
  { value: 'life', label: 'Жизнь и здоровье' },
  { value: 'travel', label: 'Путешествия' },
];

const INSURANCE_PERIODS = [
  { value: 3, label: '3 месяца' },
  { value: 6, label: '6 месяцев' },
  { value: 12, label: '1 год' },
  { value: 24, label: '2 года' },
  { value: 36, label: '3 года' },
];

const PAYMENT_TYPES = [
  { value: 'single', label: 'Единовременно' },
  { value: 'installments', label: 'В рассрочку' },
];

const INSTALLMENT_OPTIONS = [
  { value: 2, label: '2 платежа' },
  { value: 3, label: '3 платежа' },
  { value: 4, label: '4 платежа' },
  { value: 6, label: '6 платежей' },
  { value: 12, label: '12 платежей' },
];

const INSURED_TYPES = [
  { value: 'individual', label: 'Физическое лицо' },
  { value: 'company', label: 'Юридическое лицо' },
];

const GENDERS = [
 { value: 'male', label: 'Мужской' },
 { value: 'female', label: 'Женский' },
];

const VEHICLE_BODY_TYPES = [
  { value: 'sedan', label: 'Седан' },
 { value: 'hatchback', label: 'Хэтчбек' },
  { value: 'suv', label: 'Внедорожник' },
  { value: 'wagon', label: 'Универсал' },
  { value: 'coupe', label: 'Купе' },
 { value: 'minivan', label: 'Минивэн' },
  { value: 'pickup', label: 'Пикап' },
];

const VEHICLE_TRANSMISSIONS = [
  { value: 'manual', label: 'Механика' },
 { value: 'automatic', label: 'Автомат' },
];

const VEHICLE_USAGE_PURPOSES = [
  { value: 'personal', label: 'Личное' },
  { value: 'taxi', label: 'Такси' },
 { value: 'training', label: 'Учебный' },
  { value: 'commercial', label: 'Коммерческое' },
];

const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Квартира' },
  { value: 'house', label: 'Дом' },
  { value: 'townhouse', label: 'Таунхаус' },
  { value: 'commercial', label: 'Коммерческая' },
  { value: 'land', label: 'Земельный участок' },
];

const WALL_MATERIALS = [
  { value: 'brick', label: 'Кирпич' },
  { value: 'concrete', label: 'Бетон' },
 { value: 'wood', label: 'Дерево' },
  { value: 'panel', label: 'Панель' },
 { value: 'monolithic', label: 'Монолит' },
  { value: 'other', label: 'Другое' },
];

const TRAVEL_DESTINATIONS = [
  { value: 'europe', label: 'Европа' },
  { value: 'asia', label: 'Азия' },
  { value: 'us-canada', label: 'США и Канада' },
  { value: 'cis', label: 'СНГ' },
 { value: 'worldwide', label: 'Весь мир' },
];

const TRIP_PURPOSES = [
  { value: 'tourism', label: 'Туризм' },
  { value: 'business', label: 'Бизнес' },
 { value: 'study', label: 'Обучение' },
 { value: 'work', label: 'Работа' },
  { value: 'other', label: 'Другое' },
];

const CLAIM_TYPES = [
  { value: 'accident', label: 'ДТП' },
  { value: 'theft', label: 'Угон/кража' },
  { value: 'damage', label: 'Повреждение' },
 { value: 'natural-disaster', label: 'Стихийное бедствие' },
  { value: 'medical', label: 'Медицинский случай' },
  { value: 'other', label: 'Другое' },
];

const RELATIONSHIPS = [
  { value: 'spouse', label: 'Супруг(а)' },
  { value: 'child', label: 'Ребенок' },
  { value: 'parent', label: 'Родитель' },
  { value: 'sibling', label: 'Брат/сестра' },
  { value: 'other', label: 'Другое' },
];

const REFERRAL_SOURCES = [
  { value: 'internet', label: 'Интернет' },
  { value: 'friend', label: 'Рекомендации друзей' },
 { value: 'tv', label: 'Телевидение' },
  { value: 'agent', label: 'Страховой агент' },
 { value: 'other', label: 'Другое' },
];

// Sub-schemas for nested objects
const personalDataSchema: FormSchema<InsuranceApplicationForm['personalData']> = {
  lastName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Фамилия',
      placeholder: 'Введите фамилию',
    },
  },
  firstName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Имя',
      placeholder: 'Введите имя',
    },
 },
  middleName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Отчество',
      placeholder: 'Введите отчество',
    },
  },
  birthDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата рождения',
      type: 'date',
    },
  },
 gender: {
    value: 'male',
    component: RadioGroup,
    componentProps: {
      label: 'Пол',
      options: GENDERS,
    },
  },
};

const companyDataSchema: FormSchema<InsuranceApplicationForm['companyData']> = {
  name: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Название организации',
      placeholder: 'ООО "Компания"',
    },
  },
  inn: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'ИНН организации',
      mask: '999999',
      placeholder: '1234567890',
    },
  },
  ogrn: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'ОГРН',
      mask: '9999',
      placeholder: '1234567890123',
    },
  },
 kpp: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'КПП',
      mask: '99999999',
      placeholder: '123456789',
    },
  },
  ceoName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'ФИО руководителя',
      placeholder: 'Иванов Иван Иванович',
    },
  },
};

const passportDataSchema: FormSchema<InsuranceApplicationForm['passportData']> = {
  series: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Серия паспорта',
      mask: '99 99',
      placeholder: '12 34',
    },
  },
  number: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Номер паспорта',
      mask: '9999',
      placeholder: '123456',
    },
  },
  issueDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата выдачи',
      type: 'date',
    },
  },
  issuedBy: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Кем выдан',
      placeholder: 'Отделением УФМС...',
    },
  },
};

const propertyAddressSchema: FormSchema<InsuranceApplicationForm['property']['address']> = {
  region: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Регион',
      placeholder: 'Московская область',
    },
  },
  city: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Город',
      placeholder: 'Москва',
    },
  },
  street: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Улица',
      placeholder: 'ул. Ленина',
    },
  },
  house: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дом',
      placeholder: '1',
    },
  },
  apartment: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Квартира',
      placeholder: '1',
    },
  },
};

const propertySchema: FormSchema<InsuranceApplicationForm['property']> = {
  type: {
    value: 'apartment',
    component: Select,
    componentProps: {
      label: 'Тип недвижимости',
      options: PROPERTY_TYPES,
    },
  },
  address: propertyAddressSchema,
  area: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Площадь (м²)',
      type: 'number',
      placeholder: '50',
    },
  },
  floors: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Этажность здания',
      type: 'number',
      placeholder: '9',
    },
  },
  floor: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Этаж квартиры',
      type: 'number',
      placeholder: '5',
    },
  },
  yearBuilt: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Год постройки',
      type: 'number',
      placeholder: '2010',
    },
  },
  wallMaterial: {
    value: 'brick',
    component: Select,
    componentProps: {
      label: 'Материал стен',
      options: WALL_MATERIALS,
    },
  },
  marketValue: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Рыночная стоимость (₽)',
      type: 'number',
      placeholder: '5000000',
    },
  },
  ownershipDoc: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Номер документа о собственности',
      placeholder: '00-0/000-00/000/000/0000-0000',
    },
  },
};

const propertyCoverageOptionsSchema: FormSchema<InsuranceApplicationForm['propertyCoverageOptions']> = {
  structure: {
    value: true,
    component: Checkbox,
    componentProps: {
      label: 'Страхование конструктива',
    },
  },
  interior: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Страхование отделки',
    },
  },
 movables: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Страхование движимого имущества',
    },
  },
  liability: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Гражданская ответственность',
    },
  },
};

const healthDataSchema: FormSchema<InsuranceApplicationForm['health']> = {
  height: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Рост (см)',
      type: 'number',
      placeholder: '175',
    },
  },
  weight: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Вес (кг)',
      type: 'number',
      placeholder: '70',
    },
  },
 bmi: {
    value: 0,
    component: Input,
    componentProps: {
      label: 'Индекс массы тела',
      type: 'number',
      disabled: true,
      readonly: true,
    },
  },
  bloodPressure: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Артериальное давление',
      placeholder: '120/80',
    },
  },
 isSmoker: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Курящий',
    },
  },
  smokingYears: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Стаж курения (лет)',
      type: 'number',
      placeholder: '5',
    },
  },
  hasChronicDiseases: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Хронические заболевания',
    },
  },
 chronicDiseases: {
    value: '',
    component: Textarea,
    componentProps: {
      label: 'Описание заболеваний',
      placeholder: 'Перечислите заболевания',
      rows: 3,
    },
  },
  hadSurgeries: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Перенесенные операции',
    },
  },
  surgeries: {
    value: '',
    component: Textarea,
    componentProps: {
      label: 'Описание операций',
      placeholder: 'Перечислите операции',
      rows: 3,
    },
  },
 occupation: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Род занятий',
      placeholder: 'Менеджер',
    },
  },
  isHighRiskJob: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Опасная профессия',
    },
  },
  practicesSports: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Занятия спортом',
    },
  },
  extremeSports: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Экстремальные виды спорта',
    },
  },
};

const lifeCoverageOptionsSchema: FormSchema<InsuranceApplicationForm['lifeCoverageOptions']> = {
  death: {
    value: true,
    component: Checkbox,
    componentProps: {
      label: 'Страхование на случай смерти',
    },
  },
  disability: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Страхование инвалидности',
    },
  },
  criticalIllness: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Критические заболевания',
    },
  },
  accident: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Несчастные случаи',
    },
  },
};

const travelSchema: FormSchema<InsuranceApplicationForm['travel']> = {
  destination: {
    value: 'europe',
    component: Select,
    componentProps: {
      label: 'Страна/регион назначения',
      options: TRAVEL_DESTINATIONS,
    },
  },
  tripPurpose: {
    value: 'tourism',
    component: Select,
    componentProps: {
      label: 'Цель поездки',
      options: TRIP_PURPOSES,
    },
  },
  departureDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата отъезда',
      type: 'date',
    },
  },
  returnDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата возвращения',
      type: 'date',
    },
  },
  tripDuration: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Длительность поездки (дни)',
      type: 'number',
      disabled: true,
      readonly: true,
    },
  },
  isMultipleTrips: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Мультипоездка (годовой полис)',
    },
  },
};

const travelerSchema: FormSchema<InsuranceApplicationForm['travelers'][0]> = {
  fullName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'ФИО',
      placeholder: 'Ivanov Ivan',
    },
  },
  birthDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата рождения',
      type: 'date',
    },
  },
  passportNumber: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Номер загранпаспорта',
      placeholder: '00 000000',
    },
  },
};

const travelCoverageOptionsSchema: FormSchema<InsuranceApplicationForm['travelCoverageOptions']> = {
  medical: {
    value: true,
    component: Checkbox,
    componentProps: {
      label: 'Медицинские расходы',
    },
  },
  baggage: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Багаж',
    },
  },
  tripCancellation: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Отмена поездки',
    },
  },
  flightDelay: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Задержка рейса',
    },
  },
  carRental: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Аренда авто',
    },
  },
};

const vehicleSchema: FormSchema<InsuranceApplicationForm['vehicle']> = {
 vin: {
    value: '',
    component: Input,
    componentProps: {
      label: 'VIN-номер',
      placeholder: 'XXXXXXXXX',
    },
  },
  brand: {
    value: '',
    component: Select,
    componentProps: {
      label: 'Марка автомобиля',
      placeholder: 'Выберите марку',
    },
  },
  model: {
    value: '',
    component: Select,
    componentProps: {
      label: 'Модель автомобиля',
      placeholder: 'Выберите модель',
    },
  },
  year: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Год выпуска',
      type: 'number',
      placeholder: '2020',
    },
  },
  mileage: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Пробег (км)',
      type: 'number',
      placeholder: '5000',
    },
  },
  enginePower: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Мощность двигателя (л.с.)',
      type: 'number',
      placeholder: '150',
    },
  },
  bodyType: {
    value: 'sedan',
    component: Select,
    componentProps: {
      label: 'Тип кузова',
      options: VEHICLE_BODY_TYPES,
    },
  },
  transmission: {
    value: 'manual',
    component: RadioGroup,
    componentProps: {
      label: 'Коробка передач',
      options: VEHICLE_TRANSMISSIONS,
    },
  },
  marketValue: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Рыночная стоимость (₽)',
      type: 'number',
      placeholder: '1500000',
    },
  },
  licensePlate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Госномер',
      placeholder: 'А000АА00',
    },
  },
  registrationCert: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Номер СТС',
      placeholder: '00 00 000000',
    },
  },
  hasAntiTheft: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Наличие противоугонной системы',
    },
  },
  antiTheftBrand: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Марка противоугонной системы',
      placeholder: 'StarLine',
    },
  },
  garageParking: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Гаражное хранение',
    },
  },
  usagePurpose: {
    value: 'personal',
    component: Select,
    componentProps: {
      label: 'Цель использования',
      options: VEHICLE_USAGE_PURPOSES,
    },
  },
};

const driverSchema: FormSchema<InsuranceApplicationForm['drivers'][0]> = {
  fullName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'ФИО водителя',
      placeholder: 'Иванов Иван Иванович',
    },
  },
  birthDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата рождения',
      type: 'date',
    },
  },
  licenseNumber: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Номер ВУ',
      placeholder: '00 00 000000',
    },
  },
  licenseIssueDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата выдачи ВУ',
      type: 'date',
    },
  },
  drivingExperience: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Стаж вождения (лет)',
      type: 'number',
      disabled: true,
      readonly: true,
    },
  },
  accidentsCount: {
    value: 0,
    component: Input,
    componentProps: {
      label: 'Кол-во ДТП за 3 года',
      type: 'number',
      placeholder: '0',
    },
  },
  isMainDriver: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Основной водитель',
    },
  },
};

const beneficiarySchema: FormSchema<InsuranceApplicationForm['beneficiaries'][0]> = {
  fullName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'ФИО',
      placeholder: 'Иванов Иван Иванович',
    },
  },
  birthDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата рождения',
      type: 'date',
    },
  },
  relationship: {
    value: 'spouse',
    component: Select,
    componentProps: {
      label: 'Степень родства',
      options: RELATIONSHIPS,
    },
  },
  share: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Доля (%)',
      type: 'number',
      placeholder: '50',
    },
  },
  phone: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Телефон',
      mask: '+7 (999) 999-99-9',
      placeholder: '+7 (___) ___-__-__',
    },
  },
};

const claimSchema: FormSchema<InsuranceApplicationForm['claims'][0]> = {
  date: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата события',
      type: 'date',
    },
  },
  type: {
    value: 'accident',
    component: Select,
    componentProps: {
      label: 'Тип события',
      options: CLAIM_TYPES,
    },
  },
  description: {
    value: '',
    component: Textarea,
    componentProps: {
      label: 'Описание',
      placeholder: 'Опишите событие',
      rows: 3,
    },
  },
  amount: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Сумма выплаты (₽)',
      type: 'number',
      placeholder: '100000',
    },
  },
  atFault: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'По вине страхователя',
    },
  },
};

export const insuranceApplicationSchema: FormSchema<InsuranceApplicationForm> = {
 // Step 1: Insurance Type and Parameters
  insuranceType: {
    value: 'casco',
    component: Select,
    componentProps: {
      label: 'Тип страхования',
      options: INSURANCE_TYPES,
    },
  },
  insurancePeriod: {
    value: 12,
    component: Select,
    componentProps: {
      label: 'Срок страхования',
      options: INSURANCE_PERIODS,
    },
  },
  startDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата начала действия полиса',
      type: 'date',
    },
  },
 endDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата окончания',
      type: 'date',
      disabled: true,
      readonly: true,
    },
  },
  coverageAmount: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Страховая сумма (₽)',
      type: 'number',
      placeholder: 'от 100 000 до 50 000 000',
    },
  },
  deductible: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Франшиза (₽)',
      type: 'number',
      placeholder: '0',
    },
  },
  paymentType: {
    value: 'single',
    component: RadioGroup,
    componentProps: {
      label: 'Способ оплаты',
      options: PAYMENT_TYPES,
    },
  },
  installments: {
    value: null,
    component: Select,
    componentProps: {
      label: 'Количество платежей',
      options: INSTALLMENT_OPTIONS,
    },
  },

  // Step 2: Insured Person Data
  insuredType: {
    value: 'individual',
    component: RadioGroup,
    componentProps: {
      label: 'Тип страхователя',
      options: INSURED_TYPES,
    },
  },
  personalData: personalDataSchema,
  companyData: companyDataSchema,
  passportData: passportDataSchema,
 phone: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'Телефон',
      mask: '+7 (999) 999-99-99',
      placeholder: '+7 (___) ___-__-__',
    },
  },
  email: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Email',
      type: 'email',
      placeholder: 'example@mail.com',
    },
  },
  fullName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Полное имя (ФИО)',
      disabled: true,
      readonly: true,
    },
  },
  age: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Возраст',
      type: 'number',
      disabled: true,
      readonly: true,
    },
  },

  // Step 3: Insurance Object (depends on insuranceType)
  vehicle: vehicleSchema,
  property: propertySchema,
  propertyCoverageOptions: propertyCoverageOptionsSchema,
  health: healthDataSchema,
  lifeCoverageOptions: lifeCoverageOptionsSchema,
  travel: travelSchema,
  travelers: [travelerSchema],
  travelCoverageOptions: travelCoverageOptionsSchema,

  // Step 4: Drivers/Beneficiaries (depends on insuranceType)
  drivers: [driverSchema],
  unlimitedDrivers: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Неограниченное количество водителей',
    },
  },
  minDriverAge: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Мин. возраст водителя',
      type: 'number',
      disabled: true,
      readonly: true,
    },
  },
  minDriverExperience: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Мин. стаж водителя',
      type: 'number',
      disabled: true,
      readonly: true,
    },
  },
  beneficiaries: [beneficiarySchema],
  totalBeneficiaryShare: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Сумма долей (%)',
      type: 'number',
      disabled: true,
      readonly: true,
    },
  },

  // Step 5: History and Additional Info
  hasPreviousInsurance: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Был ли полис ранее',
    },
  },
  previousInsurer: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Предыдущий страховщик',
      placeholder: 'Название компании',
    },
  },
  previousPolicyNumber: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Номер предыдущего полиса',
      placeholder: 'XXX-000000',
    },
  },
  previousPolicyEndDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата окончания предыдущего полиса',
      type: 'date',
    },
  },
  hadClaims: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Были ли страховые случаи',
    },
  },
  claims: [claimSchema],
  promoCode: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Промокод',
      placeholder: 'PROMO2024',
    },
  },
 referralSource: {
    value: 'internet',
    component: Select,
    componentProps: {
      label: 'Откуда узнали о нас',
      options: REFERRAL_SOURCES,
    },
  },
  agentCode: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Код агента',
      placeholder: 'AGT-000',
    },
  },
  additionalNotes: {
    value: '',
    component: Textarea,
    componentProps: {
      label: 'Дополнительные комментарии',
      placeholder: 'Ваши пожелания...',
      rows: 4,
    },
  },

  // Step 6: Calculation and Confirmation
  basePremium: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Базовая премия (₽)',
      type: 'number',
      disabled: true,
      readonly: true,
    },
  },
 ageCoefficient: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Коэффициент возраста',
      type: 'number',
      disabled: true,
      readonly: true,
    },
  },
  experienceCoefficient: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Коэффициент стажа',
      type: 'number',
      disabled: true,
      readonly: true,
    },
  },
  regionCoefficient: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Региональный коэффициент',
      type: 'number',
      disabled: true,
      readonly: true,
    },
  },
  claimsCoefficient: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Коэффициент аварийности (КБМ)',
      type: 'number',
      disabled: true,
      readonly: true,
    },
  },
  deductibleDiscount: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Скидка за франшизу (%)',
      type: 'number',
      disabled: true,
      readonly: true,
    },
  },
  promoDiscount: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Скидка по промокоду (%)',
      type: 'number',
      disabled: true,
      readonly: true,
    },
  },
  multiPolicyDiscount: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Скидка за комплексное страхование (%)',
      type: 'number',
      disabled: true,
      readonly: true,
    },
  },
  totalPremium: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Итоговая премия (₽)',
      type: 'number',
      disabled: true,
      readonly: true,
    },
  },
  installmentAmount: {
    value: null,
    component: Input,
    componentProps: {
      label: 'Сумма платежа (₽)',
      type: 'number',
      disabled: true,
      readonly: true,
    },
  },

  // Confirmation fields
  agreePersonalData: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Согласие на обработку персональных данных',
    },
  },
  agreeTerms: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Согласие с правилами страхования',
    },
  },
  agreeElectronicPolicy: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Согласие на электронный полис',
    },
  },
  agreeMarketing: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Согласие на рекламу',
    },
  },
 confirmAccuracy: {
    value: false,
    component: Checkbox,
    componentProps: {
      label: 'Подтверждение достоверности данных',
    },
  },
  electronicSignature: {
    value: '',
    component: InputMask,
    componentProps: {
      label: 'SMS-код подтверждения',
      mask: '999999',
      placeholder: '000000',
    },
  },
};