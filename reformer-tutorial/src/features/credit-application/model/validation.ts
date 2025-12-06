/**
 * Валидация формы заявки на кредит
 */

import type { ValidationSchemaFn, FieldPath } from '@reformer/core';
import {
  required,
  min,
  max,
  minLength,
  maxLength,
  email,
  validate,
  applyWhen,
  validateItems,
} from '@reformer/core/validators';

import type {
  CreditApplicationForm,
  Address,
  PersonalData,
  PassportData,
  Property,
  ExistingLoan,
  CoBorrower,
} from './types';

import { LOAN_LIMITS, CAR_LIMITS, AGE_LIMITS, VALIDATION_LIMITS } from './constants';

// ============================================================================
// Вспомогательные валидаторы для вложенных структур
// ============================================================================

/** Валидация адреса */
const validateAddress = (path: FieldPath<Address>) => {
  required(path.region, { message: 'Укажите регион' });
  required(path.city, { message: 'Укажите город' });
  required(path.street, { message: 'Укажите улицу' });
  required(path.house, { message: 'Укажите номер дома' });
  required(path.postalCode, { message: 'Укажите индекс' });
  minLength(path.postalCode, 6, { message: 'Индекс должен содержать 6 цифр' });
};

/** Валидация персональных данных */
const validatePersonalData = (path: FieldPath<PersonalData>) => {
  required(path.lastName, { message: 'Укажите фамилию' });
  required(path.firstName, { message: 'Укажите имя' });
  required(path.middleName, { message: 'Укажите отчество' });
  required(path.birthDate, { message: 'Укажите дату рождения' });
  required(path.gender, { message: 'Укажите пол' });
  required(path.birthPlace, { message: 'Укажите место рождения' });
};

/** Валидация паспортных данных */
const validatePassportData = (path: FieldPath<PassportData>) => {
  required(path.series, { message: 'Укажите серию паспорта' });
  minLength(path.series, 5, { message: 'Серия паспорта должна содержать 4 цифры' });
  required(path.number, { message: 'Укажите номер паспорта' });
  minLength(path.number, 6, { message: 'Номер паспорта должен содержать 6 цифр' });
  required(path.issueDate, { message: 'Укажите дату выдачи' });
  required(path.issuedBy, { message: 'Укажите кем выдан паспорт' });
  required(path.departmentCode, { message: 'Укажите код подразделения' });
  minLength(path.departmentCode, 7, { message: 'Код подразделения должен быть в формате 123-456' });
};

/** Валидация имущества */
const validateProperty = (path: FieldPath<Property>) => {
  required(path.type, { message: 'Укажите тип имущества' });
  required(path.description, { message: 'Опишите имущество' });
  required(path.estimatedValue, { message: 'Укажите оценочную стоимость' });
  min(path.estimatedValue, 0, { message: 'Стоимость не может быть отрицательной' });
};

/** Валидация существующего кредита */
const validateExistingLoan = (path: FieldPath<ExistingLoan>) => {
  required(path.bank, { message: 'Укажите банк' });
  required(path.type, { message: 'Укажите тип кредита' });
  required(path.amount, { message: 'Укажите сумму кредита' });
  min(path.amount, 0, { message: 'Сумма не может быть отрицательной' });
  required(path.remainingAmount, { message: 'Укажите остаток задолженности' });
  min(path.remainingAmount, 0, { message: 'Остаток не может быть отрицательным' });
  required(path.monthlyPayment, { message: 'Укажите ежемесячный платеж' });
  min(path.monthlyPayment, 0, { message: 'Платеж не может быть отрицательным' });
  required(path.maturityDate, { message: 'Укажите дату погашения' });

  // Кросс-валидация: остаток не больше суммы кредита
  validate(path.remainingAmount, (value, ctx) => {
    const amount = ctx.getFieldValue('amount') as number | undefined;
    if (value !== undefined && amount !== undefined && value > amount) {
      return { code: 'remainingExceedsAmount', message: 'Остаток не может превышать сумму кредита' };
    }
    return null;
  });
};

