import { required, min, max, minLength, applyWhen, validate } from '@reformer/core/validators';
import type { ValidationSchemaFn, FieldPath } from '@reformer/core';
import type { Step6Form } from './type';

export const step6Validation: ValidationSchemaFn<Step6Form> = (path: FieldPath<Step6Form>) => {
  // Validate payment method selections
  required(path.paymentMethod, { message: 'Способ оплаты обязателен' });

  // Validate installments count when payment method is installments
  applyWhen(
    path.paymentMethod,
    (method) => method === 'installments',
    (p) => {
      required(p.installmentsCount, { message: 'Количество платежей обязательно при рассрочке' });
      min(p.installmentsCount, 2, { message: 'Минимум 2 платежа' });
      max(p.installmentsCount, 12, { message: 'Максимум 12 платежей' });
    }
  );

  // Required agreements - using custom validation for boolean fields
  validate(
    path.agreeToTerms,
    (value: boolean) => {
      if (!value) {
        return { code: 'required', message: 'Необходимо согласие с условиями страхования' };
      }
      return null;
    }
  );
  
  validate(
    path.agreeToProcessing,
    (value: boolean) => {
      if (!value) {
        return { code: 'required', message: 'Необходимо согласие на обработку персональных данных' };
      }
      return null;
    }
  );
  
  validate(
    path.confirmInformation,
    (value: boolean) => {
      if (!value) {
        return { code: 'required', message: 'Необходимо подтверждение достоверности информации' };
      }
      return null;
    }
  );

  // Validate electronic signature
  required(path.electronicSignature, { message: 'Электронная подпись обязательна' });
  minLength(path.electronicSignature, 3, { message: 'ФИО должно содержать минимум 3 символа' });
};