// Step 1: Insurance Type and Basic Parameters - Validators
import type { ValidationSchemaFn } from '@reformer/core';
import { required, min, max, applyWhen, validate } from '@reformer/core/validators';
import type { InsuranceApplicationForm } from '../type';

export const step1Validation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  // Insurance Type - required
  required(path.insuranceType, { message: 'Выберите тип страхования' });

  // Insurance Period - required
  required(path.insurancePeriod, { message: 'Выберите срок страхования' });

  // Start Date - required and must be >= today
  required(path.startDate, { message: 'Укажите дату начала действия полиса' });
  validate(path.startDate, (value) => {
    if (!value) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(value);
    if (startDate < today) {
      return { code: 'min_date', message: 'Дата начала не может быть раньше сегодняшнего дня' };
    }
    return null;
  });

  // Coverage Amount - required, min 100000, max 50000000
  required(path.coverageAmount, { message: 'Укажите страховую сумму' });
  min(path.coverageAmount, 100000, { message: 'Минимальная страховая сумма 100 000 руб.' });
  max(path.coverageAmount, 50000000, { message: 'Максимальная страховая сумма 50 000 000 руб.' });

  // Deductible - optional, min 0
  min(path.deductible, 0, { message: 'Франшиза не может быть отрицательной' });

  // Payment Type - required
  required(path.paymentType, { message: 'Выберите способ оплаты' });

  // Installments - conditional, required when paymentType = 'installments'
  applyWhen(
    path.paymentType,
    (type) => type === 'installments',
    (p) => {
      required(p.installments, { message: 'Выберите количество платежей' });
    }
  );
};
