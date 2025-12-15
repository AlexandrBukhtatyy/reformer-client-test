export type InsuredType = 'individual' | 'company';
export type Gender = 'male' | 'female';

export interface PersonalData {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  gender: Gender;
}

export interface CompanyData {
  name: string;
  inn: string;
  ogrn: string;
  kpp: string;
  ceoName: string;
}

export interface PassportData {
  series: string;
  number: string;
  issueDate: string;
  issuedBy: string;
}

export interface InsuredPartyStep {
  insuredType: InsuredType;
  personalData: PersonalData;
  companyData: CompanyData;
  passportData: PassportData;
  phone: string;
  email: string;
  fullName: string; // computed
  age: number | undefined; // computed
}
