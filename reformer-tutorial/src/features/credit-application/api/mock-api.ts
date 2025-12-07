/**
 * Mock API для формы заявки на кредит
 */

import type { CreditApplicationForm } from '../model/types';

// Задержка для имитации сетевого запроса
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock данные для существующих заявок
const mockApplications: Record<string, Partial<CreditApplicationForm>> = {
  '1': {
    loanType: 'mortgage',
    loanAmount: 5000000,
    loanTerm: 240,
    loanPurpose: 'Покупка квартиры в новостройке',
    propertyValue: 7000000,
    personalData: {
      lastName: 'Иванов',
      firstName: 'Иван',
      middleName: 'Иванович',
      birthDate: '1985-05-15',
      gender: 'male',
      birthPlace: 'г. Москва',
    },
    passportData: {
      series: '45 06',
      number: '123456',
      issueDate: '2015-06-20',
      issuedBy: 'УФМС России по г. Москве',
      departmentCode: '770-001',
    },
    inn: '123456789012',
    snils: '123-456-789 00',
    phoneMain: '+7 (999) 123-45-67',
    email: 'ivanov@example.com',
    registrationAddress: {
      region: 'Москва',
      city: 'Москва',
      street: 'Ленина',
      house: '10',
      apartment: '25',
      postalCode: '123456',
    },
    sameAsRegistration: true,
    residenceAddress: {
      region: 'Москва',
      city: 'Москва',
      street: 'Ленина',
      house: '10',
      apartment: '25',
      postalCode: '123456',
    },
    employmentStatus: 'employed',
    companyName: 'ООО "Ромашка"',
    companyInn: '1234567890',
    position: 'Менеджер',
    workExperienceTotal: 120,
    workExperienceCurrent: 36,
    monthlyIncome: 150000,
    maritalStatus: 'married',
    dependents: 1,
    education: 'higher',
    hasProperty: false,
    hasExistingLoans: false,
    hasCoBorrower: false,
    properties: [],
    existingLoans: [],
    coBorrowers: [],
  },
  '2': {
    loanType: 'car',
    loanAmount: 2000000,
    loanTerm: 60,
    loanPurpose: 'Покупка нового автомобиля',
    carBrand: 'Toyota',
    carModel: 'Camry',
    carYear: 2024,
    carPrice: 3000000,
    personalData: {
      lastName: 'Петров',
      firstName: 'Пётр',
      middleName: 'Петрович',
      birthDate: '1990-10-20',
      gender: 'male',
      birthPlace: 'г. Санкт-Петербург',
    },
    passportData: {
      series: '40 10',
      number: '654321',
      issueDate: '2020-01-15',
      issuedBy: 'МВД России по Санкт-Петербургу',
      departmentCode: '780-002',
    },
    inn: '987654321098',
    snils: '987-654-321 00',
    phoneMain: '+7 (999) 987-65-43',
    email: 'petrov@example.com',
    registrationAddress: {
      region: 'Санкт-Петербург',
      city: 'Санкт-Петербург',
      street: 'Невский проспект',
      house: '100',
      apartment: '50',
      postalCode: '190000',
    },
    sameAsRegistration: true,
    employmentStatus: 'selfEmployed',
    businessType: 'ИП',
    businessInn: '987654321098',
    businessActivity: 'IT-консалтинг',
    workExperienceTotal: 60,
    workExperienceCurrent: 24,
    monthlyIncome: 200000,
    maritalStatus: 'single',
    dependents: 0,
    education: 'higher',
    hasProperty: true,
    properties: [
      {
        type: 'apartment',
        description: 'Однокомнатная квартира',
        estimatedValue: 5000000,
        hasEncumbrance: false,
      },
    ],
    hasExistingLoans: false,
    existingLoans: [],
    hasCoBorrower: false,
    coBorrowers: [],
  },
};

