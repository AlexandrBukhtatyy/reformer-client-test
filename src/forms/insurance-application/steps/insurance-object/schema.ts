import type { FormSchema } from '@reformer/core';
import type { InsuranceObjectStep } from './type';
import { vehicleSchema } from '../../sub-forms/vehicle/schema';
import { propertySchema } from '../../sub-forms/property/schema';
import { lifeHealthSchema } from '../../sub-forms/life-health/schema';
import { travelSchema } from '../../sub-forms/travel/schema';
import { travelerSchema } from '../../sub-forms/traveler/schema';

export const insuranceObjectSchema: FormSchema<InsuranceObjectStep> = {
  vehicle: vehicleSchema,
  property: propertySchema,
  lifeHealth: lifeHealthSchema,
  travel: travelSchema,
  travelers: [travelerSchema],
};
