import { Input, Select, RadioGroup, Checkbox } from '@/components/ui';
import type { FormSchema } from '@reformer/core';
import type { InsuranceApplicationForm } from './type';

export const insuranceApplicationSchema: FormSchema<InsuranceApplicationForm> = {
  // Step 1: Insurance Type and Parameters
  insuranceType: {
    value: 'casco',
    component: Select,
    componentProps: {
      label: 'Тип страхования',
      options: [
        { value: 'casco', label: 'КАСКО' },
        { value: 'osago', label: 'ОСАГО' },
        { value: 'property', label: 'Имущество' },
        { value: 'life', label: 'Жизнь и здоровье' },
        { value: 'travel', label: 'Путешествия' },
      ],
    },
  },
  insurancePeriod: {
    value: 12,
    component: Select,
    componentProps: {
      label: 'Срок страхования',
      options: [
        { value: 3, label: '3 месяца' },
        { value: 6, label: '6 месяцев' },
        { value: 12, label: '1 год' },
        { value: 24, label: '2 года' },
        { value: 36, label: '3 года' },
      ],
    },
  },
  startDate: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Дата начала',
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
    },
  },
  coverageAmount: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Страховая сумма (₽)',
      type: 'number',
    },
  },
  deductible: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Франшиза (₽)',
      type: 'number',
    },
  },
  paymentType: {
    value: 'single',
    component: RadioGroup,
    componentProps: {
      label: 'Тип оплаты',
      options: [
        { value: 'single', label: 'Единовременно' },
        { value: 'installments', label: 'Рассрочка' },
      ],
    },
  },
  installments: {
    value: undefined,
    component: Select,
    componentProps: {
      label: 'Количество платежей',
      options: [
        { value: 2, label: '2 платежа' },
        { value: 3, label: '3 платежа' },
        { value: 4, label: '4 платежа' },
        { value: 6, label: '6 платежей' },
        { value: 12, label: '12 платежей' },
      ],
    },
  },

  // Step 2: Insured Data
  insuredType: {
    value: 'individual',
    component: RadioGroup,
    componentProps: {
      label: 'Тип страхователя',
      options: [
        { value: 'individual', label: 'Физическое лицо' },
        { value: 'company', label: 'Юридическое лицо' },
      ],
    },
  },
  personalData: {
    lastName: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Фамилия',
        placeholder: 'Иванов',
      },
    },
    firstName: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Имя',
        placeholder: 'Иван',
      },
    },
    middleName: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Отчество',
        placeholder: 'Иванович',
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
        options: [
          { value: 'male', label: 'Мужской' },
          { value: 'female', label: 'Женский' },
        ],
      },
    },
  },
  companyData: {
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
      component: Input,
      componentProps: {
        label: 'ИНН',
        placeholder: '1234567890',
      },
    },
    ogrn: {
      value: '',
      component: Input,
      componentProps: {
        label: 'ОГРН',
        placeholder: '1234567890123',
      },
    },
    kpp: {
      value: '',
      component: Input,
      componentProps: {
        label: 'КПП',
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
  },
  passportData: {
    series: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Серия паспорта',
        placeholder: '12 34',
      },
    },
    number: {
      value: '',
      component: Input,
      componentProps: {
        label: 'Номер паспорта',
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
        placeholder: 'Отделением УФМС',
      },
    },
  },
  phone: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Телефон',
      placeholder: '+7 (999) 999-99-99',
    },
  },
  email: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Email',
      type: 'email',
      placeholder: 'example@email.com',
    },
  },
  fullName: {
    value: '',
    component: Input,
    componentProps: {
      label: 'Полное имя',
      disabled: true,
    },
  },
  age: {
    value: undefined,
    component: Input,
    componentProps: {
      label: 'Возраст',
      type: 'number',
      disabled: true,
    },
  },
  
  // Remaining fields with minimal implementation
  vehicle: {
    vin: {
      value: '',
      component: Input,
      componentProps: { label: 'VIN' },
    },
    brand: {
      value: '',
      component: Input,
      componentProps: { label: 'Марка' },
    },
    model: {
      value: '',
      component: Input,
      componentProps: { label: 'Модель' },
    },
    year: {
      value: undefined,
      component: Input,
      componentProps: { label: 'Год', type: 'number' },
    },
    mileage: {
      value: undefined,
      component: Input,
      componentProps: { label: 'Пробег', type: 'number' },
    },
    enginePower: {
      value: undefined,
      component: Input,
      componentProps: { label: 'Мощность', type: 'number' },
    },
    bodyType: {
      value: 'sedan',
      component: Select,
      componentProps: {
        label: 'Тип кузова',
        options: [
          { value: 'sedan', label: 'Седан' },
          { value: 'hatchback', label: 'Хэтчбек' },
          { value: 'suv', label: 'Внедорожник' },
          { value: 'wagon', label: 'Универсал' },
          { value: 'coupe', label: 'Купе' },
          { value: 'minivan', label: 'Минивэн' },
          { value: 'pickup', label: 'Пикап' },
        ],
      },
    },
    transmission: {
      value: 'manual',
      component: RadioGroup,
      componentProps: {
        label: 'Коробка передач',
        options: [
          { value: 'manual', label: 'Механика' },
          { value: 'automatic', label: 'Автомат' },
        ],
      },
    },
    marketValue: {
      value: undefined,
      component: Input,
      componentProps: { label: 'Рыночная стоимость', type: 'number' },
    },
    licensePlate: {
      value: '',
      component: Input,
      componentProps: { label: 'Госномер' },
    },
    registrationCert: {
      value: '',
      component: Input,
      componentProps: { label: 'Свидетельство о регистрации' },
    },
    hasAntiTheft: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Наличие противоугонной системы' },
    },
    antiTheftBrand: {
      value: '',
      component: Input,
      componentProps: { label: 'Марка противоугонной системы' },
    },
    garageParking: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Гаражное хранение' },
    },
    usagePurpose: {
      value: 'personal',
      component: Select,
      componentProps: {
        label: 'Цель использования',
        options: [
          { value: 'personal', label: 'Личное' },
          { value: 'taxi', label: 'Такси' },
          { value: 'training', label: 'Учебная' },
          { value: 'commercial', label: 'Коммерческая' },
        ],
      },
    },
  },
  
  property: {
    type: {
      value: 'apartment',
      component: Select,
      componentProps: {
        label: 'Тип недвижимости',
        options: [
          { value: 'apartment', label: 'Квартира' },
          { value: 'house', label: 'Дом' },
          { value: 'townhouse', label: 'Таунхаус' },
          { value: 'commercial', label: 'Коммерческая' },
          { value: 'land', label: 'Земля' },
        ],
      },
    },
    address: {
      region: {
        value: '',
        component: Input,
        componentProps: { label: 'Регион' },
      },
      city: {
        value: '',
        component: Input,
        componentProps: { label: 'Город' },
      },
      street: {
        value: '',
        component: Input,
        componentProps: { label: 'Улица' },
      },
      house: {
        value: '',
        component: Input,
        componentProps: { label: 'Дом' },
      },
      apartment: {
        value: '',
        component: Input,
        componentProps: { label: 'Квартира' },
      },
    },
    area: {
      value: undefined,
      component: Input,
      componentProps: { label: 'Площадь', type: 'number' },
    },
    floors: {
      value: undefined,
      component: Input,
      componentProps: { label: 'Этажность', type: 'number' },
    },
    floor: {
      value: undefined,
      component: Input,
      componentProps: { label: 'Этаж', type: 'number' },
    },
    yearBuilt: {
      value: undefined,
      component: Input,
      componentProps: { label: 'Год постройки', type: 'number' },
    },
    wallMaterial: {
      value: 'brick',
      component: Select,
      componentProps: {
        label: 'Материал стен',
        options: [
          { value: 'brick', label: 'Кирпич' },
          { value: 'concrete', label: 'Бетон' },
          { value: 'wood', label: 'Дерево' },
          { value: 'panel', label: 'Панель' },
          { value: 'monolithic', label: 'Монолит' },
          { value: 'other', label: 'Другое' },
        ],
      },
    },
    marketValue: {
      value: undefined,
      component: Input,
      componentProps: { label: 'Рыночная стоимость', type: 'number' },
    },
    hasAlarm: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Наличие сигнализации' },
    },
    hasFireAlarm: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Наличие пожарной сигнализации' },
    },
    ownershipDoc: {
      value: '',
      component: Input,
      componentProps: { label: 'Документ о собственности' },
    },
  },
  
  health: {
    height: {
      value: undefined,
      component: Input,
      componentProps: { label: 'Рост (см)', type: 'number' },
    },
    weight: {
      value: undefined,
      component: Input,
      componentProps: { label: 'Вес (кг)', type: 'number' },
    },
    bmi: {
      value: undefined,
      component: Input,
      componentProps: { label: 'BMI', type: 'number', disabled: true },
    },
    bloodPressure: {
      value: '',
      component: Input,
      componentProps: { label: 'Артериальное давление' },
    },
    isSmoker: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Курю' },
    },
    smokingYears: {
      value: undefined,
      component: Input,
      componentProps: { label: 'Стаж курения (лет)', type: 'number' },
    },
    hasChronicDiseases: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Хронические заболевания' },
    },
    chronicDiseases: {
      value: '',
      component: Input,
      componentProps: { label: 'Перечень заболеваний' },
    },
    hadSurgeries: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Были операции' },
    },
    surgeries: {
      value: '',
      component: Input,
      componentProps: { label: 'Перечень операций' },
    },
    occupation: {
      value: '',
      component: Input,
      componentProps: { label: 'Род занятий' },
    },
    isHighRiskJob: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Опасная профессия' },
    },
    practicesSports: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Занимаюсь спортом' },
    },
    extremeSports: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Экстремальные виды спорта' },
    },
  },
  
  travel: {
    destination: {
      value: 'europe',
      component: Select,
      componentProps: {
        label: 'Направление',
        options: [
          { value: 'europe', label: 'Европа' },
          { value: 'asia', label: 'Азия' },
          { value: 'usa', label: 'США' },
          { value: 'cis', label: 'СНГ' },
          { value: 'worldwide', label: 'Весь мир' },
        ],
      },
    },
    tripPurpose: {
      value: 'tourism',
      component: Select,
      componentProps: {
        label: 'Цель поездки',
        options: [
          { value: 'tourism', label: 'Туризм' },
          { value: 'business', label: 'Бизнес' },
          { value: 'study', label: 'Учеба' },
          { value: 'work', label: 'Работа' },
          { value: 'other', label: 'Другое' },
        ],
      },
    },
    departureDate: {
      value: '',
      component: Input,
      componentProps: { label: 'Дата выезда', type: 'date' },
    },
    returnDate: {
      value: '',
      component: Input,
      componentProps: { label: 'Дата возвращения', type: 'date' },
    },
    tripDuration: {
      value: undefined,
      component: Input,
      componentProps: { label: 'Длительность поездки', type: 'number', disabled: true },
    },
    isMultipleTrips: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Многократные поездки' },
    },
  },
  
  propertyCoverageOptions: {
    structure: {
      value: true,
      component: Checkbox,
      componentProps: { label: 'Конструктивные элементы' },
    },
    interior: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Внутренняя отделка' },
    },
    movables: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Движимое имущество' },
    },
    liability: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Гражданская ответственность' },
    },
  },
  
  lifeCoverageOptions: {
    death: {
      value: true,
      component: Checkbox,
      componentProps: { label: 'Страхование на случай смерти' },
    },
    disability: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Страхование инвалидности' },
    },
    criticalIllness: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Тяжелые заболевания' },
    },
    accident: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Несчастные случаи' },
    },
  },
  
  travelCoverageOptions: {
    medical: {
      value: true,
      component: Checkbox,
      componentProps: { label: 'Медицинская помощь' },
    },
    baggage: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Багаж' },
    },
    tripCancellation: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Отмена поездки' },
    },
    flightDelay: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Задержка рейса' },
    },
    carRental: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Аренда автомобиля' },
    },
  },
  
  // Drivers array
  drivers: [{
    fullName: {
      value: '',
      component: Input,
      componentProps: { label: 'ФИО водителя' },
    },
    birthDate: {
      value: '',
      component: Input,
      componentProps: { label: 'Дата рождения', type: 'date' },
    },
    licenseNumber: {
      value: '',
      component: Input,
      componentProps: { label: 'Номер ВУ' },
    },
    licenseIssueDate: {
      value: '',
      component: Input,
      componentProps: { label: 'Дата выдачи ВУ', type: 'date' },
    },
    drivingExperience: {
      value: undefined,
      component: Input,
      componentProps: { label: 'Стаж вождения', type: 'number', disabled: true },
    },
    accidentsCount: {
      value: 0,
      component: Input,
      componentProps: { label: 'Количество ДТП', type: 'number' },
    },
    isMainDriver: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'Основной водитель' },
    },
  }],
  
  unlimitedDrivers: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Неограниченное количество водителей' },
  },
  minDriverAge: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Минимальный возраст водителя', type: 'number', disabled: true },
  },
  minDriverExperience: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Минимальный стаж водителя', type: 'number', disabled: true },
  },
  
  // Beneficiaries array
  beneficiaries: [{
    fullName: {
      value: '',
      component: Input,
      componentProps: { label: 'ФИО' },
    },
    birthDate: {
      value: '',
      component: Input,
      componentProps: { label: 'Дата рождения', type: 'date' },
    },
    relationship: {
      value: 'spouse',
      component: Select,
      componentProps: {
        label: 'Степень родства',
        options: [
          { value: 'spouse', label: 'Супруг(а)' },
          { value: 'child', label: 'Ребенок' },
          { value: 'parent', label: 'Родитель' },
          { value: 'sibling', label: 'Брат/сестра' },
          { value: 'other', label: 'Другое' },
        ],
      },
    },
    share: {
      value: undefined,
      component: Input,
      componentProps: { label: 'Доля (%)', type: 'number' },
    },
    phone: {
      value: '',
      component: Input,
      componentProps: { label: 'Телефон' },
    },
  }],
  
  totalBeneficiaryShare: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Общая доля (%)', type: 'number', disabled: true },
  },
  
  // Travelers array
  travelers: [{
    fullName: {
      value: '',
      component: Input,
      componentProps: { label: 'ФИО' },
    },
    birthDate: {
      value: '',
      component: Input,
      componentProps: { label: 'Дата рождения', type: 'date' },
    },
    passportNumber: {
      value: '',
      component: Input,
      componentProps: { label: 'Номер загранпаспорта' },
    },
  }],
  
  // History and Additional Info
  hasPreviousInsurance: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Был ли полис ранее' },
  },
  previousInsurer: {
    value: '',
    component: Input,
    componentProps: { label: 'Предыдущий страховщик' },
  },
  previousPolicyNumber: {
    value: '',
    component: Input,
    componentProps: { label: 'Номер предыдущего полиса' },
  },
  previousPolicyEndDate: {
    value: '',
    component: Input,
    componentProps: { label: 'Дата окончания предыдущего полиса', type: 'date' },
  },
  hadClaims: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Были ли страховые случаи' },
  },
  claims: [{
    date: {
      value: '',
      component: Input,
      componentProps: { label: 'Дата', type: 'date' },
    },
    type: {
      value: 'accident',
      component: Select,
      componentProps: {
        label: 'Тип события',
        options: [
          { value: 'accident', label: 'ДТП' },
          { value: 'theft', label: 'Угон/кража' },
          { value: 'damage', label: 'Повреждение' },
          { value: 'disaster', label: 'Стихийное бедствие' },
          { value: 'medical', label: 'Медицинский случай' },
          { value: 'other', label: 'Другое' },
        ],
      },
    },
    description: {
      value: '',
      component: Input,
      componentProps: { label: 'Описание' },
    },
    amount: {
      value: undefined,
      component: Input,
      componentProps: { label: 'Сумма', type: 'number' },
    },
    atFault: {
      value: false,
      component: Checkbox,
      componentProps: { label: 'По вине страхователя' },
    },
  }],
  promoCode: {
    value: '',
    component: Input,
    componentProps: { label: 'Промокод' },
  },
  referralSource: {
    value: 'internet',
    component: Select,
    componentProps: {
      label: 'Откуда узнали о нас',
      options: [
        { value: 'internet', label: 'Интернет' },
        { value: 'friends', label: 'Рекомендации' },
        { value: 'tv', label: 'ТВ' },
        { value: 'agent', label: 'Агент' },
        { value: 'other', label: 'Другое' },
      ],
    },
  },
  agentCode: {
    value: '',
    component: Input,
    componentProps: { label: 'Код агента' },
  },
  additionalNotes: {
    value: '',
    component: Input,
    componentProps: { label: 'Дополнительные комментарии', textarea: true },
  },
  
  // Calculation and Confirmation
  basePremium: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Базовая премия', type: 'number', disabled: true },
  },
  ageCoefficient: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Коэффициент возраста', type: 'number', disabled: true },
  },
  experienceCoefficient: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Коэффициент стажа', type: 'number', disabled: true },
  },
  regionCoefficient: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Региональный коэффициент', type: 'number', disabled: true },
  },
  claimsCoefficient: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Коэффициент страховых случаев', type: 'number', disabled: true },
  },
  deductibleDiscount: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Скидка за франшизу', type: 'number', disabled: true },
  },
  promoDiscount: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Скидка по промокоду', type: 'number', disabled: true },
  },
  multiPolicyDiscount: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Скидка за многополисность', type: 'number', disabled: true },
  },
  totalPremium: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Итоговая премия', type: 'number', disabled: true },
  },
  installmentAmount: {
    value: undefined,
    component: Input,
    componentProps: { label: 'Сумма ежемесячного платежа', type: 'number', disabled: true },
  },
  agreePersonalData: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Согласие на обработку персональных данных' },
  },
  agreeTerms: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Согласие с правилами страхования' },
  },
  agreeElectronicPolicy: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Согласие на электронный полис' },
  },
  agreeMarketing: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Согласие на маркетинговые рассылки' },
  },
  confirmAccuracy: {
    value: false,
    component: Checkbox,
    componentProps: { label: 'Подтверждаю достоверность информации' },
  },
  electronicSignature: {
    value: '',
    component: Input,
    componentProps: { label: 'Электронная подпись' },
  },
};