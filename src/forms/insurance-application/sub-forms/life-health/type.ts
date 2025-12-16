export interface LifeCoverageOptions {
  death: boolean;           // Смерть
  disability: boolean;      // Инвалидность
  criticalIllness: boolean; // Критические заболевания
  accident: boolean;        // Несчастный случай
}

export interface LifeHealthData {
  height: number | undefined;
  weight: number | undefined;
  bmi: number | undefined; // computed: weight / (height/100)^2
  bloodPressureSystolic: number | undefined;
  bloodPressureDiastolic: number | undefined;
  hasChronicDiseases: boolean;
  chronicDiseasesDescription: string;
  isSmoker: boolean;
  smokingYears: number | undefined;
  hasAllergies: boolean;
  allergiesDescription: string;
  hasSurgeries: boolean;
  surgeriesDescription: string;
  occupation: string;
  isHazardousWork: boolean;
  practicesSports: boolean;
  extremeSports: boolean;
  coverageOptions: LifeCoverageOptions;
}
