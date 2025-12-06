// index.ts - Публичные экспорты модуля credit-application

export { CreditApplicationForm } from './CreditApplicationForm';

// Типы
export type {
  CreditApplicationForm as CreditApplicationFormData,
  FormMode,
  LoanType,
  EmploymentStatus,
  MaritalStatus,
  Education,
  PropertyType,
  PersonalData,
  PassportData,
  Address,
  Property,
  ExistingLoan,
  CoBorrower,
} from './model/types';

// Константы
export {
  LOAN_TYPE_OPTIONS,
  EMPLOYMENT_STATUS_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  EDUCATION_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  STEP_TITLES,
  TOTAL_STEPS,
  LOAN_LIMITS,
} from './model/constants';

// API
export { mockApi } from './api/mock-api';