/** Валидация созаемщика */
const validateCoBorrower = (path: FieldPath<CoBorrower>) => {
  validatePersonalData(path.personalData);
  required(path.phone, { message: 'Укажите телефон созаемщика' });
  minLength(path.phone, 18, { message: 'Введите полный номер телефона' });
  required(path.email, { message: 'Укажите email созаемщика' });
  email(path.email, { message: 'Введите корректный email' });
  required(path.relationship, { message: 'Укажите родство' });
  required(path.monthlyIncome, { message: 'Укажите доход созаемщика' });
  min(path.monthlyIncome, 0, { message: 'Доход не может быть отрицательным' });
};

// ============================================================================
// Валидация по шагам
// ============================================================================

/** Шаг 1: Информация о кредите */
export const step1Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  required(path.loanType, { message: 'Выберите тип кредита' });
  required(path.loanAmount, { message: 'Укажите сумму кредита' });
  min(path.loanAmount, LOAN_LIMITS.minAmount, {
    message: `Минимальная сумма кредита ${LOAN_LIMITS.minAmount.toLocaleString()} ₽`,
  });
  max(path.loanAmount, LOAN_LIMITS.maxAmount, {
    message: `Максимальная сумма кредита ${LOAN_LIMITS.maxAmount.toLocaleString()} ₽`,
  });
  required(path.loanTerm, { message: 'Укажите срок кредита' });
  min(path.loanTerm, LOAN_LIMITS.minTerm, { message: `Минимальный срок ${LOAN_LIMITS.minTerm} месяцев` });
  max(path.loanTerm, LOAN_LIMITS.maxTerm, { message: `Максимальный срок ${LOAN_LIMITS.maxTerm} месяцев` });
  required(path.loanPurpose, { message: 'Укажите цель кредита' });
  minLength(path.loanPurpose, 10, { message: 'Описание цели должно содержать минимум 10 символов' });
  maxLength(path.loanPurpose, 500, { message: 'Описание цели не должно превышать 500 символов' });

  // Условная валидация для ипотеки
  applyWhen(
    path.loanType,
    (loanType) => loanType === 'mortgage',
    (p) => {
      required(p.propertyValue, { message: 'Укажите стоимость недвижимости' });
      min(p.propertyValue, 1000000, { message: 'Минимальная стоимость недвижимости 1 000 000 ₽' });
      required(p.initialPayment, { message: 'Укажите первоначальный взнос' });

      // Кросс-валидация: первоначальный взнос минимум 20% от стоимости
      validate(p.initialPayment, (value, ctx) => {
        const propertyValue = ctx.getFieldValue('propertyValue') as number | undefined;
        if (propertyValue && value !== undefined) {
          const minPayment = propertyValue * 0.2;
          if (value < minPayment) {
            return {
              code: 'insufficientDownPayment',
              message: `Первоначальный взнос должен быть минимум ${minPayment.toLocaleString()} ₽ (20% от стоимости)`,
            };
          }
        }
        return null;
      });

      // Кросс-валидация: сумма кредита не превышает (стоимость - первоначальный взнос)
      validate(p.loanAmount, (value, ctx) => {
        const propertyValue = ctx.getFieldValue('propertyValue') as number | undefined;
        const initialPayment = ctx.getFieldValue('initialPayment') as number | undefined;
        if (propertyValue && initialPayment && value !== undefined) {
          const maxLoan = propertyValue - initialPayment;
          if (value > maxLoan) {
            return {
              code: 'loanExceedsProperty',
              message: `Сумма кредита не может превышать ${maxLoan.toLocaleString()} ₽`,
            };
          }
        }
        return null;
      });
    }
  );

  // Условная валидация для автокредита
  applyWhen(
    path.loanType,
    (loanType) => loanType === 'car',
    (p) => {
      required(p.carBrand, { message: 'Укажите марку автомобиля' });
      minLength(p.carBrand, 2, { message: 'Марка должна содержать минимум 2 символа' });
      required(p.carModel, { message: 'Укажите модель автомобиля' });
      minLength(p.carModel, 1, { message: 'Укажите модель' });
      required(p.carYear, { message: 'Укажите год выпуска' });
      min(p.carYear, CAR_LIMITS.minYear, { message: `Минимальный год выпуска ${CAR_LIMITS.minYear}` });
      max(p.carYear, CAR_LIMITS.maxYear, { message: `Максимальный год выпуска ${CAR_LIMITS.maxYear}` });
      required(p.carPrice, { message: 'Укажите стоимость автомобиля' });
      min(p.carPrice, CAR_LIMITS.minPrice, {
        message: `Минимальная стоимость ${CAR_LIMITS.minPrice.toLocaleString()} ₽`,
      });
      max(p.carPrice, CAR_LIMITS.maxPrice, {
        message: `Максимальная стоимость ${CAR_LIMITS.maxPrice.toLocaleString()} ₽`,
      });
    }
  );
};

