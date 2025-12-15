import type { BehaviorSchemaFn } from '@reformer/core';
import type { InsuranceObjectStep } from './type';
import { vehicleBehaviors } from '../../sub-forms/vehicle/behaviors';
import { lifeHealthBehaviors } from '../../sub-forms/life-health/behaviors';
import { travelBehaviors } from '../../sub-forms/travel/behaviors';

export const insuranceObjectBehaviors: BehaviorSchemaFn<InsuranceObjectStep> = (path) => {
  // Применяем behaviors для подформ
  vehicleBehaviors(path.vehicle);
  lifeHealthBehaviors(path.lifeHealth);
  travelBehaviors(path.travel);
};
