import type { InsuranceApplicationForm } from './type';

// Имитация API запроса на получение данных заявки
export async function fetchApplicationData(): Promise<Partial<InsuranceApplicationForm>> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Мок-данные для заполнения формы
  return {
    // Шаг 1: Тип страхования
    insuranceType: 'casco',
    insurancePeriod: 12, // number, not string
    startDate: new Date().toISOString().split('T')[0],
    coverageAmount: 1500000,
    deductible: 20000,
    paymentType: 'single',

    // Шаг 2: Данные страхователя
    insuredType: 'individual',
    personalData: {
      lastName: 'Иванов',
      firstName: 'Иван',
      middleName: 'Иванович',
      birthDate: '1985-05-15',
      gender: 'male',
    },
    // phone, email at root level (not in personalData)
    phone: '+7 (999) 123-45-67',
    email: 'ivanov@example.com',
    // fullName and age are computed fields - don't set manually
    passportData: {
      series: '45 00',
      number: '123456',
      issuedBy: 'ОВД г. Москвы',
      issueDate: '2010-06-20',
    },

    // Шаг 3: Объект страхования (автомобиль)
    vehicle: {
      vin: 'WVWZZZ3CZWE123456',
      brand: 'volkswagen',
      model: 'tiguan',
      year: 2021,
      mileage: 45000,
      enginePower: 150,
      bodyType: 'suv',
      transmission: 'automatic',
      marketValue: 2500000,
      licensePlate: 'А123АА777',
      registrationCertificate: '99 00 123456',
      hasAntiTheft: true,
      antiTheftBrand: 'StarLine',
      garageParking: true,
      usagePurpose: 'personal',
    },

    // Шаг 4: Водители
    unlimitedDrivers: false,
    drivers: [
      {
        lastName: 'Иванов',
        firstName: 'Иван',
        middleName: 'Иванович',
        birthDate: '1985-05-15',
        age: 39,
        licenseNumber: '77 00 123456',
        licenseIssueDate: '2005-08-10',
        experience: 19,
        accidentsCount: 0,
        isMainDriver: true,
      },
      {
        lastName: 'Иванова',
        firstName: 'Мария',
        middleName: 'Петровна',
        birthDate: '1990-03-22',
        age: 34,
        licenseNumber: '77 00 654321',
        licenseIssueDate: '2012-04-15',
        experience: 12,
        accidentsCount: 1,
        isMainDriver: false,
      },
    ],

    // Шаг 5: История
    hasPreviousInsurance: true,
    previousInsurer: 'РОСГОССТРАХ',
    previousPolicyNumber: 'ХХХ 0123456789',
    previousPolicyEndDate: '2024-12-31',
    hasClaimsHistory: false,
    claims: [],
    referralSource: 'internet',

    // Шаг 6: Подтверждение
    // basePremium, coefficients, totalPremium - all computed by behaviors

    // Согласия
    agreePersonalData: false,
    agreeInsuranceTerms: false,
    agreeElectronicPolicy: false,
    agreeMarketing: false,
    confirmDataAccuracy: false,
    smsVerificationCode: '',
  };
}

// Функция для заполнения формы данными
export function populateForm(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any,
  data: Partial<InsuranceApplicationForm>
): void {
  const setFieldValue = (path: string, value: unknown) => {
    const parts = path.split('.');
    let current = form;

    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
      if (!current) return;
    }

    const lastPart = parts[parts.length - 1];
    if (current[lastPart]?.setValue) {
      current[lastPart].setValue(value);
    }
  };

  // Заполняем простые поля
  const simpleFields = [
    'insuranceType',
    'insurancePeriod',
    'startDate',
    'coverageAmount',
    'deductible',
    'paymentType',
    'insuredType',
    'phone',
    'email',
    'unlimitedDrivers',
    'hasPreviousInsurance',
    'previousInsurer',
    'previousPolicyNumber',
    'previousPolicyEndDate',
    'hasClaimsHistory',
    'referralSource',
    'agreePersonalData',
    'agreeInsuranceTerms',
    'agreeElectronicPolicy',
    'agreeMarketing',
    'confirmDataAccuracy',
  ];

  for (const field of simpleFields) {
    if (data[field as keyof InsuranceApplicationForm] !== undefined) {
      setFieldValue(field, data[field as keyof InsuranceApplicationForm]);
    }
  }

  // Заполняем вложенные объекты
  if (data.personalData) {
    for (const [key, value] of Object.entries(data.personalData)) {
      setFieldValue(`personalData.${key}`, value);
    }
  }

  if (data.passportData) {
    for (const [key, value] of Object.entries(data.passportData)) {
      setFieldValue(`passportData.${key}`, value);
    }
  }

  if (data.vehicle) {
    for (const [key, value] of Object.entries(data.vehicle)) {
      setFieldValue(`vehicle.${key}`, value);
    }
  }

  // Заполняем массивы
  if (data.drivers && data.drivers.length > 0) {
    // Очищаем существующие
    form.drivers?.clear?.();

    // Добавляем новые
    for (const driver of data.drivers) {
      form.drivers?.push?.(driver);
    }
  }
}
