import type { InsuranceFormData } from '../types';

// Дефолтные значения для формы
export const DEFAULT_FORM_VALUES: InsuranceFormData = {
  // Шаг 1: Тип страхования
  insuranceType: 'casco',
  insurancePeriod: 12,
  startDate: '',
  endDate: '',
  coverageAmount: null,
  deductible: null,
  paymentType: 'single',
  installments: null,

  // Шаг 2: Данные страхователя
  insuredType: 'individual',
  personalData: {
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: '',
    gender: 'male',
  },
  companyData: {
    name: '',
    inn: '',
    ogrn: '',
    kpp: '',
    ceoName: '',
  },
  passportData: {
    series: '',
    number: '',
    issueDate: '',
    issuedBy: '',
  },
  phone: '',
  email: '',
  fullName: '',
  age: null,

  // Шаг 3: Объект страхования - Транспорт
  vehicle: {
    vin: '',
    brand: '',
    model: '',
    year: null,
    mileage: null,
    enginePower: null,
    bodyType: 'sedan',
    transmission: 'manual',
    marketValue: null,
    licensePlate: '',
    registrationCert: '',
    hasAntiTheft: false,
    antiTheftBrand: '',
    garageParking: false,
    usagePurpose: 'personal',
  },

  // Шаг 3: Объект страхования - Недвижимость
  property: {
    type: 'apartment',
    address: {
      region: '',
      city: '',
      street: '',
      house: '',
      apartment: '',
    },
    area: null,
    floors: null,
    floor: null,
    yearBuilt: null,
    wallMaterial: 'brick',
    marketValue: null,
    hasAlarm: false,
    hasFireAlarm: false,
    ownershipDoc: '',
  },
  propertyCoverageOptions: {
    structure: true,
    interior: false,
    movables: false,
    liability: false,
  },

  // Шаг 3: Объект страхования - Здоровье
  health: {
    height: null,
    weight: null,
    bmi: null,
    bloodPressure: '',
    isSmoker: false,
    smokingYears: null,
    hasChronicDiseases: false,
    chronicDiseases: '',
    hadSurgeries: false,
    surgeries: '',
    occupation: '',
    isHighRiskJob: false,
    practicesSports: false,
    extremeSports: false,
  },
  lifeCoverageOptions: {
    death: true,
    disability: false,
    criticalIllness: false,
    accident: false,
  },

  // Шаг 3: Объект страхования - Путешествия
  travel: {
    destination: 'europe',
    tripPurpose: 'tourism',
    departureDate: '',
    returnDate: '',
    tripDuration: null,
    isMultipleTrips: false,
  },
  travelCoverageOptions: {
    medical: true,
    baggage: false,
    tripCancellation: false,
    flightDelay: false,
    carRental: false,
  },
  travelers: [],

  // Шаг 4: Водители
  drivers: [],
  unlimitedDrivers: false,
  minDriverAge: null,
  minDriverExperience: null,

  // Шаг 4: Выгодоприобретатели
  beneficiaries: [],
  totalBeneficiaryShare: null,

  // Шаг 5: История
  hasPreviousInsurance: false,
  previousInsurer: '',
  previousPolicyNumber: '',
  previousPolicyEndDate: '',
  hadClaims: false,
  claims: [],
  promoCode: '',
  referralSource: 'internet',
  agentCode: '',
  additionalNotes: '',

  // Шаг 6: Расчет и подтверждение
  basePremium: null,
  ageCoefficient: null,
  experienceCoefficient: null,
  regionCoefficient: null,
  claimsCoefficient: null,
  deductibleDiscount: null,
  promoDiscount: null,
  multiPolicyDiscount: null,
  totalPremium: null,
  installmentAmount: null,
  agreePersonalData: false,
  agreeTerms: false,
  agreeElectronicPolicy: false,
  agreeMarketing: false,
  confirmAccuracy: false,
  electronicSignature: '',
};
