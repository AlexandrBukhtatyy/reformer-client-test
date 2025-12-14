// Step 4: Drivers and Beneficiaries - Validation Schema
import type { ValidationSchemaFn, FieldPath } from '@reformer/core';
import { required, min, max, validate, validateTree } from '@reformer/core/validators';
import type { InsuranceApplicationForm, Beneficiary } from '../types';

export const step4Validation: ValidationSchemaFn<InsuranceApplicationForm> = (
  _path: FieldPath<InsuranceApplicationForm>
) => {
  // Drivers validation - at least one driver required for CASCO/OSAGO when not unlimited
  validateTree<InsuranceApplicationForm>((ctx) => {
    const unlimitedDrivers = ctx.form.unlimitedDrivers.value.value;
    if (unlimitedDrivers) return null;
    const insuranceType = ctx.form.insuranceType.value.value;
    const drivers = ctx.form.drivers.value.value;
    if (
      (insuranceType === 'casco' || insuranceType === 'osago') &&
      drivers.length === 0
    ) {
      return { code: 'required', message: 'Добавьте хотя бы одного водителя' };
    }
    return null;
  }, { targetField: 'drivers' });

  // Beneficiaries validation - at least one required for life insurance
  validateTree<InsuranceApplicationForm>((ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if (insuranceType !== 'life') return null;
    const beneficiaries = ctx.form.beneficiaries.value.value;
    if (beneficiaries.length === 0) {
      return { code: 'required', message: 'Добавьте хотя бы одного выгодоприобретателя' };
    }
    return null;
  }, { targetField: 'beneficiaries' });

  // Total share must equal 100% for life insurance beneficiaries
  validateTree<InsuranceApplicationForm>((ctx) => {
    const insuranceType = ctx.form.insuranceType.value.value;
    if (insuranceType !== 'life') return null;
    const beneficiaries = ctx.form.beneficiaries.value.value;
    if (beneficiaries.length === 0) return null;

    const totalShare = beneficiaries.reduce((sum: number, b: Beneficiary) => sum + (b.share || 0), 0);
    if (totalShare !== 100) {
      return { code: 'shareSum', message: `Сумма долей должна быть равна 100% (текущая: ${totalShare}%)` };
    }
    return null;
  }, { targetField: 'beneficiaries' });
};

// Validation for individual driver in array
export const driverItemValidation: ValidationSchemaFn<InsuranceApplicationForm['drivers'][number]> = (
  path: FieldPath<InsuranceApplicationForm['drivers'][number]>
) => {
  required(path.fullName, { message: 'Укажите ФИО водителя' });

  required(path.birthDate, { message: 'Укажите дату рождения' });
  validate(path.birthDate, (value) => {
    if (!value) return null;
    const birthDate = new Date(value);
    const today = new Date();
    const age = Math.floor(
      (today.getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    );
    if (age < 18) {
      return { code: 'minAge', message: 'Возраст водителя должен быть не менее 18 лет' };
    }
    return null;
  });

  required(path.licenseNumber, { message: 'Укажите номер водительского удостоверения' });

  required(path.licenseIssueDate, { message: 'Укажите дату выдачи ВУ' });

  required(path.accidentsCount, { message: 'Укажите количество ДТП' });
  min(path.accidentsCount, 0, { message: 'Количество ДТП не может быть отрицательным' });
};

// Validation for individual beneficiary in array
export const beneficiaryItemValidation: ValidationSchemaFn<
  InsuranceApplicationForm['beneficiaries'][number]
> = (path: FieldPath<InsuranceApplicationForm['beneficiaries'][number]>) => {
  required(path.fullName, { message: 'Укажите ФИО выгодоприобретателя' });
  required(path.birthDate, { message: 'Укажите дату рождения' });
  required(path.relationship, { message: 'Выберите степень родства' });

  required(path.share, { message: 'Укажите долю' });
  min(path.share, 1, { message: 'Минимальная доля: 1%' });
  max(path.share, 100, { message: 'Максимальная доля: 100%' });

  required(path.phone, { message: 'Укажите телефон' });
  validate(path.phone, (value) => {
    if (!value) return null;
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length !== 11) {
      return { code: 'format', message: 'Введите корректный номер телефона' };
    }
    return null;
  });
};

// Validation for individual traveler in array
export const travelerItemValidation: ValidationSchemaFn<
  InsuranceApplicationForm['travelers'][number]
> = (path: FieldPath<InsuranceApplicationForm['travelers'][number]>) => {
  required(path.fullName, { message: 'Укажите ФИО путешественника' });
  required(path.birthDate, { message: 'Укажите дату рождения' });
  required(path.passportNumber, { message: 'Укажите номер загранпаспорта' });
};
