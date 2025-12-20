import { createForm } from "@reformer/core";
import { step1Schema } from "./step1-schema";
import { step2Schema } from "./step2-schema";
import { step3Schema } from "./step3-schema";
import { step4Schema } from "./step4-schema";
import { step5Schema } from "./step5-schema";
import { step6Schema } from "./step6-schema";
import { step1Validation } from "./step1-schema";
import { step2Validation } from "./step2-schema";
import { step3Validation } from "./step3-schema";
import { step4Validation } from "./step4-schema";
import { step5Validation } from "./step5-schema";
import { step6Validation } from "./step6-schema";
import { step1Behavior } from "./step1-schema";
import { step2Behavior } from "./step2-schema";
import { step3Behavior } from "./step3-schema";
import { step4Behavior } from "./step4-schema";
import { step5Behavior } from "./step5-schema";
import { step6Behavior } from "./step6-schema";

// Combined form interface
export interface InsuranceApplicationForm {
  // Step 1: Insurance Type and Basic Parameters
  insuranceType: "casco" | "osago" | "property" | "life" | "travel" | "";
  insurancePeriod: 3 | 6 | 12 | 24 | 36;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD (computed)
  coverageAmount: number | undefined;
  deductible: number | undefined;
  paymentType: "single" | "installments";
  installments: 2 | 3 | 4 | 6 | 12 | undefined;

  // Step 2: Insured Data
  insuredType: "individual" | "company";
  personalData: {
    lastName: string;
    firstName: string;
    middleName: string;
    birthDate: string; // YYYY-MM-DD
    gender: "male" | "female";
  };
  companyData: {
    name: string;
    inn: string;
    ogrn: string;
    kpp: string;
    ceoName: string;
  };
  passportData: {
    series: string;
    number: string;
    issueDate: string; // YYYY-MM-DD
    issuedBy: string;
  };
  phone: string;
  email: string;
  fullName: string; // computed
  age: number | undefined; // computed

  // Step 3: Insured Object
  vehicle: {
    vin: string;
    brand: string;
    model: string;
    year: number | undefined;
    mileage: number | undefined;
    enginePower: number | undefined;
    bodyType:
      | "sedan"
      | "hatchback"
      | "suv"
      | "wagon"
      | "coupe"
      | "minivan"
      | "pickup";
    transmission: "manual" | "automatic";
    marketValue: number | undefined;
    licensePlate: string;
    registrationCert: string;
    hasAntiTheft: boolean;
    antiTheftBrand: string;
    garageParking: boolean;
    usagePurpose: "personal" | "taxi" | "training" | "commercial";
  };
  property: {
    type: "apartment" | "house" | "townhouse" | "commercial" | "land";
    address: {
      region: string;
      city: string;
      street: string;
      house: string;
      apartment: string;
    };
    area: number | undefined;
    floors: number | undefined;
    floor: number | undefined;
    yearBuilt: number | undefined;
    wallMaterial:
      | "brick"
      | "concrete"
      | "wood"
      | "panel"
      | "monolithic"
      | "other";
    marketValue: number | undefined;
    hasAlarm: boolean;
    hasFireAlarm: boolean;
    ownershipDoc: string;
  };
  propertyCoverageOptions: {
    structure: boolean;
    interior: boolean;
    movables: boolean;
    liability: boolean;
  };
  health: {
    height: number | undefined;
    weight: number | undefined;
    bmi: number | undefined; // computed
    bloodPressure: string;
    isSmoker: boolean;
    smokingYears: number | undefined;
    hasChronicDiseases: boolean;
    chronicDiseases: string;
    hadSurgeries: boolean;
    surgeries: string;
    occupation: string;
    isHighRiskJob: boolean;
    practicesSports: boolean;
    extremeSports: boolean;
  };
  lifeCoverageOptions: {
    death: boolean;
    disability: boolean;
    criticalIllness: boolean;
    accident: boolean;
  };
  travel: {
    destination: "europe" | "asia" | "usa" | "cis" | "worldwide";
    tripPurpose: "tourism" | "business" | "study" | "work" | "other";
    departureDate: string; // YYYY-MM-DD
    returnDate: string; // YYYY-MM-DD
    tripDuration: number | undefined; // computed
    isMultipleTrips: boolean;
  };
  travelers: Array<{
    fullName: string;
    birthDate: string; // YYYY-MM-DD
    passportNumber: string;
  }>;
  travelCoverageOptions: {
    medical: boolean;
    baggage: boolean;
    tripCancellation: boolean;
    flightDelay: boolean;
    carRental: boolean;
  };

  // Step 4: Drivers and Insured Persons
  drivers: Array<{
    fullName: string;
    birthDate: string; // YYYY-MM-DD
    licenseNumber: string;
    licenseIssueDate: string; // YYYY-MM-DD
    drivingExperience: number | undefined; // computed
    accidentsCount: number;
    isMainDriver: boolean;
  }>;
  unlimitedDrivers: boolean;
  minDriverAge: number | undefined; // computed
  minDriverExperience: number | undefined; // computed
  beneficiaries: Array<{
    fullName: string;
    birthDate: string; // YYYY-MM-DD
    relationship: "spouse" | "child" | "parent" | "sibling" | "other";
    share: number | undefined;
    phone: string;
  }>;
  totalBeneficiaryShare: number | undefined; // computed

  // Step 5: History and Additional Information
  hasPreviousInsurance: boolean;
  previousInsurer: string;
  previousPolicyNumber: string;
  previousPolicyEndDate: string; // YYYY-MM-DD
  hadClaims: boolean;
  claims: Array<{
    date: string; // YYYY-MM-DD
    type: "accident" | "theft" | "damage" | "disaster" | "medical" | "other";
    description: string;
    amount: number | undefined;
    atFault: boolean;
  }>;
  promoCode: string;
  referralSource: "internet" | "friend" | "tv" | "agent" | "other";
  agentCode: string;
  additionalNotes: string;

  // Step 6: Calculation and Confirmation
  basePremium: number | undefined; // computed
  ageCoefficient: number | undefined; // computed
  experienceCoefficient: number | undefined; // computed
  regionCoefficient: number | undefined; // computed
  claimsCoefficient: number | undefined; // computed
  deductibleDiscount: number | undefined; // computed
  promoDiscount: number | undefined; // computed
  multiPolicyDiscount: number | undefined; // computed
  totalPremium: number | undefined; // computed
  installmentAmount: number | undefined; // computed
  agreePersonalData: boolean;
  agreeTerms: boolean;
  agreeElectronicPolicy: boolean;
  agreeMarketing: boolean;
  confirmAccuracy: boolean;
  electronicSignature: string;
}

// Combined form schema
export const insuranceApplicationSchema = {
  ...step1Schema,
  ...step2Schema,
  ...step3Schema,
  ...step4Schema,
  ...step5Schema,
  ...step6Schema,
};

// Combined validation
export const insuranceApplicationValidation = (path: any) => {
  step1Validation(path);
  step2Validation(path);
  step3Validation(path);
  step4Validation(path);
  step5Validation(path);
  step6Validation(path);
};

// Combined behavior
export const insuranceApplicationBehavior = (path: any) => {
  step1Behavior(path);
  step2Behavior(path);
  step3Behavior(path);
  step4Behavior(path);
  step5Behavior(path);
  step6Behavior(path);
};

// Create the main form
export const insuranceApplicationForm = createForm<InsuranceApplicationForm>({
  form: insuranceApplicationSchema,
  validation: insuranceApplicationValidation,
  behavior: insuranceApplicationBehavior,
});
