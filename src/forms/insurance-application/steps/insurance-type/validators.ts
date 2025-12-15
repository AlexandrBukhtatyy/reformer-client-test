import type { ValidationSchemaFn } from '@reformer/core';
import { required, min, max, applyWhen } from '@reformer/core/validators';
import type { InsuranceTypeStep } from './type';

export const insuranceTypeValidation: ValidationSchemaFn<InsuranceTypeStep> = (path) => {
  required(path.insuranceType, { message: 'Выберите тип страхования' });
  required(path.insurancePeriod, { message: 'Выберите срок страхования' });
  required(path.startDate, { message: 'Укажите дату начала действия полиса' });

  required(path.coverageAmount, { message: 'Укажите страховую сумму' });
  min(path.coverageAmount, 100000, { message: 'Минимальная страховая сумма 100 000 ₽' });
  max(path.coverageAmount, 50000000, { message: 'Максимальная страховая сумма 50 000 000 ₽' });

  min(path.deductible, 0, { message: 'Франшиза не может быть отрицательной' });

  required(path.paymentType, { message: 'Выберите способ оплаты' });

  applyWhen(
    path.paymentType,
    (type) => type === 'installments',
    (p) => {
      required(p.installments, { message: 'Выберите количество платежей' });
    }
  );
};
