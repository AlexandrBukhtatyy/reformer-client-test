import type { Driver, Beneficiary, Traveler, Claim, ClaimType, Relationship } from './form.types';

// Функции для создания пустых элементов массивов

export function createEmptyDriver(): Driver {
  return {
    id: crypto.randomUUID(),
    fullName: '',
    birthDate: '',
    licenseNumber: '',
    licenseIssueDate: '',
    drivingExperience: null,
    accidentsCount: 0,
    isMainDriver: false,
  };
}

export function createEmptyBeneficiary(): Beneficiary {
  return {
    id: crypto.randomUUID(),
    fullName: '',
    birthDate: '',
    relationship: 'spouse',
    share: null,
    phone: '',
  };
}

export function createEmptyTraveler(): Traveler {
  return {
    id: crypto.randomUUID(),
    fullName: '',
    birthDate: '',
    passportNumber: '',
  };
}

export function createEmptyClaim(): Claim {
  return {
    id: crypto.randomUUID(),
    date: '',
    type: 'accident',
    description: '',
    amount: null,
    atFault: false,
  };
}

// Фабрики для создания элементов массивов
export const ARRAY_FACTORIES = {
  drivers: createEmptyDriver,
  beneficiaries: createEmptyBeneficiary,
  travelers: createEmptyTraveler,
  claims: createEmptyClaim,
} as const;

export type ArrayFieldName = keyof typeof ARRAY_FACTORIES;

// Алиасы для совместимости
export const createDriver = createEmptyDriver;
export const createBeneficiary = createEmptyBeneficiary;
export const createTraveler = createEmptyTraveler;
export const createClaim = createEmptyClaim;
