// Enums
export type LoanType = 'consumer' | 'mortgage' | 'car' | 'business' | 'refinance';
export type Gender = 'male' | 'female';
export type EmploymentStatus = 'employed' | 'selfEmployed' | 'unemployed' | 'retired' | 'student';
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';
export type Education = 'secondary' | 'specialized' | 'higher' | 'postgraduate';
export type PropertyType = 'apartment' | 'house' | 'land' | 'car' | 'other';

// Nested interfaces
export interface PersonalData {
 lastName: string;
 firstName: string;
 middleName: string;
  birthDate: string;
  gender: Gender;
  birthPlace: string;
}

export interface PassportData {
  series: string;
  number: string;
  issueDate: string;
  issuedBy: string;
  departmentCode: string;
}

export interface Address {
  region: string;
  city: string;
  street: string;
  house: string;
 apartment: string;
  postalCode: string;
}

export interface Property {
  type: PropertyType;
 description: string;
 estimatedValue: number;
  hasEncumbrance: boolean;
}

export interface ExistingLoan {
  bank: string;
  type: string;
 amount: number;
 remainingAmount: number;
  monthlyPayment: number;
  maturityDate: string;
}

export interface CoBorrower {
  personalData: PersonalData;
  phone: string;
  email: string;
 relationship: string;
 monthlyIncome: number;
}

// Main form interface
export interface CreditApplicationForm {
  // Step 1: Loan Info
  loanType: LoanType;
  loanAmount: number;
  loanTerm: number;
  loanPurpose: string;
 propertyValue: number | undefined;
  initialPayment: number | undefined;
  carBrand: string | undefined;
  carModel: string | undefined;
  carYear: number | undefined;
  carPrice: number | undefined;

  // Step 2: Personal Data
  personalData: PersonalData;
  passportData: PassportData;
  inn: string;
  snils: string;

  // Step 3: Contact Info
  phoneMain: string;
  phoneAdditional: string | undefined;
  email: string;
  emailAdditional: string | undefined;
  registrationAddress: Address;
  sameAsRegistration: boolean;
  residenceAddress: Address;

  // Step 4: Employment Info
  employmentStatus: EmploymentStatus;
  companyName: string | undefined;
  companyInn: string | undefined;
  companyPhone: string | undefined;
  companyAddress: string | undefined;
 position: string | undefined;
  workExperienceTotal: number;
  workExperienceCurrent: number;
  monthlyIncome: number;
  additionalIncome: number;
  additionalIncomeSource: string | undefined;
  businessType: string | undefined;
  businessInn: string | undefined;
  businessActivity: string | undefined;

  // Step 5: Additional Info
  maritalStatus: MaritalStatus;
  dependents: number;
  education: Education;
  hasProperty: boolean;
  properties: Property[];
  hasExistingLoans: boolean;
 existingLoans: ExistingLoan[];
  hasCoBorrower: boolean;
  coBorrowers: CoBorrower[];

  // Step 6: Confirmation
  agreePersonalData: boolean;
 agreeCreditHistory: boolean;
  agreeMarketing: boolean;
  agreeTerms: boolean;
  confirmAccuracy: boolean;
  electronicSignature: string;

  // Computed fields
  interestRate: number;
  monthlyPayment: number;
  fullName: string;
  age: number;
  totalIncome: number;
  paymentToIncomeRatio: number;
  coBorrowersIncome: number;
}