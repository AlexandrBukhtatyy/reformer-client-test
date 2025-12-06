/**
 * Валидация формы заявки на кредит
 * Использует @reformer/core/validators
 *
 * ValidationSchemaFn<T> = (path: FieldPath<T>) => void
 * - path содержит типизированные пути к полям формы
 * - функции вызываются внутри, не возвращают массив
 */

import {
  required,
  min,
  max,
  minLength,
  maxLength,
  email,
  applyWhen,
  validateTree,
  notEmpty,
  validateItems,
} from '@reformer/core/validators';
import type { ValidationSchemaFn } from '@reformer/core';
import type { CreditApplicationForm, Property, ExistingLoan, CoBorrower } from './types';
import {
  LOAN_AMOUNT_MIN,
  LOAN_AMOUNT_MAX,
  LOAN_TERM_MIN,
  LOAN_TERM_MAX,
  PROPERTY_VALUE_MIN,
  CAR_PRICE_MIN,
  CAR_PRICE_MAX,
  CAR_YEAR_MIN,
  CAR_YEAR_MAX,
  MONTHLY_INCOME_MIN,
  DEPENDENTS_MAX,
  AGE_MIN,
  AGE_MAX,
  PAYMENT_TO_INCOME_RATIO_MAX,
} from './constants';

// ============================================================================
// Шаг 1: Информация о кредите
// ============================================================================

export const step1Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  required(path.loanType, { message: 'Выберите тип кредита' });
  required(path.loanAmount, { message: 'Укажите сумму кредита' });
  min(path.loanAmount, LOAN_AMOUNT_MIN, { message: `Минимальная сумма ${LOAN_AMOUNT_MIN.toLocaleString('ru-RU')} ₽` });
  max(path.loanAmount, LOAN_AMOUNT_MAX, { message: `Максимальная сумма ${LOAN_AMOUNT_MAX.toLocaleString('ru-RU')} ₽` });
  required(path.loanTerm, { message: 'Укажите срок кредита' });
  min(path.loanTerm, LOAN_TERM_MIN, { message: `Минимальный срок ${LOAN_TERM_MIN} месяцев` });
  max(path.loanTerm, LOAN_TERM_MAX, { message: `Максимальный срок ${LOAN_TERM_MAX} месяцев` });
  required(path.loanPurpose, { message: 'Укажите цель кредита' });
  minLength(path.loanPurpose, 10, { message: 'Минимум 10 символов' });
  maxLength(path.loanPurpose, 500, { message: 'Максимум 500 символов' });

  // Условные поля для ипотеки
  applyWhen(path.loanType, (value) => value === 'mortgage', (p) => {
    required(p.propertyValue, { message: 'Укажите стоимость недвижимости' });
    min(p.propertyValue, PROPERTY_VALUE_MIN, { message: `Минимальная стоимость ${PROPERTY_VALUE_MIN.toLocaleString('ru-RU')} ₽` });
  });

  // Условные поля для автокредита
  applyWhen(path.loanType, (value) => value === 'car', (p) => {
    required(p.carBrand, { message: 'Укажите марку автомобиля' });
    minLength(p.carBrand, 2, { message: 'Минимум 2 символа' });
    maxLength(p.carBrand, 50, { message: 'Максимум 50 символов' });
    required(p.carModel, { message: 'Укажите модель автомобиля' });
    minLength(p.carModel, 1, { message: 'Минимум 1 символ' });
    maxLength(p.carModel, 50, { message: 'Максимум 50 символов' });
    required(p.carYear, { message: 'Укажите год выпуска' });
    min(p.carYear, CAR_YEAR_MIN, { message: `Минимальный год ${CAR_YEAR_MIN}` });
    max(p.carYear, CAR_YEAR_MAX, { message: `Максимальный год ${CAR_YEAR_MAX}` });
    required(p.carPrice, { message: 'Укажите стоимость автомобиля' });
    min(p.carPrice, CAR_PRICE_MIN, { message: `Минимальная стоимость ${CAR_PRICE_MIN.toLocaleString('ru-RU')} ₽` });
    max(p.carPrice, CAR_PRICE_MAX, { message: `Максимальная стоимость ${CAR_PRICE_MAX.toLocaleString('ru-RU')} ₽` });
  });
};

