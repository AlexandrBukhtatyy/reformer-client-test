/**
 * Поведение формы заявки на кредит
 *
 * Включает:
 * - Вычисляемые поля
 * - Условные поля
 * - Копирование значений
 * - Сброс зависимых полей
 */

import type { BehaviorSchemaFn, FieldPath } from '@reformer/core';
import { enableWhen, watchField, copyFrom } from '@reformer/core/behaviors';

import type { CreditApplicationForm, Address } from './types';
import { BASE_INTEREST_RATES, MORTGAGE_LIMITS } from './constants';

// ============================================================================
// Вспомогательные функции
// ============================================================================

/** Вычисление возраста по дате рождения */
function calculateAge(birthDateStr: string): number | undefined {
  if (!birthDateStr) return undefined;
  const birthDate = new Date(birthDateStr);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

/** Вычисление ежемесячного платежа по аннуитетной формуле */
function calculateMonthlyPayment(
  principal: number | undefined,
  annualRate: number | undefined,
  months: number | undefined
): number | undefined {
  if (!principal || !annualRate || !months || months <= 0) return undefined;

  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    return principal / months;
  }

  const payment =
    principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  return Math.round(payment);
}

/** Вычисление процентной ставки */
function calculateInterestRate(
  loanType: string | undefined,
  hasProperty: boolean,
  propertiesCount: number
): number | undefined {
  if (!loanType) return undefined;

  let rate = BASE_INTEREST_RATES[loanType as keyof typeof BASE_INTEREST_RATES] || 15.9;

  // Скидка за наличие имущества
  if (hasProperty && propertiesCount > 0) {
    rate -= 0.5;
  }

  return Math.round(rate * 10) / 10;
}

// ============================================================================
// Поведение адреса
// ============================================================================

const setupAddressBehavior = (path: FieldPath<Address>) => {
  // Можно добавить загрузку городов по региону
  watchField(
    path.region,
    (region, ctx) => {
      if (!region) return;
      // Здесь можно загружать города по региону
      // При смене региона очищаем город
      ctx.form.city.setValue('');
    },
    { immediate: false }
  );
};

// ============================================================================
// Основное поведение формы
// ============================================================================

