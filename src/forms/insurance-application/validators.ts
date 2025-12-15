import type { ValidationSchemaFn } from '@reformer/core';
import type { InsuranceApplicationForm } from './type';
import { insuranceTypeValidation } from './steps/insurance-type/validators';
import { insuredPartyValidation } from './steps/insured-party/validators';
import { driversBeneficiariesValidation } from './steps/drivers-beneficiaries/validators';
import { historyValidation } from './steps/history/validators';
import { confirmationValidation } from './steps/confirmation/validators';
import { vehicleValidation } from './sub-forms/vehicle/validators';
import { propertyValidation } from './sub-forms/property/validators';
import { lifeHealthValidation } from './sub-forms/life-health/validators';
import { travelValidation } from './sub-forms/travel/validators';
import { validateItems, applyWhen } from '@reformer/core/validators';
import { travelerValidation } from './sub-forms/traveler/validators';

// Валидация для каждого шага
export const step1Validation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  insuranceTypeValidation(path);
};

export const step2Validation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  insuredPartyValidation(path);
};

export const step3Validation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  // Условная валидация по типу страхования
  applyWhen(
    path.insuranceType,
    (type) => type === 'casco' || type === 'osago',
    (p) => {
      vehicleValidation(p.vehicle);
    }
  );

  applyWhen(
    path.insuranceType,
    (type) => type === 'property',
    (p) => {
      propertyValidation(p.property);
    }
  );

  applyWhen(
    path.insuranceType,
    (type) => type === 'life',
    (p) => {
      lifeHealthValidation(p.lifeHealth);
    }
  );

  applyWhen(
    path.insuranceType,
    (type) => type === 'travel',
    (p) => {
      travelValidation(p.travel);
      validateItems(p.travelers, travelerValidation);
    }
  );
};

export const step4Validation: ValidationSchemaFn<InsuranceApplicationForm> = () => {
  // Step 4 validation is handled at the field level
  // validateForm() checks ALL fields including array items which causes issues
  // Custom validation for drivers/beneficiaries is intentionally skipped
  // because validateItems() doesn't work with ArrayNode
};

export const step5Validation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  historyValidation(path);
};

export const step6Validation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  confirmationValidation(path);
};

// Map для FormNavigation config
export const STEP_VALIDATIONS: Record<number, ValidationSchemaFn<InsuranceApplicationForm>> = {
  1: step1Validation,
  2: step2Validation,
  3: step3Validation,
  4: step4Validation,
  5: step5Validation,
  6: step6Validation,
};

// Полная валидация для submit
export const fullValidation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  step1Validation(path);
  step2Validation(path);
  step3Validation(path);
  step4Validation(path);
  step5Validation(path);
  step6Validation(path);
};
