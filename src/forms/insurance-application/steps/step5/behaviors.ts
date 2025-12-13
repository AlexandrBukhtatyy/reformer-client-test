import { enableWhen, watchField } from '@reformer/core/behaviors';
import type { BehaviorSchemaFn, FieldPath } from '@reformer/core';
import type { Step5Form } from './type';

export const step5Behavior: BehaviorSchemaFn<Step5Form> = (path: FieldPath<Step5Form>) => {
  // Enable previous insurance fields when hasPreviousInsurance is true
  enableWhen(path.previousInsurer, (form) => form.hasPreviousInsurance === true, { resetOnDisable: true });
  enableWhen(path.previousPolicyNumber, (form) => form.hasPreviousInsurance === true, { resetOnDisable: true });
  enableWhen(path.previousPolicyEndDate, (form) => form.hasPreviousInsurance === true, { resetOnDisable: true });

  // Enable claims fields when hadClaims is true
  if (path.claims) {
    enableWhen(path.claims, (form) => form.hadClaims === true, { resetOnDisable: true });
  }

  // Watch for changes in promo code to validate it
  watchField(
    path.promoCode,
    (code) => {
      if (code && code.length >= 3) {
        // In a real implementation, this would call an API to validate the promo code
        // For now, we'll just simulate validation
        setTimeout(() => {
          // This would be handled via API validation in real implementation
          console.log(`Validating promo code: ${code}`);
        }, 500);
      }
    },
    { immediate: false, debounce: 500 }
  );

  // Watch referral source to show agent code field when agent is selected
  enableWhen(path.agentCode, (form) => form.referralSource === 'agent', { resetOnDisable: true });
};