/** Шаг 2: Персональные данные */
export const step2Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  validatePersonalData(path.personalData);
  validatePassportData(path.passportData);

  required(path.inn, { message: 'Укажите ИНН' });
  minLength(path.inn, 12, { message: 'ИНН должен содержать 12 цифр' });
  required(path.snils, { message: 'Укажите СНИЛС' });
  minLength(path.snils, 14, { message: 'СНИЛС должен быть в формате 123-456-789 00' });

  // Кросс-валидация: возраст от 18 до 70 лет
  validate(path.age, (value) => {
    if (value !== undefined) {
      if (value < AGE_LIMITS.minAge) {
        return { code: 'tooYoung', message: `Минимальный возраст заемщика ${AGE_LIMITS.minAge} лет` };
      }
      if (value > AGE_LIMITS.maxAge) {
        return { code: 'tooOld', message: `Максимальный возраст заемщика ${AGE_LIMITS.maxAge} лет` };
      }
    }
    return null;
  });
};

/** Шаг 3: Контактная информация */
export const step3Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  required(path.phoneMain, { message: 'Укажите основной телефон' });
  minLength(path.phoneMain, 18, { message: 'Введите полный номер телефона' });
  required(path.email, { message: 'Укажите email' });
  email(path.email, { message: 'Введите корректный email' });

  // Валидация адреса регистрации
  validateAddress(path.registrationAddress);

  // Условная валидация адреса проживания
  applyWhen(
    path.sameAsRegistration,
    (sameAsRegistration) => sameAsRegistration === false,
    (p) => {
      validateAddress(p.residenceAddress);
    }
  );
};

/** Шаг 4: Занятость и доход */
export const step4Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  required(path.employmentStatus, { message: 'Укажите статус занятости' });

  // Условная валидация для работающих по найму
  applyWhen(
    path.employmentStatus,
    (status) => status === 'employed',
    (p) => {
      required(p.companyName, { message: 'Укажите название компании' });
      required(p.companyInn, { message: 'Укажите ИНН компании' });
      minLength(p.companyInn, 10, { message: 'ИНН компании должен содержать 10 цифр' });
      required(p.position, { message: 'Укажите должность' });
    }
  );

  // Условная валидация для ИП
  applyWhen(
    path.employmentStatus,
    (status) => status === 'selfEmployed',
    (p) => {
      required(p.businessType, { message: 'Укажите тип бизнеса' });
      required(p.businessInn, { message: 'Укажите ИНН ИП' });
      minLength(p.businessInn, 12, { message: 'ИНН ИП должен содержать 12 цифр' });
    }
  );

  required(path.workExperienceTotal, { message: 'Укажите общий стаж работы' });
  min(path.workExperienceTotal, 0, { message: 'Стаж не может быть отрицательным' });
  required(path.workExperienceCurrent, { message: 'Укажите стаж на текущем месте' });
  min(path.workExperienceCurrent, 0, { message: 'Стаж не может быть отрицательным' });

  // Кросс-валидация: стаж на текущем месте не больше общего стажа
  validate(path.workExperienceCurrent, (value, ctx) => {
    const total = ctx.getFieldValue('workExperienceTotal') as number | undefined;
    if (value !== undefined && total !== undefined && value > total) {
      return {
        code: 'currentExceedsTotal',
        message: 'Стаж на текущем месте не может быть больше общего стажа',
      };
    }
    return null;
  });

  required(path.monthlyIncome, { message: 'Укажите ежемесячный доход' });
  min(path.monthlyIncome, 10000, { message: 'Минимальный доход 10 000 ₽' });

  // Условная валидация: источник дополнительного дохода обязателен при наличии дохода
  applyWhen(
    path.additionalIncome,
    (income) => income !== undefined && income > 0,
    (p) => {
      required(p.additionalIncomeSource, { message: 'Укажите источник дополнительного дохода' });
    }
  );

  // Кросс-валидация: платеж к доходу не более 50%
  validate(path.paymentToIncomeRatio, (value) => {
    if (value !== undefined && value > VALIDATION_LIMITS.maxPaymentToIncomeRatio) {
      return {
        code: 'paymentTooHigh',
        message: `Ежемесячный платеж не должен превышать ${VALIDATION_LIMITS.maxPaymentToIncomeRatio}% от дохода`,
      };
    }
    return null;
  });
};

