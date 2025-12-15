import type { BehaviorSchemaFn } from '@reformer/core';
import { computeFrom } from '@reformer/core/behaviors';
import type { LifeHealthData } from './type';

export const lifeHealthBehaviors: BehaviorSchemaFn<LifeHealthData> = (path) => {
  // Вычисление ИМТ: weight / (height/100)^2
  computeFrom(
    [path.height, path.weight],
    path.bmi,
    ({ height, weight }) => {
      if (height && weight && height > 0) {
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        return Math.round(bmi * 10) / 10;
      }
      return undefined;
    }
  );
};
