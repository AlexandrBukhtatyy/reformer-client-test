// Step 2: Insured Person Data
export interface Step2FormData {
  insuredType: 'individual' | 'company';
  personalData: {
    lastName: string;
    firstName: string;
    middleName?: string;
    birthDate: string; // YYYY-MM-DD
    gender: 'male' | 'female';
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
  fullName: string; // Computed
  age: number; // Computed
}