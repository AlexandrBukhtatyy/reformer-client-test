import { watchField } from '@reformer/core/behaviors';
import type { BehaviorSchemaFn, FieldPath } from '@reformer/core';
import type { Step2Form } from './type';

export const step2Behavior: BehaviorSchemaFn<Step2Form> = (path: FieldPath<Step2Form>) => {
  // Watch insuredType to enable/disable fields based on type
 watchField(
    path.insuredType,
    (insuredType, ctx) => {
      const isIndividual = insuredType === 'individual';
      const isCompany = insuredType === 'company';

      // Enable/disable personal data fields
      if (isIndividual) {
        if (ctx.form.personalData.lastName.disabled.value) ctx.form.personalData.lastName.enable();
        if (ctx.form.personalData.firstName.disabled.value) ctx.form.personalData.firstName.enable();
        if (ctx.form.personalData.middleName.disabled.value) ctx.form.personalData.middleName.enable();
        if (ctx.form.personalData.birthDate.disabled.value) ctx.form.personalData.birthDate.enable();
        if (ctx.form.personalData.gender.disabled.value) ctx.form.personalData.gender.enable();
      } else {
        if (!ctx.form.personalData.lastName.disabled.value) ctx.form.personalData.lastName.disable();
        if (!ctx.form.personalData.firstName.disabled.value) ctx.form.personalData.firstName.disable();
        if (!ctx.form.personalData.middleName.disabled.value) ctx.form.personalData.middleName.disable();
        if (!ctx.form.personalData.birthDate.disabled.value) ctx.form.personalData.birthDate.disable();
        if (!ctx.form.personalData.gender.disabled.value) ctx.form.personalData.gender.disable();
      }

      // Enable/disable passport data fields
      if (isIndividual) {
        if (ctx.form.passportData.series.disabled.value) ctx.form.passportData.series.enable();
        if (ctx.form.passportData.number.disabled.value) ctx.form.passportData.number.enable();
        if (ctx.form.passportData.issueDate.disabled.value) ctx.form.passportData.issueDate.enable();
        if (ctx.form.passportData.issuedBy.disabled.value) ctx.form.passportData.issuedBy.enable();
      } else {
        if (!ctx.form.passportData.series.disabled.value) ctx.form.passportData.series.disable();
        if (!ctx.form.passportData.number.disabled.value) ctx.form.passportData.number.disable();
        if (!ctx.form.passportData.issueDate.disabled.value) ctx.form.passportData.issueDate.disable();
        if (!ctx.form.passportData.issuedBy.disabled.value) ctx.form.passportData.issuedBy.disable();
      }

      // Enable/disable company data fields
      if (isCompany) {
        if (ctx.form.companyData.name.disabled.value) ctx.form.companyData.name.enable();
        if (ctx.form.companyData.inn.disabled.value) ctx.form.companyData.inn.enable();
        if (ctx.form.companyData.ogrn.disabled.value) ctx.form.companyData.ogrn.enable();
        if (ctx.form.companyData.kpp.disabled.value) ctx.form.companyData.kpp.enable();
        if (ctx.form.companyData.ceoName.disabled.value) ctx.form.companyData.ceoName.enable();
      } else {
        if (!ctx.form.companyData.name.disabled.value) ctx.form.companyData.name.disable();
        if (!ctx.form.companyData.inn.disabled.value) ctx.form.companyData.inn.disable();
        if (!ctx.form.companyData.ogrn.disabled.value) ctx.form.companyData.ogrn.disable();
        if (!ctx.form.companyData.kpp.disabled.value) ctx.form.companyData.kpp.disable();
        if (!ctx.form.companyData.ceoName.disabled.value) ctx.form.companyData.ceoName.disable();
      }
    },
    { immediate: false, debounce: 0 }
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
        }
      } else {
        ctx.form.age.setValue(undefined);
      }
    },
    { immediate: false, debounce: 300 }
  );
};