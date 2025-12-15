import type { InsuranceTypeStep, InsuranceType, PaymentType } from './steps/insurance-type/type';
import type {
  InsuredPartyStep,
  InsuredType,
  PersonalData,
  CompanyData,
  PassportData,
} from './steps/insured-party/type';
import type { InsuranceObjectStep } from './steps/insurance-object/type';
import type { DriversBeneficiariesStep } from './steps/drivers-beneficiaries/type';
import type { HistoryStep } from './steps/history/type';
import type { ConfirmationStep } from './steps/confirmation/type';

// Re-export types
export type {
  InsuranceType,
  PaymentType,
  InsuredType,
  PersonalData,
  CompanyData,
  PassportData,
};

// Главный тип формы - объединяет все шаги
export interface InsuranceApplicationForm
  extends InsuranceTypeStep,
    InsuredPartyStep,
    InsuranceObjectStep,
    DriversBeneficiariesStep,
    HistoryStep,
    ConfirmationStep {}
