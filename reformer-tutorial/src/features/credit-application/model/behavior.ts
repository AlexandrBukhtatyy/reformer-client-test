/**
 * Поведение формы заявки на кредит
 */

import type { BehaviorSchemaFn } from '@reformer/core';
import { watchField, enableWhen } from '@reformer/core/behaviors';

import type { CreditApplicationForm, Address } from './types';
import { BASE_INTEREST_RATES } from './constants';

// ============================================================================
// Вспомогательные функции
// ============================================================================

/** Вычисление возраста из даты рождения */
function calculateAge(birthDate: string): number | undefined {
  if (!birthDate) return undefined;
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

/** Вычисление процентной ставки */
function calculateInterestRate(
  loanType: CreditApplicationForm['loanType'],
  hasProperty: boolean,
  propertiesCount: number
): number {
  const baseRate = BASE_INTEREST_RATES[loanType] ?? 15.9;
  let discount = 0;

  // Скидка за наличие имущества
  if (hasProperty && propertiesCount > 0) {
    discount += 0.5 * Math.min(propertiesCount, 3); // Максимум 1.5% скидки
  }

  return Math.max(baseRate - discount, 5.0);
}

/** Вычисление ежемесячного платежа (аннуитет) */
function calculateMonthlyPayment(
  loanAmount: number | undefined,
  interestRate: number | undefined,
  loanTerm: number | undefined
): number | undefined {
  if (!loanAmount || !interestRate || !loanTerm || loanTerm <= 0) {
    return undefined;
  }

  const monthlyRate = interestRate / 100 / 12;
  const pow = Math.pow(1 + monthlyRate, loanTerm);
  const payment = loanAmount * (monthlyRate * pow) / (pow - 1);

  return Math.round(payment);
}

/** Вычисление первоначального взноса (20% от стоимости) */
function calculateInitialPayment(propertyValue: number | undefined): number | undefined {
  if (!propertyValue) return undefined;
  return Math.round(propertyValue * 0.2);
}

// ============================================================================
// Схема поведения
// ============================================================================

export const creditApplicationBehavior: BehaviorSchemaFn<CreditApplicationForm> = (path) => {
  // ==========================================================================
  // Шаг 1: Условные поля для типа кредита
  // ==========================================================================

  // Поля для ипотеки
  enableWhen(path.propertyValue, (form) => form.loanType === 'mortgage');
  enableWhen(path.initialPayment, (form) => form.loanType === 'mortgage');

  // Поля для автокредита
  enableWhen(path.carBrand, (form) => form.loanType === 'car');
  enableWhen(path.carModel, (form) => form.loanType === 'car');
  enableWhen(path.carYear, (form) => form.loanType === 'car');
  enableWhen(path.carPrice, (form) => form.loanType === 'car');

  // ==========================================================================
  // Шаг 1: Вычисляемые поля
  // ==========================================================================

  // Вычисление процентной ставки при изменении типа кредита
  watchField(
    path.loanType,
    (loanType, ctx) => {
      const hasProperty = ctx.form.hasProperty.value.value ?? false;
      const properties = ctx.form.properties.value.value;
      const propertiesCount = Array.isArray(properties) ? properties.length : 0;
      const rate = calculateInterestRate(loanType, hasProperty, propertiesCount);
      ctx.form.interestRate.setValue(rate);
    },
    { immediate: true }
  );

  // Пересчёт ставки при изменении имущества
  watchField(
    path.hasProperty,
    (hasProperty, ctx) => {
      const loanType = ctx.form.loanType.value.value;
      const properties = ctx.form.properties.value.value;
      const propertiesCount = Array.isArray(properties) ? properties.length : 0;
      const rate = calculateInterestRate(loanType, hasProperty, propertiesCount);
      ctx.form.interestRate.setValue(rate);
    },
    { immediate: false }
  );

  // Вычисление ежемесячного платежа при изменении суммы
  watchField(
    path.loanAmount,
    (loanAmount, ctx) => {
      const loanTerm = ctx.form.loanTerm.value.value;
      const interestRate = ctx.form.interestRate.value.value;
      const payment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
      ctx.form.monthlyPayment.setValue(payment);
    },
    { immediate: false }
  );

  // Вычисление ежемесячного платежа при изменении срока
  watchField(
    path.loanTerm,
    (loanTerm, ctx) => {
      const loanAmount = ctx.form.loanAmount.value.value;
      const interestRate = ctx.form.interestRate.value.value;
      const payment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
      ctx.form.monthlyPayment.setValue(payment);
    },
    { immediate: false }
  );

  // Вычисление ежемесячного платежа при изменении ставки
  watchField(
    path.interestRate,
    (interestRate, ctx) => {
      const loanAmount = ctx.form.loanAmount.value.value;
      const loanTerm = ctx.form.loanTerm.value.value;
      const payment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
      ctx.form.monthlyPayment.setValue(payment);
    },
    { immediate: false }
  );

  // Вычисление первоначального взноса для ипотеки
  watchField(
    path.propertyValue,
    (propertyValue, ctx) => {
      const initialPayment = calculateInitialPayment(propertyValue);
      ctx.form.initialPayment.setValue(initialPayment);
    },
    { immediate: false }
  );

  // Сброс модели при смене марки автомобиля
  watchField(
    path.carBrand,
    (_carBrand, ctx) => {
      ctx.form.carModel.setValue('');
    },
    { immediate: false }
  );

  // ==========================================================================
  // Шаг 2: Вычисляемые поля (ФИО и возраст)
  // ==========================================================================

  // Вычисление полного имени при изменении фамилии
  watchField(
    path.personalData.lastName,
    (lastName, ctx) => {
      const firstName = ctx.form.personalData.firstName.value.value ?? '';
      const middleName = ctx.form.personalData.middleName.value.value ?? '';
      const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
      ctx.form.fullName.setValue(fullName);
    },
    { immediate: true }
  );

  // Вычисление полного имени при изменении имени
  watchField(
    path.personalData.firstName,
    (firstName, ctx) => {
      const lastName = ctx.form.personalData.lastName.value.value ?? '';
      const middleName = ctx.form.personalData.middleName.value.value ?? '';
      const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
      ctx.form.fullName.setValue(fullName);
    },
    { immediate: false }
  );

  // Вычисление полного имени при изменении отчества
  watchField(
    path.personalData.middleName,
    (middleName, ctx) => {
      const lastName = ctx.form.personalData.lastName.value.value ?? '';
      const firstName = ctx.form.personalData.firstName.value.value ?? '';
      const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
      ctx.form.fullName.setValue(fullName);
    },
    { immediate: false }
  );

  // Вычисление возраста при изменении даты рождения
  watchField(
    path.personalData.birthDate,
    (birthDate, ctx) => {
      const age = calculateAge(birthDate);
      ctx.form.age.setValue(age);
    },
    { immediate: true }
  );

  // ==========================================================================
  // Шаг 3: Условные поля и копирование адреса
  // ==========================================================================

  // Поля адреса проживания включены, если не совпадает с регистрацией
  enableWhen(path.residenceAddress, (form) => form.sameAsRegistration === false);

  // Копирование адреса регистрации в адрес проживания
  watchField(
    path.sameAsRegistration,
    (sameAsRegistration, ctx) => {
      if (sameAsRegistration) {
        const regAddress = ctx.form.registrationAddress.value.value as Address;
        if (regAddress) {
          ctx.form.residenceAddress.setValue({ ...regAddress });
        }
      }
    },
    { immediate: false }
  );

  // Синхронизация при изменении адреса регистрации (если адреса совпадают)
  watchField(
    path.registrationAddress,
    (regAddress, ctx) => {
      const sameAsRegistration = ctx.form.sameAsRegistration.value.value;
      if (sameAsRegistration && regAddress) {
        ctx.form.residenceAddress.setValue({ ...regAddress });
      }
    },
    { immediate: false }
  );

  // ==========================================================================
  // Шаг 4: Условные поля для типа занятости
  // ==========================================================================

  // Поля для работающих по найму
  enableWhen(path.companyName, (form) => form.employmentStatus === 'employed');
  enableWhen(path.companyInn, (form) => form.employmentStatus === 'employed');
  enableWhen(path.companyPhone, (form) => form.employmentStatus === 'employed');
  enableWhen(path.companyAddress, (form) => form.employmentStatus === 'employed');
  enableWhen(path.position, (form) => form.employmentStatus === 'employed');

  // Поля для ИП
  enableWhen(path.businessType, (form) => form.employmentStatus === 'selfEmployed');
  enableWhen(path.businessInn, (form) => form.employmentStatus === 'selfEmployed');
  enableWhen(path.businessActivity, (form) => form.employmentStatus === 'selfEmployed');

  // ==========================================================================
  // Шаг 4: Вычисляемые поля (доход)
  // ==========================================================================

  // Вычисление общего дохода при изменении основного дохода
  watchField(
    path.monthlyIncome,
    (monthlyIncome, ctx) => {
      const additionalIncome = ctx.form.additionalIncome.value.value ?? 0;
      const totalIncome = (monthlyIncome ?? 0) + additionalIncome;
      ctx.form.totalIncome.setValue(totalIncome > 0 ? totalIncome : undefined);
    },
    { immediate: false }
  );

  // Вычисление общего дохода при изменении дополнительного дохода
  watchField(
    path.additionalIncome,
    (additionalIncome, ctx) => {
      const monthlyIncome = ctx.form.monthlyIncome.value.value ?? 0;
      const totalIncome = monthlyIncome + (additionalIncome ?? 0);
      ctx.form.totalIncome.setValue(totalIncome > 0 ? totalIncome : undefined);
    },
    { immediate: false }
  );

  // ==========================================================================
  // Шаг 5: Условные поля и управление массивами
  // ==========================================================================

  // Массив имущества включен, если hasProperty = true
  enableWhen(path.properties, (form) => form.hasProperty === true);

  // Массив существующих кредитов включен, если hasExistingLoans = true
  enableWhen(path.existingLoans, (form) => form.hasExistingLoans === true);

  // Массив созаемщиков включен, если hasCoBorrower = true
  enableWhen(path.coBorrowers, (form) => form.hasCoBorrower === true);

  // Очистка массива имущества при отключении
  watchField(
    path.hasProperty,
    (hasProperty, ctx) => {
      if (!hasProperty) {
        ctx.form.properties.setValue([]);
      }
    },
    { immediate: false }
  );

  // Очистка массива кредитов при отключении
  watchField(
    path.hasExistingLoans,
    (hasExistingLoans, ctx) => {
      if (!hasExistingLoans) {
        ctx.form.existingLoans.setValue([]);
      }
    },
    { immediate: false }
  );

  // Очистка массива созаемщиков при отключении
  watchField(
    path.hasCoBorrower,
    (hasCoBorrower, ctx) => {
      if (!hasCoBorrower) {
        ctx.form.coBorrowers.setValue([]);
      }
    },
    { immediate: false }
  );

  // ==========================================================================
  // Шаг 5: Вычисляемые поля (платёж/доход и доход созаемщиков)
  // ==========================================================================

  // Вычисление процента платежа от дохода при изменении платежа
  watchField(
    path.monthlyPayment,
    (monthlyPayment, ctx) => {
      const totalIncome = ctx.form.totalIncome.value.value;
      if (monthlyPayment && totalIncome && totalIncome > 0) {
        const ratio = (monthlyPayment / totalIncome) * 100;
        ctx.form.paymentToIncomeRatio.setValue(Math.round(ratio * 100) / 100);
      } else {
        ctx.form.paymentToIncomeRatio.setValue(undefined);
      }
    },
    { immediate: false }
  );

  // Вычисление процента платежа от дохода при изменении дохода
  watchField(
    path.totalIncome,
    (totalIncome, ctx) => {
      const monthlyPayment = ctx.form.monthlyPayment.value.value;
      if (monthlyPayment && totalIncome && totalIncome > 0) {
        const ratio = (monthlyPayment / totalIncome) * 100;
        ctx.form.paymentToIncomeRatio.setValue(Math.round(ratio * 100) / 100);
      } else {
        ctx.form.paymentToIncomeRatio.setValue(undefined);
      }
    },
    { immediate: false }
  );

  // Вычисление общего дохода созаемщиков
  watchField(
    path.coBorrowers,
    (coBorrowers, ctx) => {
      if (Array.isArray(coBorrowers) && coBorrowers.length > 0) {
        const total = coBorrowers.reduce((sum, cb) => sum + (cb.monthlyIncome ?? 0), 0);
        ctx.form.coBorrowersIncome.setValue(total > 0 ? total : undefined);
      } else {
        ctx.form.coBorrowersIncome.setValue(undefined);
      }
    },
    { immediate: false }
  );
};
