import type { ValidationSchemaFn } from '@reformer/core';
import type { Step3Form } from './type';

export const step3Validation: ValidationSchemaFn<Step3Form> = () => {
  // For step 3, we'll validate fields based on which insurance type is selected
  // The actual validation will be handled conditionally based on the insurance type in the main form
  // For now, we'll provide basic validation for all possible fields
  
  // Note: In a real implementation, this validation would be conditional based on insurance type
  // from the main form context, but for now we'll define the validation rules
  
  // The validation will be applied conditionally in the main form validation
  // based on the selected insurance type in step 1
};