// api/mock-api.ts - Mock API для формы заявки на кредит

import type {
  CreditApplicationForm,
  ApiResponse,
  DictionariesResponse,
  CitiesResponse,
  CarModelsResponse,
  SubmitApplicationResponse,
} from '../model/types';
import {
  BANK_OPTIONS,
  REGION_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  CITIES_BY_REGION,
  CAR_MODELS_BY_BRAND,
} from '../model/constants';

// =============================================================================
// MOCK DATA
// =============================================================================

const DELAY_MS = 2000;
const SHORT_DELAY_MS = 500;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Полноценные тестовые данные для режима Edit
const mockApplications: Record<string, Partial<CreditApplicationForm>> = {
  '1': {
    // Step 1: Информация о кредите
    loanType: 'mortgage',
    loanAmount: 5000000,
    loanTerm: 240,
    loanPurpose: 'Покупка квартиры в новостройке для проживания семьи',
    propertyValue: 7000000,
    initialPayment: 1400000,
    carBrand: '',
    carModel: '',
    carYear: undefined,
    carPrice: undefined,

    // Step 2: Персональные данные
    personalData: {
      lastName: 'Иванов',
      firstName: 'Иван',
      middleName: 'Иванович',
      birthDate: '1985-03-15',
      gender: 'male',
      birthPlace: 'г. Москва',
    },
    passportData: {
      series: '45 12',
      number: '123456',
      issueDate: '2015-04-20',
      issuedBy: 'ОВД Тверского района г. Москвы',
      departmentCode: '770-001',
    },
    inn: '771234567890',
    snils: '123-456-789 00',

    // Step 3: Контактная информация
    phoneMain: '+7 (999) 123-45-67',
    phoneAdditional: '+7 (999) 765-43-21',
    email: 'ivanov@example.com',
    emailAdditional: '',
    registrationAddress: {
      region: 'moscow',
      city: 'moscow',
      street: 'ул. Тверская',
      house: '15',
      apartment: '42',
      postalCode: '125009',
    },
    sameAsRegistration: true,
    residenceAddress: {
      region: 'moscow',
      city: 'moscow',
      street: 'ул. Тверская',
      house: '15',
      apartment: '42',
      postalCode: '125009',
    },

    // Step 4: Информация о занятости
    employmentStatus: 'employed',
    companyName: 'ООО "Технологии будущего"',
    companyInn: '7701234567',
    companyPhone: '+7 (495) 123-45-67',
    companyAddress: 'г. Москва, ул. Ленина, д. 10',
    position: 'Ведущий разработчик',
    workExperienceTotal: 120,
    workExperienceCurrent: 36,
    monthlyIncome: 250000,
    additionalIncome: 50000,
    additionalIncomeSource: 'Фриланс',
    businessType: '',
    businessInn: '',
    businessActivity: '',

    // Step 5: Дополнительная информация
    maritalStatus: 'married',
    dependents: 2,
    education: 'higher',
    hasProperty: true,
    properties: [
      {
        type: 'car',
        description: 'Toyota Camry 2020 года',
        estimatedValue: 2500000,
        hasEncumbrance: false,
      },
    ],
    hasExistingLoans: true,
    existingLoans: [
      {
        bank: 'Сбербанк',
        type: 'Потребительский',
        amount: 500000,
        remainingAmount: 150000,
        monthlyPayment: 15000,
        maturityDate: '2025-06-01',
      },
    ],
    hasCoBorrower: true,
    coBorrowers: [
      {
        personalData: {
          lastName: 'Иванова',
          firstName: 'Мария',
          middleName: 'Петровна',
          birthDate: '1988-07-22',
          gender: 'female',
          birthPlace: 'г. Москва',
        },
        phone: '+7 (999) 111-22-33',
        email: 'ivanova@example.com',
        relationship: 'Супруга',
        monthlyIncome: 150000,
      },
    ],

    // Step 6: Подтверждение
    agreePersonalData: false,
    agreeCreditHistory: false,
    agreeMarketing: false,
    agreeTerms: false,
    confirmAccuracy: false,
    electronicSignature: '',
  },

  '2': {
    // Step 1: Информация о кредите (автокредит)
    loanType: 'car',
    loanAmount: 1500000,
    loanTerm: 60,
    loanPurpose: 'Покупка нового автомобиля',
    propertyValue: undefined,
    initialPayment: undefined,
    carBrand: 'toyota',
    carModel: 'camry',
    carYear: 2024,
    carPrice: 3500000,

    // Step 2: Персональные данные
    personalData: {
      lastName: 'Петров',
      firstName: 'Пётр',
      middleName: 'Петрович',
      birthDate: '1990-11-08',
      gender: 'male',
      birthPlace: 'г. Санкт-Петербург',
    },
    passportData: {
      series: '40 15',
      number: '654321',
      issueDate: '2020-02-14',
      issuedBy: 'ГУ МВД России по г. Санкт-Петербургу',
      departmentCode: '780-002',
    },
    inn: '782345678901',
    snils: '987-654-321 00',

    // Step 3: Контактная информация
    phoneMain: '+7 (911) 987-65-43',
    phoneAdditional: '',
    email: 'petrov@example.com',
    emailAdditional: '',
    registrationAddress: {
      region: 'spb',
      city: 'spb',
      street: 'Невский пр.',
      house: '100',
      apartment: '15',
      postalCode: '191025',
    },
    sameAsRegistration: true,
    residenceAddress: {
      region: 'spb',
      city: 'spb',
      street: 'Невский пр.',
      house: '100',
      apartment: '15',
      postalCode: '191025',
    },

    // Step 4: Информация о занятости
    employmentStatus: 'selfEmployed',
    companyName: '',
    companyInn: '',
    companyPhone: '',
    companyAddress: '',
    position: '',
    workExperienceTotal: 96,
    workExperienceCurrent: 48,
    monthlyIncome: 180000,
    additionalIncome: undefined,
    additionalIncomeSource: '',
    businessType: 'ИП',
    businessInn: '782345678901',
    businessActivity: 'Разработка программного обеспечения',

    // Step 5: Дополнительная информация
    maritalStatus: 'single',
    dependents: 0,
    education: 'higher',
    hasProperty: false,
    properties: [],
    hasExistingLoans: false,
    existingLoans: [],
    hasCoBorrower: false,
    coBorrowers: [],

    // Step 6: Подтверждение
    agreePersonalData: false,
    agreeCreditHistory: false,
    agreeMarketing: false,
    agreeTerms: false,
    confirmAccuracy: false,
    electronicSignature: '',
  },
};

