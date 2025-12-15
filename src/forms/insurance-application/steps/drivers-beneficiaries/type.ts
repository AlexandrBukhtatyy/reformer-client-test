import type { DriverData } from '../../sub-forms/driver/type';
import type { BeneficiaryData } from '../../sub-forms/beneficiary/type';

export interface DriversBeneficiariesStep {
  unlimitedDrivers: boolean;
  drivers: DriverData[];
  minDriverAge: number | undefined; // computed
  minDriverExperience: number | undefined; // computed
  beneficiaries: BeneficiaryData[];
  totalBeneficiaryShare: number; // computed
}
