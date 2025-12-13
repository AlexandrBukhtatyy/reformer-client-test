import { required, min, max, number, date, validateItems } from '@reformer/core/validators';
import type { ValidationSchemaFn, FieldPath } from '@reformer/core';
import type { Step4Form } from './type';

export const step4Validation: ValidationSchemaFn<Step4Form> = (path: FieldPath<Step4Form>) => {
  // Drivers validation (conditional based on insurance type)
  // Required if unlimitedDrivers is false and insuranceType is 'casco' or 'osago'
  
  // Driver validations
  if (path.drivers) {
    // Validate each driver in the array
    validateItems(path.drivers, (driverPath) => {
      required(driverPath.fullName, { message: 'ФИО водителя обязательно' });
      required(driverPath.birthDate, { message: 'Дата рождения обязательна' });
      date(driverPath.birthDate, { message: 'Некорректная дата рождения' });
      required(driverPath.licenseNumber, { message: 'Номер ВУ обязателен' });
      required(driverPath.licenseIssueDate, { message: 'Дата выдачи ВУ обязательна' });
      date(driverPath.licenseIssueDate, { message: 'Некорректная дата выдачи ВУ' });
      min(driverPath.accidentsCount, 0, { message: 'Количество ДТП не может быть отрицательным' });
    });
  }

  // Beneficiaries validation (conditional based on insurance type)
  if (path.beneficiaries) {
    // Validate each beneficiary in the array
    validateItems(path.beneficiaries, (beneficiaryPath) => {
      required(beneficiaryPath.fullName, { message: 'ФИО выгодоприобретателя обязательно' });
      required(beneficiaryPath.birthDate, { message: 'Дата рождения обязательна' });
      date(beneficiaryPath.birthDate, { message: 'Некорректная дата рождения' });
      required(beneficiaryPath.relationship, { message: 'Степень родства обязательна' });
      required(beneficiaryPath.share, { message: 'Доля обязательна' });
      number(beneficiaryPath.share, { message: 'Доля должна быть числом' });
      min(beneficiaryPath.share, 1, { message: 'Минимальная доля 1%' });
      max(beneficiaryPath.share, 100, { message: 'Максимальная доля 100%' });
      required(beneficiaryPath.phone, { message: 'Телефон обязателен' });
    });
  }

  // Travelers validation (conditional based on insurance type)
  if (path.travelers) {
    // Validate each traveler in the array
    validateItems(path.travelers, (travelerPath) => {
      required(travelerPath.fullName, { message: 'ФИО путешественника обязательно' });
      required(travelerPath.birthDate, { message: 'Дата рождения обязательна' });
      date(travelerPath.birthDate, { message: 'Некорректная дата рождения' });
      required(travelerPath.passportNumber, { message: 'Номер загранпаспорта обязателен' });
    });
  }

  // Total beneficiary share validation - should sum to 100%
  // This would be handled in cross-field validation
};