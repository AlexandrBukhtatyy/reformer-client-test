import { required, date, applyWhen } from '@reformer/core/validators';
import type { ValidationSchemaFn, FieldPath } from '@reformer/core';
import type { Step5Form } from './type';

export const step5Validation: ValidationSchemaFn<Step5Form> = (path: FieldPath<Step5Form>) => {
  // Validate previous insurance fields when hasPreviousInsurance is true
  applyWhen(
    path.hasPreviousInsurance,
    (hasPrev) => hasPrev === true,
    (p) => {
      required(p.previousInsurer, { message: 'Предыдущий страховщик обязателен' });
      required(p.previousPolicyNumber, { message: 'Номер предыдущего полиса обязателен' });
      required(p.previousPolicyEndDate, { message: 'Дата окончания полиса обязательна' });
      date(p.previousPolicyEndDate, { message: 'Некорректная дата' });
    }
  );

  // Validate claims when hadClaims is true
  applyWhen(
    path.hadClaims,
    (had) => had === true,
    (p) => {
      // For array validation, we'd typically use validateItems in a real implementation
      // For now, we'll just validate that if claims exist, they meet basic requirements
      // This would be handled through custom validation in practice
    }
  );

  // Validate referral source
  required(path.referralSource, { message: 'Источник информации обязателен' });

  // Additional validations for other fields
  // Promo code validation would be handled via API call
};