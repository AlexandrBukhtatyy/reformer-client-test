// Step 6: Calculation and Confirmation - Validation Schema
import type { ValidationSchemaFn, FieldPath } from '@reformer/core';
import { required, validate, minLength } from '@reformer/core/validators';
import type { InsuranceApplicationForm } from '../types';

export const step6Validation: ValidationSchemaFn<InsuranceApplicationForm> = (
  path: FieldPath<InsuranceApplicationForm>
) => {
  // Agreement checkboxes - all required (must be true)
  required(path.agreePersonalData, { message: 'Необходимо согласие на обработку персональных данных' });
  validate(path.agreePersonalData, (value) => {
    if (value !== true) {
      return { code: 'required', message: 'Необходимо согласие на обработку персональных данных' };
    }
    return null;
  });

  required(path.agreeTerms, { message: 'Необходимо согласие с правилами страхования' });
  validate(path.agreeTerms, (value) => {
    if (value !== true) {
      return { code: 'required', message: 'Необходимо согласие с правилами страхования' };
    }
    return null;
  });

  required(path.agreeElectronicPolicy, { message: 'Необходимо согласие на электронный полис' });
  validate(path.agreeElectronicPolicy, (value) => {
    if (value !== true) {
      return { code: 'required', message: 'Необходимо согласие на электронный полис' };
    }
    return null;
  });

  required(path.confirmAccuracy, { message: 'Подтвердите достоверность данных' });
  validate(path.confirmAccuracy, (value) => {
    if (value !== true) {
      return { code: 'required', message: 'Необходимо подтвердить достоверность данных' };
    }
    return null;
  });

  // SMS code - required, 6 digits
  required(path.electronicSignature, { message: 'Введите SMS-код подтверждения' });
  minLength(path.electronicSignature, 6, { message: 'SMS-код должен содержать 6 цифр' });
  validate(path.electronicSignature, (value) => {
    if (!value) return null;
    if (!/^\d{6}$/.test(value)) {
      return { code: 'format', message: 'SMS-код должен содержать только 6 цифр' };
    }
    return null;
  });
};
