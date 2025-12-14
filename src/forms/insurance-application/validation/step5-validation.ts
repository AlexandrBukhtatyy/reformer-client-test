// Step 5: History and Additional Information - Validation Schema
import type { ValidationSchemaFn, FieldPath } from '@reformer/core';
import { required, min, applyWhen, validateTree } from '@reformer/core/validators';
import type { InsuranceApplicationForm } from '../types';

export const step5Validation: ValidationSchemaFn<InsuranceApplicationForm> = (
  path: FieldPath<InsuranceApplicationForm>
) => {
  // Previous insurance fields - required when hasPreviousInsurance is true
  applyWhen(
    path.hasPreviousInsurance,
    (hasPrevious) => hasPrevious === true,
    (p) => {
      required(p.previousInsurer, { message: 'Укажите предыдущего страховщика' });
      required(p.previousPolicyNumber, { message: 'Укажите номер предыдущего полиса' });
      required(p.previousPolicyEndDate, { message: 'Укажите дату окончания предыдущего полиса' });
    }
  );

  // Claims validation - at least one claim required when hadClaims is true
  validateTree<InsuranceApplicationForm>((ctx) => {
    const hadClaims = ctx.form.hadClaims.value.value;
    if (!hadClaims) return null;
    const claims = ctx.form.claims.value.value;
    if (claims.length === 0) {
      return { code: 'required', message: 'Добавьте информацию о страховых случаях' };
    }
    return null;
  }, { targetField: 'claims' });
};

// Validation for individual claim in array
export const claimItemValidation: ValidationSchemaFn<InsuranceApplicationForm['claims'][number]> = (
  path: FieldPath<InsuranceApplicationForm['claims'][number]>
) => {
  required(path.date, { message: 'Укажите дату события' });
  required(path.type, { message: 'Выберите тип события' });
  required(path.description, { message: 'Опишите событие' });

  required(path.amount, { message: 'Укажите сумму выплаты' });
  min(path.amount, 0, { message: 'Сумма не может быть отрицательной' });
};
