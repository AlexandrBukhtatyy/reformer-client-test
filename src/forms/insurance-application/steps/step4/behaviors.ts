import { watchField } from '@reformer/core/behaviors';
import type { BehaviorSchemaFn, FieldPath } from '@reformer/core';
import type { Step4Form } from './type';

export const step4Behavior: BehaviorSchemaFn<Step4Form> = (path: FieldPath<Step4Form>) => {
  // Enable/disable driver fields based on unlimitedDrivers
  watchField(
    path.unlimitedDrivers,
    (unlimited, ctx) => {
      if (unlimited) {
        // Disable and clear drivers array
        if (ctx.form.drivers && !ctx.form.drivers.disabled.value) {
          ctx.form.drivers.disable();
        }
        if (ctx.form.drivers) {
          ctx.form.drivers.setValue([]);
        }
      } else {
        // Enable drivers array
        if (ctx.form.drivers && ctx.form.drivers.disabled.value) {
          ctx.form.drivers.enable();
        }
      }
    },
    { immediate: false, debounce: 0 }
  );

  // Compute total beneficiary share when beneficiaries change
  if (path.beneficiaries) {
    watchField(
      path.beneficiaries,
      (_, ctx) => {
        if (ctx.form.beneficiaries) {
          const beneficiaries = ctx.form.beneficiaries.getValue();
          if (Array.isArray(beneficiaries)) {
            const total = beneficiaries.reduce((sum, ben) => {
              return sum + (ben.share || 0);
            }, 0);
            ctx.form.totalBeneficiaryShare.setValue(total);
          } else {
            ctx.form.totalBeneficiaryShare.setValue(0);
          }
        } else {
          ctx.form.totalBeneficiaryShare.setValue(0);
        }
      },
      { immediate: false, debounce: 300 }
    );
  }
};