import type { ValidationSchemaFn } from '@reformer/core';
import { required, min, max, minLength, maxLength, applyWhen } from '@reformer/core/validators';
import type { VehicleData } from './type';

export const vehicleValidation: ValidationSchemaFn<VehicleData> = (path) => {
  required(path.vin, { message: 'Введите VIN-номер' });
  minLength(path.vin, 17, { message: 'VIN должен содержать 17 символов' });
  maxLength(path.vin, 17, { message: 'VIN должен содержать 17 символов' });

  required(path.brand, { message: 'Выберите марку автомобиля' });
  required(path.model, { message: 'Выберите модель автомобиля' });

  required(path.year, { message: 'Укажите год выпуска' });
  min(path.year, 1990, { message: 'Год выпуска не может быть раньше 1990' });
  max(path.year, new Date().getFullYear(), { message: 'Некорректный год выпуска' });

  required(path.mileage, { message: 'Укажите пробег' });
  min(path.mileage, 0, { message: 'Пробег не может быть отрицательным' });

  required(path.enginePower, { message: 'Укажите мощность двигателя' });
  min(path.enginePower, 1, { message: 'Минимальная мощность 1 л.с.' });
  max(path.enginePower, 1000, { message: 'Максимальная мощность 1000 л.с.' });

  required(path.bodyType, { message: 'Выберите тип кузова' });
  required(path.transmission, { message: 'Выберите тип коробки передач' });

  required(path.marketValue, { message: 'Укажите рыночную стоимость' });
  min(path.marketValue, 10000, { message: 'Минимальная стоимость 10 000 ₽' });

  applyWhen(
    path.hasAntiTheft,
    (hasAntiTheft) => hasAntiTheft === true,
    (p) => {
      required(p.antiTheftBrand, { message: 'Укажите марку противоугонной системы' });
    }
  );
};
