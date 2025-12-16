import type { BehaviorSchemaFn } from '@reformer/core';
import { watchField } from '@reformer/core/behaviors';
import type { DriverData } from './type';

export const driverBehaviors: BehaviorSchemaFn<DriverData> = (path) => {
  // Вычисление возраста
  watchField(
    path.birthDate,
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

  // Вычисление стажа вождения
  watchField(
    path.licenseIssueDate,
    (licenseDate, ctx) => {
      if (licenseDate) {
        const issue = new Date(licenseDate);
        const today = new Date();
        let experience = today.getFullYear() - issue.getFullYear();
        const monthDiff = today.getMonth() - issue.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < issue.getDate())) {
          experience--;
        }
        ctx.setFieldValue('experience', experience >= 0 ? experience : 0);
      } else {
        ctx.setFieldValue('experience', undefined);
      }
    },
    { immediate: false }
  );
};