// =============================================================================
// API FUNCTIONS
// =============================================================================

export const mockApi = {
  /**
   * Получить заявку по ID
   */
  async getApplication(
    id: string
  ): Promise<ApiResponse<Partial<CreditApplicationForm>>> {
    await delay(DELAY_MS);

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
  },

  /**
   * Получить справочники
   */
  async getDictionaries(): Promise<ApiResponse<DictionariesResponse>> {
    await delay(DELAY_MS);

    return {
      success: true,
      data: {
        banks: BANK_OPTIONS,
        regions: REGION_OPTIONS,
        propertyTypes: PROPERTY_TYPE_OPTIONS,
      },
    };
  },

  /**
   * Получить города по региону
   */
  async getCities(region: string): Promise<ApiResponse<CitiesResponse>> {
    await delay(SHORT_DELAY_MS);

    const cities = CITIES_BY_REGION[region] || [];

    return {
      success: true,
      data: { cities },
    };
  },

  /**
   * Получить модели автомобилей по марке
   */
  async getCarModels(brand: string): Promise<ApiResponse<CarModelsResponse>> {
    await delay(SHORT_DELAY_MS);

    const models = CAR_MODELS_BY_BRAND[brand] || [];

    return {
      success: true,
      data: { models },
    };
  },

  /**
   * Отправить заявку
   */
  async submitApplication(
    data: CreditApplicationForm
  ): Promise<ApiResponse<SubmitApplicationResponse>> {
    await delay(DELAY_MS);

    // Симуляция случайной ошибки (10% шанс)
    if (Math.random() < 0.1) {
      return {
        success: false,
        error: 'Ошибка сервера. Пожалуйста, попробуйте позже.',
      };
    }

    // Генерируем ID заявки
    const id = `APP-${Date.now()}`;

    // Сохраняем в mock хранилище
    mockApplications[id] = data;

    console.log('Заявка отправлена:', { id, data });

    return {
      success: true,
      data: {
        id,
        status: 'pending',
      },
    };
  },

  /**
   * Отправить SMS-код (имитация)
   */
  async sendSmsCode(phone: string): Promise<ApiResponse<{ sent: boolean }>> {
    await delay(SHORT_DELAY_MS);

    console.log(`SMS-код отправлен на номер: ${phone}`);

    return {
      success: true,
      data: { sent: true },
    };
  },

  /**
   * Проверить SMS-код (имитация - любой 6-значный код валиден)
   */
  async verifySmsCode(
    _phone: string,
    code: string
  ): Promise<ApiResponse<{ valid: boolean }>> {
    await delay(SHORT_DELAY_MS);

    const valid = /^\d{6}$/.test(code);

    return {
      success: true,
      data: { valid },
    };
  },
};

export type MockApi = typeof mockApi;
