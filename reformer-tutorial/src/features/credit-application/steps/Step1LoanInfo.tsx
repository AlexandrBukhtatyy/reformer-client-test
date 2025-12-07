/**
 * Шаг 1: Основная информация о кредите
 */

import { useFormControlValue, type GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';

import type { CreditApplicationForm } from '../model/types';

interface Step1LoanInfoProps {
  form: GroupNodeWithControls<CreditApplicationForm>;
  disabled?: boolean;
}

export function Step1LoanInfo({ form, disabled }: Step1LoanInfoProps) {
  // Получаем значения для условного рендеринга
  const loanTypeValue = useFormControlValue(form.loanType);

  const isMortgage = loanTypeValue === 'mortgage';
  const isCarLoan = loanTypeValue === 'car';

  return (
    <div className="form-step step-1">
      <h2>Основная информация о кредите</h2>

      <fieldset disabled={disabled} className="form-section">
        <legend>Параметры кредита</legend>

        <div className="form-row">
          <FormField control={form.loanType} />
        </div>

        <div className="form-row">
          <FormField control={form.loanAmount} />
          <FormField control={form.loanTerm} />
        </div>

        <div className="form-row">
          <FormField control={form.loanPurpose} />
        </div>
      </fieldset>

      {isMortgage && (
        <fieldset disabled={disabled} className="form-section">
          <legend>Параметры ипотеки</legend>

          <div className="form-row">
            <FormField control={form.propertyValue} />
            <FormField control={form.initialPayment} />
          </div>
        </fieldset>
      )}

      {isCarLoan && (
        <fieldset disabled={disabled} className="form-section">
          <legend>Параметры автокредита</legend>

          <div className="form-row">
            <FormField control={form.carBrand} />
            <FormField control={form.carModel} />
          </div>

          <div className="form-row">
            <FormField control={form.carYear} />
            <FormField control={form.carPrice} />
          </div>
        </fieldset>
      )}

      <div className="form-section calculated-section">
        <h3>Расчёт</h3>

        <div className="form-row">
          <FormField control={form.interestRate} />
          <FormField control={form.monthlyPayment} />
        </div>
      </div>
    </div>
  );
}
