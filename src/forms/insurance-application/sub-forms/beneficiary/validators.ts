import type { ValidationSchemaFn } from '@reformer/core';
import { required, min, max } from '@reformer/core/validators';
import type { BeneficiaryData } from './type';

export const beneficiaryValidation: ValidationSchemaFn<BeneficiaryData> = (path) => {
  required(path.lastName, { message: 'Введите фамилию' });
  required(path.firstName, { message: 'Введите имя' });
  required(path.birthDate, { message: 'Укажите дату рождения' });
  required(path.relation, { message: 'Выберите степень родства' });

  required(path.share, { message: 'Укажите долю' });
  min(path.share, 1, { message: 'Минимальная доля 1%' });
  max(path.share, 100, { message: 'Максимальная доля 100%' });

  required(path.passportSeries, { message: 'Введите серию паспорта' });
  required(path.passportNumber, { message: 'Введите номер паспорта' });
};
