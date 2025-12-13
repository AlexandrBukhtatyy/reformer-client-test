import { required, min, max, number, date, applyWhen } from '@reformer/core/validators';
import type { ValidationSchemaFn, FieldPath } from '@reformer/core';
import type { Step1Form } from './type';

export const step1Validation: ValidationSchemaFn<Step1Form> = (path: FieldPath<Step1Form>) => {
  // insuranceType validation
 required(path.insuranceType, { message: 'Тип страхования обязателен' });

  // insurancePeriod validation
  required(path.insurancePeriod, { message: 'Срок страхования обязателен' });

  // startDate validation
  required(path.startDate, { message: 'Дата начала обязательна' });
  date(path.startDate, {
    message: 'Некорректная дата',
    noPast: false // Allow past dates if needed, or true to prevent past dates
  });

  // coverageAmount validation
  required(path.coverageAmount, { message: 'Страховая сумма обязательна' });
  number(path.coverageAmount, { message: 'Должно быть число' });
  min(path.coverageAmount, 100000, { message: 'Минимум 100 000 ₽' });
  max(path.coverageAmount, 50000000, { message: 'Максимум 50 000 000 ₽' });

 // deductible validation (optional, but if provided should be >= 0)
  min(path.deductible, 0, { message: 'Франшиза не может быть отрицательной' });

  // paymentType validation
  required(path.paymentType, { message: 'Способ оплаты обязателен' });

  // installments validation (conditional - only required when paymentType is 'installments')
  applyWhen(
    path.paymentType,
    (type) => type === 'installments',
    (p) => {
      required(p.installments, { message: 'Количество платежей обязательно при рассрочке' });
    }
  );
};