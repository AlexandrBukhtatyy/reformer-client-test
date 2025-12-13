// Step 6: Calculation and Confirmation - Validators
import type { ValidationSchemaFn } from '@reformer/core';
import { required, minLength, validate } from '@reformer/core/validators';
import type { InsuranceApplicationForm } from '../type';

export const step6Validation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  // Required checkboxes must be true
  validate(path.agreePersonalData, (value) => {
    if (value !== true) {
      return { code: 'required_agreement', message: 'Необходимо согласие на обработку персональных данных' };
    }
    return null;
  });

  validate(path.agreeTerms, (value) => {
    if (value !== true) {
      return { code: 'required_agreement', message: 'Необходимо согласие с правилами страхования' };
    }
    return null;
  });

  validate(path.agreeElectronicPolicy, (value) => {
    if (value !== true) {
      return { code: 'required_agreement', message: 'Необходимо согласие на электронный полис' };
    }
    return null;
  });

  validate(path.confirmAccuracy, (value) => {
    if (value !== true) {
      return { code: 'required_agreement', message: 'Необходимо подтвердить достоверность данных' };
    }
    return null;
  });

  // agreeMarketing is optional

  // Electronic signature (SMS code) - required, 6 digits
  required(path.electronicSignature, { message: 'Введите SMS-код подтверждения' });
  minLength(path.electronicSignature, 6, { message: 'SMS-код должен содержать 6 цифр' });
};
