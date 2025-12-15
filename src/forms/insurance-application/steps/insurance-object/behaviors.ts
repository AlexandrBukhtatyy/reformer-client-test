import type { BehaviorSchemaFn } from '@reformer/core';
import type { InsuranceObjectStep } from './type';
import { lifeHealthBehaviors } from '../../sub-forms/life-health/behaviors';
import { travelBehaviors } from '../../sub-forms/travel/behaviors';

export const insuranceObjectBehaviors: BehaviorSchemaFn<InsuranceObjectStep> = (path) => {
  // Применяем behaviors для подформ
  lifeHealthBehaviors(path.lifeHealth);
  travelBehaviors(path.travel);
};
