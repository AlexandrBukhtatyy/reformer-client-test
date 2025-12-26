import { useEffect, useRef } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import type { InsuranceFormData } from '../types';

// Вычисление возраста по дате рождения
function calculateAge(birthDate: string): number | null {
  if (!birthDate) return null;
  const today = new Date();
  const birth = new Date(birthDate);
  if (isNaN(birth.getTime())) return null;

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age >= 0 ? age : null;
}

// Вычисление даты окончания
function calculateEndDate(startDate: string, periodMonths: number): string {
  if (!startDate || !periodMonths) return '';
  const start = new Date(startDate);
  if (isNaN(start.getTime())) return '';

  const end = new Date(start);
  end.setMonth(end.getMonth() + periodMonths);
  return end.toISOString().split('T')[0];
}

// Вычисление полного имени
function calculateFullName(lastName: string, firstName: string, middleName: string): string {
  return [lastName, firstName, middleName].filter(Boolean).join(' ');
}

// Вычисление ИМТ
function calculateBMI(height: number | null, weight: number | null): number | null {
  if (!height || !weight || height <= 0) return null;
  const heightM = height / 100;
  return Math.round((weight / (heightM * heightM)) * 10) / 10;
}

// Вычисление длительности поездки
function calculateTripDuration(departureDate: string, returnDate: string): number | null {
  if (!departureDate || !returnDate) return null;
  const departure = new Date(departureDate);
  const returnD = new Date(returnDate);
  if (isNaN(departure.getTime()) || isNaN(returnD.getTime())) return null;

  const diffTime = returnD.getTime() - departure.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : null;
}

// Вычисление стажа вождения
function calculateDrivingExperience(licenseIssueDate: string): number | null {
  if (!licenseIssueDate) return null;
  const today = new Date();
  const issueDate = new Date(licenseIssueDate);
  if (isNaN(issueDate.getTime())) return null;

  let years = today.getFullYear() - issueDate.getFullYear();
  const monthDiff = today.getMonth() - issueDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < issueDate.getDate())) {
    years--;
  }
  return years >= 0 ? years : 0;
}

// Расчет базовой премии
function calculateBasePremium(
  insuranceType: string,
  coverageAmount: number | null,
  insurancePeriod: number
): number {
  if (!coverageAmount || !insurancePeriod) return 0;

  const baseRates: Record<string, number> = {
    casco: 0.05,
    osago: 0.03,
    property: 0.02,
    life: 0.04,
    travel: 0.01,
  };

  const rate = baseRates[insuranceType] || 0.03;
  return Math.round(coverageAmount * rate * (insurancePeriod / 12));
}

// Расчет коэффициента возраста
function calculateAgeCoefficient(age: number | null): number {
  if (!age) return 1.0;
  if (age < 22) return 1.8;
  if (age < 25) return 1.5;
  if (age < 30) return 1.2;
  if (age < 65) return 1.0;
  return 1.3;
}

// Расчет коэффициента стажа
function calculateExperienceCoefficient(experience: number | null): number {
  if (!experience) return 1.8;
  if (experience < 2) return 1.8;
  if (experience < 5) return 1.3;
  if (experience < 10) return 1.0;
  return 0.9;
}

// Расчет коэффициента убыточности
function calculateClaimsCoefficient(claimsCount: number): number {
  if (claimsCount === 0) return 0.9;
  if (claimsCount === 1) return 1.0;
  if (claimsCount === 2) return 1.3;
  return 1.5 + (claimsCount - 2) * 0.2;
}