// ============================================================================
// Шаг 2: Персональные данные
// ============================================================================

export const step2Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  // Персональные данные
  required(path.personalData.lastName, { message: 'Введите фамилию' });
  required(path.personalData.firstName, { message: 'Введите имя' });
  required(path.personalData.middleName, { message: 'Введите отчество' });
  required(path.personalData.birthDate, { message: 'Укажите дату рождения' });
  required(path.personalData.gender, { message: 'Выберите пол' });
  required(path.personalData.birthPlace, { message: 'Укажите место рождения' });

  // Паспортные данные
  required(path.passportData.series, { message: 'Введите серию паспорта' });
  required(path.passportData.number, { message: 'Введите номер паспорта' });
  required(path.passportData.issueDate, { message: 'Укажите дату выдачи' });
  required(path.passportData.issuedBy, { message: 'Укажите кем выдан' });
  required(path.passportData.departmentCode, { message: 'Укажите код подразделения' });

  // Документы
  required(path.inn, { message: 'Введите ИНН' });
  required(path.snils, { message: 'Введите СНИЛС' });
};

// ============================================================================
// Шаг 3: Контактная информация
// ============================================================================

export const step3Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  // Телефоны
  required(path.phoneMain, { message: 'Введите основной телефон' });

  // Email
  required(path.email, { message: 'Введите email' });
  email(path.email, { message: 'Некорректный формат email' });

  // Адрес регистрации
  required(path.registrationAddress.region, { message: 'Введите регион' });
  required(path.registrationAddress.city, { message: 'Введите город' });
  required(path.registrationAddress.street, { message: 'Введите улицу' });
  required(path.registrationAddress.house, { message: 'Введите номер дома' });
  required(path.registrationAddress.postalCode, { message: 'Введите индекс' });

  // Условный адрес проживания
  applyWhen(path.sameAsRegistration, (value) => value === false, (p) => {
    required(p.residenceAddress.region, { message: 'Введите регион' });
    required(p.residenceAddress.city, { message: 'Введите город' });
    required(p.residenceAddress.street, { message: 'Введите улицу' });
    required(p.residenceAddress.house, { message: 'Введите номер дома' });
    required(p.residenceAddress.postalCode, { message: 'Введите индекс' });
  });
};

// ============================================================================
// Шаг 4: Информация о занятости
// ============================================================================

export const step4Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  required(path.employmentStatus, { message: 'Выберите статус занятости' });

  // Условные поля для работающих по найму
  applyWhen(path.employmentStatus, (value) => value === 'employed', (p) => {
    required(p.companyName, { message: 'Введите название компании' });
    required(p.companyAddress, { message: 'Введите адрес компании' });
    required(p.position, { message: 'Введите должность' });
  });

  // Условные поля для ИП
  applyWhen(path.employmentStatus, (value) => value === 'selfEmployed', (p) => {
    required(p.businessType, { message: 'Введите тип бизнеса' });
    required(p.businessInn, { message: 'Введите ИНН ИП' });
  });

  // Стаж - для всех работающих
  applyWhen(path.employmentStatus, (value) => value === 'employed' || value === 'selfEmployed', (p) => {
    required(p.workExperienceTotal, { message: 'Укажите общий стаж' });
    min(p.workExperienceTotal, 0, { message: 'Стаж не может быть отрицательным' });
    required(p.workExperienceCurrent, { message: 'Укажите стаж на текущем месте' });
    min(p.workExperienceCurrent, 0, { message: 'Стаж не может быть отрицательным' });
  });

  // Доход
  required(path.monthlyIncome, { message: 'Укажите ежемесячный доход' });
  min(path.monthlyIncome, MONTHLY_INCOME_MIN, { message: `Минимальный доход ${MONTHLY_INCOME_MIN.toLocaleString('ru-RU')} ₽` });

  // Условный источник дополнительного дохода
  applyWhen(path.additionalIncome, (value) => value !== undefined && value > 0, (p) => {
    required(p.additionalIncomeSource, { message: 'Укажите источник дополнительного дохода' });
  });
};

