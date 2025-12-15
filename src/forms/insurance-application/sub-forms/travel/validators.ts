import type { ValidationSchemaFn } from '@reformer/core';
import { required, min, applyWhen } from '@reformer/core/validators';
import type { TravelData } from './type';

export const travelValidation: ValidationSchemaFn<TravelData> = (path) => {
  required(path.departureDate, { message: 'Укажите дату вылета' });
  required(path.returnDate, { message: 'Укажите дату возвращения' });
  required(path.travelPurpose, { message: 'Выберите цель поездки' });
  required(path.sportType, { message: 'Выберите вид активного отдыха' });

  applyWhen(
    path.hasMedicalConditions,
    (has) => has === true,
    (p) => {
      required(p.medicalConditionsDescription, { message: 'Опишите медицинские противопоказания' });
    }
  );

  applyWhen(
    path.includesLuggage,
    (includes) => includes === true,
    (p) => {
      required(p.luggageValue, { message: 'Укажите стоимость багажа' });
      min(p.luggageValue, 0, { message: 'Некорректная стоимость багажа' });
    }
  );
};
