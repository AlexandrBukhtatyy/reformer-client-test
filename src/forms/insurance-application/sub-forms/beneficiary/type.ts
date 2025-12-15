export type RelationType = 'spouse' | 'child' | 'parent' | 'sibling' | 'other';

export interface BeneficiaryData {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  relation: RelationType;
  share: number | undefined; // % от выплаты (сумма всех должна быть 100%)
  passportSeries: string;
  passportNumber: string;
  phone: string;
}