// Mock справочники
const mockDictionaries = {
  banks: [
    { value: 'sberbank', label: 'Сбербанк' },
    { value: 'vtb', label: 'ВТБ' },
    { value: 'alfa', label: 'Альфа-Банк' },
    { value: 'tinkoff', label: 'Тинькофф' },
    { value: 'gazprom', label: 'Газпромбанк' },
  ],
  regions: [
    { value: 'moscow', label: 'Москва' },
    { value: 'spb', label: 'Санкт-Петербург' },
    { value: 'novosibirsk', label: 'Новосибирская область' },
    { value: 'kazan', label: 'Республика Татарстан' },
    { value: 'ekb', label: 'Свердловская область' },
  ],
  cities: {
    moscow: [{ value: 'moscow', label: 'Москва' }],
    spb: [{ value: 'spb', label: 'Санкт-Петербург' }],
    novosibirsk: [
      { value: 'novosibirsk', label: 'Новосибирск' },
      { value: 'berdsk', label: 'Бердск' },
    ],
    kazan: [
      { value: 'kazan', label: 'Казань' },
      { value: 'naberezhnye', label: 'Набережные Челны' },
    ],
    ekb: [
      { value: 'ekaterinburg', label: 'Екатеринбург' },
      { value: 'nizhny-tagil', label: 'Нижний Тагил' },
    ],
  },
  carModels: {
    toyota: ['Camry', 'Corolla', 'RAV4', 'Land Cruiser', 'Highlander'],
    bmw: ['3 Series', '5 Series', 'X3', 'X5', 'X7'],
    mercedes: ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class'],
    audi: ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7'],
    volkswagen: ['Polo', 'Golf', 'Passat', 'Tiguan', 'Touareg'],
  },
};

// API функции
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Загрузка заявки по ID
 */
export async function fetchApplication(
  id: string
): Promise<ApiResponse<Partial<CreditApplicationForm>>> {
  await delay(1500);

  const application = mockApplications[id];
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
export async function fetchDictionaries(): Promise<
  ApiResponse<typeof mockDictionaries>
> {
  await delay(800);

  return {
    success: true,
    data: mockDictionaries,
  };
}

/**
 * Загрузка городов по региону
 */
export async function fetchCities(
  region: string
): Promise<ApiResponse<Array<{ value: string; label: string }>>> {
  await delay(500);

  const cities =
    mockDictionaries.cities[region as keyof typeof mockDictionaries.cities] || [];

  return {
    success: true,
    data: cities,
  };
}

/**
 * Загрузка моделей автомобилей по марке
 */
export async function fetchCarModels(
  brand: string
): Promise<ApiResponse<string[]>> {
  await delay(500);

  const brandLower = brand.toLowerCase();
  const models =
    mockDictionaries.carModels[
      brandLower as keyof typeof mockDictionaries.carModels
    ] || [];

  return {
    success: true,
    data: models,
  };
}

/**
 * Отправка заявки
 */
export async function submitApplication(
  data: CreditApplicationForm
): Promise<ApiResponse<{ id: string; message: string }>> {
  await delay(2000);

  // Имитация случайной ошибки (10% случаев)
  if (Math.random() < 0.1) {
    return {
      success: false,
      error: 'Произошла ошибка при отправке заявки. Попробуйте ещё раз.',
    };
  }

  const newId = String(Date.now());

  return {
    success: true,
    data: {
      id: newId,
      message: 'Заявка успешно создана',
    },
  };
}

/**
 * Отправка SMS кода
 */
export async function sendSmsCode(
  phone: string
): Promise<ApiResponse<{ message: string }>> {
  await delay(1000);

  console.log(`SMS код отправлен на номер: ${phone}`);

  return {
    success: true,
    data: {
      message: 'SMS код отправлен',
    },
  };
}

/**
 * Проверка SMS кода
 */
export async function verifySmsCode(
  phone: string,
  code: string
): Promise<ApiResponse<{ valid: boolean }>> {
  await delay(500);

  // Для тестирования принимаем любой 6-значный код
  const isValid = /^\d{6}$/.test(code);

  return {
    success: true,
    data: {
      valid: isValid,
    },
  };
}
