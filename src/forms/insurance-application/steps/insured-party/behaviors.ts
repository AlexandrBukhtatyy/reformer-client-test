import type { BehaviorSchemaFn } from '@reformer/core';
import { watchField } from '@reformer/core/behaviors';
import type { InsuredPartyStep } from './type';

export const insuredPartyBehaviors: BehaviorSchemaFn<InsuredPartyStep> = (path) => {
  // Вычисление полного имени
  watchField(
    path.personalData.lastName,
    (lastName, ctx) => {
      const firstName = ctx.form.firstName.value.value || '';
      const middleName = ctx.form.middleName.value.value || '';
      const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
      ctx.setFieldValue('fullName', fullName);
    },
    { immediate: false }
  );

  watchField(
    path.personalData.firstName,
    (firstName, ctx) => {
      const lastName = ctx.form.lastName.value.value || '';
      const middleName = ctx.form.middleName.value.value || '';
      const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
      ctx.setFieldValue('fullName', fullName);
    },
    { immediate: false }
  );

  watchField(
    path.personalData.middleName,
    (middleName, ctx) => {
      const lastName = ctx.form.lastName.value.value || '';
      const firstName = ctx.form.firstName.value.value || '';
      const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
      ctx.setFieldValue('fullName', fullName);
    },
    { immediate: false }
  );

  // Вычисление возраста из даты рождения
  watchField(
    path.personalData.birthDate,
    (birthDate, ctx) => {
      if (birthDate) {
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
          age--;
        }
        ctx.setFieldValue('age', age > 0 ? age : undefined);
      } else {
        ctx.setFieldValue('age', undefined);
      }
    },
    { immediate: false }
  );
};
