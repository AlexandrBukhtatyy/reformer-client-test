import type { ValidationSchemaFn } from '@reformer/core';
import { required, min, applyWhen } from '@reformer/core/validators';
import type { ClaimData } from './type';

export const claimValidation: ValidationSchemaFn<ClaimData> = (path) => {
  required(path.date, { message: 'Укажите дату страхового случая' });
  required(path.claimType, { message: 'Выберите тип страхового случая' });
  required(path.description, { message: 'Опишите страховой случай' });

  required(path.amount, { message: 'Укажите сумму ущерба' });
  min(path.amount, 0, { message: 'Некорректная сумма' });

  applyWhen(
    path.wasCompensated,
    (was) => was === true,
    (p) => {
      required(p.compensationAmount, { message: 'Укажите сумму компенсации' });
      min(p.compensationAmount, 0, { message: 'Некорректная сумма' });
    }
  );
};
