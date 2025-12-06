// model/behavior.ts - Behaviors формы заявки на кредит

// Типы из основного модуля
import type { BehaviorSchemaFn, FieldPath } from '@reformer/core';

// Behaviors из подмодуля /behaviors
import { enableWhen, copyFrom, watchField } from '@reformer/core/behaviors';

import type { CreditApplicationForm } from './types';
import { DEFAULT_INITIAL_PAYMENT_PERCENT } from './constants';

// =============================================================================
// BEHAVIOR SCHEMA
// =============================================================================

export const behaviorSchema: BehaviorSchemaFn<CreditApplicationForm> = (
  path: FieldPath<CreditApplicationForm>
) => {
  // ===========================================================================
  // УСЛОВНАЯ ВИДИМОСТЬ ПОЛЕЙ (enableWhen)
  // ===========================================================================

  // Поля ипотеки: видимы только когда loanType='mortgage'
  enableWhen(path.propertyValue, (form) => form.loanType === 'mortgage', {
    resetOnDisable: true,
  });
  enableWhen(path.initialPayment, (form) => form.loanType === 'mortgage', {
    resetOnDisable: true,
  });

  // Поля автокредита: видимы только когда loanType='car'
  enableWhen(path.carBrand, (form) => form.loanType === 'car', {
    resetOnDisable: true,
  });
  enableWhen(path.carModel, (form) => form.loanType === 'car', {
    resetOnDisable: true,
  });
  enableWhen(path.carYear, (form) => form.loanType === 'car', {
    resetOnDisable: true,
  });
  enableWhen(path.carPrice, (form) => form.loanType === 'car', {
    resetOnDisable: true,
  });

  // Адрес проживания: видим когда не совпадает с регистрацией
  enableWhen(path.residenceAddress, (form) => !form.sameAsRegistration, {
    resetOnDisable: false, // Не сбрасываем - может понадобиться
  });

  // Поля для работающих по найму
  enableWhen(path.companyName, (form) => form.employmentStatus === 'employed', {
    resetOnDisable: true,
  });
  enableWhen(path.companyInn, (form) => form.employmentStatus === 'employed', {
    resetOnDisable: true,
  });
  enableWhen(path.companyPhone, (form) => form.employmentStatus === 'employed', {
    resetOnDisable: true,
  });
  enableWhen(path.companyAddress, (form) => form.employmentStatus === 'employed', {
    resetOnDisable: true,
  });
  enableWhen(path.position, (form) => form.employmentStatus === 'employed', {
    resetOnDisable: true,
  });

  // Поля для самозанятых
  enableWhen(path.businessType, (form) => form.employmentStatus === 'selfEmployed', {
    resetOnDisable: true,
  });
  enableWhen(path.businessInn, (form) => form.employmentStatus === 'selfEmployed', {
    resetOnDisable: true,
  });
  enableWhen(path.businessActivity, (form) => form.employmentStatus === 'selfEmployed', {
    resetOnDisable: true,
  });

  // Источник дополнительного дохода: требуется когда есть доход
  enableWhen(
    path.additionalIncomeSource,
    (form) => (form.additionalIncome ?? 0) > 0,
    { resetOnDisable: false }
  );

  // ===========================================================================
  // КОПИРОВАНИЕ ДАННЫХ (copyFrom)
  // ===========================================================================

  // Копировать адрес регистрации в адрес проживания
  copyFrom(path.registrationAddress, path.residenceAddress, {
    when: (form) => form.sameAsRegistration === true,
  });

  // ===========================================================================
  // ВЫЧИСЛЯЕМЫЕ ПОЛЯ (watchField для кросс-уровневых вычислений)
  // ===========================================================================

  // ФИО = Фамилия Имя Отчество
  // Используем watchField, т.к. вычисляем из вложенных полей в корневое
  watchField(path.personalData.lastName, (_, ctx) => {
    const form = ctx.form as CreditApplicationForm;
    const fullName = [
      form.personalData.lastName,
      form.personalData.firstName,
      form.personalData.middleName,
    ]
      .filter(Boolean)
      .join(' ');
    ctx.setFieldValue('fullName', fullName);
  });

  watchField(path.personalData.firstName, (_, ctx) => {
    const form = ctx.form as CreditApplicationForm;
    const fullName = [
      form.personalData.lastName,
      form.personalData.firstName,
      form.personalData.middleName,
    ]
      .filter(Boolean)
      .join(' ');
    ctx.setFieldValue('fullName', fullName);
  });

  watchField(path.personalData.middleName, (_, ctx) => {
    const form = ctx.form as CreditApplicationForm;
    const fullName = [
      form.personalData.lastName,
      form.personalData.firstName,
      form.personalData.middleName,
    ]
      .filter(Boolean)
      .join(' ');
    ctx.setFieldValue('fullName', fullName);
  });

  // Возраст из даты рождения
  watchField(path.personalData.birthDate, (birthDateStr, ctx) => {
    if (!birthDateStr) {
      ctx.setFieldValue('age', undefined);
      return;
    }

    const birthDate = new Date(birthDateStr);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    ctx.setFieldValue('age', age);
  });

  // Первоначальный взнос = 20% от стоимости недвижимости
  watchField(path.propertyValue, (propertyValue, ctx) => {
    const form = ctx.form as CreditApplicationForm;
    if (form.loanType === 'mortgage' && propertyValue) {
      const initialPayment = Math.round(propertyValue * DEFAULT_INITIAL_PAYMENT_PERCENT);
      ctx.setFieldValue('initialPayment', initialPayment);
    } else {
      ctx.setFieldValue('initialPayment', undefined);
    }
  });

  // Общий доход = ежемесячный + дополнительный
  watchField(path.monthlyIncome, (_, ctx) => {
    const form = ctx.form as CreditApplicationForm;
    const totalIncome = (form.monthlyIncome ?? 0) + (form.additionalIncome ?? 0);
    ctx.setFieldValue('totalIncome', totalIncome > 0 ? totalIncome : undefined);
    recalculatePaymentRatio(ctx);
  });

  watchField(path.additionalIncome, (_, ctx) => {
    const form = ctx.form as CreditApplicationForm;
    const totalIncome = (form.monthlyIncome ?? 0) + (form.additionalIncome ?? 0);
    ctx.setFieldValue('totalIncome', totalIncome > 0 ? totalIncome : undefined);
    recalculatePaymentRatio(ctx);
  });

  // Суммарный доход созаёмщиков
  // Примечание: для массивов watchField может не работать напрямую,
  // эта логика будет обрабатываться в компоненте

  // Процентная ставка (зависит от типа кредита, региона, наличия имущества)
  watchField(path.loanType, (_, ctx) => {
    recalculateInterestRate(ctx);
  });

  watchField(path.registrationAddress.region, (_, ctx) => {
    recalculateInterestRate(ctx);
  });

  watchField(path.hasProperty, (_, ctx) => {
    recalculateInterestRate(ctx);
  });

  // Ежемесячный платёж (аннуитетная формула)
  watchField(path.loanAmount, (_, ctx) => {
    recalculateMonthlyPayment(ctx);
  });

  watchField(path.loanTerm, (_, ctx) => {
    recalculateMonthlyPayment(ctx);
  });

  watchField(path.interestRate, (_, ctx) => {
    recalculateMonthlyPayment(ctx);
    recalculatePaymentRatio(ctx);
  });

  // ===========================================================================
  // СБРОС ЗАВИСИМЫХ ПОЛЕЙ
  // ===========================================================================

  // При смене типа кредита - сбросить связанные поля
  watchField(path.loanType, (loanType, ctx) => {
    // Сброс происходит через enableWhen с resetOnDisable: true
    // Пересчитываем ставку
    recalculateInterestRate(ctx);

    // Если не ипотека - сбросить первоначальный взнос
    if (loanType !== 'mortgage') {
      ctx.setFieldValue('initialPayment', undefined);
    }
  });

  // При смене статуса занятости - зависимые поля сбрасываются через enableWhen
};

