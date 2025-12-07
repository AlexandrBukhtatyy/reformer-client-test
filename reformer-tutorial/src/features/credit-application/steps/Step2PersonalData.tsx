/**
 * Шаг 2: Персональные данные
 */

import { type GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';

import type { CreditApplicationForm } from '../model/types';

interface Step2PersonalDataProps {
  form: GroupNodeWithControls<CreditApplicationForm>;
  disabled?: boolean;
}

export function Step2PersonalData({ form, disabled }: Step2PersonalDataProps) {
  return (
    <div className="form-step step-2">
      <h2>Персональные данные</h2>

      <fieldset disabled={disabled} className="form-section">
        <legend>ФИО и дата рождения</legend>

        <div className="form-row">
          <FormField control={form.personalData.lastName} />
          <FormField control={form.personalData.firstName} />
          <FormField control={form.personalData.middleName} />
        </div>

        <div className="form-row">
          <FormField control={form.personalData.birthDate} />
          <FormField control={form.personalData.gender} />
          <FormField control={form.personalData.birthPlace} />
        </div>
      </fieldset>

      <fieldset disabled={disabled} className="form-section">
        <legend>Паспортные данные</legend>

        <div className="form-row">
          <FormField control={form.passportData.series} />
          <FormField control={form.passportData.number} />
        </div>

        <div className="form-row">
          <FormField control={form.passportData.issueDate} />
          <FormField control={form.passportData.departmentCode} />
        </div>

        <div className="form-row">
          <FormField control={form.passportData.issuedBy} />
        </div>
      </fieldset>

      <fieldset disabled={disabled} className="form-section">
        <legend>Документы</legend>

        <div className="form-row">
          <FormField control={form.inn} />
          <FormField control={form.snils} />
        </div>
      </fieldset>

      <div className="form-section calculated-section">
        <h3>Итого</h3>

        <div className="form-row">
          <FormField control={form.fullName} />
          <FormField control={form.age} />
        </div>
      </div>
    </div>
  );
}
