/**
 * Mock API для формы заявки на кредит
 * Имитирует серверные эндпоинты с задержкой 2 секунды
 */

import type { CreditApplicationForm, ApiResponse, DictionaryData } from '../model/types';
import { DEFAULT_FORM_VALUES } from '../model/constants';

// ============================================================================
// Утилиты
// ============================================================================

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const API_DELAY = 2000;

// ============================================================================
// Mock данные для тестирования режима редактирования
// ============================================================================

const MOCK_APPLICATIONS: Record<string, Partial<CreditApplicationForm>> = {
  '1': {
    loanType: 'mortgage',
    loanAmount: 5000000,
    loanTerm: 240,
    loanPurpose: 'Покупка квартиры в новостройке для улучшения жилищных условий семьи',
    propertyValue: 7000000,
    initialPayment: 1400000,
    personalData: {
      lastName: 'Иванов',
      firstName: 'Иван',
      middleName: 'Иванович',
      birthDate: '1985-06-15',
      gender: 'male',
      birthPlace: 'г. Москва',
    },
    passportData: {
      series: '45 10',
      number: '123456',
      issueDate: '2015-07-20',
      issuedBy: 'ОУФМС России по г. Москве',
      departmentCode: '770-001',
    },
    inn: '772345678901',
    snils: '123-456-789 00',
    phoneMain: '+7 (999) 123-45-67',
    phoneAdditional: '',
    email: 'ivanov@example.com',
    emailAdditional: '',
    sameEmail: false,
    registrationAddress: {
      region: 'Москва',
      city: 'Москва',
      street: 'Тверская',
      house: '10',
      apartment: '25',
      postalCode: '125009',
    },
    sameAsRegistration: true,
    residenceAddress: {
      region: 'Москва',
      city: 'Москва',
      street: 'Тверская',
      house: '10',
      apartment: '25',
      postalCode: '125009',
    },
    employmentStatus: 'employed',
    companyName: 'ООО Технологии Будущего',
    companyInn: '7712345678',
    companyPhone: '+7 (495) 987-65-43',
    companyAddress: 'г. Москва, ул. Ленина, д. 1',
    position: 'Ведущий разработчик',
    workExperienceTotal: 120,
    workExperienceCurrent: 36,
    monthlyIncome: 250000,
    additionalIncome: 50000,
    additionalIncomeSource: 'Фриланс разработка',
    maritalStatus: 'married',
    dependents: 2,
    education: 'higher',
    hasProperty: true,
    properties: [
      {
        type: 'apartment',
        description: 'Однокомнатная квартира в Подмосковье',
        estimatedValue: 4000000,
        hasEncumbrance: false,
      },
    ],
    hasExistingLoans: true,
    existingLoans: [
      {
        bank: 'Сбербанк',
        type: 'Потребительский',
        amount: 500000,
        remainingAmount: 200000,
        monthlyPayment: 15000,
        maturityDate: '2025-12-01',
      },
    ],
    hasCoBorrower: true,
    coBorrowers: [
      {
        personalData: {
          lastName: 'Иванова',
          firstName: 'Мария',
          middleName: 'Петровна',
          birthDate: '1988-03-20',
          gender: 'female',
          birthPlace: 'г. Санкт-Петербург',
        },
        phone: '+7 (999) 765-43-21',
        email: 'ivanova@example.com',
        relationship: 'Супруга',
        monthlyIncome: 150000,
      },
    ],
  },
  '2': {
    loanType: 'car',
    loanAmount: 2000000,
    loanTerm: 60,
    loanPurpose: 'Покупка нового автомобиля',
    carBrand: 'Toyota',
    carModel: 'Camry',
    carYear: 2024,
    carPrice: 3500000,
    personalData: {
      lastName: 'Петров',
      firstName: 'Петр',
      middleName: 'Сергеевич',
      birthDate: '1990-11-25',
      gender: 'male',
      birthPlace: 'г. Санкт-Петербург',
    },
    passportData: {
      series: '40 15',
      number: '654321',
      issueDate: '2020-01-10',
      issuedBy: 'ОУФМС России по Санкт-Петербургу',
      departmentCode: '780-002',
    },
    inn: '782345678901',
    snils: '987-654-321 00',
    phoneMain: '+7 (911) 234-56-78',
    email: 'petrov@example.com',
    registrationAddress: {
      region: 'Санкт-Петербург',
      city: 'Санкт-Петербург',
      street: 'Невский проспект',
      house: '50',
      apartment: '10',
      postalCode: '191025',
    },
    sameAsRegistration: true,
    employmentStatus: 'selfEmployed',
    businessType: 'ИП',
    businessInn: '782345678912',
    businessActivity: 'Разработка программного обеспечения',
    workExperienceTotal: 84,
    workExperienceCurrent: 48,
    monthlyIncome: 300000,
    maritalStatus: 'single',
    dependents: 0,
    education: 'higher',
    hasProperty: false,
    hasExistingLoans: false,
    hasCoBorrower: false,
  },
};

