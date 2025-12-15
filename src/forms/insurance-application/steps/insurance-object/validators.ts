import type { ValidationSchemaFn, FieldPath } from '@reformer/core';
import { validateItems } from '@reformer/core/validators';
import type { InsuranceObjectStep } from './type';
import type { InsuranceApplicationForm } from '../../type';
import { vehicleValidation } from '../../sub-forms/vehicle/validators';
import { propertyValidation } from '../../sub-forms/property/validators';
import { lifeHealthValidation } from '../../sub-forms/life-health/validators';
import { travelValidation } from '../../sub-forms/travel/validators';
import { travelerValidation } from '../../sub-forms/traveler/validators';

// Валидация для шага объекта страхования
// Условная валидация выполняется на уровне главной формы
export const insuranceObjectValidation: ValidationSchemaFn<InsuranceObjectStep> = (_path) => {
  // Валидация будет применяться условно в главном файле валидации
};

// Функция для применения валидации по типу страхования
export const applyInsuranceObjectValidation = (
  insuranceType: string,
  path: FieldPath<InsuranceApplicationForm>
) => {
  if (insuranceType === 'casco' || insuranceType === 'osago') {
    vehicleValidation(path.vehicle as unknown as FieldPath<InsuranceObjectStep['vehicle']>);
  }

  if (insuranceType === 'property') {
    propertyValidation(path.property as unknown as FieldPath<InsuranceObjectStep['property']>);
  }

  if (insuranceType === 'life') {
    lifeHealthValidation(path.lifeHealth as unknown as FieldPath<InsuranceObjectStep['lifeHealth']>);
  }

  if (insuranceType === 'travel') {
    travelValidation(path.travel as unknown as FieldPath<InsuranceObjectStep['travel']>);
    validateItems(path.travelers, travelerValidation);
  }
};
