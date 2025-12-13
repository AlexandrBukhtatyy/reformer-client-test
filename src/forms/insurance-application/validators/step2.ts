// Step 2: Policyholder Data - Validators
import type { ValidationSchemaFn } from '@reformer/core';
import { required, email, minLength, applyWhen, validate } from '@reformer/core/validators';
import type { InsuranceApplicationForm } from '../type';

export const step2Validation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  // Insured Type - required
  required(path.insuredType, { message: 'Выберите тип страхователя' });

  // Personal Data - conditional, required when insuredType = 'individual'
  applyWhen(
    path.insuredType,
    (type) => type === 'individual',
    (p) => {
      required(p.personalData.lastName, { message: 'Введите фамилию' });
      minLength(p.personalData.lastName, 2, { message: 'Фамилия должна содержать минимум 2 символа' });

      required(p.personalData.firstName, { message: 'Введите имя' });
      minLength(p.personalData.firstName, 2, { message: 'Имя должно содержать минимум 2 символа' });

      required(p.personalData.birthDate, { message: 'Укажите дату рождения' });
      required(p.personalData.gender, { message: 'Выберите пол' });

      // Passport Data - conditional, required for individual
      required(p.passportData.series, { message: 'Введите серию паспорта' });
      required(p.passportData.number, { message: 'Введите номер паспорта' });
      required(p.passportData.issueDate, { message: 'Укажите дату выдачи паспорта' });
      required(p.passportData.issuedBy, { message: 'Укажите кем выдан паспорт' });
    }
  );

  // Company Data - conditional, required when insuredType = 'company'
  applyWhen(
    path.insuredType,
    (type) => type === 'company',
    (p) => {
      required(p.companyData.name, { message: 'Введите название организации' });
      required(p.companyData.inn, { message: 'Введите ИНН организации' });
      minLength(p.companyData.inn, 10, { message: 'ИНН должен содержать 10 цифр' });

      required(p.companyData.ogrn, { message: 'Введите ОГРН' });
      minLength(p.companyData.ogrn, 13, { message: 'ОГРН должен содержать 13 цифр' });

      required(p.companyData.kpp, { message: 'Введите КПП' });
      minLength(p.companyData.kpp, 9, { message: 'КПП должен содержать 9 цифр' });

      required(p.companyData.ceoName, { message: 'Введите ФИО руководителя' });
    }
  );

  // Phone - required
  required(path.phone, { message: 'Введите номер телефона' });
  validate(path.phone, (value) => {
    if (!value) return null;
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    if (digits.length < 11) {
      return { code: 'phone_format', message: 'Введите корректный номер телефона' };
    }
    return null;
  });

  // Email - required, email format
  required(path.email, { message: 'Введите email' });
  email(path.email, { message: 'Введите корректный email адрес' });

  // Age validation - must be 18-75 for individual
  applyWhen(
    path.insuredType,
    (type) => type === 'individual',
    (p) => {
      validate(p.age, (value) => {
        if (value === undefined || value === null) return null;
        if (value < 18) {
          return { code: 'min_age', message: 'Возраст страхователя должен быть не менее 18 лет' };
        }
        if (value > 75) {
          return { code: 'max_age', message: 'Возраст страхователя должен быть не более 75 лет' };
        }
        return null;
      });
    }
  );
};
