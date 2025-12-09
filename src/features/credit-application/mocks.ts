import type { CreditApplicationForm } from "./types";

/**
 * Имитация загрузки данных с сервера
 * @param delay - задержка в мс (имитация сетевого запроса)
 * @returns Promise с данными формы
 */
export async function loadApplicationData(delay = 1500): Promise<Partial<CreditApplicationForm>> {
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, delay));

  // Возвращаем моковые данные как будто с сервера
  return mockFormData;
}

/**
 * Моковые данные для тестирования формы
 * Все значения валидны и проходят валидацию
 */
export const mockFormData: Partial<CreditApplicationForm> = {
  // Step 1: Loan Info
  loanType: "consumer",
  loanAmount: 500000,
  loanTerm: 24,
  loanPurpose: "Ремонт квартиры и покупка мебели",

  // Step 2: Personal Data
  personalData: {
    lastName: "Иванов",
    firstName: "Иван",
    middleName: "Иванович",
    birthDate: "1990-05-15",
    gender: "male",
    birthPlace: "г. Москва",
  },
  passportData: {
    series: "45 12",
    number: "123456",
    issueDate: "2015-06-20",
    issuedBy: "ОВД Тверского района г. Москвы",
    departmentCode: "770-001",
  },
  inn: "123456789012",
  snils: "123-456-789 00",

  // Step 3: Contact Info
  phoneMain: "+7 (999) 123-45-67",
  phoneAdditional: "+7 (999) 765-43-21",
  email: "ivan.ivanov@example.com",
  emailAdditional: "ivan.ivanov.work@example.com",
  registrationAddress: {
    region: "Московская область",
    city: "Москва",
    street: "ул. Ленина",
    house: "10",
    apartment: "25",
    postalCode: "101000",
  },
  sameAsRegistration: true,
  residenceAddress: {
    region: "Московская область",
    city: "Москва",
    street: "ул. Ленина",
    house: "10",
    apartment: "25",
    postalCode: "101000",
  },

  // Step 4: Employment Info
  employmentStatus: "employed",
  companyName: 'ООО "Рога и Копыта"',
  companyInn: "7707123456",
  companyPhone: "+7 (495) 123-45-67",
  companyAddress: "г. Москва, ул. Тверская, д. 1, офис 100",
  position: "Ведущий специалист",
  workExperienceTotal: 120,
  workExperienceCurrent: 36,
  monthlyIncome: 150000,
  additionalIncome: 30000,
  additionalIncomeSource: "Сдача квартиры в аренду",

  // Step 5: Additional Info
  maritalStatus: "married",
  dependents: 1,
  education: "higher",
  hasProperty: false,
  properties: [],
  hasExistingLoans: false,
  existingLoans: [],
  hasCoBorrower: false,
  coBorrowers: [],

  // Step 6: Confirmation
  agreePersonalData: true,
  agreeCreditHistory: true,
  agreeMarketing: false,
  agreeTerms: true,
  confirmAccuracy: true,
  electronicSignature: "123456",
};

/**
 * Моковые данные для ипотеки
 */
export const mockMortgageData: Partial<CreditApplicationForm> = {
  ...mockFormData,
  loanType: "mortgage",
  loanAmount: 5000000,
  loanTerm: 240,
  loanPurpose: "Покупка квартиры в новостройке",
  propertyValue: 7000000,
  initialPayment: 2000000,
};

/**
 * Моковые данные для автокредита
 */
export const mockCarLoanData: Partial<CreditApplicationForm> = {
  ...mockFormData,
  loanType: "car",
  loanAmount: 2000000,
  loanTerm: 60,
  loanPurpose: "Покупка нового автомобиля",
  carBrand: "Toyota",
  carModel: "Camry",
  carYear: 2024,
  carPrice: 3500000,
};

/**
 * Моковые данные для ИП
 */
export const mockSelfEmployedData: Partial<CreditApplicationForm> = {
  ...mockFormData,
  employmentStatus: "selfEmployed",
  companyName: undefined,
  companyInn: undefined,
  companyPhone: undefined,
  companyAddress: undefined,
  position: undefined,
  businessType: "ИП",
  businessInn: "123456789012",
  businessActivity: "Разработка программного обеспечения",
  monthlyIncome: 200000,
};

/**
 * Моковые данные с созаемщиком
 */
export const mockWithCoBorrowerData: Partial<CreditApplicationForm> = {
  ...mockFormData,
  hasCoBorrower: true,
  coBorrowers: [
    {
      personalData: {
        lastName: "Иванова",
        firstName: "Мария",
        middleName: "Петровна",
        birthDate: "1992-08-20",
        gender: "female",
        birthPlace: "г. Санкт-Петербург",
      },
      phone: "+7 (999) 888-77-66",
      email: "maria.ivanova@example.com",
      relationship: "Супруга",
      monthlyIncome: 100000,
    },
  ],
};
