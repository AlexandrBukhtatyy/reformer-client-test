export interface Step6Form {
  // Premium calculation results
  basePremium: number | undefined;
  riskCoefficients: {
    age: number;
    experience: number;
    region: number;
    vehicleAge: number | undefined; // for vehicle insurance
    vehiclePower: number | undefined; // for vehicle insurance
    propertyValue: number | undefined; // for property insurance
  };
  discounts: {
    loyalty: number; // percentage
    safeDriver: number | undefined; // percentage, for vehicle
    securitySystem: number | undefined; // percentage, for vehicle
    franchise: number | undefined; // percentage
    promoCode: number | undefined; // percentage
  };
  calculatedPremium: number | undefined; // base * coefficients - discounts

  // Payment options
  paymentMethod: 'online' | 'bank_transfer' | 'installments';
  installmentsCount: 2 | 3 | 4 | 6 | undefined;
  installmentAmount: number | undefined; // calculated

  // Confirmation and agreement
  agreeToTerms: boolean;
  agreeToProcessing: boolean;
  agreeToCommunications: boolean;
  confirmInformation: boolean;
  electronicSignature: string;

  // Summary information
  policyNumber: string; // will be generated
  policyStartDate: string; // date string
  policyEndDate: string; // date string
}