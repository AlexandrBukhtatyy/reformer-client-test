import { watchField } from '@reformer/core/behaviors';
import type { BehaviorSchemaFn, FieldPath } from '@reformer/core';
import type { Step6Form } from './type';

export const step6Behavior: BehaviorSchemaFn<Step6Form> = (path: FieldPath<Step6Form>) => {
  // Calculate total premium when base premium changes
  watchField(
    path.basePremium,
    (_, ctx) => {
      const basePremium = ctx.form.basePremium.value.value;
      const ageCoeff = ctx.form.ageCoefficient.value.value || 1;
      const expCoeff = ctx.form.experienceCoefficient.value.value || 1;
      const regionCoeff = ctx.form.regionCoefficient.value.value || 1;
      const claimsCoeff = ctx.form.claimsCoefficient.value.value || 1;
      const deductibleDisc = ctx.form.deductibleDiscount.value.value || 0;
      const promoDisc = ctx.form.promoDiscount.value.value || 0;
      const multiDisc = ctx.form.multiPolicyDiscount.value.value || 0;

      if (basePremium !== undefined) {
        let total = basePremium * ageCoeff * expCoeff * regionCoeff * claimsCoeff;
        const totalDiscounts = deductibleDisc + promoDisc + multiDisc;
        total = total * (1 - totalDiscounts / 100);
        
        ctx.form.totalPremium.setValue(Math.round(total));
      }
    },
    { immediate: false, debounce: 500 }
  );

  // Recalculate total premium when age coefficient changes
  watchField(
    path.ageCoefficient,
    (_, ctx) => {
      const basePremium = ctx.form.basePremium.value.value;
      const ageCoeff = ctx.form.ageCoefficient.value.value || 1;
      const expCoeff = ctx.form.experienceCoefficient.value.value || 1;
      const regionCoeff = ctx.form.regionCoefficient.value.value || 1;
      const claimsCoeff = ctx.form.claimsCoefficient.value.value || 1;
      const deductibleDisc = ctx.form.deductibleDiscount.value.value || 0;
      const promoDisc = ctx.form.promoDiscount.value.value || 0;
      const multiDisc = ctx.form.multiPolicyDiscount.value.value || 0;

      if (basePremium !== undefined) {
        let total = basePremium * ageCoeff * expCoeff * regionCoeff * claimsCoeff;
        const totalDiscounts = deductibleDisc + promoDisc + multiDisc;
        total = total * (1 - totalDiscounts / 100);
        
        ctx.form.totalPremium.setValue(Math.round(total));
      }
    },
    { immediate: false, debounce: 500 }
  );

  // Calculate installment amount when total premium changes
  watchField(
    path.totalPremium,
    (totalPremium) => {
      if (totalPremium) {
        // Calculate installment amount if needed
        // For now, we'll just update the installment amount if total premium changes
      }
    },
    { immediate: false, debounce: 300 }
  );

  // Generate policy number when accuracy is confirmed
  watchField(
    path.confirmAccuracy,
    (confirmed, ctx) => {
      if (confirmed && !ctx.form.policyNumber.value.value) {
        const policyNumber = `POL-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        ctx.form.policyNumber.setValue(policyNumber);
      }
    },
    { immediate: false }
  );

  // Set policy end date based on start date (1 year by default)
  watchField(
    path.policyStartDate,
    (startDate, ctx) => {
      if (startDate && !ctx.form.policyEndDate.value.value) {
        try {
          const start = new Date(startDate);
          const end = new Date(start);
          end.setFullYear(end.getFullYear() + 1); // 1 year policy by default
          const endDateStr = end.toISOString().split('T')[0];
          ctx.form.policyEndDate.setValue(endDateStr);
        } catch (error) {
          console.error('Error setting policy end date:', error);
        }
      }
    },
    { immediate: false, debounce: 0 }
  );

  // Generate policy number when form is submitted (simulated)
  watchField(
    path.confirmAccuracy,
    (confirmed, ctx) => {
      if (confirmed && !ctx.form.policyNumber.value.value) {
        const policyNumber = `POL-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        ctx.form.policyNumber.setValue(policyNumber);
      }
    },
    { immediate: false }
  );

  // Set policy start/end dates based on form dates
  watchField(
    path.policyStartDate,
    (startDate, ctx) => {
      if (startDate && !ctx.form.policyEndDate.value.value) {
        try {
          const start = new Date(startDate);
          const end = new Date(start);
          end.setFullYear(end.getFullYear() + 1); // 1 year policy by default
          const endDateStr = end.toISOString().split('T')[0];
          ctx.form.policyEndDate.setValue(endDateStr);
        } catch (error) {
          console.error('Error setting policy end date:', error);
        }
      }
    },
    { immediate: false, debounce: 0 }
  );
};