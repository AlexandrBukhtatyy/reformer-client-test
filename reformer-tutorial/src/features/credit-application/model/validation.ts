/**
 * Валидация формы заявки на кредит
 */

import type { ValidationSchemaFn } from '@reformer/core';
import { required, min, max, minLength, maxLength, email, applyWhen } from '@reformer/core/validators';

import type { CreditApplicationForm } from './types';
import { LOAN_LIMITS, CAR_LIMITS, AGE_LIMITS } from './constants';

// ============================================================================
// Валидация по шагам
// ============================================================================

/** Шаг 1: Основная информация о кредите */
export const step1Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  required(path.loanType, { message: 'Выберите тип кредита' });
  required(path.loanAmount, { message: 'Укажите сумму кредита' });
  min(path.loanAmount, LOAN_LIMITS.minAmount, { message: `Минимальная сумма: ${LOAN_LIMITS.minAmount.toLocaleString()} ₽` });
  max(path.loanAmount, LOAN_LIMITS.maxAmount, { message: `Максимальная сумма: ${LOAN_LIMITS.maxAmount.toLocaleString()} ₽` });

  required(path.loanTerm, { message: 'Укажите срок кредита' });
  min(path.loanTerm, LOAN_LIMITS.minTerm, { message: `Минимальный срок: ${LOAN_LIMITS.minTerm} мес.` });
  max(path.loanTerm, LOAN_LIMITS.maxTerm, { message: `Максимальный срок: ${LOAN_LIMITS.maxTerm} мес.` });

  required(path.loanPurpose, { message: 'Укажите цель кредита' });
  minLength(path.loanPurpose, 10, { message: 'Минимум 10 символов' });
  maxLength(path.loanPurpose, 500, { message: 'Максимум 500 символов' });

  // Условная валидация для ипотеки
  applyWhen(
    path.loanType,
    (loanType) => loanType === 'mortgage',
    (p) => {
      required(p.propertyValue, { message: 'Укажите стоимость недвижимости' });
      min(p.propertyValue, 1000000, { message: 'Минимальная стоимость: 1 000 000 ₽' });
      required(p.initialPayment, { message: 'Укажите первоначальный взнос' });
    }
  );

  // Условная валидация для автокредита
  applyWhen(
    path.loanType,
    (loanType) => loanType === 'car',
    (p) => {
      required(p.carBrand, { message: 'Укажите марку автомобиля' });
      minLength(p.carBrand, 2, { message: 'Минимум 2 символа' });
      required(p.carModel, { message: 'Укажите модель автомобиля' });
      required(p.carYear, { message: 'Укажите год выпуска' });
      min(p.carYear, CAR_LIMITS.minYear, { message: `Минимальный год: ${CAR_LIMITS.minYear}` });
      max(p.carYear, CAR_LIMITS.maxYear, { message: `Максимальный год: ${CAR_LIMITS.maxYear}` });
      required(p.carPrice, { message: 'Укажите стоимость автомобиля' });
      min(p.carPrice, CAR_LIMITS.minPrice, { message: `Минимальная стоимость: ${CAR_LIMITS.minPrice.toLocaleString()} ₽` });
      max(p.carPrice, CAR_LIMITS.maxPrice, { message: `Максимальная стоимость: ${CAR_LIMITS.maxPrice.toLocaleString()} ₽` });
    }
  );
};

/** Шаг 2: Персональные данные */
export const step2Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  // Личные данные
  required(path.personalData.lastName, { message: 'Укажите фамилию' });
  required(path.personalData.firstName, { message: 'Укажите имя' });
  required(path.personalData.middleName, { message: 'Укажите отчество' });
  required(path.personalData.birthDate, { message: 'Укажите дату рождения' });
  required(path.personalData.gender, { message: 'Выберите пол' });
  required(path.personalData.birthPlace, { message: 'Укажите место рождения' });

  // Паспортные данные
  required(path.passportData.series, { message: 'Укажите серию паспорта' });
  required(path.passportData.number, { message: 'Укажите номер паспорта' });
  required(path.passportData.issueDate, { message: 'Укажите дату выдачи' });
  required(path.passportData.issuedBy, { message: 'Укажите кем выдан паспорт' });
  required(path.passportData.departmentCode, { message: 'Укажите код подразделения' });

  // Документы
  required(path.inn, { message: 'Укажите ИНН' });
  required(path.snils, { message: 'Укажите СНИЛС' });

  // Валидация возраста
  min(path.age, AGE_LIMITS.min, { message: `Минимальный возраст: ${AGE_LIMITS.min} лет` });
  max(path.age, AGE_LIMITS.max, { message: `Максимальный возраст: ${AGE_LIMITS.max} лет` });
};

