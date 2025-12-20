// Mock API functions for insurance application form

// Define response types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface InsuranceApplicationData {
  id?: string;
  policyNumber?: string;
  message?: string;
  // Add other fields as needed
}

interface PremiumCalculationData {
  basePremium: number;
  ageCoefficient: number;
  experienceCoefficient: number;
  regionCoefficient: number;
  claimsCoefficient: number;
  deductibleDiscount: number;
  promoDiscount: number;
  multiPolicyDiscount: number;
  totalPremium: number;
}

interface PromoValidationData {
  valid: boolean;
  discount: number;
}

// Mock function to load insurance application data
export const loadInsuranceApplication = async (
  id: string
): Promise<ApiResponse<InsuranceApplicationData>> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real implementation, this would fetch from an actual API
  // For now, return mock data
  return {
    success: true,
    data: {
      id: `INS-${new Date().getFullYear()}-${String(
        Math.floor(Math.random() * 1000000)
      ).padStart(6, "0")}`,
      policyNumber: `POL-${new Date().getFullYear()}-${String(
        Math.floor(Math.random() * 1000000)
      ).padStart(6, "0")}`,
      message: "Заявка успешно загружена",
    },
  };
};

// Mock function to calculate premium
export const calculatePremium = async (
  formData: any
): Promise<ApiResponse<PremiumCalculationData>> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Calculate mock premium values
  const basePremium = formData.coverageAmount
    ? Math.round(formData.coverageAmount * 0.03)
    : 50000;
  const ageCoefficient =
    formData.age && formData.age < 25
      ? 1.5
      : formData.age && formData.age > 65
      ? 1.3
      : 1.0;
  const experienceCoefficient =
    formData.drivingExperience && formData.drivingExperience < 2 ? 1.4 : 1.0;
  const regionCoefficient = 1.2; // Mock value
  const claimsCoefficient =
    formData.claimsCount && formData.claimsCount > 0
      ? 1.0 + formData.claimsCount * 0.2
      : 0.8;
  const deductibleDiscount = formData.deductible
    ? Math.min(0.1, (formData.deductible / formData.coverageAmount) * 0.5)
    : 0;
  const promoDiscount = 0; // Will be calculated separately if promo code is valid
  const multiPolicyDiscount = 0.1; // Mock 10% discount for multiple policies

  const totalPremium = Math.round(
    basePremium *
      ageCoefficient *
      experienceCoefficient *
      regionCoefficient *
      claimsCoefficient *
      (1 - deductibleDiscount) *
      (1 - promoDiscount) *
      (1 - multiPolicyDiscount)
  );

  return {
    success: true,
    data: {
      basePremium,
      ageCoefficient,
      experienceCoefficient,
      regionCoefficient,
      claimsCoefficient,
      deductibleDiscount,
      promoDiscount,
      multiPolicyDiscount,
      totalPremium,
    },
  };
};

// Mock function to validate promo code
export const validatePromoCode = async (
  code: string
): Promise<ApiResponse<PromoValidationData>> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Mock validation - in real app, this would validate on the server
  const isValid =
    code.toUpperCase() === "PROMO2024" || code.toUpperCase() === "TEST10";
  const discount = isValid ? 0.1 : 0; // 10% discount for valid codes

  return {
    success: true,
    data: {
      valid: isValid,
      discount,
    },
  };
};

// Mock function to send verification code
export const sendVerificationCode = async (
  phone: string
): Promise<ApiResponse<null>> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // In a real implementation, this would send an SMS
  console.log(`Verification code sent to: ${phone}`);

  return {
    success: true,
  };
};

// Mock function to submit insurance application
export const submitInsuranceApplication = async (
  formData: any
): Promise<ApiResponse<InsuranceApplicationData>> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real implementation, this would send the form data to an actual API
  return {
    success: true,
    data: {
      id: `INS-${new Date().getFullYear()}-${String(
        Math.floor(Math.random() * 1000000)
      ).padStart(6, "0")}`,
      policyNumber: `POL-${new Date().getFullYear()}-${String(
        Math.floor(Math.random() * 1000000)
      ).padStart(6, "0")}`,
      message: "Заявка успешно создана. Полис будет отправлен на email.",
    },
  };
};

// Mock function to load car models by brand
export const loadCarModels = async (
  brand: string
): Promise<ApiResponse<Array<{ value: string; label: string }>>> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Mock data for car models
  const models: Record<string, string[]> = {
    toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Prius"],
    bmw: ["3 Series", "5 Series", "X3", "X5", "i3"],
    mercedes: ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
    audi: ["A3", "A4", "A6", "Q3", "Q5"],
  };

  const brandModels = models[brand.toLowerCase()] || [];

  return {
    success: true,
    data: brandModels.map((model) => ({
      value: model.toLowerCase().replace(/\s+/g, ""),
      label: model,
    })),
  };
};
