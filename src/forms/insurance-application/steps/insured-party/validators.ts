import type { ValidationSchemaFn } from '@reformer/core';
import { required, email, min, max, applyWhen, minLength } from '@reformer/core/validators';
import type { InsuredPartyStep } from './type';

export const insuredPartyValidation: ValidationSchemaFn<InsuredPartyStep> = (path) => {
  required(path.insuredType, { message: 'Выберите тип страхователя' });

  // Валидация для физического лица
  applyWhen(
    path.insuredType,
    (type) => type === 'individual',
    (p) => {
      required(p.personalData.lastName, { message: 'Введите фамилию' });
      required(p.personalData.firstName, { message: 'Введите имя' });
      required(p.personalData.birthDate, { message: 'Укажите дату рождения' });
      required(p.personalData.gender, { message: 'Выберите пол' });

      min(p.age, 18, { message: 'Минимальный возраст страхователя 18 лет' });
      max(p.age, 75, { message: 'Максимальный возраст страхователя 75 лет' });

      required(p.passportData.series, { message: 'Введите серию паспорта' });
      required(p.passportData.number, { message: 'Введите номер паспорта' });
      required(p.passportData.issueDate, { message: 'Укажите дату выдачи паспорта' });
      required(p.passportData.issuedBy, { message: 'Укажите кем выдан паспорт' });
    }
  );

  // Валидация для юридического лица
  applyWhen(
    path.insuredType,
    (type) => type === 'company',
    (p) => {
      required(p.companyData.name, { message: 'Введите название организации' });
      required(p.companyData.inn, { message: 'Введите ИНН организации' });
      minLength(p.companyData.inn, 10, { message: 'ИНН должен содержать 10 цифр' });
      required(p.companyData.ogrn, { message: 'Введите ОГРН' });
      minLength(p.companyData.ogrn, 13, { message: 'ОГРН должен содержать 13 цифр' });
      required(p.companyData.ceoName, { message: 'Введите ФИО руководителя' });
    }
  );

  // Общие поля
  required(path.phone, { message: 'Введите номер телефона' });
  required(path.email, { message: 'Введите email' });
  email(path.email, { message: 'Некорректный email' });
};
