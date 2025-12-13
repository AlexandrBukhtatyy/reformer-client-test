export interface Step2Form {
  insuredType: 'individual' | 'company';
  personalData: {
    lastName: string;
    firstName: string;
    middleName: string;
    birthDate: string; // date string
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
    issueDate: string; // date string
    issuedBy: string;
  };
  phone: string;
  email: string;
  fullName: string; // computed
 age: number | undefined; // computed
}