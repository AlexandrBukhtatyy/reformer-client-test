// Insurance Application Form - Behavior Schemas
import type { BehaviorSchemaFn, FieldPath } from '@reformer/core';
import { computeFrom, enableWhen, watchField } from '@reformer/core/behaviors';
import type { InsuranceApplicationForm } from './types';

// Helper functions for calculations
const calculateAge = (birthDate: string): number | undefined => {
  if (!birthDate) return undefined;
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age >= 0 ? age : undefined;
};

const addMonths = (date: string, months: number): string => {
  if (!date) return '';
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().split('T')[0];
};

const calculateDaysDiff = (startDate: string, endDate: string): number | undefined => {
  if (!startDate || !endDate) return undefined;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : undefined;
};

const calculateBMI = (height: number | undefined, weight: number | undefined): number | undefined => {
  if (!height || !weight || height <= 0) return undefined;
  const heightInMeters = height / 100;
  return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
};

const calculateBasePremium = (
  insuranceType: string,
  coverageAmount: number | undefined
): number | undefined => {
  if (!coverageAmount) return undefined;

  const rates: Record<string, number> = {
    casco: 0.05,
    osago: 0.03,
    property: 0.02,
    life: 0.01,
    travel: 0.04,
  };

  const rate = rates[insuranceType] || 0.03;
  return Math.round(coverageAmount * rate);
};

const calculateAgeCoefficient = (age: number | undefined): number => {
  if (age === undefined) return 1.0;
  if (age < 22) return 1.8;
  if (age < 25) return 1.5;
  if (age < 30) return 1.2;
  if (age < 50) return 1.0;
  if (age < 60) return 1.1;
  return 1.3;
};