// ============================================================================
// Шаг 5: Дополнительная информация
// ============================================================================

// Валидация элемента имущества
const propertyItemValidation: ValidationSchemaFn<Property> = (path) => {
  required(path.type, { message: 'Выберите тип имущества' });
  required(path.description, { message: 'Введите описание' });
  required(path.estimatedValue, { message: 'Укажите оценочную стоимость' });
  min(path.estimatedValue, 0, { message: 'Стоимость не может быть отрицательной' });
};

// Валидация элемента существующего кредита
const existingLoanItemValidation: ValidationSchemaFn<ExistingLoan> = (path) => {
  required(path.bank, { message: 'Введите название банка' });
  required(path.type, { message: 'Введите тип кредита' });
  required(path.amount, { message: 'Укажите сумму кредита' });
  min(path.amount, 0, { message: 'Сумма не может быть отрицательной' });
  required(path.remainingAmount, { message: 'Укажите остаток задолженности' });
  min(path.remainingAmount, 0, { message: 'Остаток не может быть отрицательным' });
  required(path.monthlyPayment, { message: 'Укажите ежемесячный платеж' });
  min(path.monthlyPayment, 0, { message: 'Платеж не может быть отрицательным' });
  required(path.maturityDate, { message: 'Укажите дату погашения' });
};

// Валидация элемента созаемщика
const coBorrowerItemValidation: ValidationSchemaFn<CoBorrower> = (path) => {
  required(path.personalData.lastName, { message: 'Введите фамилию созаемщика' });
  required(path.personalData.firstName, { message: 'Введите имя созаемщика' });
  required(path.personalData.birthDate, { message: 'Укажите дату рождения созаемщика' });
  required(path.phone, { message: 'Введите телефон созаемщика' });
  required(path.email, { message: 'Введите email созаемщика' });
  email(path.email, { message: 'Некорректный формат email' });
  required(path.relationship, { message: 'Укажите родство' });
  required(path.monthlyIncome, { message: 'Укажите доход созаемщика' });
  min(path.monthlyIncome, 0, { message: 'Доход не может быть отрицательным' });
};

export const step5Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  required(path.maritalStatus, { message: 'Выберите семейное положение' });
  required(path.dependents, { message: 'Укажите количество иждивенцев' });
  min(path.dependents, 0, { message: 'Количество не может быть отрицательным' });
  max(path.dependents, DEPENDENTS_MAX, { message: `Максимум ${DEPENDENTS_MAX} иждивенцев` });
  required(path.education, { message: 'Выберите уровень образования' });

  // Валидация массива имущества
  applyWhen(path.hasProperty, (value) => value === true, (p) => {
    notEmpty(p.properties, { message: 'Добавьте хотя бы один объект имущества' });
    validateItems(p.properties, propertyItemValidation);
  });

  // Валидация массива кредитов
  applyWhen(path.hasExistingLoans, (value) => value === true, (p) => {
    notEmpty(p.existingLoans, { message: 'Добавьте хотя бы один кредит' });
    validateItems(p.existingLoans, existingLoanItemValidation);
  });

  // Валидация массива созаемщиков
  applyWhen(path.hasCoBorrower, (value) => value === true, (p) => {
    notEmpty(p.coBorrowers, { message: 'Добавьте хотя бы одного созаемщика' });
    validateItems(p.coBorrowers, coBorrowerItemValidation);
  });
};

// ============================================================================
// Шаг 6: Согласия и подтверждение
// ============================================================================

