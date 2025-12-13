// Validators index - exports all step validators and combined validation
import type { ValidationSchemaFn } from '@reformer/core';
import type { InsuranceApplicationForm } from '../type';

import { step1Validation } from './step1';
import { step2Validation } from './step2';
import { step3Validation } from './step3';
import { step4Validation } from './step4';
import { step5Validation } from './step5';
import { step6Validation } from './step6';

// Export individual step validators
export { step1Validation } from './step1';
export { step2Validation } from './step2';
export { step3Validation } from './step3';
export { step4Validation } from './step4';
export { step5Validation } from './step5';
export { step6Validation } from './step6';

// Step validations map for FormNavigation
export const STEP_VALIDATIONS: Record<number, ValidationSchemaFn<InsuranceApplicationForm>> = {
  1: step1Validation,
  2: step2Validation,
  3: step3Validation,
  4: step4Validation,
  5: step5Validation,
  6: step6Validation,
};

// Full validation combining all steps
export const fullValidation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  step1Validation(path);
  step2Validation(path);
  step3Validation(path);
  step4Validation(path);
  step5Validation(path);
  step6Validation(path);
};
