export interface InsuranceApplicationForm {
  // Step 1: Insurance Type and Parameters
  insuranceType: "casco" | "osago" | "property" | "life" | "travel";
  insurancePeriod: 3 | 6 | 12 | 24 | 36;
  startDate: string; // date string
  endDate: string; // computed
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
    birthDate: string; // date string
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
    issueDate: string; // date string
    issuedBy: string;
  };
  phone: string;
  email: string;
  fullName: string; // computed
  age: number | undefined; // computed

  // Step 3: Insurance Object - Vehicle (casco/osago)
  vehicle?: {
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

  // Step 3: Insurance Object - Property
  property?: {
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

  // Step 3: Insurance Object - Health
  health?: {
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

  // Step 3: Insurance Object - Travel
  travel?: {
    destination: "europe" | "asia" | "usa" | "cis" | "worldwide";
    tripPurpose: "tourism" | "business" | "study" | "work" | "other";
    departureDate: string; // date string
    returnDate: string; // date string
    tripDuration: number | undefined; // computed
    isMultipleTrips: boolean;
  };

  // Step 3: Insurance Object - Coverage Options
  propertyCoverageOptions?: {
    structure: boolean;
    interior: boolean;
    movables: boolean;
    liability: boolean;
  };
  lifeCoverageOptions?: {
    death: boolean;
    disability: boolean;
    criticalIllness: boolean;
    accident: boolean;
  };
  travelCoverageOptions?: {
    medical: boolean;
    baggage: boolean;
    tripCancellation: boolean;
    flightDelay: boolean;
    carRental: boolean;
  };

  // Step 4: Drivers/Beneficiaries - Drivers (casco/osago)
  drivers?: Array<{
    fullName: string;
    birthDate: string; // date string
    licenseNumber: string;
    licenseIssueDate: string; // date string
    drivingExperience: number | undefined; // computed
    accidentsCount: number;
    isMainDriver: boolean;
  }>;
  unlimitedDrivers: boolean;
  minDriverAge: number | undefined; // computed
  minDriverExperience: number | undefined; // computed

  // Step 4: Beneficiaries (life)
  beneficiaries?: Array<{
    fullName: string;
    birthDate: string; // date string
    relationship: "spouse" | "child" | "parent" | "sibling" | "other";
    share: number | undefined;
    phone: string;
  }>;
  totalBeneficiaryShare: number | undefined; // computed

  // Step 4: Travelers (travel)
  travelers?: Array<{
    fullName: string;
    birthDate: string; // date string
    passportNumber: string;
  }>;

  // Step 5: History and Additional Info
  hasPreviousInsurance: boolean;
  previousInsurer: string;
  previousPolicyNumber: string;
  previousPolicyEndDate: string; // date string
  hadClaims: boolean;
  claims?: Array<{
    date: string; // date string
    type: "accident" | "theft" | "damage" | "disaster" | "medical" | "other";
    description: string;
    amount: number | undefined;
    atFault: boolean;
  }>;
  promoCode: string;
  referralSource: "internet" | "friends" | "tv" | "agent" | "other";
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

  // Policy data (step 6)
  policyNumber: string;
  policyStartDate: string; // date string
  policyEndDate: string; // date string
}
