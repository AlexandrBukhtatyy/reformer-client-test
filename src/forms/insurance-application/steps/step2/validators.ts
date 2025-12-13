import { required, email, date, applyWhen } from '@reformer/core/validators';
import type { ValidationSchemaFn, FieldPath } from '@reformer/core';
import type { Step2Form } from './type';

export const step2Validation: ValidationSchemaFn<Step2Form> = (path: FieldPath<Step2Form>) => {
  // insuredType validation
  required(path.insuredType, { message: 'Тип страхователя обязателен' });

  // Conditional validation for personal data (when insuredType is 'individual')
  applyWhen(
    path.insuredType,
    (type) => type === 'individual',
    (p) => {
      required(p.personalData.lastName, { message: 'Фамилия обязательна' });
      required(p.personalData.firstName, { message: 'Имя обязательно' });
      required(p.personalData.birthDate, { message: 'Дата рождения обязательна' });
      date(p.personalData.birthDate, { message: 'Некорректная дата рождения' });
      
      // Validate age is between 18 and 75 using custom validation
      // We'll handle this in the behavior/validation logic separately since it requires age calculation

      required(p.passportData.series, { message: 'Серия паспорта обязательна' });
      required(p.passportData.number, { message: 'Номер паспорта обязателен' });
      required(p.passportData.issueDate, { message: 'Дата выдачи паспорта обязательна' });
      date(p.passportData.issueDate, { message: 'Некорректная дата выдачи' });
      required(p.passportData.issuedBy, { message: 'Кем выдан паспорт обязательно' });
    }
  );

  // Conditional validation for company data (when insuredType is 'company')
  applyWhen(
    path.insuredType,
    (type) => type === 'company',
    (p) => {
      required(p.companyData.name, { message: 'Название организации обязательно' });
      required(p.companyData.inn, { message: 'ИНН обязателен' });
      required(p.companyData.ogrn, { message: 'ОГРН обязателен' });
      required(p.companyData.kpp, { message: 'КПП обязателен' });
      required(p.companyData.ceoName, { message: 'ФИО руководителя обязательно' });
    }
  );

  // Common validations for both types
  required(path.phone, { message: 'Телефон обязателен' });
  required(path.email, { message: 'Email обязателен' });
  email(path.email, { message: 'Некорректный формат email' });
};