export function useComputedFields() {
  const { setValue, getValues } = useFormContext<InsuranceFormData>();
  const prevValuesRef = useRef<Record<string, unknown>>({});

  // Watch specific fields for endDate calculation
  const startDate = useWatch<InsuranceFormData, 'startDate'>({ name: 'startDate' });
  const insurancePeriod = useWatch<InsuranceFormData, 'insurancePeriod'>({ name: 'insurancePeriod' });

  // Watch for fullName calculation
  const lastName = useWatch<InsuranceFormData, 'personalData.lastName'>({ name: 'personalData.lastName' });
  const firstName = useWatch<InsuranceFormData, 'personalData.firstName'>({ name: 'personalData.firstName' });
  const middleName = useWatch<InsuranceFormData, 'personalData.middleName'>({ name: 'personalData.middleName' });

  // Watch for age calculation
  const birthDate = useWatch<InsuranceFormData, 'personalData.birthDate'>({ name: 'personalData.birthDate' });

  // Watch for BMI calculation
  const height = useWatch<InsuranceFormData, 'health.height'>({ name: 'health.height' });
  const weight = useWatch<InsuranceFormData, 'health.weight'>({ name: 'health.weight' });

  // Watch for trip duration
  const departureDate = useWatch<InsuranceFormData, 'travel.departureDate'>({ name: 'travel.departureDate' });
  const returnDate = useWatch<InsuranceFormData, 'travel.returnDate'>({ name: 'travel.returnDate' });

  // Watch for premium calculation
  const insuranceType = useWatch<InsuranceFormData, 'insuranceType'>({ name: 'insuranceType' });
  const coverageAmount = useWatch<InsuranceFormData, 'coverageAmount'>({ name: 'coverageAmount' });
  const deductible = useWatch<InsuranceFormData, 'deductible'>({ name: 'deductible' });
  const promoCode = useWatch<InsuranceFormData, 'promoCode'>({ name: 'promoCode' });
  const paymentType = useWatch<InsuranceFormData, 'paymentType'>({ name: 'paymentType' });
  const installments = useWatch<InsuranceFormData, 'installments'>({ name: 'installments' });
  const claims = useWatch<InsuranceFormData, 'claims'>({ name: 'claims' });
  const beneficiaries = useWatch<InsuranceFormData, 'beneficiaries'>({ name: 'beneficiaries' });

  // Вычисление endDate
  useEffect(() => {
    const key = `endDate-${startDate}-${insurancePeriod}`;
    if (prevValuesRef.current.endDateKey === key) return;
    prevValuesRef.current.endDateKey = key;

    const newEndDate = calculateEndDate(startDate, insurancePeriod);
    if (newEndDate) {
      setValue('endDate', newEndDate, { shouldDirty: false, shouldValidate: false });
    }
  }, [startDate, insurancePeriod, setValue]);

  // Вычисление fullName
  useEffect(() => {
    const key = `fullName-${lastName}-${firstName}-${middleName}`;
    if (prevValuesRef.current.fullNameKey === key) return;
    prevValuesRef.current.fullNameKey = key;

    const newFullName = calculateFullName(lastName || '', firstName || '', middleName || '');
    setValue('fullName', newFullName, { shouldDirty: false, shouldValidate: false });
  }, [lastName, firstName, middleName, setValue]);

  // Вычисление age
  useEffect(() => {
    const key = `age-${birthDate}`;
    if (prevValuesRef.current.ageKey === key) return;
    prevValuesRef.current.ageKey = key;

    const newAge = calculateAge(birthDate || '');
    setValue('age', newAge, { shouldDirty: false, shouldValidate: false });
  }, [birthDate, setValue]);

  // Вычисление BMI
  useEffect(() => {
    const key = `bmi-${height}-${weight}`;
    if (prevValuesRef.current.bmiKey === key) return;
    prevValuesRef.current.bmiKey = key;

    const newBMI = calculateBMI(height, weight);
    setValue('health.bmi', newBMI, { shouldDirty: false, shouldValidate: false });
  }, [height, weight, setValue]);

  // Вычисление tripDuration
  useEffect(() => {
    const key = `tripDuration-${departureDate}-${returnDate}`;
    if (prevValuesRef.current.tripDurationKey === key) return;
    prevValuesRef.current.tripDurationKey = key;

    const newDuration = calculateTripDuration(departureDate || '', returnDate || '');
    setValue('travel.tripDuration', newDuration, { shouldDirty: false, shouldValidate: false });
  }, [departureDate, returnDate, setValue]);

  // Вычисление totalBeneficiaryShare
  useEffect(() => {
    const shares = beneficiaries?.map(b => b.share || 0) || [];
    const key = `beneficiaryShare-${shares.join(',')}`;
    if (prevValuesRef.current.beneficiaryShareKey === key) return;
    prevValuesRef.current.beneficiaryShareKey = key;

    const totalShare = shares.reduce((sum, s) => sum + s, 0);
    setValue('totalBeneficiaryShare', totalShare, { shouldDirty: false, shouldValidate: false });
  }, [beneficiaries, setValue]);

  // Вычисление страховых коэффициентов и премии
  useEffect(() => {
    const age = getValues('age');
    const minDriverExp = getValues('minDriverExperience');
    const claimsCount = claims?.length || 0;

    const key = `premium-${insuranceType}-${coverageAmount}-${insurancePeriod}-${deductible}-${promoCode}-${age}-${minDriverExp}-${claimsCount}-${paymentType}-${installments}`;
    if (prevValuesRef.current.premiumKey === key) return;
    prevValuesRef.current.premiumKey = key;

    // Базовая премия
    const basePremium = calculateBasePremium(insuranceType, coverageAmount, insurancePeriod);

    // Коэффициенты
    const ageCoeff = calculateAgeCoefficient(age);
    const expCoeff = calculateExperienceCoefficient(minDriverExp);
    const regionCoeff = 1.0;
    const claimsCoeff = calculateClaimsCoefficient(claimsCount);

    // Скидки
    const deductibleDiscount = deductible ? Math.min(deductible / 1000, 0.15) : 0;
    const promoDiscount = promoCode ? 0.05 : 0;
    const multiPolicyDiscount = 0;

    // Итоговая премия
    const totalCoeff = ageCoeff * expCoeff * regionCoeff * claimsCoeff;
    const totalDiscount = deductibleDiscount + promoDiscount + multiPolicyDiscount;
    const totalPremium = Math.round(basePremium * totalCoeff * (1 - totalDiscount));

    // Batch all setValue calls
    setValue('basePremium', basePremium, { shouldDirty: false, shouldValidate: false });
    setValue('ageCoefficient', ageCoeff, { shouldDirty: false, shouldValidate: false });
    setValue('experienceCoefficient', expCoeff, { shouldDirty: false, shouldValidate: false });
    setValue('regionCoefficient', regionCoeff, { shouldDirty: false, shouldValidate: false });
    setValue('claimsCoefficient', claimsCoeff, { shouldDirty: false, shouldValidate: false });
    setValue('deductibleDiscount', deductibleDiscount, { shouldDirty: false, shouldValidate: false });
    setValue('promoDiscount', promoDiscount, { shouldDirty: false, shouldValidate: false });
    setValue('multiPolicyDiscount', multiPolicyDiscount, { shouldDirty: false, shouldValidate: false });
    setValue('totalPremium', totalPremium, { shouldDirty: false, shouldValidate: false });

    // Сумма рассрочки
    if (paymentType === 'installments' && installments && installments > 0) {
      const installmentAmount = Math.round(totalPremium / installments);
      setValue('installmentAmount', installmentAmount, { shouldDirty: false, shouldValidate: false });
    } else {
      setValue('installmentAmount', null, { shouldDirty: false, shouldValidate: false });
    }
  }, [insuranceType, coverageAmount, insurancePeriod, deductible, promoCode, claims, paymentType, installments, setValue, getValues]);

  // Экспорт утилит для использования в компонентах
  return {
    calculateAge,
    calculateEndDate,
    calculateFullName,
    calculateBMI,
    calculateTripDuration,
    calculateDrivingExperience,
    calculateBasePremium,
  };
}
