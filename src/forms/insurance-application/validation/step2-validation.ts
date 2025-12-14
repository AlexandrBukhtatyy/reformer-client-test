// Step 2: Insured Party Data - Validation Schema
import type { ValidationSchemaFn, FieldPath } from '@reformer/core';
import { required, minLength, email, validate, applyWhen } from '@reformer/core/validators';
import type { InsuranceApplicationForm } from '../types';

export const step2Validation: ValidationSchemaFn<InsuranceApplicationForm> = (
  path: FieldPath<InsuranceApplicationForm>
) => {
  // Insured type - required
  required(path.insuredType, { message: 'Выберите тип страхователя' });

  // Personal data - required for individuals
  applyWhen(
    path.insuredType,
    (type) => type === 'individual',
    (p) => {
      required(p.personalData.lastName, { message: 'Укажите фамилию' });
      minLength(p.personalData.lastName, 2, { message: 'Минимум 2 символа' });

      required(p.personalData.firstName, { message: 'Укажите имя' });
      minLength(p.personalData.firstName, 2, { message: 'Минимум 2 символа' });

      required(p.personalData.birthDate, { message: 'Укажите дату рождения' });
      validate(p.personalData.birthDate, (value) => {
        if (!value) return null;
        const birthDate = new Date(value);
        const today = new Date();
        const age = Math.floor(
          (today.getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
        );
        if (age < 18) {
          return { code: 'minAge', message: 'Возраст должен быть не менее 18 лет' };
        }
        if (age > 75) {
          return { code: 'maxAge', message: 'Возраст не должен превышать 75 лет' };
        }
        return null;
      });

      required(p.personalData.gender, { message: 'Укажите пол' });

      // Passport data for individuals
      required(p.passportData.series, { message: 'Укажите серию паспорта' });
      validate(p.passportData.series, (value) => {
        if (!value) return null;
        if (!/^\d{2}\s?\d{2}$/.test(value.replace(/\s/g, ' '))) {
          return { code: 'format', message: 'Формат: XX XX (4 цифры)' };
        }
        return null;
      });

      required(p.passportData.number, { message: 'Укажите номер паспорта' });
      validate(p.passportData.number, (value) => {
        if (!value) return null;
        if (!/^\d{6}$/.test(value)) {
          return { code: 'format', message: 'Номер должен содержать 6 цифр' };
        }
        return null;
      });

      required(p.passportData.issueDate, { message: 'Укажите дату выдачи' });
      required(p.passportData.issuedBy, { message: 'Укажите кем выдан паспорт' });
    }
  );

  // Company data - required for companies
  applyWhen(
    path.insuredType,
    (type) => type === 'company',
    (p) => {
      required(p.companyData.name, { message: 'Укажите название организации' });
      minLength(p.companyData.name, 3, { message: 'Минимум 3 символа' });

      required(p.companyData.inn, { message: 'Укажите ИНН' });
      validate(p.companyData.inn, (value) => {
        if (!value) return null;
        if (!/^\d{10}$/.test(value)) {
          return { code: 'format', message: 'ИНН должен содержать 10 цифр' };
        }
        return null;
      });

      required(p.companyData.ogrn, { message: 'Укажите ОГРН' });
      validate(p.companyData.ogrn, (value) => {
        if (!value) return null;
        if (!/^\d{13}$/.test(value)) {
          return { code: 'format', message: 'ОГРН должен содержать 13 цифр' };
        }
        return null;
      });

      required(p.companyData.kpp, { message: 'Укажите КПП' });
      validate(p.companyData.kpp, (value) => {
        if (!value) return null;
        if (!/^\d{9}$/.test(value)) {
          return { code: 'format', message: 'КПП должен содержать 9 цифр' };
        }
        return null;
      });

      required(p.companyData.ceoName, { message: 'Укажите ФИО руководителя' });
    }
  );

  // Contact information - required for all
  required(path.phone, { message: 'Укажите телефон' });
  validate(path.phone, (value) => {
    if (!value) return null;
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length !== 11) {
      return { code: 'format', message: 'Введите корректный номер телефона' };
    }
    return null;
  });

  required(path.email, { message: 'Укажите email' });
  email(path.email, { message: 'Введите корректный email' });
};
