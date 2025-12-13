export interface Step4Form {
  // Drivers (for casco/osago)
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

  // Beneficiaries (for life)
  beneficiaries?: Array<{
    fullName: string;
    birthDate: string; // date string
    relationship: 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
    share: number | undefined;
    phone: string;
  }>;
  totalBeneficiaryShare: number | undefined; // computed

  // Travelers (for travel)
  travelers?: Array<{
    fullName: string;
    birthDate: string; // date string
    passportNumber: string;
  }>;
}