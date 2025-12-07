/**
 * Шаг 5: Дополнительная информация
 */

import { useFormControlValue, type GroupNodeWithControls, type FormFields } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { FormArrayManager } from '@/components/ui/FormArrayManager';

import type { CreditApplicationForm, Property, ExistingLoan, CoBorrower } from '../model/types';

interface Step5AdditionalInfoProps {
  form: GroupNodeWithControls<CreditApplicationForm>;
  disabled?: boolean;
}

// Компонент для элемента имущества
function PropertyItemComponent({ control }: { control: GroupNodeWithControls<FormFields> }) {
  const item = control as unknown as GroupNodeWithControls<Property>;
  return (
    <div className="space-y-4">
      <div className="form-row">
        <FormField control={item.type} />
        <FormField control={item.estimatedValue} />
      </div>
      <div className="form-row">
        <FormField control={item.description} />
      </div>
      <div className="form-row">
        <FormField control={item.hasEncumbrance} />
      </div>
    </div>
  );
}

// Компонент для существующего кредита
function ExistingLoanItemComponent({ control }: { control: GroupNodeWithControls<FormFields> }) {
  const item = control as unknown as GroupNodeWithControls<ExistingLoan>;
  return (
    <div className="space-y-4">
      <div className="form-row">
        <FormField control={item.bank} />
        <FormField control={item.type} />
      </div>
      <div className="form-row">
        <FormField control={item.amount} />
        <FormField control={item.remainingAmount} />
      </div>
      <div className="form-row">
        <FormField control={item.monthlyPayment} />
        <FormField control={item.maturityDate} />
      </div>
    </div>
  );
}

// Компонент для созаемщика
function CoBorrowerItemComponent({ control }: { control: GroupNodeWithControls<FormFields> }) {
  const item = control as unknown as GroupNodeWithControls<CoBorrower>;
  return (
    <div className="space-y-4">
      <div className="form-row">
        <FormField control={item.personalData.lastName} />
        <FormField control={item.personalData.firstName} />
        <FormField control={item.personalData.middleName} />
      </div>
      <div className="form-row">
        <FormField control={item.personalData.birthDate} />
        <FormField control={item.personalData.gender} />
      </div>
      <div className="form-row">
        <FormField control={item.phone} />
        <FormField control={item.email} />
      </div>
      <div className="form-row">
        <FormField control={item.relationship} />
        <FormField control={item.monthlyIncome} />
      </div>
    </div>
  );
}

export function Step5AdditionalInfo({ form, disabled }: Step5AdditionalInfoProps) {
  const hasPropertyValue = useFormControlValue(form.hasProperty);
  const hasExistingLoansValue = useFormControlValue(form.hasExistingLoans);
  const hasCoBorrowerValue = useFormControlValue(form.hasCoBorrower);

  return (
    <div className="form-step step-5">
      <h2>Дополнительная информация</h2>

      <fieldset disabled={disabled} className="form-section">
        <legend>Личная информация</legend>

        <div className="form-row">
          <FormField control={form.maritalStatus} />
        </div>

        <div className="form-row">
          <FormField control={form.dependents} />
          <FormField control={form.education} />
        </div>
      </fieldset>

      <fieldset disabled={disabled} className="form-section">
        <legend>Имущество</legend>

        <div className="form-row">
          <FormField control={form.hasProperty} />
        </div>

        {hasPropertyValue && (
          <FormArrayManager
            control={form.properties}
            component={PropertyItemComponent}
            itemLabel="Имущество"
            addButtonLabel="+ Добавить имущество"
            emptyMessage="Нет добавленного имущества"
          />
        )}
      </fieldset>

      <fieldset disabled={disabled} className="form-section">
        <legend>Существующие кредиты</legend>

        <div className="form-row">
          <FormField control={form.hasExistingLoans} />
        </div>

        {hasExistingLoansValue && (
          <FormArrayManager
            control={form.existingLoans}
            component={ExistingLoanItemComponent}
            itemLabel="Кредит"
            addButtonLabel="+ Добавить кредит"
            emptyMessage="Нет добавленных кредитов"
          />
        )}
      </fieldset>

      <fieldset disabled={disabled} className="form-section">
        <legend>Созаемщики</legend>

        <div className="form-row">
          <FormField control={form.hasCoBorrower} />
        </div>

        {hasCoBorrowerValue && (
          <FormArrayManager
            control={form.coBorrowers}
            component={CoBorrowerItemComponent}
            itemLabel="Созаемщик"
            addButtonLabel="+ Добавить созаемщика"
            emptyMessage="Нет добавленных созаемщиков"
          />
        )}
      </fieldset>

      <div className="form-section calculated-section">
        <h3>Расчёты</h3>

        <div className="form-row">
          <FormField control={form.paymentToIncomeRatio} />
          <FormField control={form.coBorrowersIncome} />
        </div>
      </div>
    </div>
  );
}
