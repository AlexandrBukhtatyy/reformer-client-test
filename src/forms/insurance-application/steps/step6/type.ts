export interface Step6Form {
  // Premium calculation results
  basePremium: number | undefined;
  ageCoefficient: number | undefined;
  experienceCoefficient: number | undefined;
  regionCoefficient: number | undefined;
  claimsCoefficient: number | undefined;
  deductibleDiscount: number | undefined;
  promoDiscount: number | undefined;
  multiPolicyDiscount: number | undefined;
  totalPremium: number | undefined;
  installmentAmount: number | undefined;

  // Confirmation and agreement
  agreePersonalData: boolean;
  agreeTerms: boolean;
  agreeElectronicPolicy: boolean;
  agreeMarketing: boolean;
  confirmAccuracy: boolean;
  electronicSignature: string;

  // Policy data
  policyNumber: string;
  policyStartDate: string; // date string
  policyEndDate: string; // date string
}