// ============================================================================
// Mock данные для справочников
// ============================================================================

const MOCK_REGIONS = [
  { value: 'moscow', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'moscow-region', label: 'Московская область' },
  { value: 'leningrad-region', label: 'Ленинградская область' },
  { value: 'krasnodar', label: 'Краснодарский край' },
  { value: 'novosibirsk', label: 'Новосибирская область' },
  { value: 'sverdlovsk', label: 'Свердловская область' },
  { value: 'tatarstan', label: 'Республика Татарстан' },
];

const MOCK_CITIES: Record<string, Array<{ value: string; label: string }>> = {
  moscow: [{ value: 'moscow', label: 'Москва' }],
  spb: [{ value: 'spb', label: 'Санкт-Петербург' }],
  'moscow-region': [
    { value: 'podolsk', label: 'Подольск' },
    { value: 'khimki', label: 'Химки' },
    { value: 'balashikha', label: 'Балашиха' },
    { value: 'korolev', label: 'Королёв' },
    { value: 'mytischi', label: 'Мытищи' },
  ],
  'leningrad-region': [
    { value: 'gatchina', label: 'Гатчина' },
    { value: 'vyborg', label: 'Выборг' },
    { value: 'vsevolozhsk', label: 'Всеволожск' },
  ],
  krasnodar: [
    { value: 'krasnodar-city', label: 'Краснодар' },
    { value: 'sochi', label: 'Сочи' },
    { value: 'novorossiysk', label: 'Новороссийск' },
  ],
  novosibirsk: [
    { value: 'novosibirsk-city', label: 'Новосибирск' },
    { value: 'berdsk', label: 'Бердск' },
  ],
  sverdlovsk: [
    { value: 'ekaterinburg', label: 'Екатеринбург' },
    { value: 'nizhny-tagil', label: 'Нижний Тагил' },
  ],
  tatarstan: [
    { value: 'kazan', label: 'Казань' },
    { value: 'naberezhnye-chelny', label: 'Набережные Челны' },
  ],
};

const MOCK_CAR_MODELS: Record<string, Array<{ value: string; label: string }>> = {
  toyota: [
    { value: 'camry', label: 'Camry' },
    { value: 'corolla', label: 'Corolla' },
    { value: 'rav4', label: 'RAV4' },
    { value: 'land-cruiser', label: 'Land Cruiser' },
  ],
  bmw: [
    { value: '3-series', label: '3 Series' },
    { value: '5-series', label: '5 Series' },
    { value: 'x5', label: 'X5' },
    { value: 'x3', label: 'X3' },
  ],
  mercedes: [
    { value: 'c-class', label: 'C-Class' },
    { value: 'e-class', label: 'E-Class' },
    { value: 's-class', label: 'S-Class' },
    { value: 'gle', label: 'GLE' },
  ],
  audi: [
    { value: 'a4', label: 'A4' },
    { value: 'a6', label: 'A6' },
    { value: 'q5', label: 'Q5' },
    { value: 'q7', label: 'Q7' },
  ],
  volkswagen: [
    { value: 'golf', label: 'Golf' },
    { value: 'passat', label: 'Passat' },
    { value: 'tiguan', label: 'Tiguan' },
    { value: 'touareg', label: 'Touareg' },
  ],
  kia: [
    { value: 'rio', label: 'Rio' },
    { value: 'ceed', label: 'Ceed' },
    { value: 'sportage', label: 'Sportage' },
    { value: 'sorento', label: 'Sorento' },
  ],
  hyundai: [
    { value: 'solaris', label: 'Solaris' },
    { value: 'tucson', label: 'Tucson' },
    { value: 'santa-fe', label: 'Santa Fe' },
    { value: 'elantra', label: 'Elantra' },
  ],
};

