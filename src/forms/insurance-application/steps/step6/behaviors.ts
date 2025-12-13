import { enableWhen, watchField } from '@reformer/core/behaviors';
import type { BehaviorSchemaFn, FieldPath } from '@reformer/core';
import type { Step6Form } from './type';

export const step6Behavior: BehaviorSchemaFn<Step6Form> = (path: FieldPath<Step6Form>) => {
  // Enable installments count field when payment method is 'installments'
  enableWhen(path.installmentsCount, (form) => form.paymentMethod === 'installments', { resetOnDisable: true });

  // Compute installment amount when calculatedPremium changes
  watchField(
    path.calculatedPremium,
    (_, ctx) => {
      const premium = ctx.form.calculatedPremium.value.value;
      const count = ctx.form.installmentsCount.value.value;

      if (premium && count && count > 0) {
        // Add interest for installment payments (5%)
        const totalWithInterest = premium * 1.05;
        const installmentAmount = totalWithInterest / count;
        ctx.form.installmentAmount.setValue(Math.round(installmentAmount));
      } else if (premium && !count) {
        ctx.form.installmentAmount.setValue(undefined);
      }
    },
    { immediate: false, debounce: 300 }
  );

  // Also compute installment amount when installmentsCount changes
  watchField(
    path.installmentsCount,
    (_, ctx) => {
      const premium = ctx.form.calculatedPremium.value.value;
      const count = ctx.form.installmentsCount.value.value;

      if (premium && count && count > 0) {
        // Add interest for installment payments (5%)
        const totalWithInterest = premium * 1.05;
        const installmentAmount = totalWithInterest / count;
        ctx.form.installmentAmount.setValue(Math.round(installmentAmount));
      } else if (!count) {
        ctx.form.installmentAmount.setValue(undefined);
      }
    },
    { immediate: false, debounce: 300 }
  );

  // Watch for changes in risk coefficients and discounts to recalculate premium
  watchField(
    path.riskCoefficients,
    (_, ctx) => {
      const basePremium = ctx.form.basePremium.value.value;
      const coeffs = ctx.form.riskCoefficients.value.value;

      if (basePremium && coeffs) {
        // Calculate total coefficient
        const totalCoeff = 
          (coeffs.age || 1) * 
          (coeffs.experience || 1) * 
          (coeffs.region || 1) * 
          (coeffs.vehicleAge || 1) * 
          (coeffs.vehiclePower || 1) * 
          (coeffs.propertyValue || 1);

        // Apply discounts
        const discounts = ctx.form.discounts.value.value;
        let totalDiscount = 0;
        if (discounts) {
          totalDiscount = 
            (discounts.loyalty || 0) +
            (discounts.safeDriver || 0) +
            (discounts.securitySystem || 0) +
            (discounts.franchise || 0) +
            (discounts.promoCode || 0);
        }

        const calculated = basePremium * totalCoeff * (1 - totalDiscount / 100);
        ctx.form.calculatedPremium.setValue(Math.round(calculated));
      }
    },
    { immediate: false, debounce: 500 }
  );

  // Watch discount changes to recalculate premium
  watchField(
    path.discounts,
    (_, ctx) => {
      const basePremium = ctx.form.basePremium.value.value;
      const coeffs = ctx.form.riskCoefficients.value.value;

      if (basePremium && coeffs) {
        // Calculate total coefficient
        const totalCoeff = 
          (coeffs.age || 1) * 
          (coeffs.experience || 1) * 
          (coeffs.region || 1) * 
          (coeffs.vehicleAge || 1) * 
          (coeffs.vehiclePower || 1) * 
          (coeffs.propertyValue || 1);

        // Apply discounts
        const discounts = ctx.form.discounts.value.value;
        let totalDiscount = 0;
        if (discounts) {
          totalDiscount = 
            (discounts.loyalty || 0) +
            (discounts.safeDriver || 0) +
            (discounts.securitySystem || 0) +
            (discounts.franchise || 0) +
            (discounts.promoCode || 0);
        }

        const calculated = basePremium * totalCoeff * (1 - totalDiscount / 100);
        ctx.form.calculatedPremium.setValue(Math.round(calculated));
      }
    },
    { immediate: false, debounce: 500 }
  );

  // Auto-generate policy number when form is submitted (simulated)
  // In real implementation, this would happen on form submission
  watchField(
    path.confirmInformation,
    (confirmed, ctx) => {
      if (confirmed && !ctx.form.policyNumber.value.value) {
        // Generate policy number (simulated)
        const policyNumber = `POL-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        ctx.form.policyNumber.setValue(policyNumber);
      }
    },
    { immediate: false }
  );

  // Compute policy end date from start date and insurance period
  // This would typically come from step 1 data
  watchField(
    path.policyStartDate,
    (startDate, ctx) => {
      if (startDate) {
        try {
          const start = new Date(startDate);
          const end = new Date(start);
          end.setFullYear(end.getFullYear() + 1); // 1-year policy by default
          
          const endDateStr = end.toISOString().split('T')[0];
          ctx.form.policyEndDate.setValue(endDateStr);
        } catch (error) {
          console.error('Error computing policy end date:', error);
        }
      }
    },
    { immediate: false, debounce: 0 }
  );
};