export const creditApplicationBehavior: BehaviorSchemaFn<CreditApplicationForm> = (path) => {
  // ============================================================================
  // Шаг 1: Условные поля и вычисления
  // ============================================================================

  // Поля ипотеки видны только при loanType='mortgage'
  enableWhen(path.propertyValue, (form) => form.loanType === 'mortgage', { resetOnDisable: true });
  enableWhen(path.initialPayment, (form) => form.loanType === 'mortgage', { resetOnDisable: true });

  // Поля автокредита видны только при loanType='car'
  enableWhen(path.carBrand, (form) => form.loanType === 'car', { resetOnDisable: true });
  enableWhen(path.carModel, (form) => form.loanType === 'car', { resetOnDisable: true });
  enableWhen(path.carYear, (form) => form.loanType === 'car', { resetOnDisable: true });
  enableWhen(path.carPrice, (form) => form.loanType === 'car', { resetOnDisable: true });

  // Автоматический расчет первоначального взноса (20% от стоимости недвижимости)
  watchField(
    path.propertyValue,
    (propertyValue, ctx) => {
      if (propertyValue !== undefined && propertyValue !== null) {
        const initialPayment = Math.round(propertyValue * (MORTGAGE_LIMITS.minInitialPaymentPercent / 100));
        ctx.form.initialPayment.setValue(initialPayment);
      }
    },
    { immediate: false }
  );

  // Вычисление процентной ставки
  watchField(
    path.loanType,
    (loanType, ctx) => {
      const hasProperty = ctx.form.hasProperty.value.value ?? false;
      const properties = ctx.form.properties.value.value as unknown[] | undefined;
      const propertiesLength = properties?.length ?? 0;
      const rate = calculateInterestRate(loanType, hasProperty, propertiesLength);
      if (rate !== undefined) {
        ctx.form.interestRate.setValue(rate);
      }
    },
    { immediate: true }
  );

  // Пересчет ставки при изменении имущества
  watchField(
    path.hasProperty,
    (hasProperty, ctx) => {
      const loanType = ctx.form.loanType.value.value;
      const properties = ctx.form.properties.value.value as unknown[] | undefined;
      const propertiesLength = properties?.length ?? 0;
      const rate = calculateInterestRate(loanType, hasProperty ?? false, propertiesLength);
      if (rate !== undefined) {
        ctx.form.interestRate.setValue(rate);
      }
    },
    { immediate: false }
  );

  // Вычисление ежемесячного платежа
  watchField(
    path.loanAmount,
    (loanAmount, ctx) => {
      const loanTerm = ctx.form.loanTerm.value.value;
      const interestRate = ctx.form.interestRate.value.value;
      const payment = calculateMonthlyPayment(loanAmount ?? undefined, interestRate, loanTerm);
      ctx.form.monthlyPayment.setValue(payment);
    },
    { immediate: false }
  );

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

  watchField(
    path.interestRate,
    (interestRate, ctx) => {
      const loanAmount = ctx.form.loanAmount.value.value;
      const loanTerm = ctx.form.loanTerm.value.value;
      const payment = calculateMonthlyPayment(loanAmount, interestRate ?? undefined, loanTerm);
      ctx.form.monthlyPayment.setValue(payment);
    },
    { immediate: false }
  );

  // Очистка модели при смене марки автомобиля
  watchField(
    path.carBrand,
    (_, ctx) => {
      ctx.form.carModel.setValue('');
    },
    { immediate: false }
  );

  // ============================================================================
  // Шаг 2: Вычисляемые поля персональных данных
  // ============================================================================

  // Вычисление полного имени
  // Примечание: ctx.form здесь типизирован как PersonalData, поэтому
  // для записи в корневое поле fullName используем setFieldValue с полным путём
  watchField(
    path.personalData.lastName,
    (lastName, ctx) => {
      const firstName = ctx.form.firstName.value.value ?? '';
      const middleName = ctx.form.middleName.value.value ?? '';
      const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
      ctx.setFieldValue('fullName', fullName);
    },
    { immediate: false }
  );

  watchField(
    path.personalData.firstName,
    (firstName, ctx) => {
      const lastName = ctx.form.lastName.value.value ?? '';
      const middleName = ctx.form.middleName.value.value ?? '';
      const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
      ctx.setFieldValue('fullName', fullName);
    },
    { immediate: false }
  );

  watchField(
    path.personalData.middleName,
    (middleName, ctx) => {
      const lastName = ctx.form.lastName.value.value ?? '';
      const firstName = ctx.form.firstName.value.value ?? '';
      const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
      ctx.setFieldValue('fullName', fullName);
    },
    { immediate: false }
  );

  // Вычисление возраста
  watchField(
    path.personalData.birthDate,
    (birthDate, ctx) => {
      const age = calculateAge(birthDate ?? '');
      ctx.setFieldValue('age', age);
    },
    { immediate: false }
  );

  // ============================================================================
  // Шаг 3: Копирование адреса
  // ============================================================================

  // Адрес проживания видим только когда sameAsRegistration = false
  enableWhen(path.residenceAddress, (form) => form.sameAsRegistration === false, { resetOnDisable: true });

  // Копирование адреса регистрации в адрес проживания
  copyFrom(path.registrationAddress, path.residenceAddress, {
    when: (form) => form.sameAsRegistration === true,
  });

  // Поведение адресов
  setupAddressBehavior(path.registrationAddress);
  setupAddressBehavior(path.residenceAddress);

  // ============================================================================
  // Шаг 4: Условные поля занятости и доход
  // ============================================================================

  // Поля работы по найму видны только при employmentStatus='employed'
  enableWhen(path.companyName, (form) => form.employmentStatus === 'employed', { resetOnDisable: true });
  enableWhen(path.companyInn, (form) => form.employmentStatus === 'employed', { resetOnDisable: true });
  enableWhen(path.companyPhone, (form) => form.employmentStatus === 'employed', { resetOnDisable: true });
  enableWhen(path.companyAddress, (form) => form.employmentStatus === 'employed', { resetOnDisable: true });
  enableWhen(path.position, (form) => form.employmentStatus === 'employed', { resetOnDisable: true });

  // Поля ИП видны только при employmentStatus='selfEmployed'
  enableWhen(path.businessType, (form) => form.employmentStatus === 'selfEmployed', { resetOnDisable: true });
  enableWhen(path.businessInn, (form) => form.employmentStatus === 'selfEmployed', { resetOnDisable: true });
  enableWhen(path.businessActivity, (form) => form.employmentStatus === 'selfEmployed', { resetOnDisable: true });

  // Вычисление общего дохода
  watchField(
    path.monthlyIncome,
    (monthlyIncome, ctx) => {
      const additionalIncome = ctx.form.additionalIncome.value.value ?? 0;
      const totalIncome = (monthlyIncome || 0) + additionalIncome;
      ctx.form.totalIncome.setValue(totalIncome || undefined);
    },
    { immediate: false }
  );

  watchField(
    path.additionalIncome,
    (additionalIncome, ctx) => {
      const monthlyIncome = ctx.form.monthlyIncome.value.value ?? 0;
      const totalIncome = monthlyIncome + (additionalIncome || 0);
      ctx.form.totalIncome.setValue(totalIncome || undefined);
    },
    { immediate: false }
  );

  // ============================================================================
  // Шаг 5: Управление массивами
  // ============================================================================

  // Массив имущества виден только при hasProperty=true
  enableWhen(path.properties, (form) => form.hasProperty === true, { resetOnDisable: true });

  // Массив кредитов виден только при hasExistingLoans=true
  enableWhen(path.existingLoans, (form) => form.hasExistingLoans === true, { resetOnDisable: true });

  // Массив созаемщиков виден только при hasCoBorrower=true
  enableWhen(path.coBorrowers, (form) => form.hasCoBorrower === true, { resetOnDisable: true });

  // Вычисление дохода созаемщиков
  watchField(
    path.coBorrowers,
    (coBorrowers, ctx) => {
      if (!coBorrowers || !Array.isArray(coBorrowers)) {
        ctx.form.coBorrowersIncome.setValue(undefined);
        return;
      }
      const totalCoBorrowersIncome = coBorrowers.reduce((sum, cb) => {
        return sum + ((cb as { monthlyIncome?: number }).monthlyIncome || 0);
      }, 0);
      ctx.form.coBorrowersIncome.setValue(totalCoBorrowersIncome || undefined);
    },
    { immediate: false }
  );

  // Вычисление процента платежа от дохода
  watchField(
    path.monthlyPayment,
    (monthlyPayment, ctx) => {
      const totalIncome = ctx.form.totalIncome.value.value;
      if (monthlyPayment && totalIncome && totalIncome > 0) {
        const ratio = Math.round((monthlyPayment / totalIncome) * 100 * 10) / 10;
        ctx.form.paymentToIncomeRatio.setValue(ratio);
      } else {
        ctx.form.paymentToIncomeRatio.setValue(undefined);
      }
    },
    { immediate: false }
  );

  watchField(
    path.totalIncome,
    (totalIncome, ctx) => {
      const monthlyPayment = ctx.form.monthlyPayment.value.value;
      if (monthlyPayment && totalIncome && totalIncome > 0) {
        const ratio = Math.round((monthlyPayment / totalIncome) * 100 * 10) / 10;
        ctx.form.paymentToIncomeRatio.setValue(ratio);
      } else {
        ctx.form.paymentToIncomeRatio.setValue(undefined);
      }
    },
    { immediate: false }
  );
};