const MOCK_DICTIONARIES: DictionaryData = {
  banks: [
    { value: 'sberbank', label: 'Сбербанк' },
    { value: 'vtb', label: 'ВТБ' },
    { value: 'gazprombank', label: 'Газпромбанк' },
    { value: 'alfabank', label: 'Альфа-Банк' },
    { value: 'raiffeisen', label: 'Райффайзенбанк' },
    { value: 'tinkoff', label: 'Тинькофф' },
    { value: 'rosbank', label: 'Росбанк' },
  ],
  cities: [
    { value: 'moscow', label: 'Москва' },
    { value: 'spb', label: 'Санкт-Петербург' },
    { value: 'novosibirsk', label: 'Новосибирск' },
    { value: 'ekaterinburg', label: 'Екатеринбург' },
    { value: 'kazan', label: 'Казань' },
  ],
  propertyTypes: [
    { value: 'apartment', label: 'Квартира' },
    { value: 'house', label: 'Дом' },
    { value: 'land', label: 'Земельный участок' },
    { value: 'car', label: 'Автомобиль' },
    { value: 'commercial', label: 'Коммерческая недвижимость' },
    { value: 'other', label: 'Другое' },
  ],
};

// ============================================================================
// API функции
// ============================================================================

/**
 * Загрузка заявки по ID
 */
export async function loadApplication(id: string): Promise<ApiResponse<CreditApplicationForm>> {
  await delay(API_DELAY);

  const application = MOCK_APPLICATIONS[id];

  if (!application) {
    return {
      success: false,
      error: `Заявка с ID "${id}" не найдена`,
    };
  }

  // Объединяем с дефолтными значениями
  const fullApplication: CreditApplicationForm = {
    ...DEFAULT_FORM_VALUES,
    ...application,
    residenceAddress: application.residenceAddress || application.registrationAddress || DEFAULT_FORM_VALUES.residenceAddress,
  } as CreditApplicationForm;

  return {
    success: true,
    data: fullApplication,
  };
}

/**
 * Сохранение заявки
 */
export async function saveApplication(data: CreditApplicationForm): Promise<ApiResponse<{ id: string; message: string }>> {
  await delay(API_DELAY);

  // Имитируем сохранение
  const id = Date.now().toString();

  console.log('Сохранение заявки:', data);

  return {
    success: true,
    data: {
      id,
      message: 'Заявка успешно создана',
    },
  };
}

/**
 * Загрузка справочников
 */
export async function loadDictionaries(): Promise<ApiResponse<DictionaryData>> {
  await delay(API_DELAY);

  return {
    success: true,
    data: MOCK_DICTIONARIES,
  };
}

/**
 * Загрузка списка регионов
 */
export async function loadRegions(): Promise<ApiResponse<Array<{ value: string; label: string }>>> {
  await delay(API_DELAY);

  return {
    success: true,
    data: MOCK_REGIONS,
  };
}

/**
 * Загрузка городов по региону
 */
export async function loadCitiesByRegion(region: string): Promise<ApiResponse<Array<{ value: string; label: string }>>> {
  await delay(API_DELAY);

  const normalizedRegion = region.toLowerCase().replace(/\s+/g, '-');
  const cities = MOCK_CITIES[normalizedRegion] || [];

  return {
    success: true,
    data: cities,
  };
}

/**
 * Загрузка моделей автомобилей по марке
 */
export async function loadCarModelsByBrand(brand: string): Promise<ApiResponse<Array<{ value: string; label: string }>>> {
  await delay(API_DELAY);

  const normalizedBrand = brand.toLowerCase().replace(/\s+/g, '-');
  const models = MOCK_CAR_MODELS[normalizedBrand] || [];

  return {
    success: true,
    data: models,
  };
}
