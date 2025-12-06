/**
 * Mock API для формы заявки на кредит
 */

import type { CreditApplicationForm } from '../model/types';

// ============================================================================
// Типы ответов API
// ============================================================================

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface DictionariesResponse {
  banks: Array<{ value: string; label: string }>;
  cities: Array<{ value: string; label: string }>;
  propertyTypes: Array<{ value: string; label: string }>;
}

interface SubmitResponse {
  id: string;
  message: string;
}

// ============================================================================
// Задержка для имитации сетевого запроса
// ============================================================================

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ============================================================================
// Mock данные
// ============================================================================

const MOCK_APPLICATIONS: Record<string, Partial<CreditApplicationForm>> = {
  '1': {
    loanType: 'mortgage',
    loanAmount: 5000000,
    loanTerm: 240,
    loanPurpose: 'Покупка квартиры в новостройке для постоянного проживания',
    propertyValue: 7000000,
    initialPayment: 2000000,
    personalData: {
      lastName: 'Иванов',
      firstName: 'Иван',
      middleName: 'Иванович',
      birthDate: '1985-05-15',
      gender: 'male',
      birthPlace: 'г. Москва',
    },
    passportData: {
      series: '45 10',
      number: '123456',
      issueDate: '2015-06-20',
      issuedBy: 'ОВД Центрального района г. Москвы',
      departmentCode: '770-001',
    },
    inn: '123456789012',
    snils: '123-456-789 00',
    phoneMain: '+7 (999) 123-45-67',
    email: 'ivanov@example.com',
    registrationAddress: {
      region: 'Москва',
      city: 'Москва',
      street: 'Тверская',
      house: '1',
      apartment: '10',
      postalCode: '125009',
    },
    sameAsRegistration: true,
    residenceAddress: {
      region: '',
      city: '',
      street: '',
      house: '',
      apartment: '',
      postalCode: '',
    },
    employmentStatus: 'employed',
    companyName: 'ООО "Технологии"',
    companyInn: '1234567890',
    position: 'Ведущий разработчик',
    workExperienceTotal: 120,
    workExperienceCurrent: 36,
    monthlyIncome: 250000,
    maritalStatus: 'married',
    dependents: 1,
    education: 'higher',
    hasProperty: false,
    properties: [],
    hasExistingLoans: false,
    existingLoans: [],
    hasCoBorrower: false,
    coBorrowers: [],
    agreePersonalData: true,
    agreeCreditHistory: true,
    agreeTerms: true,
    confirmAccuracy: true,
    electronicSignature: '123456',
  },
  '2': {
    loanType: 'car',
    loanAmount: 2000000,
    loanTerm: 60,
    loanPurpose: 'Покупка нового автомобиля для семьи',
    carBrand: 'Toyota',
    carModel: 'Camry',
    carYear: 2024,
    carPrice: 3500000,
    personalData: {
      lastName: 'Петрова',
      firstName: 'Мария',
      middleName: 'Сергеевна',
      birthDate: '1990-08-22',
      gender: 'female',
      birthPlace: 'г. Санкт-Петербург',
    },
    passportData: {
      series: '40 15',
      number: '654321',
      issueDate: '2018-09-10',
      issuedBy: 'ОВД Приморского района г. Санкт-Петербурга',
      departmentCode: '780-005',
    },
    inn: '987654321098',
    snils: '987-654-321 00',
    phoneMain: '+7 (921) 987-65-43',
    email: 'petrova@example.com',
    registrationAddress: {
      region: 'Санкт-Петербург',
      city: 'Санкт-Петербург',
      street: 'Невский проспект',
      house: '100',
      apartment: '50',
      postalCode: '191025',
    },
    sameAsRegistration: true,
    residenceAddress: {
      region: '',
      city: '',
      street: '',
      house: '',
      apartment: '',
      postalCode: '',
    },
    employmentStatus: 'selfEmployed',
    businessType: 'ИП',
    businessInn: '987654321098',
    businessActivity: 'Консультационные услуги в сфере IT',
    workExperienceTotal: 84,
    workExperienceCurrent: 48,
    monthlyIncome: 180000,
    additionalIncome: 50000,
    additionalIncomeSource: 'Фриланс проекты',
    maritalStatus: 'single',
    dependents: 0,
    education: 'higher',
    hasProperty: true,
    properties: [
      {
        type: 'apartment',
        description: 'Однокомнатная квартира в центре города',
        estimatedValue: 8000000,
        hasEncumbrance: false,
      },
    ],
    hasExistingLoans: false,
    existingLoans: [],
    hasCoBorrower: false,
    coBorrowers: [],
    agreePersonalData: true,
    agreeCreditHistory: true,
    agreeTerms: true,
    confirmAccuracy: true,
    electronicSignature: '123456',
  },
};