export const step6Validation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  required(path.agreePersonalData, { message: 'Необходимо согласие на обработку персональных данных' });
  required(path.agreeCreditHistory, { message: 'Необходимо согласие на проверку кредитной истории' });
  required(path.agreeTerms, { message: 'Необходимо согласие с условиями кредитования' });
  required(path.confirmAccuracy, { message: 'Необходимо подтверждение точности данных' });
  required(path.electronicSignature, { message: 'Введите код из СМС' });
};

// ============================================================================
// Кросс-валидации
// ============================================================================

export const crossFieldValidation: ValidationSchemaFn<CreditApplicationForm> = () => {
  // Стаж на текущем месте не может быть больше общего стажа
  validateTree((ctx) => {
    const form = ctx.form.getValue();
    if (
      form.workExperienceCurrent !== undefined &&
      form.workExperienceTotal !== undefined &&
      form.workExperienceCurrent > form.workExperienceTotal
    ) {
      return {
        code: 'workExperienceInvalid',
        message: 'Стаж на текущем месте не может быть больше общего стажа',
      };
    }
    return null;
  }, { targetField: 'workExperienceCurrent' });

  // Первоначальный взнос должен быть минимум 20% от стоимости недвижимости
  validateTree((ctx) => {
    const form = ctx.form.getValue();
    if (
      form.loanType === 'mortgage' &&
      form.propertyValue !== undefined &&
      form.initialPayment !== undefined &&
      form.initialPayment < form.propertyValue * 0.2
    ) {
      return {
        code: 'initialPaymentTooLow',
        message: 'Первоначальный взнос должен быть минимум 20% от стоимости недвижимости',
      };
    }
    return null;
  }, { targetField: 'initialPayment' });

  // Проверка возраста (18-70 лет)
  validateTree((ctx) => {
    const form = ctx.form.getValue();
    if (form.age !== undefined) {
      if (form.age < AGE_MIN) {
        return {
          code: 'ageTooYoung',
          message: `Возраст должен быть не менее ${AGE_MIN} лет`,
        };
      }
      if (form.age > AGE_MAX) {
        return {
          code: 'ageTooOld',
          message: `Возраст должен быть не более ${AGE_MAX} лет`,
        };
      }
    }
    return null;
  }, { targetField: 'personalData.birthDate' });

  // Платеж не должен превышать 50% от дохода
  validateTree((ctx) => {
    const form = ctx.form.getValue();
    if (
      form.paymentToIncomeRatio !== undefined &&
      form.paymentToIncomeRatio > PAYMENT_TO_INCOME_RATIO_MAX
    ) {
      return {
        code: 'paymentTooHigh',
        message: `Ежемесячный платеж не должен превышать ${PAYMENT_TO_INCOME_RATIO_MAX}% от дохода`,
      };
    }
    return null;
  }, { targetField: 'loanAmount' });

  // Сумма ипотечного кредита не может превышать (стоимость - первоначальный взнос)
  validateTree((ctx) => {
    const form = ctx.form.getValue();
    if (
      form.loanType === 'mortgage' &&
      form.loanAmount !== undefined &&
      form.propertyValue !== undefined &&
      form.initialPayment !== undefined &&
      form.loanAmount > form.propertyValue - form.initialPayment
    ) {
      return {
        code: 'loanAmountTooHigh',
        message: 'Сумма кредита не может превышать стоимость недвижимости за вычетом первоначального взноса',
      };
    }
    return null;
  }, { targetField: 'loanAmount' });
};

// ============================================================================
// Полная валидация формы
// ============================================================================

export const fullValidation: ValidationSchemaFn<CreditApplicationForm> = (path) => {
  step1Validation(path);
  step2Validation(path);
  step3Validation(path);
  step4Validation(path);
  step5Validation(path);
  step6Validation(path);
  crossFieldValidation(path);
};

// ============================================================================
// Маппинг валидаций по шагам
// ============================================================================

export const stepValidations: Record<number, ValidationSchemaFn<CreditApplicationForm>> = {
  1: step1Validation,
  2: step2Validation,
  3: step3Validation,
  4: step4Validation,
  5: step5Validation,
  6: step6Validation,
};
