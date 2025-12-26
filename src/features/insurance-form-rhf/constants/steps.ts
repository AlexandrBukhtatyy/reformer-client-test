import type { InsuranceFormData } from '../types';

export interface StepConfig {
  id: number;
  key: string;
  title: string;
  description: string;
  // Поля, принадлежащие этому шагу (для валидации)
  fields: (keyof InsuranceFormData)[];
}

export const STEPS: StepConfig[] = [
  {
    id: 1,
    key: 'insurance-type',
    title: 'Тип страхования',
    description: 'Выберите тип страхования и основные параметры',
    fields: [
      'insuranceType',
      'insurancePeriod',
      'startDate',
      'coverageAmount',
      'deductible',
      'paymentType',
      'installments',
    ],
  },
  {
    id: 2,
    key: 'insured-info',
    title: 'Данные страхователя',
    description: 'Заполните информацию о страхователе',
    fields: [
      'insuredType',
      'personalData',
      'companyData',
      'passportData',
      'phone',
      'email',
    ],
  },
  {
    id: 3,
    key: 'coverage-object',
    title: 'Объект страхования',
    description: 'Укажите данные объекта страхования',
    fields: [
      'vehicle',
      'property',
      'propertyCoverageOptions',
      'health',
      'lifeCoverageOptions',
      'travel',
      'travelCoverageOptions',
      'travelers',
    ],
  },
  {
    id: 4,
    key: 'drivers-beneficiaries',
    title: 'Водители / Выгодоприобретатели',
    description: 'Добавьте водителей или выгодоприобретателей',
    fields: [
      'drivers',
      'unlimitedDrivers',
      'beneficiaries',
    ],
  },
  {
    id: 5,
    key: 'history',
    title: 'История',
    description: 'Укажите информацию о предыдущих полисах и страховых случаях',
    fields: [
      'hasPreviousInsurance',
      'previousInsurer',
      'previousPolicyNumber',
      'previousPolicyEndDate',
      'hadClaims',
      'claims',
      'promoCode',
      'referralSource',
      'agentCode',
      'additionalNotes',
    ],
  },
  {
    id: 6,
    key: 'confirmation',
    title: 'Подтверждение',
    description: 'Проверьте данные и подтвердите заявку',
    fields: [
      'agreePersonalData',
      'agreeTerms',
      'agreeElectronicPolicy',
      'agreeMarketing',
      'confirmAccuracy',
      'electronicSignature',
    ],
  },
];

export const TOTAL_STEPS = STEPS.length;
