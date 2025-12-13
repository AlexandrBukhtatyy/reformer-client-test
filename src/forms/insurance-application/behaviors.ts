// Form Behaviors - Computed fields and field dependencies
import type { BehaviorSchemaFn } from '@reformer/core';
import { watchField, enableWhen, computeFrom } from '@reformer/core/behaviors';
import type { InsuranceApplicationForm } from './type';

// Helper function to calculate age from birth date
const calculateAge = (birthDate: string): number | undefined => {
  if (!birthDate) return undefined;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age >= 0 ? age : undefined;
};

// Helper function to add months to date
const addMonths = (dateStr: string, months: number): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  date.setMonth(date.getMonth() + months);
  return date.toISOString().split('T')[0];
};

// Helper function to calculate days between dates
const daysBetween = (startDate: string, endDate: string): number | undefined => {
  if (!startDate || !endDate) return undefined;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : undefined;
};

// Helper function to calculate BMI
const calculateBMI = (height: number | undefined, weight: number | undefined): number | undefined => {
  if (!height || !weight || height <= 0) return undefined;
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return Math.round(bmi * 10) / 10; // Round to 1 decimal place
};

// Premium calculation helpers
const BASE_RATES: Record<string, number> = {
  casco: 0.05, // 5% of coverage
  osago: 0.03, // 3% of coverage
  property: 0.02, // 2% of coverage
  life: 0.015, // 1.5% of coverage
  travel: 0.01, // 1% of coverage
};

const calculateBasePremium = (insuranceType: string, coverageAmount: number | undefined): number | undefined => {
  if (!coverageAmount) return undefined;
  const rate = BASE_RATES[insuranceType] || 0.03;
  return Math.round(coverageAmount * rate);
};

const calculateAgeCoefficient = (age: number | undefined): number => {
  if (!age) return 1.0;
  if (age < 22) return 1.8;
  if (age < 25) return 1.4;
  if (age > 65) return 1.5;
  return 1.0;
};

const calculateExperienceCoefficient = (experience: number | undefined): number => {
  if (!experience) return 1.6;
  if (experience < 2) return 1.6;
  if (experience < 5) return 1.3;
  if (experience < 10) return 1.1;
  return 1.0;
};