/** Шаг 5: Дополнительная информация */
export const step5Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  required(path.maritalStatus, { message: 'Укажите семейное положение' });
  required(path.dependents, { message: 'Укажите количество иждивенцев' });
  min(path.dependents, 0, { message: 'Количество не может быть отрицательным' });
  max(path.dependents, VALIDATION_LIMITS.maxDependents, {
    message: `Максимальное количество иждивенцев ${VALIDATION_LIMITS.maxDependents}`,
  });
  required(path.education, { message: 'Укажите уровень образования' });

  // Валидация массива имущества
  applyWhen(
    path.hasProperty,
    (hasProperty) => hasProperty === true,
    (p) => {
      validateItems(p.properties, (itemPath) => {
        validateProperty(itemPath);
      });
    }
  );

  // Валидация массива существующих кредитов
  applyWhen(
    path.hasExistingLoans,
    (hasExistingLoans) => hasExistingLoans === true,
    (p) => {
      validateItems(p.existingLoans, (itemPath) => {
        validateExistingLoan(itemPath);
      });
    }
  );

  // Валидация массива созаемщиков
  applyWhen(
    path.hasCoBorrower,
    (hasCoBorrower) => hasCoBorrower === true,
    (p) => {
      validateItems(p.coBorrowers, (itemPath) => {
        validateCoBorrower(itemPath);
      });
    }
  );
};

/** Шаг 6: Подтверждение */
export const step6Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  validate(path.agreePersonalData, (value) => {
    if (!value) {
      return { code: 'required', message: 'Необходимо согласие на обработку персональных данных' };
    }
    return null;
  });

  validate(path.agreeCreditHistory, (value) => {
    if (!value) {
      return { code: 'required', message: 'Необходимо согласие на проверку кредитной истории' };
    }
    return null;
  });

  validate(path.agreeTerms, (value) => {
    if (!value) {
      return { code: 'required', message: 'Необходимо согласие с условиями кредитования' };
    }
    return null;
  });

  validate(path.confirmAccuracy, (value) => {
    if (!value) {
      return { code: 'required', message: 'Необходимо подтвердить точность данных' };
    }
    return null;
  });

  required(path.electronicSignature, { message: 'Введите код подтверждения' });
  minLength(path.electronicSignature, 6, { message: 'Код должен содержать 6 цифр' });
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

// ============================================================================
// Конфигурация валидации по шагам
// ============================================================================

export const STEP_VALIDATIONS: Record<number, ValidationSchemaFn<CreditApplicationForm>> = {
  1: step1Validation,
  2: step2Validation,
  3: step3Validation,
  4: step4Validation,
  5: step5Validation,
  6: step6Validation,
};
