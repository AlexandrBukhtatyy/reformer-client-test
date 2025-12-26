import { z } from 'zod';

// Главная схема формы (объединение всех полей)
export const insuranceFormSchema = z.object({
  // Шаг 1: Тип страхования
  insuranceType: z.enum(['casco', 'osago', 'property', 'life', 'travel']),
  insurancePeriod: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  coverageAmount: z.number().nullable(),
  deductible: z.number().nullable(),
  paymentType: z.enum(['single', 'installments']),
  installments: z.number().nullable(),

  // Шаг 2: Данные страхователя
  insuredType: z.enum(['individual', 'corporate']),
  personalData: z.object({
    lastName: z.string(),
    firstName: z.string(),
    middleName: z.string(),
    birthDate: z.string(),
    gender: z.enum(['male', 'female']),
  }),
  companyData: z.object({
    name: z.string(),
    inn: z.string(),
    ogrn: z.string(),
    kpp: z.string(),
    ceoName: z.string(),
  }),
  passportData: z.object({
    series: z.string(),
    number: z.string(),
    issueDate: z.string(),
    issuedBy: z.string(),
  }),
  phone: z.string(),
  email: z.string(),
  fullName: z.string(),
  age: z.number().nullable(),

  // Шаг 3: Объект страхования - Транспорт
  vehicle: z.object({
    vin: z.string(),
    brand: z.string(),
    model: z.string(),
    year: z.number().nullable(),
    mileage: z.number().nullable(),
    enginePower: z.number().nullable(),
    bodyType: z.enum(['sedan', 'hatchback', 'suv', 'wagon', 'coupe', 'minivan', 'pickup']),
    transmission: z.enum(['manual', 'automatic']),
    marketValue: z.number().nullable(),
    licensePlate: z.string(),
    registrationCert: z.string(),
    hasAntiTheft: z.boolean(),
    antiTheftBrand: z.string(),
    garageParking: z.boolean(),
    usagePurpose: z.enum(['personal', 'taxi', 'training', 'commercial']),
  }),

  // Шаг 3: Объект страхования - Недвижимость
  property: z.object({
    type: z.enum(['apartment', 'house', 'townhouse', 'commercial', 'land']),
    address: z.object({
      region: z.string(),
      city: z.string(),
      street: z.string(),
      house: z.string(),
      apartment: z.string(),
    }),
    area: z.number().nullable(),
    floors: z.number().nullable(),
    floor: z.number().nullable(),
    yearBuilt: z.number().nullable(),
    wallMaterial: z.enum(['brick', 'concrete', 'wood', 'panel', 'monolith', 'other']),
    marketValue: z.number().nullable(),
    hasAlarm: z.boolean(),
    hasFireAlarm: z.boolean(),
    ownershipDoc: z.string(),
  }),
  propertyCoverageOptions: z.object({
    structure: z.boolean(),
    interior: z.boolean(),
    movables: z.boolean(),
    liability: z.boolean(),
  }),

  // Шаг 3: Объект страхования - Здоровье
  health: z.object({
    height: z.number().nullable(),
    weight: z.number().nullable(),
    bmi: z.number().nullable(),
    bloodPressure: z.string(),
    isSmoker: z.boolean(),
    smokingYears: z.number().nullable(),
    hasChronicDiseases: z.boolean(),
    chronicDiseases: z.string(),
    hadSurgeries: z.boolean(),
    surgeries: z.string(),
    occupation: z.string(),
    isHighRiskJob: z.boolean(),
    practicesSports: z.boolean(),
    extremeSports: z.boolean(),
  }),
  lifeCoverageOptions: z.object({
    death: z.boolean(),
    disability: z.boolean(),
    criticalIllness: z.boolean(),
    accident: z.boolean(),
  }),

  // Шаг 3: Объект страхования - Путешествия
  travel: z.object({
    destination: z.enum(['europe', 'asia', 'usa_canada', 'cis', 'worldwide']),
    tripPurpose: z.enum(['tourism', 'business', 'study', 'work', 'other']),
    departureDate: z.string(),
    returnDate: z.string(),
    tripDuration: z.number().nullable(),
    isMultipleTrips: z.boolean(),
  }),
  travelCoverageOptions: z.object({
    medical: z.boolean(),
    baggage: z.boolean(),
    tripCancellation: z.boolean(),
    flightDelay: z.boolean(),
    carRental: z.boolean(),
  }),
  travelers: z.array(z.object({
    id: z.string(),
    fullName: z.string(),
    birthDate: z.string(),
    passportNumber: z.string(),
  })),

  // Шаг 4: Водители
  drivers: z.array(z.object({
    id: z.string(),
    fullName: z.string(),
    birthDate: z.string(),
    licenseNumber: z.string(),
    licenseIssueDate: z.string(),
    drivingExperience: z.number().nullable(),
    accidentsCount: z.number(),
    isMainDriver: z.boolean(),
  })),
  unlimitedDrivers: z.boolean(),
  minDriverAge: z.number().nullable(),
  minDriverExperience: z.number().nullable(),

  // Шаг 4: Выгодоприобретатели
  beneficiaries: z.array(z.object({
    id: z.string(),
    fullName: z.string(),
    birthDate: z.string(),
    relationship: z.enum(['spouse', 'child', 'parent', 'sibling', 'other']),
    share: z.number().nullable(),
    phone: z.string(),
  })),
  totalBeneficiaryShare: z.number().nullable(),

  // Шаг 5: История
  hasPreviousInsurance: z.boolean(),
  previousInsurer: z.string(),
  previousPolicyNumber: z.string(),
  previousPolicyEndDate: z.string(),
  hadClaims: z.boolean(),
  claims: z.array(z.object({
    id: z.string(),
    date: z.string(),
    type: z.enum(['accident', 'theft', 'damage', 'natural_disaster', 'medical', 'other']),
    description: z.string(),
    amount: z.number().nullable(),
    atFault: z.boolean(),
  })),
  promoCode: z.string(),
  referralSource: z.enum(['internet', 'friends', 'tv', 'agent', 'other']),
  agentCode: z.string(),
  additionalNotes: z.string(),

  // Шаг 6: Расчет и подтверждение
  basePremium: z.number().nullable(),
  ageCoefficient: z.number().nullable(),
  experienceCoefficient: z.number().nullable(),
  regionCoefficient: z.number().nullable(),
  claimsCoefficient: z.number().nullable(),
  deductibleDiscount: z.number().nullable(),
  promoDiscount: z.number().nullable(),
  multiPolicyDiscount: z.number().nullable(),
  totalPremium: z.number().nullable(),
  installmentAmount: z.number().nullable(),
  agreePersonalData: z.boolean(),
  agreeTerms: z.boolean(),
  agreeElectronicPolicy: z.boolean(),
  agreeMarketing: z.boolean(),
  confirmAccuracy: z.boolean(),
  electronicSignature: z.string(),
});

export type InsuranceFormSchema = z.infer<typeof insuranceFormSchema>;
