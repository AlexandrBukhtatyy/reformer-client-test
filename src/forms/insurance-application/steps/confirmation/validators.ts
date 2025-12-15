import type { ValidationSchemaFn } from '@reformer/core';
import { required, minLength } from '@reformer/core/validators';
import type { ConfirmationStep } from './type';

export const confirmationValidation: ValidationSchemaFn<ConfirmationStep> = (path) => {
  required(path.agreePersonalData, { message: 'Необходимо согласие на обработку персональных данных' });
  required(path.agreeInsuranceTerms, { message: 'Необходимо согласие с условиями страхования' });
  required(path.agreeElectronicPolicy, { message: 'Необходимо согласие на электронный полис' });
  required(path.confirmDataAccuracy, { message: 'Необходимо подтвердить достоверность данных' });

  required(path.smsVerificationCode, { message: 'Введите код подтверждения' });
  minLength(path.smsVerificationCode, 6, { message: 'Код должен содержать 6 цифр' });
};