export const formBehaviors: BehaviorSchemaFn<InsuranceApplicationForm> = (
  path: FieldPath<InsuranceApplicationForm>
) => {
  // ===== CONDITIONAL VISIBILITY (enableWhen) =====

  // Step 1: Installments field - visible only when payment type is 'installments'
  enableWhen(path.installments, (form) => form.paymentType === 'installments', {
    resetOnDisable: true,
  });

  // Step 2: Personal data - visible for individuals
  enableWhen(path.personalData, (form) => form.insuredType === 'individual', {
    resetOnDisable: true,
  });
  enableWhen(path.passportData, (form) => form.insuredType === 'individual', {
    resetOnDisable: true,
  });

  // Step 2: Company data - visible for companies
  enableWhen(path.companyData, (form) => form.insuredType === 'company', {
    resetOnDisable: true,
  });

  // Step 3: Vehicle fields - visible for CASCO and OSAGO
  enableWhen(
    path.vehicle,
    (form) => form.insuranceType === 'casco' || form.insuranceType === 'osago',
    { resetOnDisable: true }
  );

  // Step 3: Vehicle market value - visible only for CASCO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enableWhen(path.vehicle.marketValue as any, (form: InsuranceApplicationForm) => form.insuranceType === 'casco');

  // Step 3: Anti-theft brand - visible when hasAntiTheft is true
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enableWhen(path.vehicle.antiTheftBrand as any, (form: InsuranceApplicationForm) => form.vehicle?.hasAntiTheft === true, {
    resetOnDisable: true,
  });

  // Step 3: Property fields - visible for property insurance
  enableWhen(path.property, (form) => form.insuranceType === 'property', {
    resetOnDisable: true,
  });
  enableWhen(path.propertyCoverageOptions, (form) => form.insuranceType === 'property');

  // Step 3: Property floor - visible only for apartments
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enableWhen(
    path.property.floor as any,
    (form: InsuranceApplicationForm) => form.insuranceType === 'property' && form.property?.type === 'apartment',
    { resetOnDisable: true }
  );

  // Step 3: Health fields - visible for life insurance
  enableWhen(path.health, (form) => form.insuranceType === 'life', {
    resetOnDisable: true,
  });
  enableWhen(path.lifeCoverageOptions, (form) => form.insuranceType === 'life');

  // Step 3: Smoking years - visible when isSmoker is true
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enableWhen(path.health.smokingYears as any, (form: InsuranceApplicationForm) => form.health?.isSmoker === true, {
    resetOnDisable: true,
  });

  // Step 3: Chronic diseases description - visible when hasChronicDiseases is true
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enableWhen(path.health.chronicDiseases as any, (form: InsuranceApplicationForm) => form.health?.hasChronicDiseases === true, {
    resetOnDisable: true,
  });

  // Step 3: Surgeries description - visible when hadSurgeries is true
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enableWhen(path.health.surgeries as any, (form: InsuranceApplicationForm) => form.health?.hadSurgeries === true, {
    resetOnDisable: true,
  });

  // Step 3: Extreme sports - visible when practicesSports is true
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enableWhen(path.health.extremeSports as any, (form: InsuranceApplicationForm) => form.health?.practicesSports === true, {
    resetOnDisable: true,
  });

  // Step 3: Travel fields - visible for travel insurance
  enableWhen(path.travel, (form) => form.insuranceType === 'travel', {
    resetOnDisable: true,
  });
  enableWhen(path.travelers, (form) => form.insuranceType === 'travel');
  enableWhen(path.travelCoverageOptions, (form) => form.insuranceType === 'travel');

  // Step 4: Drivers - visible for CASCO and OSAGO when not unlimited
  enableWhen(
    path.drivers,
    (form) =>
      (form.insuranceType === 'casco' || form.insuranceType === 'osago') &&
      !form.unlimitedDrivers
  );

  // Step 4: Unlimited drivers checkbox - visible for CASCO and OSAGO
  enableWhen(
    path.unlimitedDrivers,
    (form) => form.insuranceType === 'casco' || form.insuranceType === 'osago'
  );

  // Step 4: Beneficiaries - visible for life insurance
  enableWhen(path.beneficiaries, (form) => form.insuranceType === 'life');

  // Step 5: Previous insurance fields - visible when hasPreviousInsurance is true
  enableWhen(path.previousInsurer, (form) => form.hasPreviousInsurance, {
    resetOnDisable: true,
  });
  enableWhen(path.previousPolicyNumber, (form) => form.hasPreviousInsurance, {
    resetOnDisable: true,
  });
  enableWhen(path.previousPolicyEndDate, (form) => form.hasPreviousInsurance, {
    resetOnDisable: true,
  });

  // Step 5: Claims array - visible when hadClaims is true
  enableWhen(path.claims, (form) => form.hadClaims);

  // ===== COMPUTED FIELDS =====

  // End date computed from startDate + insurancePeriod
  computeFrom(
    [path.startDate, path.insurancePeriod],
    path.endDate,
    (form) => {
      if (form.startDate && form.insurancePeriod) {
        return addMonths(form.startDate, form.insurancePeriod);
      }
      return '';
    }
  );

  // Full name computed from personalData (using watchField for cross-level)
  watchField(path.personalData.lastName, (_, ctx) => {
    const form = ctx.form;
    const lastName = form.personalData.lastName.value.value;
    const firstName = form.personalData.firstName.value.value;
    const middleName = form.personalData.middleName.value.value;
    const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
    ctx.setFieldValue('fullName', fullName);
  });

  watchField(path.personalData.firstName, (_, ctx) => {
    const form = ctx.form;
    const lastName = form.personalData.lastName.value.value;
    const firstName = form.personalData.firstName.value.value;
    const middleName = form.personalData.middleName.value.value;
    const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
    ctx.setFieldValue('fullName', fullName);
  });

  watchField(path.personalData.middleName, (_, ctx) => {
    const form = ctx.form;
    const lastName = form.personalData.lastName.value.value;
    const firstName = form.personalData.firstName.value.value;
    const middleName = form.personalData.middleName.value.value;
    const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
    ctx.setFieldValue('fullName', fullName);
  });

  // Age computed from birthDate
  watchField(path.personalData.birthDate, (value, ctx) => {
    const age = calculateAge(value);
    ctx.setFieldValue('age', age);
  });

  // BMI computed from height and weight
  watchField(path.health.height, (_, ctx) => {
    const height = ctx.form.health.height.value.value;
    const weight = ctx.form.health.weight.value.value;
    const bmi = calculateBMI(height, weight);
    ctx.setFieldValue('health.bmi', bmi);
  });

  watchField(path.health.weight, (_, ctx) => {
    const height = ctx.form.health.height.value.value;
    const weight = ctx.form.health.weight.value.value;
    const bmi = calculateBMI(height, weight);
    ctx.setFieldValue('health.bmi', bmi);
  });

  // Trip duration computed from travel dates
  watchField(path.travel.departureDate, (_, ctx) => {
    const departureDate = ctx.form.travel.departureDate.value.value;
    const returnDate = ctx.form.travel.returnDate.value.value;
    const duration = calculateDaysDiff(departureDate, returnDate);
    ctx.setFieldValue('travel.tripDuration', duration);
  });

  watchField(path.travel.returnDate, (_, ctx) => {
    const departureDate = ctx.form.travel.departureDate.value.value;
    const returnDate = ctx.form.travel.returnDate.value.value;
    const duration = calculateDaysDiff(departureDate, returnDate);
    ctx.setFieldValue('travel.tripDuration', duration);
  });

  // Base premium computed from insurance type and coverage amount
  computeFrom(
    [path.insuranceType, path.coverageAmount],
    path.basePremium,
    (form) => calculateBasePremium(form.insuranceType, form.coverageAmount)
  );

  // Age coefficient computed from age
  computeFrom(
    [path.age],
    path.ageCoefficient,
    (form) => calculateAgeCoefficient(form.age)
  );

  // Deductible discount computed
  computeFrom(
    [path.deductible, path.coverageAmount],
    path.deductibleDiscount,
    (form) => {
      if (form.coverageAmount && form.deductible) {
        const discount = Math.round((form.deductible / form.coverageAmount) * 50 * 100) / 100;
        return Math.min(discount, 15);
      }
      return 0;
    }
  );

  // Total premium computed
  computeFrom(
    [path.basePremium, path.ageCoefficient, path.experienceCoefficient, path.regionCoefficient, path.claimsCoefficient, path.deductibleDiscount, path.promoDiscount, path.multiPolicyDiscount],
    path.totalPremium,
    (form) => {
      if (!form.basePremium) {
        return undefined;
      }

      const ageCoeff = form.ageCoefficient || 1.0;
      const expCoeff = form.experienceCoefficient || 1.0;
      const regionCoeff = form.regionCoefficient || 1.0;
      const claimsCoeff = form.claimsCoefficient || 1.0;

      const deductibleDisc = (form.deductibleDiscount || 0) / 100;
      const promoDisc = (form.promoDiscount || 0) / 100;
      const multiPolicyDisc = (form.multiPolicyDiscount || 0) / 100;

      const totalDiscount = Math.min(deductibleDisc + promoDisc + multiPolicyDisc, 0.3);

      return Math.round(
        form.basePremium * ageCoeff * expCoeff * regionCoeff * claimsCoeff * (1 - totalDiscount)
      );
    }
  );

  // Installment amount computed
  computeFrom(
    [path.totalPremium, path.paymentType, path.installments],
    path.installmentAmount,
    (form) => {
      if (!form.totalPremium) {
        return undefined;
      }

      if (form.paymentType === 'installments' && form.installments) {
        return Math.round((form.totalPremium / form.installments) * 1.05);
      }

      return form.totalPremium;
    }
  );
};
