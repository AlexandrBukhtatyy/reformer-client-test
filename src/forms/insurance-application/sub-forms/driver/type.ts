export interface DriverData {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  age: number | undefined; // computed
  licenseNumber: string;
  licenseIssueDate: string;
  experience: number | undefined; // computed: years since licenseIssueDate
}
