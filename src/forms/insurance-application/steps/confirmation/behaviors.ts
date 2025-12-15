import type { BehaviorSchemaFn } from '@reformer/core';
import type { ConfirmationStep } from './type';

// Расчет премии выполняется на уровне главной формы
// т.к. требуются данные из разных шагов
export const confirmationBehaviors: BehaviorSchemaFn<ConfirmationStep> = () => {
  // Behaviors для расчета премии применяются в главном файле behaviors.ts
};
