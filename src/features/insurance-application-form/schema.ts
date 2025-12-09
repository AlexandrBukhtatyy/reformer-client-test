import { createForm, type FormSchemaFn } from "@reformer/core";
import type { InsuranceApplicationForm } from "./types";
import { validation } from "./validation";
import { behaviors } from "./behaviors";

// Options for selects/radios
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

const INSTALLMENTS_OPTIONS = [
  { value: 2, label: '2 платежа' },
  { value: 3, label: '3 платежа' },
  { value: 4, label: '4 платежа' },
  { value: 6, label: '6 платежей' },
 { value: 12, label: '12 платежей' },
];

const INSURED_TYPES = [
  { value: 'individual', label: 'Физическое лицо' },
  { value: 'corporate', label: 'Юридическое лицо' },
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

const PROPERTY_WALL_MATERIALS = [
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

const TRAVEL_TRIP_PURPOSES = [
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

const RELATIONSHIP_TYPES = [
  { value: 'spouse', label: 'Супруг(а)' },
  { value: 'child', label: 'Ребенок' },
  { value: 'parent', label: 'Родитель' },
  { value: 'sibling', label: 'Брат/сестра' },
 { value: 'other', label: 'Другое' },
];

const REFERRAL_SOURCES = [
  { value: 'internet', label: 'Интернет' },
  { value: 'friends', label: 'Рекомендации друзей' },
 { value: 'tv', label: 'Телевидение' },
  { value: 'agent', label: 'Страховой агент' },
 { value: 'other', label: 'Другое' },
];

const formSchema: FormSchemaFn<InsuranceApplicationForm> = () => ({
  // Step 1: Insurance Type and Parameters
  insuranceType: {
    value: 'casco',
    component: 'select',
    label: 'Тип страхования',
    options: INSURANCE_TYPES,
  },
  insurancePeriod: {
    value: 12,
    component: 'select',
    label: 'Срок страхования',
    options: INSURANCE_PERIODS,
  },
  startDate: {
    value: '',
    component: 'input',
    type: 'date',
    label: 'Дата начала действия полиса',
  },
  endDate: {
    value: '',
    component: 'input',
    type: 'date',
    label: 'Дата окончания',
    disabled: true,
    readonly: true,
  },
  coverageAmount: {
    value: null,
    component: 'input',
    type: 'number',
    label: 'Страховая сумма (₽)',
    min: 100000,
    max: 50000000,
 },
  deductible: {
    value: null,
    component: 'input',
    type: 'number',
    label: 'Франшиза (₽)',
    min: 0,
  },
  paymentType: {
    value: 'single',
    component: 'radio-group',
    label: 'Способ оплаты',
    options: PAYMENT_TYPES,
  },
  installments: {
    value: null,
    component: 'select',
    label: 'Количество платежей',
    options: INSTALLMENTS_OPTIONS,
  },

  // Step 2: Insured Data
 insuredType: {
    value: 'individual',
    component: 'radio-group',
    label: 'Тип страхователя',
    options: INSURED_TYPES,
  },
  personalData: {
    lastName: {
      value: '',
      component: 'input',
      label: 'Фамилия',
    },
    firstName: {
      value: '',
      component: 'input',
      label: 'Имя',
    },
    middleName: {
      value: '',
      component: 'input',
      label: 'Отчество',
    },
    birthDate: {
      value: '',
      component: 'input',
      type: 'date',
      label: 'Дата рождения',
    },
    gender: {
      value: 'male',
      component: 'radio-group',
      label: 'Пол',
      options: GENDERS,
    },
  },
  companyData: {
    name: {
      value: '',
      component: 'input',
      label: 'Название организации',
      placeholder: 'ООО "Компания"',
    },
    inn: {
      value: '',
      component: 'input',
      label: 'ИНН организации',
      mask: '99999',
      placeholder: '1234567890',
    },
    ogrn: {
      value: '',
      component: 'input',
      label: 'ОГРН',
      mask: '9999',
      placeholder: '1234567890123',
    },
    kpp: {
      value: '',
      component: 'input',
      label: 'КПП',
      mask: '99999',
      placeholder: '123456789',
    },
    ceoName: {
      value: '',
      component: 'input',
      label: 'ФИО руководителя',
      placeholder: 'Иванов Иван Иванович',
    },
  },
  passportData: {
    series: {
      value: '',
      component: 'input',
      label: 'Серия паспорта',
      mask: '9 99',
      placeholder: '12 34',
    },
    number: {
      value: '',
      component: 'input',
      label: 'Номер паспорта',
      mask: '999999',
      placeholder: '123456',
    },
    issueDate: {
      value: '',
      component: 'input',
      type: 'date',
      label: 'Дата выдачи',
    },
    issuedBy: {
      value: '',
      component: 'input',
      label: 'Кем выдан',
      placeholder: 'Отделением УФМС...',
    },
  },
  phone: {
    value: '',
    component: 'input',
    label: 'Телефон',
    mask: '+7 (999) 999-99-9',
    placeholder: '+7 (___) ___-__-__',
  },
  email: {
    value: '',
    component: 'input',
    type: 'email',
    label: 'Email',
    placeholder: 'example@mail.com',
  },
  fullName: {
    value: '',
    component: 'input',
    label: 'Полное имя (ФИО)',
    disabled: true,
    readonly: true,
  },
  age: {
    value: null,
    component: 'input',
    type: 'number',
    label: 'Возраст',
    disabled: true,
    readonly: true,
  },

  // Step 3: Insurance Object - Vehicle (for casco/osago)
  vehicle: {
    vin: {
      value: '',
      component: 'input',
      label: 'VIN-номер',
      maxLength: 17,
    },
    brand: {
      value: '',
      component: 'select',
      label: 'Марка автомобиля',
    },
    model: {
      value: '',
      component: 'select',
      label: 'Модель автомобиля',
    },
    year: {
      value: null,
      component: 'input',
      type: 'number',
      label: 'Год выпуска',
      min: 1990,
    },
    mileage: {
      value: null,
      component: 'input',
      type: 'number',
      label: 'Пробег (км)',
      min: 0,
    },
    enginePower: {
      value: null,
      component: 'input',
      type: 'number',
      label: 'Мощность двигателя (л.с.)',
      min: 1,
    },
    bodyType: {
      value: 'sedan',
      component: 'select',
      label: 'Тип кузова',
      options: VEHICLE_BODY_TYPES,
    },
    transmission: {
      value: 'manual',
      component: 'radio-group',
      label: 'Коробка передач',
      options: VEHICLE_TRANSMISSIONS,
    },
    marketValue: {
      value: null,
      component: 'input',
      type: 'number',
      label: 'Рыночная стоимость (₽)',
      min: 0,
    },
    licensePlate: {
      value: '',
      component: 'input',
      label: 'Госномер',
      placeholder: 'А000АА000',
    },
    registrationCert: {
      value: '',
      component: 'input',
      label: 'Номер СТС',
      placeholder: '00 00 000000',
    },
    hasAntiTheft: {
      value: false,
      component: 'checkbox',
      label: 'Наличие противоугонной системы',
    },
    antiTheftBrand: {
      value: '',
      component: 'input',
      label: 'Марка противоугонной системы',
      placeholder: 'StarLine',
    },
    garageParking: {
      value: false,
      component: 'checkbox',
      label: 'Гаражное хранение',
    },
    usagePurpose: {
      value: 'personal',
      component: 'select',
      label: 'Цель использования',
      options: VEHICLE_USAGE_PURPOSES,
    },
  },

  // Step 3: Insurance Object - Property
 property: {
    type: {
      value: 'apartment',
      component: 'select',
      label: 'Тип недвижимости',
      options: PROPERTY_TYPES,
    },
    address: {
      region: {
        value: '',
        component: 'input',
        label: 'Регион',
        placeholder: 'Московская область',
      },
      city: {
        value: '',
        component: 'input',
        label: 'Город',
        placeholder: 'Москва',
      },
      street: {
        value: '',
        component: 'input',
        label: 'Улица',
        placeholder: 'ул. Ленина',
      },
      house: {
        value: '',
        component: 'input',
        label: 'Дом',
        placeholder: '1',
      },
      apartment: {
        value: '',
        component: 'input',
        label: 'Квартира',
        placeholder: '1',
      },
    },
    area: {
      value: null,
      component: 'input',
      type: 'number',
      label: 'Площадь (м²)',
      min: 1,
    },
    floors: {
      value: null,
      component: 'input',
      type: 'number',
      label: 'Этажность здания',
      min: 1,
    },
    floor: {
      value: null,
      component: 'input',
      type: 'number',
      label: 'Этаж квартиры',
      min: 1,
    },
    yearBuilt: {
      value: null,
      component: 'input',
      type: 'number',
      label: 'Год постройки',
      min: 1800,
    },
    wallMaterial: {
      value: 'brick',
      component: 'select',
      label: 'Материал стен',
      options: PROPERTY_WALL_MATERIALS,
    },
    marketValue: {
      value: null,
      component: 'input',
      type: 'number',
      label: 'Рыночная стоимость (₽)',
      min: 0,
    },
    hasAlarm: {
      value: false,
      component: 'checkbox',
      label: 'Охранная сигнализация',
    },
    hasFireAlarm: {
      value: false,
      component: 'checkbox',
      label: 'Пожарная сигнализация',
    },
    ownershipDoc: {
      value: '',
      component: 'input',
      label: 'Номер документа о собственности',
      placeholder: '00-0/000-00/000/000/0000-0000',
    },
  },
  propertyCoverageOptions: {
    structure: {
      value: true,
      component: 'checkbox',
      label: 'Страхование конструктива',
    },
    interior: {
      value: false,
      component: 'checkbox',
      label: 'Страхование отделки',
    },
    movables: {
      value: false,
      component: 'checkbox',
      label: 'Страхование движимого имущества',
    },
    liability: {
      value: false,
      component: 'checkbox',
      label: 'Гражданская ответственность',
    },
  },

  // Step 3: Insurance Object - Health (for life)
 health: {
    height: {
      value: null,
      component: 'input',
      type: 'number',
      label: 'Рост (см)',
      min: 100,
      max: 250,
    },
    weight: {
      value: null,
      component: 'input',
      type: 'number',
      label: 'Вес (кг)',
      min: 30,
      max: 300,
    },
    bmi: {
      value: null,
      component: 'input',
      type: 'number',
      label: 'Индекс массы тела',
      disabled: true,
      readonly: true,
    },
    bloodPressure: {
      value: '',
      component: 'input',
      label: 'Артериальное давление',
      placeholder: '120/80',
    },
    isSmoker: {
      value: false,
      component: 'checkbox',
      label: 'Курящий',
    },
    smokingYears: {
      value: null,
      component: 'input',
      type: 'number',
      label: 'Стаж курения (лет)',
      min: 0,
    },
    hasChronicDiseases: {
      value: false,
      component: 'checkbox',
      label: 'Хронические заболевания',
    },
    chronicDiseases: {
      value: '',
      component: 'textarea',
      label: 'Описание заболеваний',
      placeholder: 'Перечислите заболевания',
    },
    hadSurgeries: {
      value: false,
      component: 'checkbox',
      label: 'Перенесенные операции',
    },
    surgeries: {
      value: '',
      component: 'textarea',
      label: 'Описание операций',
      placeholder: 'Перечислите операции',
    },
    occupation: {
      value: '',
      component: 'input',
      label: 'Род занятий',
      placeholder: 'Менеджер',
    },
    isHighRiskJob: {
      value: false,
      component: 'checkbox',
      label: 'Опасная профессия',
    },
    practicesSports: {
      value: false,
      component: 'checkbox',
      label: 'Занятия спортом',
    },
    extremeSports: {
      value: false,
      component: 'checkbox',
      label: 'Экстремальные виды спорта',
    },
  },
  lifeCoverageOptions: {
    death: {
      value: true,
      component: 'checkbox',
      label: 'Страхование на случай смерти',
    },
    disability: {
      value: false,
      component: 'checkbox',
      label: 'Страхование инвалидности',
    },
    criticalIllness: {
      value: false,
      component: 'checkbox',
      label: 'Критические заболевания',
    },
    accident: {
      value: false,
      component: 'checkbox',
      label: 'Несчастные случаи',
    },
  },

  // Step 3: Insurance Object - Travel
  travel: {
    destination: {
      value: 'europe',
      component: 'select',
      label: 'Страна/регион назначения',
      options: TRAVEL_DESTINATIONS,
    },
    tripPurpose: {
      value: 'tourism',
      component: 'select',
      label: 'Цель поездки',
      options: TRAVEL_TRIP_PURPOSES,
    },
    departureDate: {
      value: '',
      component: 'input',
      type: 'date',
      label: 'Дата отъезда',
    },
    returnDate: {
      value: '',
      component: 'input',
      type: 'date',
      label: 'Дата возвращения',
    },
    tripDuration: {
      value: null,
      component: 'input',
      type: 'number',
      label: 'Длительность поездки (дни)',
      disabled: true,
      readonly: true,
    },
    isMultipleTrips: {
      value: false,
      component: 'checkbox',
      label: 'Мультипоездка (годовой полис)',
    },
  },
  travelers: [{
    fullName: {
      value: '',
      component: 'input',
      label: 'ФИО',
      placeholder: 'Ivanov Ivan',
    },
    birthDate: {
      value: '',
      component: 'input',
      type: 'date',
      label: 'Дата рождения',
    },
    passportNumber: {
      value: '',
      component: 'input',
      label: 'Номер загранпаспорта',
      placeholder: '00 0000000',
    },
  }],
  travelCoverageOptions: {
    medical: {
      value: true,
      component: 'checkbox',
      label: 'Медицинские расходы',
    },
    baggage: {
      value: false,
      component: 'checkbox',
      label: 'Багаж',
    },
    tripCancellation: {
      value: false,
      component: 'checkbox',
      label: 'Отмена поездки',
    },
    flightDelay: {
      value: false,
      component: 'checkbox',
      label: 'Задержка рейса',
    },
    carRental: {
      value: false,
      component: 'checkbox',
      label: 'Аренда авто',
    },
  },

  // Step 4: Drivers and Beneficiaries
  drivers: [{
    fullName: {
      value: '',
      component: 'input',
      label: 'ФИО водителя',
      placeholder: 'Иванов Иван Иванович',
    },
    birthDate: {
      value: '',
      component: 'input',
      type: 'date',
      label: 'Дата рождения',
    },
    licenseNumber: {
      value: '',
      component: 'input',
      label: 'Номер ВУ',
      placeholder: '00 0 00000',
    },
    licenseIssueDate: {
      value: '',
      component: 'input',
      type: 'date',
      label: 'Дата выдачи ВУ',
    },
    drivingExperience: {
      value: null,
      component: 'input',
      type: 'number',
      label: 'Стаж вождения (лет)',
      disabled: true,
      readonly: true,
    },
    accidentsCount: {
      value: 0,
      component: 'input',
      type: 'number',
      label: 'Кол-во ДТП за 3 года',
      min: 0,
    },
    isMainDriver: {
      value: false,
      component: 'checkbox',
      label: 'Основной водитель',
    },
  }],
  unlimitedDrivers: {
    value: false,
    component: 'checkbox',
    label: 'Неограниченное количество водителей',
  },
  minDriverAge: {
    value: null,
    component: 'input',
    type: 'number',
    label: 'Мин. возраст водителя',
    disabled: true,
    readonly: true,
  },
  minDriverExperience: {
    value: null,
    component: 'input',
    type: 'number',
    label: 'Мин. стаж водителя',
    disabled: true,
    readonly: true,
  },
  beneficiaries: [{
    fullName: {
      value: '',
      component: 'input',
      label: 'ФИО',
      placeholder: 'Иванов Иван Иванович',
    },
    birthDate: {
      value: '',
      component: 'input',
      type: 'date',
      label: 'Дата рождения',
    },
    relationship: {
      value: 'spouse',
      component: 'select',
      label: 'Степень родства',
      options: RELATIONSHIP_TYPES,
    },
    share: {
      value: null,
      component: 'input',
      type: 'number',
      label: 'Доля (%)',
      min: 1,
      max: 100,
    },
    phone: {
      value: '',
      component: 'input',
      label: 'Телефон',
      mask: '+7 (999) 999-99-99',
      placeholder: '+7 (___) ___-__-__',
    },
  }],
  totalBeneficiaryShare: {
    value: null,
    component: 'input',
    type: 'number',
    label: 'Сумма долей (%)',
    disabled: true,
    readonly: true,
  },

  // Step 5: History and Additional Info
  hasPreviousInsurance: {
    value: false,
    component: 'checkbox',
    label: 'Был ли полис ранее',
  },
  previousInsurer: {
    value: '',
    component: 'input',
    label: 'Предыдущий страховщик',
    placeholder: 'Название компании',
  },
  previousPolicyNumber: {
    value: '',
    component: 'input',
    label: 'Номер предыдущего полиса',
    placeholder: 'XXX-000000',
  },
  previousPolicyEndDate: {
    value: '',
    component: 'input',
    type: 'date',
    label: 'Дата окончания предыдущего полиса',
  },
  hadClaims: {
    value: false,
    component: 'checkbox',
    label: 'Были ли страховые случаи',
  },
  claims: [{
    date: {
      value: '',
      component: 'input',
      type: 'date',
      label: 'Дата события',
    },
    type: {
      value: 'accident',
      component: 'select',
      label: 'Тип события',
      options: CLAIM_TYPES,
    },
    description: {
      value: '',
      component: 'textarea',
      label: 'Описание',
      placeholder: 'Опишите событие',
    },
    amount: {
      value: null,
      component: 'input',
      type: 'number',
      label: 'Сумма выплаты (₽)',
      min: 0,
    },
    atFault: {
      value: false,
      component: 'checkbox',
      label: 'По вине страхователя',
    },
  }],
  promoCode: {
    value: '',
    component: 'input',
    label: 'Промокод',
    placeholder: 'PROMO2024',
  },
  referralSource: {
    value: 'internet',
    component: 'select',
    label: 'Откуда узнали о нас',
    options: REFERRAL_SOURCES,
  },
  agentCode: {
    value: '',
    component: 'input',
    label: 'Код агента',
    placeholder: 'AGT-000',
  },
  additionalNotes: {
    value: '',
    component: 'textarea',
    label: 'Дополнительные комментарии',
    placeholder: 'Ваши пожелания...',
  },

  // Step 6: Calculation and Confirmation
  basePremium: {
    value: null,
    component: 'input',
    type: 'number',
    label: 'Базовая премия (₽)',
    disabled: true,
    readonly: true,
  },
 ageCoefficient: {
    value: null,
    component: 'input',
    type: 'number',
    label: 'Коэффициент возраста',
    disabled: true,
    readonly: true,
  },
  experienceCoefficient: {
    value: null,
    component: 'input',
    type: 'number',
    label: 'Коэффициент стажа',
    disabled: true,
    readonly: true,
  },
  regionCoefficient: {
    value: null,
    component: 'input',
    type: 'number',
    label: 'Региональный коэффициент',
    disabled: true,
    readonly: true,
  },
  claimsCoefficient: {
    value: null,
    component: 'input',
    type: 'number',
    label: 'Коэффициент аварийности (КБМ)',
    disabled: true,
    readonly: true,
  },
  deductibleDiscount: {
    value: null,
    component: 'input',
    type: 'number',
    label: 'Скидка за франшизу (%)',
    disabled: true,
    readonly: true,
  },
  promoDiscount: {
    value: null,
    component: 'input',
    type: 'number',
    label: 'Скидка по промокоду (%)',
    disabled: true,
    readonly: true,
  },
  multiPolicyDiscount: {
    value: null,
    component: 'input',
    type: 'number',
    label: 'Скидка за комплексное страхование (%)',
    disabled: true,
    readonly: true,
  },
  totalPremium: {
    value: null,
    component: 'input',
    type: 'number',
    label: 'Итоговая премия (₽)',
    disabled: true,
    readonly: true,
  },
  installmentAmount: {
    value: null,
    component: 'input',
    type: 'number',
    label: 'Сумма платежа (₽)',
    disabled: true,
    readonly: true,
  },
  agreePersonalData: {
    value: false,
    component: 'checkbox',
    label: 'Согласие на обработку персональных данных',
  },
  agreeTerms: {
    value: false,
    component: 'checkbox',
    label: 'Согласие с правилами страхования',
  },
  agreeElectronicPolicy: {
    value: false,
    component: 'checkbox',
    label: 'Согласие на электронный полис',
  },
  agreeMarketing: {
    value: false,
    component: 'checkbox',
    label: 'Согласие на рекламу',
  },
  confirmAccuracy: {
    value: false,
    component: 'checkbox',
    label: 'Подтверждение достоверности данных',
  },
  electronicSignature: {
    value: '',
    component: 'input',
    label: 'SMS-код подтверждения',
    mask: '99999',
    placeholder: '000000',
  },
});

export const insuranceForm = createForm<InsuranceApplicationForm>({
  form: formSchema,
  validation,
  behavior: behaviors,
});