/**
 * Поведение формы заявки на кредит
 * Использует @reformer/core/behaviors
 *
 * BehaviorSchemaFn<T> = (path: FieldPath<T>) => void
 * - path содержит типизированные пути к полям формы
 * - функции вызываются внутри, не возвращают значение
 */

import { enableWhen, watchField, copyFrom } from '@reformer/core/behaviors';
import type { BehaviorSchemaFn } from '@reformer/core';
import type { CreditApplicationForm } from './types';
import { BASE_INTEREST_RATES } from './constants';

// ============================================================================
// Условная видимость полей (enableWhen)
// ============================================================================

export const conditionalVisibilityBehavior: BehaviorSchemaFn<CreditApplicationForm> = (path) => {
  // Ипотечные поля - включаются только при loanType='mortgage'
  enableWhen(path.propertyValue, (form) => form.loanType === 'mortgage');
  enableWhen(path.initialPayment, (form) => form.loanType === 'mortgage');

  // Автокредитные поля - включаются только при loanType='car'
  enableWhen(path.carBrand, (form) => form.loanType === 'car');
  enableWhen(path.carModel, (form) => form.loanType === 'car');
  enableWhen(path.carYear, (form) => form.loanType === 'car');
  enableWhen(path.carPrice, (form) => form.loanType === 'car');

  // Поля компании - включаются при employmentStatus='employed'
  enableWhen(path.companyName, (form) => form.employmentStatus === 'employed');
  enableWhen(path.companyInn, (form) => form.employmentStatus === 'employed');
  enableWhen(path.companyPhone, (form) => form.employmentStatus === 'employed');
  enableWhen(path.companyAddress, (form) => form.employmentStatus === 'employed');
  enableWhen(path.position, (form) => form.employmentStatus === 'employed');

  // Поля бизнеса - включаются при employmentStatus='selfEmployed'
  enableWhen(path.businessType, (form) => form.employmentStatus === 'selfEmployed');
  enableWhen(path.businessInn, (form) => form.employmentStatus === 'selfEmployed');
  enableWhen(path.businessActivity, (form) => form.employmentStatus === 'selfEmployed');

  // Стаж работы - для работающих
  enableWhen(path.workExperienceTotal, (form) =>
    form.employmentStatus === 'employed' || form.employmentStatus === 'selfEmployed'
  );
  enableWhen(path.workExperienceCurrent, (form) =>
    form.employmentStatus === 'employed' || form.employmentStatus === 'selfEmployed'
  );

  // Адрес проживания - включается при sameAsRegistration=false
  enableWhen(path.residenceAddress, (form) => !form.sameAsRegistration);

  // Дополнительный email - включается при sameEmail=false
  enableWhen(path.emailAdditional, (form) => !form.sameEmail);

  // Массив имущества - включается при hasProperty=true
  enableWhen(path.properties, (form) => form.hasProperty);

  // Массив кредитов - включается при hasExistingLoans=true
  enableWhen(path.existingLoans, (form) => form.hasExistingLoans);

  // Массив созаемщиков - включается при hasCoBorrower=true
  enableWhen(path.coBorrowers, (form) => form.hasCoBorrower);

  // Источник дополнительного дохода - обязателен при наличии дохода
  enableWhen(path.additionalIncomeSource, (form) =>
    form.additionalIncome !== undefined && form.additionalIncome > 0
  );
};

// ============================================================================
// Вычисляемые поля (watchField для кросс-уровневых вычислений)
// ============================================================================

export const computedFieldsBehavior: BehaviorSchemaFn<CreditApplicationForm> = (path) => {
  // Полное имя = Фамилия + Имя + Отчество
  watchField(path.personalData.lastName, (_, ctx) => {
    const form = ctx.form.getValue();
    const { lastName, firstName, middleName } = form.personalData;
    const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
    ctx.setFieldValue('fullName', fullName);
  });
  watchField(path.personalData.firstName, (_, ctx) => {
    const form = ctx.form.getValue();
    const { lastName, firstName, middleName } = form.personalData;
    const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
    ctx.setFieldValue('fullName', fullName);
  });
  watchField(path.personalData.middleName, (_, ctx) => {
    const form = ctx.form.getValue();
    const { lastName, firstName, middleName } = form.personalData;
    const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
    ctx.setFieldValue('fullName', fullName);
  });

  // Возраст из даты рождения
  watchField(path.personalData.birthDate, (birthDateValue, ctx) => {
    if (birthDateValue) {
      const birthDate = new Date(birthDateValue);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      ctx.setFieldValue('age', age >= 0 ? age : undefined);
    } else {
      ctx.setFieldValue('age', undefined);
    }
  });

  // Общий доход = основной + дополнительный
  watchField(path.monthlyIncome, (_, ctx) => {
    const form = ctx.form.getValue();
    const total = (form.monthlyIncome || 0) + (form.additionalIncome || 0);
    ctx.setFieldValue('totalIncome', total > 0 ? total : undefined);
  });
  watchField(path.additionalIncome, (_, ctx) => {
    const form = ctx.form.getValue();
    const total = (form.monthlyIncome || 0) + (form.additionalIncome || 0);
    ctx.setFieldValue('totalIncome', total > 0 ? total : undefined);
  });

  // Доход созаемщиков = сумма доходов всех созаемщиков
  watchField(path.coBorrowers, (coBorrowers, ctx) => {
    const total = coBorrowers.reduce((sum, cb) => sum + (cb.monthlyIncome || 0), 0);
    ctx.setFieldValue('coBorrowersIncome', total > 0 ? total : undefined);
  });

  // Первоначальный взнос = 20% от стоимости недвижимости (только для ипотеки)
  watchField(path.propertyValue, (propertyValue, ctx) => {
    const form = ctx.form.getValue();
    if (form.loanType === 'mortgage' && propertyValue !== undefined && propertyValue !== null) {
      ctx.setFieldValue('initialPayment', Math.round(propertyValue * 0.2));
    }
  });

  // Процентная ставка на основе типа кредита и региона
  watchField(path.loanType, (_, ctx) => {
    calculateAndSetInterestRate(ctx);
  });
  watchField(path.registrationAddress.region, (_, ctx) => {
    calculateAndSetInterestRate(ctx);
  });
  watchField(path.hasProperty, (_, ctx) => {
    calculateAndSetInterestRate(ctx);
  });
  watchField(path.properties, (_, ctx) => {
    calculateAndSetInterestRate(ctx);
  });

  // Ежемесячный платеж по аннуитетной формуле
  watchField(path.loanAmount, (_, ctx) => {
    calculateAndSetMonthlyPayment(ctx);
  });
  watchField(path.loanTerm, (_, ctx) => {
    calculateAndSetMonthlyPayment(ctx);
  });
  watchField(path.interestRate, (_, ctx) => {
    calculateAndSetMonthlyPayment(ctx);
  });

  // Процент платежа от дохода
  watchField(path.monthlyPayment, (_, ctx) => {
    calculateAndSetPaymentRatio(ctx);
  });
  watchField(path.totalIncome, (_, ctx) => {
    calculateAndSetPaymentRatio(ctx);
  });
};

