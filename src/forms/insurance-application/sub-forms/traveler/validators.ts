import type { ValidationSchemaFn } from '@reformer/core';
import { required } from '@reformer/core/validators';
import type { TravelerData } from './type';

export const travelerValidation: ValidationSchemaFn<TravelerData> = (path) => {
  required(path.lastName, { message: 'Введите фамилию' });
  required(path.firstName, { message: 'Введите имя' });
  required(path.birthDate, { message: 'Укажите дату рождения' });
  required(path.passportNumber, { message: 'Введите номер загранпаспорта' });
  required(path.passportExpiry, { message: 'Укажите срок действия паспорта' });
  required(path.citizenship, { message: 'Укажите гражданство' });
};
