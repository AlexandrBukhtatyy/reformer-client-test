import { watchField } from '@reformer/core/behaviors';
import type { BehaviorSchemaFn, FieldPath } from '@reformer/core';
import type { Step3Form } from './type';

export const step3Behavior: BehaviorSchemaFn<Step3Form> = (path: FieldPath<Step3Form>) => {
  // Compute BMI from height and weight - watch each field separately
  if (path.health) {
    watchField(
      path.health.height!,
      (_, ctx) => {
        const height = ctx.form.health?.height.value;
        const weight = ctx.form.health?.weight.value.value;

        if (height && weight && height > 0) {
          const heightInMeters = height / 100;
          const bmi = weight / (heightInMeters * heightInMeters);
          ctx.form.health?.bmi.setValue(Number(bmi.toFixed(2)));
        } else if (!height || !weight) {
          ctx.form.health?.bmi.setValue(undefined);
        }
      },
      { immediate: false, debounce: 300 }
    );

    watchField(
      path.health.weight!,
      (_, ctx) => {
        const height = ctx.form.health?.height.value;
        const weight = ctx.form.health?.weight.value.value;

        if (height && weight && height > 0) {
          const heightInMeters = height / 100;
          const bmi = weight / (heightInMeters * heightInMeters);
          ctx.form.health?.bmi.setValue(Number(bmi.toFixed(2)));
        } else if (!height || !weight) {
          ctx.form.health?.bmi.setValue(undefined);
        }
      },
      { immediate: false, debounce: 300 }
    );
  }

  // Compute trip duration from departure and return dates - watch each field separately
  if (path.travel) {
    watchField(
      path.travel.departureDate!,
      (_, ctx) => {
        const departureDate = ctx.form.travel?.departureDate.value.value;
        const returnDate = ctx.form.travel?.returnDate.value.value;

        if (departureDate && returnDate) {
          try {
            const departure = new Date(departureDate);
            const returnD = new Date(returnDate);
            const diffTime = Math.abs(returnD.getTime() - departure.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 24));
            ctx.form.travel?.tripDuration.setValue(diffDays > 0 ? diffDays : 0);
          } catch {
            ctx.form.travel?.tripDuration.setValue(undefined);
          }
        } else {
          ctx.form.travel?.tripDuration.setValue(undefined);
        }
      },
      { immediate: false, debounce: 300 }
    );

    watchField(
      path.travel.returnDate!,
      (_, ctx) => {
        const departureDate = ctx.form.travel?.departureDate.value.value;
        const returnDate = ctx.form.travel?.returnDate.value.value;

        if (departureDate && returnDate) {
          try {
            const departure = new Date(departureDate);
            const returnD = new Date(returnDate);
            const diffTime = Math.abs(returnD.getTime() - departure.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 24));
            ctx.form.travel?.tripDuration.setValue(diffDays > 0 ? diffDays : 0);
          } catch {
            ctx.form.travel?.tripDuration.setValue(undefined);
          }
        } else {
          ctx.form.travel?.tripDuration.setValue(undefined);
        }
      },
      { immediate: false, debounce: 300 }
    );
  }

  // Enable antiTheftBrand only when hasAntiTheft is true
 if (path.vehicle) {
    watchField(
      path.vehicle.hasAntiTheft!,
      (hasAntiTheft, ctx) => {
        if (hasAntiTheft) {
          if (ctx.form.vehicle?.antiTheftBrand.disabled.value) {
            ctx.form.vehicle?.antiTheftBrand.enable();
          }
        } else {
          if (!ctx.form.vehicle?.antiTheftBrand.disabled.value) {
            ctx.form.vehicle?.antiTheftBrand.disable();
          }
          ctx.form.vehicle?.antiTheftBrand.setValue('');
        }
      },
      { immediate: false, debounce: 0 }
    );
  }

  // Enable smokingYears only when isSmoker is true
  if (path.health) {
    watchField(
      path.health.isSmoker!,
      (isSmoker, ctx) => {
        if (isSmoker) {
          if (ctx.form.health?.smokingYears.disabled.value) {
            ctx.form.health?.smokingYears.enable();
          }
        } else {
          if (!ctx.form.health?.smokingYears.disabled.value) {
            ctx.form.health?.smokingYears.disable();
          }
          ctx.form.health?.smokingYears.setValue(undefined);
        }
      },
      { immediate: false, debounce: 0 }
    );
  }

  // Enable chronicDiseases only when hasChronicDiseases is true
 if (path.health) {
    watchField(
      path.health.hasChronicDiseases!,
      (hasChronicDiseases, ctx) => {
        if (hasChronicDiseases) {
          if (ctx.form.health?.chronicDiseases.disabled.value) {
            ctx.form.health?.chronicDiseases.enable();
          }
        } else {
          if (!ctx.form.health?.chronicDiseases.disabled.value) {
            ctx.form.health?.chronicDiseases.disable();
          }
          ctx.form.health?.chronicDiseases.setValue('');
        }
      },
      { immediate: false, debounce: 0 }
    );
  }

 // Enable surgeries only when hadSurgeries is true
  if (path.health) {
    watchField(
      path.health.hadSurgeries!,
      (hadSurgeries, ctx) => {
        if (hadSurgeries) {
          if (ctx.form.health?.surgeries.disabled.value) {
            ctx.form.health?.surgeries.enable();
          }
        } else {
          if (!ctx.form.health?.surgeries.disabled.value) {
            ctx.form.health?.surgeries.disable();
          }
          ctx.form.health?.surgeries.setValue('');
        }
      },
      { immediate: false, debounce: 0 }
    );
  }

  // Enable extremeSports only when practicesSports is true
  if (path.health) {
    watchField(
      path.health.practicesSports!,
      (practicesSports, ctx) => {
        if (practicesSports) {
          if (ctx.form.health?.extremeSports.disabled.value) {
            ctx.form.health?.extremeSports.enable();
          }
        } else {
          if (!ctx.form.health?.extremeSports.disabled.value) {
            ctx.form.health?.extremeSports.disable();
          }
          ctx.form.health?.extremeSports.setValue(false);
        }
      },
      { immediate: false, debounce: 0 }
    );
  }

 // Validate return date is after departure date - watch each field separately
  if (path.travel) {
    watchField(
      path.travel.departureDate!,
      (_, ctx) => {
        const departureDate = ctx.form.travel?.departureDate.value.value;
        const returnDate = ctx.form.travel?.returnDate.value.value;

        if (departureDate && returnDate) {
          try {
            const departure = new Date(departureDate);
            const returnD = new Date(returnDate);

            if (returnD <= departure) {
              // Set error or handle validation
              console.log('Return date must be after departure date');
            }
          } catch {
            console.error('Error validating travel dates');
          }
        }
      },
      { immediate: false, debounce: 300 }
    );

    watchField(
      path.travel.returnDate!,
      (_, ctx) => {
        const departureDate = ctx.form.travel?.departureDate.value.value;
        const returnDate = ctx.form.travel?.returnDate.value.value;

        if (departureDate && returnDate) {
          try {
            const departure = new Date(departureDate);
            const returnD = new Date(returnDate);

            if (returnD <= departure) {
              // Set error or handle validation
              console.log('Return date must be after departure date');
            }
          } catch {
            console.error('Error validating travel dates');
          }
        }
      },
      { immediate: false, debounce: 300 }
    );
  }
};