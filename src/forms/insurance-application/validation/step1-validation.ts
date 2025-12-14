// Step 1: Insurance Type and Basic Parameters - Validation Schema
import type { ValidationSchemaFn, FieldPath } from '@reformer/core';
import { required, min, max, validate, applyWhen } from '@reformer/core/validators';
import type { InsuranceApplicationForm } from '../types';

export const step1Validation: ValidationSchemaFn<InsuranceApplicationForm> = (
  path: FieldPath<InsuranceApplicationForm>
) => {
  // Insurance type - required
  required(path.insuranceType, { message: 'Выберите тип страхования' });

  // Insurance period - required
  required(path.insurancePeriod, { message: 'Выберите срок страхования' });

  // Start date - required, must be >= today
  required(path.startDate, { message: 'Укажите дату начала действия полиса' });
  validate(path.startDate, (value) => {
    if (!value) return null;
    const startDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (startDate < today) {
      return { code: 'minDate', message: 'Дата начала не может быть раньше сегодняшней даты' };
    }
    return null;
  });

  // Coverage amount - required, min 100000, max 50000000
  required(path.coverageAmount, { message: 'Укажите страховую сумму' });
  min(path.coverageAmount, 100000, { message: 'Минимальная сумма: 100 000 ₽' });
  max(path.coverageAmount, 50000000, { message: 'Максимальная сумма: 50 000 000 ₽' });

  // Deductible - min 0 when defined
  min(path.deductible, 0, { message: 'Франшиза не может быть отрицательной' });

  // Payment type - required
  required(path.paymentType, { message: 'Выберите способ оплаты' });

  // Installments - required when payment type is 'installments'
  applyWhen(
    path.paymentType,
    (type) => type === 'installments',
    (p) => {
      required(p.installments, { message: 'Выберите количество платежей' });
    }
  );
};
