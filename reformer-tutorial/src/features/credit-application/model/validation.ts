// model/validation.ts - Валидация формы заявки на кредит

// Типы из основного модуля
import type { ValidationSchemaFn, FieldPath } from '@reformer/core';

// Валидаторы из подмодуля /validators
import {
  required,
  min,
  max,
  minLength,
  maxLength,
  email,
  validate,
  validateTree,
  applyWhen,
} from '@reformer/core/validators';

import type { CreditApplicationForm } from './types';
import { LOAN_LIMITS } from './constants';

// =============================================================================
// STEP 1: Информация о кредите
// =============================================================================

export const step1Validation: ValidationSchemaFn<CreditApplicationForm> = (
  path: FieldPath<CreditApplicationForm>
) => {
  // Основные поля
  required(path.loanType, { message: 'Выберите тип кредита' });

  required(path.loanAmount, { message: 'Укажите сумму кредита' });
  min(path.loanAmount, LOAN_LIMITS.amount.min, {
    message: `Минимальная сумма: ${LOAN_LIMITS.amount.min.toLocaleString('ru-RU')} ₽`,
  });
  max(path.loanAmount, LOAN_LIMITS.amount.max, {
    message: `Максимальная сумма: ${LOAN_LIMITS.amount.max.toLocaleString('ru-RU')} ₽`,
  });

  required(path.loanTerm, { message: 'Укажите срок кредита' });
  min(path.loanTerm, LOAN_LIMITS.term.min, {
    message: `Минимальный срок: ${LOAN_LIMITS.term.min} месяцев`,
  });
  max(path.loanTerm, LOAN_LIMITS.term.max, {
    message: `Максимальный срок: ${LOAN_LIMITS.term.max} месяцев`,
  });

  required(path.loanPurpose, { message: 'Укажите цель кредита' });
  minLength(path.loanPurpose, 10, {
    message: 'Минимум 10 символов',
  });
  maxLength(path.loanPurpose, 500, {
    message: 'Максимум 500 символов',
  });

  // Условная валидация для ипотеки
  applyWhen(
    path.loanType,
    (loanType) => loanType === 'mortgage',
    (p) => {
      required(p.propertyValue, { message: 'Укажите стоимость недвижимости' });
      min(p.propertyValue, LOAN_LIMITS.propertyValue.min, {
        message: `Минимальная стоимость: ${LOAN_LIMITS.propertyValue.min.toLocaleString('ru-RU')} ₽`,
      });

      // Кросс-валидация: сумма кредита <= стоимость - первоначальный взнос
      validateTree((ctx: { form: CreditApplicationForm }) => {
        const form = ctx.form;
        if (
          form.loanType === 'mortgage' &&
          form.propertyValue &&
          form.loanAmount &&
          form.initialPayment
        ) {
          const maxLoan = form.propertyValue - form.initialPayment;
          if (form.loanAmount > maxLoan) {
            return {
              code: 'max_loan_exceeded',
              message: `Сумма кредита не может превышать ${maxLoan.toLocaleString('ru-RU')} ₽ (стоимость - первоначальный взнос)`,
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
      minLength(p.carBrand, 2, { message: 'Минимум 2 символа' });
      maxLength(p.carBrand, 50, { message: 'Максимум 50 символов' });

      required(p.carModel, { message: 'Укажите модель автомобиля' });
      minLength(p.carModel, 1, { message: 'Минимум 1 символ' });
      maxLength(p.carModel, 50, { message: 'Максимум 50 символов' });

      required(p.carYear, { message: 'Укажите год выпуска' });
      min(p.carYear, LOAN_LIMITS.carYear.min, {
        message: `Минимальный год: ${LOAN_LIMITS.carYear.min}`,
      });
      max(p.carYear, LOAN_LIMITS.carYear.max, {
        message: `Максимальный год: ${LOAN_LIMITS.carYear.max}`,
      });

      required(p.carPrice, { message: 'Укажите стоимость автомобиля' });
      min(p.carPrice, LOAN_LIMITS.carPrice.min, {
        message: `Минимальная стоимость: ${LOAN_LIMITS.carPrice.min.toLocaleString('ru-RU')} ₽`,
      });
      max(p.carPrice, LOAN_LIMITS.carPrice.max, {
        message: `Максимальная стоимость: ${LOAN_LIMITS.carPrice.max.toLocaleString('ru-RU')} ₽`,
      });
    }
  );
};

// =============================================================================
// STEP 2: Персональные данные
// =============================================================================

export const step2Validation: ValidationSchemaFn<CreditApplicationForm> = (
  path: FieldPath<CreditApplicationForm>
) => {
  // Персональные данные
  required(path.personalData.lastName, { message: 'Укажите фамилию' });
  required(path.personalData.firstName, { message: 'Укажите имя' });
  required(path.personalData.middleName, { message: 'Укажите отчество' });
  required(path.personalData.birthDate, { message: 'Укажите дату рождения' });
  required(path.personalData.birthPlace, { message: 'Укажите место рождения' });

  // Проверка возраста (18-70 лет)
  validateTree((ctx: { form: CreditApplicationForm }) => {
    const form = ctx.form;
    if (form.personalData.birthDate) {
      const birthDate = new Date(form.personalData.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < LOAN_LIMITS.age.min) {
        return {
          code: 'min_age',
          message: `Минимальный возраст: ${LOAN_LIMITS.age.min} лет`,
        };
      }
      if (age > LOAN_LIMITS.age.max) {
        return {
          code: 'max_age',
          message: `Максимальный возраст: ${LOAN_LIMITS.age.max} лет`,
        };
      }
    }
    return null;
  });

  // Паспортные данные
  required(path.passportData.series, { message: 'Укажите серию паспорта' });
  required(path.passportData.number, { message: 'Укажите номер паспорта' });
  required(path.passportData.issueDate, { message: 'Укажите дату выдачи' });
  required(path.passportData.issuedBy, { message: 'Укажите кем выдан паспорт' });
  required(path.passportData.departmentCode, { message: 'Укажите код подразделения' });

  // ИНН и СНИЛС
  required(path.inn, { message: 'Укажите ИНН' });
  validate(path.inn, (value) => {
    if (value && value.replace(/\D/g, '').length !== 12) {
      return { code: 'invalid_inn', message: 'ИНН должен содержать 12 цифр' };
    }
    return null;
  });

  required(path.snils, { message: 'Укажите СНИЛС' });
  validate(path.snils, (value) => {
    if (value && value.replace(/\D/g, '').length !== 11) {
      return { code: 'invalid_snils', message: 'СНИЛС должен содержать 11 цифр' };
    }
    return null;
  });
};

// =============================================================================
// STEP 3: Контактная информация
// =============================================================================

export const step3Validation: ValidationSchemaFn<CreditApplicationForm> = (
  path: FieldPath<CreditApplicationForm>
) => {
  // Телефон и email
  required(path.phoneMain, { message: 'Укажите основной телефон' });
  validate(path.phoneMain, (value) => {
    if (value && value.replace(/\D/g, '').length < 11) {
      return { code: 'invalid_phone', message: 'Некорректный номер телефона' };
    }
    return null;
  });

  required(path.email, { message: 'Укажите email' });
  email(path.email, { message: 'Некорректный email' });

  // Адрес регистрации
  required(path.registrationAddress.region, { message: 'Укажите регион' });
  required(path.registrationAddress.city, { message: 'Укажите город' });
  required(path.registrationAddress.street, { message: 'Укажите улицу' });
  required(path.registrationAddress.house, { message: 'Укажите номер дома' });
  required(path.registrationAddress.postalCode, { message: 'Укажите почтовый индекс' });

  // Адрес проживания (если отличается от регистрации)
  applyWhen(
    path.sameAsRegistration,
    (same) => !same,
    (p) => {
      required(p.residenceAddress.region, { message: 'Укажите регион' });
      required(p.residenceAddress.city, { message: 'Укажите город' });
      required(p.residenceAddress.street, { message: 'Укажите улицу' });
      required(p.residenceAddress.house, { message: 'Укажите номер дома' });
      required(p.residenceAddress.postalCode, { message: 'Укажите почтовый индекс' });
    }
  );
};

// =============================================================================
// STEP 4: Информация о занятости
// =============================================================================

export const step4Validation: ValidationSchemaFn<CreditApplicationForm> = (
  path: FieldPath<CreditApplicationForm>
) => {
  required(path.employmentStatus, { message: 'Укажите статус занятости' });

  // Общие поля
  required(path.workExperienceTotal, { message: 'Укажите общий стаж' });
  min(path.workExperienceTotal, 0, { message: 'Стаж не может быть отрицательным' });

  required(path.workExperienceCurrent, { message: 'Укажите стаж на текущем месте' });
  min(path.workExperienceCurrent, 0, { message: 'Стаж не может быть отрицательным' });

  // Кросс-валидация: текущий стаж <= общий стаж
  validateTree((ctx: { form: CreditApplicationForm }) => {
    const form = ctx.form;
    if (
      form.workExperienceCurrent !== undefined &&
      form.workExperienceTotal !== undefined &&
      form.workExperienceCurrent > form.workExperienceTotal
    ) {
      return {
        code: 'invalid_experience',
        message: 'Стаж на текущем месте не может превышать общий стаж',
      };
    }
    return null;
  });

  required(path.monthlyIncome, { message: 'Укажите ежемесячный доход' });
  min(path.monthlyIncome, LOAN_LIMITS.income.min, {
    message: `Минимальный доход: ${LOAN_LIMITS.income.min.toLocaleString('ru-RU')} ₽`,
  });

  // Если есть дополнительный доход, нужен источник
  applyWhen(
    path.additionalIncome,
    (income) => (income ?? 0) > 0,
    (p) => {
      required(p.additionalIncomeSource, {
        message: 'Укажите источник дополнительного дохода',
      });
    }
  );

  // Поля для работающих
  applyWhen(
    path.employmentStatus,
    (status) => status === 'employed',
    (p) => {
      required(p.companyName, { message: 'Укажите название компании' });
      required(p.companyInn, { message: 'Укажите ИНН компании' });
      required(p.position, { message: 'Укажите должность' });
    }
  );

  // Поля для самозанятых
  applyWhen(
    path.employmentStatus,
    (status) => status === 'selfEmployed',
    (p) => {
      required(p.businessType, { message: 'Укажите форму бизнеса' });
      required(p.businessInn, { message: 'Укажите ИНН бизнеса' });
    }
  );
};

// =============================================================================
// STEP 5: Дополнительная информация
// =============================================================================

export const step5Validation: ValidationSchemaFn<CreditApplicationForm> = (
  path: FieldPath<CreditApplicationForm>
) => {
  required(path.maritalStatus, { message: 'Укажите семейное положение' });

  required(path.dependents, { message: 'Укажите количество иждивенцев' });
  min(path.dependents, LOAN_LIMITS.dependents.min, {
    message: `Минимум: ${LOAN_LIMITS.dependents.min}`,
  });
  max(path.dependents, LOAN_LIMITS.dependents.max, {
    message: `Максимум: ${LOAN_LIMITS.dependents.max}`,
  });

  required(path.education, { message: 'Укажите уровень образования' });

  // Валидация существующих кредитов
  validateTree((ctx: { form: CreditApplicationForm }) => {
    const form = ctx.form;
    for (let i = 0; i < form.existingLoans.length; i++) {
      const loan = form.existingLoans[i];
      if (
        loan.remainingAmount !== undefined &&
        loan.amount !== undefined &&
        loan.remainingAmount > loan.amount
      ) {
        return {
          code: 'invalid_remaining',
          message: `Кредит ${i + 1}: Остаток долга не может превышать сумму кредита`,
        };
      }
    }
    return null;
  });
};

// =============================================================================
// STEP 6: Подтверждение
// =============================================================================

export const step6Validation: ValidationSchemaFn<CreditApplicationForm> = (
  path: FieldPath<CreditApplicationForm>
) => {
  validate(path.agreePersonalData, (value) =>
    value === true
      ? null
      : { code: 'required', message: 'Необходимо согласие на обработку персональных данных' }
  );

  validate(path.agreeCreditHistory, (value) =>
    value === true
      ? null
      : { code: 'required', message: 'Необходимо согласие на проверку кредитной истории' }
  );

  validate(path.agreeTerms, (value) =>
    value === true
      ? null
      : { code: 'required', message: 'Необходимо согласие с условиями кредитования' }
  );

  validate(path.confirmAccuracy, (value) =>
    value === true
      ? null
      : { code: 'required', message: 'Необходимо подтвердить достоверность данных' }
  );

  required(path.electronicSignature, { message: 'Введите SMS-код' });
  validate(path.electronicSignature, (value) => {
    if (value && value.replace(/\D/g, '').length !== 6) {
      return { code: 'invalid_code', message: 'SMS-код должен содержать 6 цифр' };
    }
    return null;
  });
};

// =============================================================================
// ПОЛНАЯ ВАЛИДАЦИЯ ФОРМЫ
// =============================================================================

export const fullValidation: ValidationSchemaFn<CreditApplicationForm> = (
  path: FieldPath<CreditApplicationForm>
) => {
  // Применяем валидацию всех шагов
  step1Validation(path);
  step2Validation(path);
  step3Validation(path);
  step4Validation(path);
  step5Validation(path);
  step6Validation(path);

  // Дополнительная кросс-валидация всей формы

  // Проверка отношения платежа к доходу
  validateTree((ctx: { form: CreditApplicationForm }) => {
    const form = ctx.form;
    if (
      form.paymentToIncomeRatio !== undefined &&
      form.paymentToIncomeRatio > LOAN_LIMITS.paymentToIncomeRatio.max
    ) {
      return {
        code: 'high_debt_burden',
        message: `Ежемесячный платёж не может превышать ${LOAN_LIMITS.paymentToIncomeRatio.max}% от дохода`,
      };
    }
    return null;
  });

  // Проверка возраста + срок кредита
  validateTree((ctx: { form: CreditApplicationForm }) => {
    const form = ctx.form;
    if (form.age !== undefined && form.loanTerm !== undefined) {
      const ageAtEnd = form.age + Math.ceil(form.loanTerm / 12);
      if (ageAtEnd > LOAN_LIMITS.age.max) {
        return {
          code: 'age_at_loan_end',
          message: `К моменту погашения кредита вам будет ${ageAtEnd} лет. Максимальный возраст: ${LOAN_LIMITS.age.max} лет`,
        };
      }
    }
    return null;
  });
};

// =============================================================================
// ЭКСПОРТ КАРТЫ ВАЛИДАЦИЙ ПО ШАГАМ
// =============================================================================

export const stepValidations: Record<number, ValidationSchemaFn<CreditApplicationForm>> = {
  1: step1Validation,
  2: step2Validation,
  3: step3Validation,
  4: step4Validation,
  5: step5Validation,
  6: step6Validation,
};
