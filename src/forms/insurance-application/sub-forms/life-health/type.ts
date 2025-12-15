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
}