/** Шаг 3: Контактная информация */
export const step3Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  required(path.phoneMain, { message: 'Укажите основной телефон' });
  required(path.email, { message: 'Укажите email' });
  email(path.email, { message: 'Введите корректный email' });

  // Адрес регистрации
  required(path.registrationAddress.region, { message: 'Укажите регион' });
  required(path.registrationAddress.city, { message: 'Укажите город' });
  required(path.registrationAddress.street, { message: 'Укажите улицу' });
  required(path.registrationAddress.house, { message: 'Укажите дом' });
  required(path.registrationAddress.postalCode, { message: 'Укажите индекс' });

  // Условная валидация адреса проживания
  applyWhen(
    path.sameAsRegistration,
    (sameAsRegistration) => sameAsRegistration === false,
    (p) => {
      required(p.residenceAddress.region, { message: 'Укажите регион' });
      required(p.residenceAddress.city, { message: 'Укажите город' });
      required(p.residenceAddress.street, { message: 'Укажите улицу' });
      required(p.residenceAddress.house, { message: 'Укажите дом' });
      required(p.residenceAddress.postalCode, { message: 'Укажите индекс' });
    }
  );
};

/** Шаг 4: Информация о занятости */
export const step4Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  required(path.employmentStatus, { message: 'Выберите статус занятости' });

  // Условная валидация для работающих по найму
  applyWhen(
    path.employmentStatus,
    (employmentStatus) => employmentStatus === 'employed',
    (p) => {
      required(p.companyName, { message: 'Укажите название компании' });
      required(p.companyInn, { message: 'Укажите ИНН компании' });
      required(p.position, { message: 'Укажите должность' });
    }
  );

  // Условная валидация для ИП
  applyWhen(
    path.employmentStatus,
    (employmentStatus) => employmentStatus === 'selfEmployed',
    (p) => {
      required(p.businessType, { message: 'Укажите тип бизнеса' });
      required(p.businessInn, { message: 'Укажите ИНН ИП' });
    }
  );

  required(path.workExperienceTotal, { message: 'Укажите общий стаж работы' });
  min(path.workExperienceTotal, 0, { message: 'Стаж не может быть отрицательным' });

  required(path.workExperienceCurrent, { message: 'Укажите стаж на текущем месте' });
  min(path.workExperienceCurrent, 0, { message: 'Стаж не может быть отрицательным' });

  required(path.monthlyIncome, { message: 'Укажите ежемесячный доход' });
  min(path.monthlyIncome, 10000, { message: 'Минимальный доход: 10 000 ₽' });
};

/** Шаг 5: Дополнительная информация */
export const step5Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  required(path.maritalStatus, { message: 'Выберите семейное положение' });
  required(path.dependents, { message: 'Укажите количество иждивенцев' });
  min(path.dependents, 0, { message: 'Количество не может быть отрицательным' });
  max(path.dependents, 10, { message: 'Максимум 10 иждивенцев' });
  required(path.education, { message: 'Выберите уровень образования' });
};

/** Шаг 6: Подтверждение и согласия */
export const step6Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  required(path.agreePersonalData, { message: 'Необходимо согласие на обработку персональных данных' });
  required(path.agreeCreditHistory, { message: 'Необходимо согласие на проверку кредитной истории' });
  required(path.agreeTerms, { message: 'Необходимо согласие с условиями кредитования' });
  required(path.confirmAccuracy, { message: 'Необходимо подтвердить точность данных' });
  required(path.electronicSignature, { message: 'Введите код подтверждения из СМС' });
};

// ============================================================================
// Карта валидаций по шагам
// ============================================================================

export const STEP_VALIDATIONS: Record<number, ValidationSchemaFn<CreditApplicationForm>> = {
  1: step1Validation,
  2: step2Validation,
  3: step3Validation,
  4: step4Validation,
  5: step5Validation,
  6: step6Validation,
};

// ============================================================================
// Полная валидация
// ============================================================================

export const fullValidation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  step1Validation(path);
  step2Validation(path);
  step3Validation(path);
  step4Validation(path);
  step5Validation(path);
  step6Validation(path);
};