export const insuranceApplicationBehaviors: BehaviorSchemaFn<InsuranceApplicationForm> = (path) => {
  // ===========================
  // Step 1: Computed Fields
  // ===========================

  // Note: End Date calculation is handled via useEffect in Step1InsuranceType.tsx
  // because watchField doesn't trigger callbacks as expected in this context.

  // Installments conditional visibility (top-level field, no nesting issue)
  enableWhen(path.installments, (form) => form.paymentType === 'installments', { resetOnDisable: true });

  // ===========================
  // Step 2: Computed Fields
  // ===========================

  // Full Name computed from personal data
  watchField(path.personalData, (personalData, ctx) => {
    const lastName = personalData?.lastName || '';
    const firstName = personalData?.firstName || '';
    const middleName = personalData?.middleName || '';
    const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
    ctx.setFieldValue('fullName', fullName);
  }, { immediate: false });

  // Age computed from birth date
  watchField(path.personalData, (personalData, ctx) => {
    const age = calculateAge(personalData?.birthDate || '');
    ctx.setFieldValue('age', age);
  }, { immediate: false });

  // ===========================
  // Step 3: Computed Fields
  // ===========================

  // BMI computed from height and weight
  computeFrom(
    [path.health.height, path.health.weight],
    path.health.bmi,
    ({ height, weight }) => calculateBMI(height, weight)
  );

  // Trip Duration computed from dates
  computeFrom(
    [path.travel.departureDate, path.travel.returnDate],
    path.travel.tripDuration,
    ({ departureDate, returnDate }) => daysBetween(departureDate, returnDate)
  );

  // ===========================
  // Step 5: Conditional Visibility
  // ===========================

  // Previous insurance fields (top-level, no nesting issue)
  enableWhen(path.previousInsurer, (form) => form.hasPreviousInsurance === true, { resetOnDisable: true });
  enableWhen(path.previousPolicyNumber, (form) => form.hasPreviousInsurance === true, { resetOnDisable: true });
  enableWhen(path.previousPolicyEndDate, (form) => form.hasPreviousInsurance === true, { resetOnDisable: true });

  // ===========================
  // Step 6: Premium Calculation
  // ===========================

  // Watch insurance type and coverage to calculate base premium
  watchField(path.insuranceType, (insuranceType, ctx) => {
    const form = ctx.form;
    const coverageAmount = form.coverageAmount?.value?.value;
    const basePremium = calculateBasePremium(insuranceType, coverageAmount);
    ctx.setFieldValue('basePremium', basePremium);
  }, { immediate: false });

  watchField(path.coverageAmount, (coverageAmount, ctx) => {
    const form = ctx.form;
    const insuranceType = form.insuranceType?.value?.value;
    const basePremium = calculateBasePremium(insuranceType, coverageAmount);
    ctx.setFieldValue('basePremium', basePremium);
  }, { immediate: false });

  // Watch age to calculate age coefficient
  watchField(path.age, (age, ctx) => {
    const coeff = calculateAgeCoefficient(age);
    ctx.setFieldValue('ageCoefficient', coeff);
  }, { immediate: false });

  // Watch min driver experience to calculate experience coefficient
  watchField(path.minDriverExperience, (experience, ctx) => {
    const coeff = calculateExperienceCoefficient(experience);
    ctx.setFieldValue('experienceCoefficient', coeff);
  }, { immediate: false });

  // Set default coefficients
  watchField(path.insuranceType, (_, ctx) => {
    ctx.setFieldValue('regionCoefficient', 1.2);
    ctx.setFieldValue('claimsCoefficient', 1.0);
    ctx.setFieldValue('multiPolicyDiscount', 0);
    ctx.setFieldValue('promoDiscount', 0);
  }, { immediate: false });

  // Calculate deductible discount
  watchField(path.deductible, (deductible, ctx) => {
    const form = ctx.form;
    const coverageAmount = form.coverageAmount?.value?.value;
    if (deductible && coverageAmount) {
      const discount = Math.min((deductible / coverageAmount) * 50, 15);
      ctx.setFieldValue('deductibleDiscount', Math.round(discount * 10) / 10);
    } else {
      ctx.setFieldValue('deductibleDiscount', 0);
    }
  }, { immediate: false });

  // Calculate total premium when base premium changes
  watchField(path.basePremium, (basePremium, ctx) => {
    if (!basePremium) {
      ctx.setFieldValue('totalPremium', undefined);
      ctx.setFieldValue('installmentAmount', undefined);
      return;
    }

    const form = ctx.form;
    const ageCoeff = form.ageCoefficient?.value?.value || 1.0;
    const expCoeff = form.experienceCoefficient?.value?.value || 1.0;
    const regionCoeff = form.regionCoefficient?.value?.value || 1.0;
    const claimsCoeff = form.claimsCoefficient?.value?.value || 1.0;
    const deductibleDiscount = form.deductibleDiscount?.value?.value || 0;
    const promoDiscount = form.promoDiscount?.value?.value || 0;
    const multiPolicyDiscount = form.multiPolicyDiscount?.value?.value || 0;

    const totalDiscount = Math.min(deductibleDiscount + promoDiscount + multiPolicyDiscount, 30) / 100;
    const totalPremium = Math.round(basePremium * ageCoeff * expCoeff * regionCoeff * claimsCoeff * (1 - totalDiscount));

    ctx.setFieldValue('totalPremium', totalPremium);

    // Calculate installment amount
    const paymentType = form.paymentType?.value?.value;
    const installments = form.installments?.value?.value;
    if (paymentType === 'installments' && installments) {
      const installmentAmount = Math.round((totalPremium / installments) * 1.05); // +5% for installments
      ctx.setFieldValue('installmentAmount', installmentAmount);
    } else {
      ctx.setFieldValue('installmentAmount', totalPremium);
    }
  }, { immediate: false });

  // Recalculate installment amount when payment type or installments change
  watchField(path.paymentType, (paymentType, ctx) => {
    const form = ctx.form;
    const totalPremium = form.totalPremium?.value?.value;
    const installments = form.installments?.value?.value;
    if (!totalPremium) return;

    if (paymentType === 'installments' && installments) {
      const installmentAmount = Math.round((totalPremium / installments) * 1.05);
      ctx.setFieldValue('installmentAmount', installmentAmount);
    } else {
      ctx.setFieldValue('installmentAmount', totalPremium);
    }
  }, { immediate: false });

  watchField(path.installments, (installments, ctx) => {
    const form = ctx.form;
    const totalPremium = form.totalPremium?.value?.value;
    const paymentType = form.paymentType?.value?.value;
    if (!totalPremium || !installments) return;

    if (paymentType === 'installments') {
      const installmentAmount = Math.round((totalPremium / installments) * 1.05);
      ctx.setFieldValue('installmentAmount', installmentAmount);
    }
  }, { immediate: false });
};