// =============================================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ ВЫЧИСЛЕНИЙ
// =============================================================================

/**
 * Пересчёт процентной ставки
 */
function recalculateInterestRate(ctx: {
  form: unknown;
  setFieldValue: (field: string, value: unknown) => void;
}) {
  const form = ctx.form as CreditApplicationForm;

  let baseRate: number;
  switch (form.loanType) {
    case 'mortgage':
      baseRate = 9.5;
      break;
    case 'car':
      baseRate = 12.0;
      break;
    case 'business':
      baseRate = 14.0;
      break;
    case 'refinancing':
      baseRate = 11.0;
      break;
    default:
      baseRate = 15.0;
  }

  // Скидка для Москвы и СПб
  const region = form.registrationAddress?.region?.toLowerCase() || '';
  if (region.includes('moscow') || region === 'spb') {
    baseRate -= 0.5;
  }

  // Скидка для владельцев имущества
  if (form.hasProperty && form.properties && form.properties.length > 0) {
    baseRate -= 1.0;
  }

  // Минимальная ставка
  const finalRate = Math.max(baseRate, 5.0);

  ctx.setFieldValue('interestRate', Math.round(finalRate * 100) / 100);
}

/**
 * Пересчёт ежемесячного платежа (аннуитетная формула)
 */
function recalculateMonthlyPayment(ctx: {
  form: unknown;
  setFieldValue: (field: string, value: unknown) => void;
}) {
  const form = ctx.form as CreditApplicationForm;

  const P = form.loanAmount;
  const n = form.loanTerm;
  const yearlyRate = form.interestRate;

  if (!P || !n || !yearlyRate) {
    ctx.setFieldValue('monthlyPayment', undefined);
    return;
  }

  // Месячная ставка
  const i = yearlyRate / 100 / 12;

  // Аннуитетная формула: P * (i * (1+i)^n) / ((1+i)^n - 1)
  const pow = Math.pow(1 + i, n);
  const payment = P * ((i * pow) / (pow - 1));

  ctx.setFieldValue('monthlyPayment', Math.round(payment));
}

/**
 * Пересчёт отношения платежа к доходу
 */
function recalculatePaymentRatio(ctx: {
  form: unknown;
  setFieldValue: (field: string, value: unknown) => void;
}) {
  const form = ctx.form as CreditApplicationForm;

  const payment = form.monthlyPayment;
  const income = form.totalIncome;

  if (!payment || !income || income === 0) {
    ctx.setFieldValue('paymentToIncomeRatio', undefined);
    return;
  }

  const ratio = (payment / income) * 100;
  ctx.setFieldValue('paymentToIncomeRatio', Math.round(ratio * 100) / 100);
}
