// Step 5: History and Additional Information - Validators
import type { ValidationSchemaFn } from '@reformer/core';
import { required, min, applyWhen, validateItems, notEmpty } from '@reformer/core/validators';
import type { InsuranceApplicationForm } from '../type';

export const step5Validation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  // Previous Insurance fields - conditional
  applyWhen(
    path.hasPreviousInsurance,
    (has) => has === true,
    (p) => {
      required(p.previousInsurer, { message: 'Укажите предыдущего страховщика' });
      required(p.previousPolicyNumber, { message: 'Укажите номер предыдущего полиса' });
      required(p.previousPolicyEndDate, { message: 'Укажите дату окончания предыдущего полиса' });
    }
  );

  // Claims array - conditional
  applyWhen(
    path.hadClaims,
    (had) => had === true,
    (p) => {
      notEmpty(p.claims, { message: 'Добавьте информацию о страховых случаях' });

      validateItems(p.claims, (itemPath) => {
        required(itemPath.date, { message: 'Укажите дату события' });
        required(itemPath.type, { message: 'Выберите тип события' });
        required(itemPath.description, { message: 'Опишите событие' });
        required(itemPath.amount, { message: 'Укажите сумму выплаты' });
        min(itemPath.amount, 0, { message: 'Сумма выплаты не может быть отрицательной' });
      });
    }
  );

  // Promo code, referral source, agent code, notes are all optional
  // No validation needed
};
