import type { BehaviorSchemaFn } from '@reformer/core';
import { watchField } from '@reformer/core/behaviors';
import type { InsuredPartyStep } from './type';

export const insuredPartyBehaviors: BehaviorSchemaFn<InsuredPartyStep> = (path) => {
  // Вычисление полного имени
  watchField(
    path.personalData.lastName,
    (lastName, ctx) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const form = ctx.form as any;
      const firstName = form?.personalData?.firstName?.value ?? '';
      const middleName = form?.personalData?.middleName?.value ?? '';
      const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
      ctx.setFieldValue('personalData.fullName', fullName);
    },
    { immediate: false }
  );

  watchField(
    path.personalData.firstName,
    (firstName, ctx) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const form = ctx.form as any;
      const lastName = form?.personalData?.lastName?.value ?? '';
      const middleName = form?.personalData?.middleName?.value ?? '';
      const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
      ctx.setFieldValue('personalData.fullName', fullName);
    },
    { immediate: false }
  );

  watchField(
    path.personalData.middleName,
    (middleName, ctx) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const form = ctx.form as any;
      const lastName = form?.personalData?.lastName?.value ?? '';
      const firstName = form?.personalData?.firstName?.value ?? '';
      const fullName = [lastName, firstName, middleName].filter(Boolean).join(' ');
      ctx.setFieldValue('personalData.fullName', fullName);
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
        ctx.setFieldValue('personalData.age', age > 0 ? age : undefined);
      } else {
        ctx.setFieldValue('personalData.age', undefined);
      }
    },
    { immediate: false }
  );
};