// ============================================================================
// Автокопирование (copyFrom)
// ============================================================================

export const autoCopyBehavior: BehaviorSchemaFn<CreditApplicationForm> = (path) => {
  // Копирование адреса регистрации в адрес проживания
  copyFrom(path.registrationAddress, path.residenceAddress, {
    when: (form) => form.sameAsRegistration === true,
    fields: 'all',
  });

  // Копирование email
  watchField(path.sameEmail, (sameEmail, ctx) => {
    if (sameEmail) {
      const form = ctx.form.getValue();
      ctx.setFieldValue('emailAdditional', form.email);
    }
  });
  watchField(path.email, (email, ctx) => {
    const form = ctx.form.getValue();
    if (form.sameEmail && email) {
      ctx.setFieldValue('emailAdditional', email);
    }
  });
};

// ============================================================================
// Вспомогательные функции для вычислений
// ============================================================================

interface BehaviorContextLike {
  form: { getValue: () => CreditApplicationForm };
  setFieldValue: (path: string, value: unknown) => void;
}

function calculateAndSetInterestRate(ctx: BehaviorContextLike) {
  const form = ctx.form.getValue();

  if (!form.loanType) {
    ctx.setFieldValue('interestRate', undefined);
    return;
  }

  // Базовая ставка по типу кредита
  let rate = BASE_INTEREST_RATES[form.loanType] || 15;

  // Корректировка по региону (Москва и СПб - ниже)
  const region = form.registrationAddress?.region?.toLowerCase() || '';
  if (region.includes('москва') || region.includes('moscow')) {
    rate -= 0.5;
  } else if (region.includes('санкт-петербург') || region.includes('spb')) {
    rate -= 0.3;
  }

  // Корректировка при наличии имущества
  if (form.hasProperty && form.properties.length > 0) {
    const totalPropertyValue = form.properties.reduce(
      (sum, p) => sum + (p.estimatedValue || 0),
      0
    );
    if (totalPropertyValue > 5000000) {
      rate -= 1;
    } else if (totalPropertyValue > 2000000) {
      rate -= 0.5;
    }
  }

  // Минимальная ставка
  rate = Math.max(rate, 5);

  ctx.setFieldValue('interestRate', Math.round(rate * 100) / 100);
}

function calculateAndSetMonthlyPayment(ctx: BehaviorContextLike) {
  const form = ctx.form.getValue();
  const P = form.loanAmount; // Сумма кредита
  const n = form.loanTerm; // Срок в месяцах
  const yearlyRate = form.interestRate; // Годовая ставка в %

  if (!P || !n || !yearlyRate || P <= 0 || n <= 0 || yearlyRate <= 0) {
    ctx.setFieldValue('monthlyPayment', undefined);
    return;
  }

  // Месячная процентная ставка
  const i = yearlyRate / 100 / 12;

  // Аннуитетная формула: P * (i * (1+i)^n) / ((1+i)^n - 1)
  const power = Math.pow(1 + i, n);
  const payment = P * (i * power) / (power - 1);

  ctx.setFieldValue('monthlyPayment', Math.round(payment));
}

function calculateAndSetPaymentRatio(ctx: BehaviorContextLike) {
  const form = ctx.form.getValue();
  const payment = form.monthlyPayment;
  const totalIncome = form.totalIncome;

  if (!payment || !totalIncome || totalIncome <= 0) {
    ctx.setFieldValue('paymentToIncomeRatio', undefined);
    return;
  }

  const ratio = (payment / totalIncome) * 100;
  ctx.setFieldValue('paymentToIncomeRatio', Math.round(ratio * 100) / 100);
}

// ============================================================================
// Полная схема поведения
// ============================================================================

export const creditApplicationBehavior: BehaviorSchemaFn<CreditApplicationForm> = (path) => {
  conditionalVisibilityBehavior(path);
  computedFieldsBehavior(path);
  autoCopyBehavior(path);
};
