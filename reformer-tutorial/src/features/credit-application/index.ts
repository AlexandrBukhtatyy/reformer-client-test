// Главный компонент
export { CreditApplicationForm } from './CreditApplicationForm';

// Типы
export type {
  CreditApplicationForm as CreditApplicationFormType,
  FormMode,
  LoanType,
  EmploymentStatus,
  MaritalStatus,
  Education,
  Gender,
  PropertyType,
  PersonalData,
  PassportData,
  Address,
  Property,
  ExistingLoan,
  CoBorrower,
} from './model/types';

// Хуки
export { useCreditApplicationForm } from './hooks/useCreditApplicationForm';

// API
export { loadApplication, saveApplication } from './api/mock-api';
