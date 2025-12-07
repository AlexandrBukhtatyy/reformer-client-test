/**
 * Шаг 4: Информация о занятости
 */

import { useFormControlValue, type GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';

import type { CreditApplicationForm } from '../model/types';

interface Step4EmploymentProps {
  form: GroupNodeWithControls<CreditApplicationForm>;
  disabled?: boolean;
}

export function Step4Employment({ form, disabled }: Step4EmploymentProps) {
  const status = useFormControlValue(form.employmentStatus);
  const isEmployed = status === 'employed';
  const isSelfEmployed = status === 'selfEmployed';

  return (
    <div className="form-step step-4">
      <h2>Информация о занятости</h2>

      <fieldset disabled={disabled} className="form-section">
        <legend>Статус занятости</legend>

        <div className="form-row">
          <FormField control={form.employmentStatus} />
        </div>
      </fieldset>

      {isEmployed && (
        <fieldset disabled={disabled} className="form-section">
          <legend>Информация о работодателе</legend>

          <div className="form-row">
            <FormField control={form.companyName} />
            <FormField control={form.companyInn} />
          </div>

          <div className="form-row">
            <FormField control={form.companyPhone} />
            <FormField control={form.position} />
          </div>

          <div className="form-row">
            <FormField control={form.companyAddress} />
          </div>
        </fieldset>
      )}

      {isSelfEmployed && (
        <fieldset disabled={disabled} className="form-section">
          <legend>Информация о бизнесе</legend>

          <div className="form-row">
            <FormField control={form.businessType} />
            <FormField control={form.businessInn} />
          </div>

          <div className="form-row">
            <FormField control={form.businessActivity} />
          </div>
        </fieldset>
      )}

      <fieldset disabled={disabled} className="form-section">
        <legend>Стаж работы</legend>

        <div className="form-row">
          <FormField control={form.workExperienceTotal} />
          <FormField control={form.workExperienceCurrent} />
        </div>
      </fieldset>

      <fieldset disabled={disabled} className="form-section">
        <legend>Доход</legend>

        <div className="form-row">
          <FormField control={form.monthlyIncome} />
          <FormField control={form.additionalIncome} />
        </div>

        <div className="form-row">
          <FormField control={form.additionalIncomeSource} />
        </div>
      </fieldset>

      <div className="form-section calculated-section">
        <h3>Итого</h3>

        <div className="form-row">
          <FormField control={form.totalIncome} />
        </div>
      </div>
    </div>
  );
}