const MOCK_DICTIONARIES: DictionariesResponse = {
  banks: [
    { value: 'sberbank', label: 'Сбербанк' },
    { value: 'vtb', label: 'ВТБ' },
    { value: 'alfa', label: 'Альфа-Банк' },
    { value: 'gazprombank', label: 'Газпромбанк' },
    { value: 'tinkoff', label: 'Тинькофф' },
    { value: 'raiffeisen', label: 'Райффайзенбанк' },
    { value: 'rosbank', label: 'Росбанк' },
    { value: 'unicredit', label: 'ЮниКредит Банк' },
  ],
  cities: [
    { value: 'moscow', label: 'Москва' },
    { value: 'spb', label: 'Санкт-Петербург' },
    { value: 'novosibirsk', label: 'Новосибирск' },
    { value: 'ekaterinburg', label: 'Екатеринбург' },
    { value: 'kazan', label: 'Казань' },
    { value: 'nizhny_novgorod', label: 'Нижний Новгород' },
    { value: 'chelyabinsk', label: 'Челябинск' },
    { value: 'samara', label: 'Самара' },
  ],
  propertyTypes: [
    { value: 'apartment', label: 'Квартира' },
    { value: 'house', label: 'Дом' },
    { value: 'land', label: 'Земельный участок' },
    { value: 'car', label: 'Автомобиль' },
    { value: 'other', label: 'Другое' },
  ],
};

const MOCK_REGIONS = [
  { value: 'moscow', label: 'Москва' },
  { value: 'moscow_region', label: 'Московская область' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'leningrad_region', label: 'Ленинградская область' },
  { value: 'novosibirsk_region', label: 'Новосибирская область' },
  { value: 'sverdlovsk_region', label: 'Свердловская область' },
  { value: 'tatarstan', label: 'Республика Татарстан' },
  { value: 'krasnodar_region', label: 'Краснодарский край' },
];

const MOCK_CITIES_BY_REGION: Record<string, Array<{ value: string; label: string }>> = {
  moscow: [{ value: 'moscow', label: 'Москва' }],
  moscow_region: [
    { value: 'balashikha', label: 'Балашиха' },
    { value: 'khimki', label: 'Химки' },
    { value: 'podolsk', label: 'Подольск' },
    { value: 'odintsovo', label: 'Одинцово' },
    { value: 'mytishchi', label: 'Мытищи' },
  ],
  spb: [{ value: 'spb', label: 'Санкт-Петербург' }],
  leningrad_region: [
    { value: 'gatchina', label: 'Гатчина' },
    { value: 'vyborg', label: 'Выборг' },
    { value: 'vsevolozhsk', label: 'Всеволожск' },
  ],
  novosibirsk_region: [
    { value: 'novosibirsk', label: 'Новосибирск' },
    { value: 'berdsk', label: 'Бердск' },
  ],
  sverdlovsk_region: [
    { value: 'ekaterinburg', label: 'Екатеринбург' },
    { value: 'nizhny_tagil', label: 'Нижний Тагил' },
    { value: 'kamensk_uralsky', label: 'Каменск-Уральский' },
  ],
  tatarstan: [
    { value: 'kazan', label: 'Казань' },
    { value: 'naberezhnye_chelny', label: 'Набережные Челны' },
    { value: 'nizhnekamsk', label: 'Нижнекамск' },
  ],
  krasnodar_region: [
    { value: 'krasnodar', label: 'Краснодар' },
    { value: 'sochi', label: 'Сочи' },
    { value: 'novorossiysk', label: 'Новороссийск' },
  ],
};

