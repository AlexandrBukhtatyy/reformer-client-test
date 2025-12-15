import type { ValidationSchemaFn } from '@reformer/core';
import { validateItems, validate, notEmpty, applyWhen } from '@reformer/core/validators';
import type { DriversBeneficiariesStep } from './type';
import { driverValidation } from '../../sub-forms/driver/validators';
import { beneficiaryValidation } from '../../sub-forms/beneficiary/validators';

export const driversBeneficiariesValidation: ValidationSchemaFn<DriversBeneficiariesStep> = (path) => {
  // Валидация водителей - только если не выбрано "неограниченное количество"
  applyWhen(
    path.unlimitedDrivers,
    (unlimited) => unlimited === false,
    (p) => {
      notEmpty(p.drivers, { message: 'Добавьте хотя бы одного водителя' });
      validateItems(p.drivers, driverValidation);
    }
  );

  // Валидация выгодоприобретателей
  validateItems(path.beneficiaries, beneficiaryValidation);

  // Проверка суммы долей = 100%
  validate(path.totalBeneficiaryShare, (totalShare, ctx) => {
    // Проверяем только если есть выгодоприобретатели
    const beneficiaries = ctx.form.beneficiaries;
    if (beneficiaries && beneficiaries.length > 0) {
      if (Math.abs((totalShare || 0) - 100) > 0.01) {
        return {
          code: 'invalid_total_share',
          message: 'Сумма долей выгодоприобретателей должна быть равна 100%',
        };
      }
    }
    return null;
  });
};
