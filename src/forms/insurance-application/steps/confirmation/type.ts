export interface ConfirmationStep {
  // Вычисляемые поля расчета
  basePremium: number; // computed
  ageCoefficient: number; // computed
  experienceCoefficient: number; // computed
  regionalCoefficient: number; // computed
  kbmCoefficient: number; // computed
  deductibleDiscount: number; // computed
  promoDiscount: number; // computed
  multiPolicyDiscount: number; // computed
  totalPremium: number; // computed
  installmentAmount: number | undefined; // computed

  // Согласия
  agreePersonalData: boolean;
  agreeInsuranceTerms: boolean;
  agreeElectronicPolicy: boolean;
  agreeMarketing: boolean;
  confirmDataAccuracy: boolean;

  // Верификация
  smsVerificationCode: string;
}
