export type InsuranceType = 'casco' | 'osago' | 'property' | 'life' | 'travel';
export type PaymentType = 'single' | 'installments';

export interface InsuranceTypeStep {
  insuranceType: InsuranceType;
  insurancePeriod: number;
  startDate: string;
  endDate: string; // computed
  coverageAmount: number | undefined;
  deductible: number | undefined;
  paymentType: PaymentType;
  installments: number | undefined;
}
