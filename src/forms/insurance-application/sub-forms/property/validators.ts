import type { ValidationSchemaFn } from '@reformer/core';
import { required, min, max } from '@reformer/core/validators';
import type { PropertyData } from './type';

export const propertyValidation: ValidationSchemaFn<PropertyData> = (path) => {
  required(path.propertyType, { message: 'Выберите тип недвижимости' });
  required(path.address, { message: 'Введите адрес объекта' });

  required(path.area, { message: 'Укажите площадь' });
  min(path.area, 1, { message: 'Минимальная площадь 1 м²' });
  max(path.area, 10000, { message: 'Максимальная площадь 10 000 м²' });

  min(path.floor, 1, { message: 'Минимальный этаж 1' });
  min(path.totalFloors, 1, { message: 'Минимальная этажность 1' });

  required(path.buildYear, { message: 'Укажите год постройки' });
  min(path.buildYear, 1800, { message: 'Некорректный год постройки' });
  max(path.buildYear, new Date().getFullYear(), { message: 'Некорректный год постройки' });

  required(path.wallMaterial, { message: 'Выберите материал стен' });

  required(path.marketValue, { message: 'Укажите рыночную стоимость' });
  min(path.marketValue, 100000, { message: 'Минимальная стоимость 100 000 ₽' });
};
