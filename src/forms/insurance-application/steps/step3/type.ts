export interface Step3Form {
  // Insurance Object - Vehicle (casco/osago)
  vehicle?: {
    vin: string;
    brand: string;
    model: string;
    year: number | undefined;
    mileage: number | undefined;
    enginePower: number | undefined;
    bodyType: 'sedan' | 'hatchback' | 'suv' | 'wagon' | 'coupe' | 'minivan' | 'pickup';
    transmission: 'manual' | 'automatic';
    marketValue: number | undefined;
    licensePlate: string;
    registrationCert: string;
    hasAntiTheft: boolean;
    antiTheftBrand: string;
    garageParking: boolean;
    usagePurpose: 'personal' | 'taxi' | 'training' | 'commercial';
  };

  // Insurance Object - Property
  property?: {
    type: 'apartment' | 'house' | 'townhouse' | 'commercial' | 'land';
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
    wallMaterial: 'brick' | 'concrete' | 'wood' | 'panel' | 'monolithic' | 'other';
    marketValue: number | undefined;
    hasAlarm: boolean;
    hasFireAlarm: boolean;
    ownershipDoc: string;
  };

  // Insurance Object - Health
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

  // Insurance Object - Travel
  travel?: {
    destination: 'europe' | 'asia' | 'usa' | 'cis' | 'worldwide';
    tripPurpose: 'tourism' | 'business' | 'study' | 'work' | 'other';
    departureDate: string; // date string
    returnDate: string; // date string
    tripDuration: number | undefined; // computed
  };

  // Insurance Object - Coverage Options
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
}