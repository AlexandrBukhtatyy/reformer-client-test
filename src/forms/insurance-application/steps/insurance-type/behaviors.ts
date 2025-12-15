import type { BehaviorSchemaFn } from '@reformer/core';
import { computeFrom } from '@reformer/core/behaviors';
import type { InsuranceTypeStep } from './type';

export const insuranceTypeBehaviors: BehaviorSchemaFn<InsuranceTypeStep> = (path) => {
  // Вычисление даты окончания = startDate + insurancePeriod месяцев
  computeFrom(
    [path.startDate, path.insurancePeriod],
    path.endDate,
    ({ startDate, insurancePeriod }) => {
      if (startDate && insurancePeriod) {
        const start = new Date(startDate);
        const end = new Date(start);
        end.setMonth(end.getMonth() + Number(insurancePeriod));
        return end.toISOString().split('T')[0];
      }
      return '';
    }
  );
};
