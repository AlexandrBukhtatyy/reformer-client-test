import { watchField } from '@reformer/core/behaviors';
import type { BehaviorSchemaFn, FieldPath } from '@reformer/core';
import type { InsuranceApplicationForm } from './type';

export const insuranceApplicationBehavior: BehaviorSchemaFn<InsuranceApplicationForm> = (path: FieldPath<InsuranceApplicationForm>) => {
  // Enable/disable fields based on insurance type
  watchField(
    path.insuranceType,
    (insuranceType, ctx) => {
      // Reset all dependent fields when insurance type changes
      if (insuranceType !== 'casco' && insuranceType !== 'osago') {
        if (ctx.form.vehicle?.value.value) {
          ctx.form.vehicle.setValue(undefined);
        }
      }
      
      if (insuranceType !== 'property') {
        if (ctx.form.property?.value.value) {
          ctx.form.property.setValue(undefined);
        }
      }
      
      if (insuranceType !== 'life') {
        if (ctx.form.health?.value.value) {
          ctx.form.health.setValue(undefined);
        }
      }
      
      if (insuranceType !== 'travel') {
        if (ctx.form.travel?.value.value) {
          ctx.form.travel.setValue(undefined);
        }
      }
    },
    { immediate: false, debounce: 0 }
  );

  // Compute end date from start date and insurance period - watch each field separately
  watchField(
    path.startDate,
    (_, ctx) => {
      const startDate = ctx.form.startDate.value.value;
      const insurancePeriod = ctx.form.insurancePeriod.value.value;

      if (startDate && insurancePeriod) {
        try {
          const start = new Date(startDate);
          const end = new Date(start);
          end.setMonth(end.getMonth() + insurancePeriod);
          
          const endDateStr = end.toISOString().split('T')[0];
          ctx.form.endDate.setValue(endDateStr);
        } catch (error) {
          console.error('Error computing end date:', error);
        }
      }
    },
    { immediate: false, debounce: 300 }
  );

  watchField(
    path.insurancePeriod,
    (_, ctx) => {
      const startDate = ctx.form.startDate.value.value;
      const insurancePeriod = ctx.form.insurancePeriod.value.value;

      if (startDate && insurancePeriod) {
        try {
          const start = new Date(startDate);
          const end = new Date(start);
          end.setMonth(end.getMonth() + insurancePeriod);
          
          const endDateStr = end.toISOString().split('T')[0];
          ctx.form.endDate.setValue(endDateStr);
        } catch (error) {
          console.error('Error computing end date:', error);
        }
      }
    },
    { immediate: false, debounce: 300 }
  );

  // Compute full name from personal data - watch each field separately
  watchField(
    path.personalData.lastName,
    (_, ctx) => {
      const lastName = ctx.form.personalData.lastName.value.value;
      const firstName = ctx.form.personalData.firstName.value.value;
      const middleName = ctx.form.personalData.middleName.value.value;

      const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
      ctx.form.fullName.setValue(fullName);
    },
    { immediate: false, debounce: 300 }
  );

  watchField(
    path.personalData.firstName,
    (_, ctx) => {
      const lastName = ctx.form.personalData.lastName.value.value;
      const firstName = ctx.form.personalData.firstName.value.value;
      const middleName = ctx.form.personalData.middleName.value.value;

      const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
      ctx.form.fullName.setValue(fullName);
    },
    { immediate: false, debounce: 300 }
  );

  watchField(
    path.personalData.middleName,
    (_, ctx) => {
      const lastName = ctx.form.personalData.lastName.value.value;
      const firstName = ctx.form.personalData.firstName.value.value;
      const middleName = ctx.form.personalData.middleName.value.value;

      const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
      ctx.form.fullName.setValue(fullName);
    },
    { immediate: false, debounce: 300 }
  );

  // Compute age from birth date
  watchField(
    path.personalData.birthDate,
    (birthDate, ctx) => {
      if (birthDate) {
        try {
          const birth = new Date(birthDate);
          const today = new Date();
          let age = today.getFullYear() - birth.getFullYear();
          const monthDiff = today.getMonth() - birth.getMonth();
          
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
          }
          
          ctx.form.age.setValue(age);
        } catch (error) {
          console.error('Error computing age:', error);
          ctx.form.age.setValue(undefined);
        }
      } else {
        ctx.form.age.setValue(undefined);
      }
    },
    { immediate: false, debounce: 300 }
  );

  // Compute BMI from height and weight (for life insurance) - only if health exists
  if (path.health) {
    watchField(
      path.health.height,
      (_, ctx) => {
        const height = ctx.form.health?.height.value.value;
        const weight = ctx.form.health?.weight.value.value;

        if (height && weight && height > 0) {
          const heightInMeters = height / 100;
          const bmi = weight / (heightInMeters * heightInMeters);
          ctx.form.health?.bmi.setValue(Number(bmi.toFixed(2)));
        } else {
          ctx.form.health?.bmi.setValue(undefined);
        }
      },
      { immediate: false, debounce: 300 }
    );

    watchField(
      path.health.weight,
      (_, ctx) => {
        const height = ctx.form.health?.height.value.value;
        const weight = ctx.form.health?.weight.value.value;

        if (height && weight && height > 0) {
          const heightInMeters = height / 100;
          const bmi = weight / (heightInMeters * heightInMeters);
          ctx.form.health?.bmi.setValue(Number(bmi.toFixed(2)));
        } else {
          ctx.form.health?.bmi.setValue(undefined);
        }
      },
      { immediate: false, debounce: 300 }
    );
  }

  // Enable drivers section only for vehicle insurance
  watchField(
    path.insuranceType,
    (type, ctx) => {
      const isVehicleInsurance = type === 'casco' || type === 'osago';
      
      if (isVehicleInsurance) {
        if (ctx.form.drivers.disabled.value) ctx.form.drivers.enable();
      } else {
        if (!ctx.form.drivers.disabled.value) ctx.form.drivers.disable();
        ctx.form.drivers.setValue([]);
      }
    },
    { immediate: false, debounce: 0 }
  );

  // Enable beneficiaries section only for life insurance
  watchField(
    path.insuranceType,
    (type, ctx) => {
      const isLifeInsurance = type === 'life';
      
      if (isLifeInsurance) {
        if (ctx.form.beneficiaries.disabled.value) ctx.form.beneficiaries.enable();
      } else {
        if (!ctx.form.beneficiaries.disabled.value) ctx.form.beneficiaries.disable();
        ctx.form.beneficiaries.setValue([]);
      }
    },
    { immediate: false, debounce: 0 }
  );

  // Enable travelers section only for travel insurance
  watchField(
    path.insuranceType,
    (type, ctx) => {
      const isTravelInsurance = type === 'travel';
      
      if (isTravelInsurance) {
        if (ctx.form.travelers.disabled.value) ctx.form.travelers.enable();
      } else {
        if (!ctx.form.travelers.disabled.value) ctx.form.travelers.disable();
        ctx.form.travelers.setValue([]);
      }
    },
    { immediate: false, debounce: 0 }
  );
};