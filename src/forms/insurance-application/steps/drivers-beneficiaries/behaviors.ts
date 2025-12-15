import type { BehaviorSchemaFn } from '@reformer/core';
import type { DriversBeneficiariesStep } from './type';

// Behaviors для водителей и выгодоприобретателей
// Вычисление minDriverAge, minDriverExperience и totalBeneficiaryShare
// происходит на уровне главной формы через watchField
export const driversBeneficiariesBehaviors: BehaviorSchemaFn<DriversBeneficiariesStep> = () => {
  // Behaviors для элементов массивов применяются отдельно
};