const MOCK_CAR_MODELS: Record<string, Array<{ value: string; label: string }>> = {
  toyota: [
    { value: 'camry', label: 'Camry' },
    { value: 'corolla', label: 'Corolla' },
    { value: 'rav4', label: 'RAV4' },
    { value: 'land_cruiser', label: 'Land Cruiser' },
    { value: 'highlander', label: 'Highlander' },
  ],
  bmw: [
    { value: '3_series', label: '3 Series' },
    { value: '5_series', label: '5 Series' },
    { value: 'x3', label: 'X3' },
    { value: 'x5', label: 'X5' },
    { value: 'x7', label: 'X7' },
  ],
  mercedes: [
    { value: 'c_class', label: 'C-Class' },
    { value: 'e_class', label: 'E-Class' },
    { value: 's_class', label: 'S-Class' },
    { value: 'gle', label: 'GLE' },
    { value: 'gls', label: 'GLS' },
  ],
  audi: [
    { value: 'a4', label: 'A4' },
    { value: 'a6', label: 'A6' },
    { value: 'q5', label: 'Q5' },
    { value: 'q7', label: 'Q7' },
    { value: 'q8', label: 'Q8' },
  ],
  volkswagen: [
    { value: 'polo', label: 'Polo' },
    { value: 'golf', label: 'Golf' },
    { value: 'passat', label: 'Passat' },
    { value: 'tiguan', label: 'Tiguan' },
    { value: 'touareg', label: 'Touareg' },
  ],
};

// ============================================================================
// API функции
// ============================================================================

/**
 * Загрузка данных заявки по ID
 */
export async function loadApplication(id: string): Promise<ApiResponse<Partial<CreditApplicationForm>>> {
  await delay(2000);

  const application = MOCK_APPLICATIONS[id];

  if (!application) {
    return {
      success: false,
      error: `Заявка с ID "${id}" не найдена`,
    };
  }

  return {
    success: true,
    data: application,
  };
}

/**
 * Загрузка справочников
 */
export async function loadDictionaries(): Promise<ApiResponse<DictionariesResponse>> {
  await delay(1000);

  return {
    success: true,
    data: MOCK_DICTIONARIES,
  };
}

/**
 * Загрузка списка регионов
 */
export async function loadRegions(): Promise<ApiResponse<Array<{ value: string; label: string }>>> {
  await delay(500);

  return {
    success: true,
    data: MOCK_REGIONS,
  };
}

/**
 * Загрузка городов по региону
 */
export async function loadCitiesByRegion(
  region: string
): Promise<ApiResponse<Array<{ value: string; label: string }>>> {
  await delay(500);

  const cities = MOCK_CITIES_BY_REGION[region] || [];

  return {
    success: true,
    data: cities,
  };
}

/**
 * Загрузка моделей автомобилей по марке
 */
export async function loadCarModels(brand: string): Promise<ApiResponse<Array<{ value: string; label: string }>>> {
  await delay(300);

  const normalizedBrand = brand.toLowerCase().replace(/\s+/g, '');
  const models = MOCK_CAR_MODELS[normalizedBrand] || [];

  return {
    success: true,
    data: models,
  };
}

/**
 * Отправка заявки
 */
export async function submitApplication(
  data: CreditApplicationForm,
  options?: { simulateError?: boolean }
): Promise<ApiResponse<SubmitResponse>> {
  await delay(2000);

  if (options?.simulateError) {
    return {
      success: false,
      error: 'Ошибка при отправке заявки. Попробуйте позже.',
    };
  }

  const applicationId = `APP-${Date.now()}`;

  console.log('Submitted application:', data);

  return {
    success: true,
    data: {
      id: applicationId,
      message: `Заявка ${applicationId} успешно отправлена! Ожидайте звонка от менеджера.`,
    },
  };
}

/**
 * Отправка СМС-кода для подтверждения
 */
export async function sendSmsCode(phone: string): Promise<ApiResponse<{ sent: boolean }>> {
  await delay(1000);

  console.log(`SMS code sent to ${phone}`);

  return {
    success: true,
    data: { sent: true },
  };
}

/**
 * Проверка СМС-кода
 */
export async function verifySmsCode(phone: string, code: string): Promise<ApiResponse<{ valid: boolean }>> {
  await delay(500);

  // В тестовых целях код "123456" всегда валиден
  const isValid = code === '123456';

  return {
    success: true,
    data: { valid: isValid },
  };
}
