import type { ValidationSchemaFn } from '@reformer/core';
import { required, validateItems, applyWhen } from '@reformer/core/validators';
import type { HistoryStep } from './type';
import { claimValidation } from '../../sub-forms/claim/validators';

export const historyValidation: ValidationSchemaFn<HistoryStep> = (path) => {
  // Валидация предыдущего полиса
  applyWhen(
    path.hasPreviousInsurance,
    (has) => has === true,
    (p) => {
      required(p.previousInsurer, { message: 'Укажите страховую компанию' });
      required(p.previousPolicyNumber, { message: 'Укажите номер полиса' });
    }
  );

  // Валидация страховых случаев
  applyWhen(
    path.hasClaimsHistory,
    (has) => has === true,
    (p) => {
      validateItems(p.claims, claimValidation);
    }
  );
};
