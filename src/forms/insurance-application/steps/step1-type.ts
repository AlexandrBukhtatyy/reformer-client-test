// Step 1: Insurance Type and Parameters
export interface Step1FormData {
  insuranceType: 'casco' | 'osago' | 'property' | 'life' | 'travel';
  insurancePeriod: 3 | 6 | 12 | 24 | 36;
  startDate: string; // YYYY-MM-DD
  endDate: string; // Computed
  coverageAmount: number;
  deductible?: number;
  paymentType: 'single' | 'installments';
  installments?: number;
}