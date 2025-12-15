import type { ValidationSchemaFn } from '@reformer/core';
import { required, min, max } from '@reformer/core/validators';
import type { DriverData } from './type';

export const driverValidation: ValidationSchemaFn<DriverData> = (path) => {
  required(path.lastName, { message: 'Введите фамилию' });
  required(path.firstName, { message: 'Введите имя' });
  required(path.birthDate, { message: 'Укажите дату рождения' });

  min(path.age, 18, { message: 'Минимальный возраст водителя 18 лет' });
  max(path.age, 75, { message: 'Максимальный возраст водителя 75 лет' });

  required(path.licenseNumber, { message: 'Введите номер водительского удостоверения' });
  required(path.licenseIssueDate, { message: 'Укажите дату выдачи ВУ' });

  min(path.experience, 0, { message: 'Некорректный стаж' });
};
