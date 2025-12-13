import { enableWhen, watchField } from '@reformer/core/behaviors';
import type { BehaviorSchemaFn, FieldPath } from '@reformer/core';
import type { Step1Form } from './type';

export const step1Behavior: BehaviorSchemaFn<Step1Form> = (path: FieldPath<Step1Form>) => {
  // Show installments field only when paymentType is 'installments'
  enableWhen(path.installments, (form) => form.paymentType === 'installments', {
    resetOnDisable: true
  });

  // Compute endDate from startDate when insurancePeriod changes
  watchField(
    path.insurancePeriod,
    (insurancePeriod, ctx) => {
      const startDate = ctx.form.startDate.value.value;

      if (startDate && insurancePeriod) {
        try {
          const start = new Date(startDate);
          const end = new Date(start);
          end.setMonth(end.getMonth() + insurancePeriod);
          
          // Format as YYYY-MM-DD
          const endDateStr = end.toISOString().split('T')[0];
          ctx.form.endDate.setValue(endDateStr);
        } catch (error) {
          console.error('Error computing end date:', error);
        }
      }
    },
    { immediate: false, debounce: 300 }
  );

  // Also compute endDate when startDate changes
  watchField(
    path.startDate,
    (startDate, ctx) => {
      const insurancePeriod = ctx.form.insurancePeriod.value.value;

      if (startDate && insurancePeriod) {
        try {
          const start = new Date(startDate);
          const end = new Date(start);
          end.setMonth(end.getMonth() + insurancePeriod);
          
          // Format as YYYY-MM-DD
          const endDateStr = end.toISOString().split('T')[0];
          ctx.form.endDate.setValue(endDateStr);
        } catch (error) {
          console.error('Error computing end date:', error);
        }
      }
    },
    { immediate: false, debounce: 300 }
  );
};