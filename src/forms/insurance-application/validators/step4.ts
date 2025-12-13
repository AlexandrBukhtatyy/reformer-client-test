// Step 4: Drivers and Beneficiaries - Validators
import type { ValidationSchemaFn } from '@reformer/core';
import { required, min, max, applyWhen, validate, validateItems, notEmpty } from '@reformer/core/validators';
import type { InsuranceApplicationForm } from '../type';

export const step4Validation: ValidationSchemaFn<InsuranceApplicationForm> = (path) => {
  // Drivers - conditional for CASCO/OSAGO
  applyWhen(
    path.insuranceType,
    (type) => type === 'casco' || type === 'osago',
    (p) => {
      // When not unlimited drivers, drivers array must have at least one item
      applyWhen(
        p.unlimitedDrivers,
        (unlimited) => unlimited !== true,
        (innerPath) => {
          notEmpty(innerPath.drivers, { message: 'Добавьте хотя бы одного водителя' });

          validateItems(innerPath.drivers, (itemPath) => {
            required(itemPath.fullName, { message: 'Введите ФИО водителя' });
            required(itemPath.birthDate, { message: 'Укажите дату рождения водителя' });
            required(itemPath.licenseNumber, { message: 'Введите номер водительского удостоверения' });
            required(itemPath.licenseIssueDate, { message: 'Укажите дату выдачи ВУ' });
            required(itemPath.accidentsCount, { message: 'Укажите количество ДТП' });
            min(itemPath.accidentsCount, 0, { message: 'Количество ДТП не может быть отрицательным' });
          });
        }
      );
    }
  );

  // Beneficiaries - conditional for Life insurance
  applyWhen(
    path.insuranceType,
    (type) => type === 'life',
    (p) => {
      notEmpty(p.beneficiaries, { message: 'Добавьте хотя бы одного выгодоприобретателя' });

      validateItems(p.beneficiaries, (itemPath) => {
        required(itemPath.fullName, { message: 'Введите ФИО выгодоприобретателя' });
        required(itemPath.birthDate, { message: 'Укажите дату рождения' });
        required(itemPath.relationship, { message: 'Выберите степень родства' });
        required(itemPath.share, { message: 'Укажите долю' });
        min(itemPath.share, 1, { message: 'Доля должна быть не менее 1%' });
        max(itemPath.share, 100, { message: 'Доля должна быть не более 100%' });
        required(itemPath.phone, { message: 'Введите телефон' });
      });

      // Total beneficiary share must be 100%
      validate(p.totalBeneficiaryShare, (value) => {
        if (value === undefined || value === null) return null;
        if (Math.abs(value - 100) > 0.01) {
          return { code: 'share_sum', message: 'Сумма долей выгодоприобретателей должна быть равна 100%' };
        }
        return null;
      });
    }
  );
};
