export interface Step1Form {
  insuranceType: 'casco' | 'osago' | 'property' | 'life' | 'travel';
  insurancePeriod: 3 | 6 | 12 | 24 | 36;
  startDate: string; // date string
  endDate: string; // computed
  coverageAmount: number | undefined;
  deductible: number | undefined;
  paymentType: 'single' | 'installments';
  installments: 2 | 3 | 4 | 6 | 12 | undefined;
}