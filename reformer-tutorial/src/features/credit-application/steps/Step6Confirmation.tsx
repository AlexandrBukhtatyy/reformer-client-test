/**
 * Шаг 6: Подтверждение и согласия
 */

import { useFormControlValue, type GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';

import type { CreditApplicationForm } from '../model/types';

interface Step6ConfirmationProps {
  form: GroupNodeWithControls<CreditApplicationForm>;
  disabled?: boolean;
}

export function Step6Confirmation({ form, disabled }: Step6ConfirmationProps) {
  // Получаем значения для отображения итоговой информации
  const fullName = useFormControlValue(form.fullName);
  const loanType = useFormControlValue(form.loanType);
  const loanAmount = useFormControlValue(form.loanAmount);
  const loanTerm = useFormControlValue(form.loanTerm);
  const interestRate = useFormControlValue(form.interestRate);
  const monthlyPayment = useFormControlValue(form.monthlyPayment);
  const totalIncome = useFormControlValue(form.totalIncome);

  return (
    <div className="form-step step-6">
      <h2>Подтверждение заявки</h2>

      <div className="form-section summary-section">
        <h3>Итоговая информация</h3>

        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Заявитель:</span>
            <span className="summary-value">{fullName || '—'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Тип кредита:</span>
            <span className="summary-value">{loanType || '—'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Сумма:</span>
            <span className="summary-value">
              {loanAmount?.toLocaleString() || '—'} ₽
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Срок:</span>
            <span className="summary-value">{loanTerm || '—'} мес.</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Ставка:</span>
            <span className="summary-value">{interestRate || '—'}%</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Ежемесячный платёж:</span>
            <span className="summary-value">
              {monthlyPayment?.toLocaleString() || '—'} ₽
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Общий доход:</span>
            <span className="summary-value">
              {totalIncome?.toLocaleString() || '—'} ₽
            </span>
          </div>
        </div>
      </div>

      <fieldset disabled={disabled} className="form-section">
        <legend>Согласия</legend>

        <div className="consent-list">
          <FormField control={form.agreePersonalData} />
          <FormField control={form.agreeCreditHistory} />
          <FormField control={form.agreeMarketing} />
          <FormField control={form.agreeTerms} />
          <FormField control={form.confirmAccuracy} />
        </div>
      </fieldset>

      <fieldset disabled={disabled} className="form-section">
        <legend>Подтверждение</legend>

        <div className="form-row">
          <FormField control={form.electronicSignature} />
        </div>

        <p className="hint">
          Введите 6-значный код, отправленный на ваш номер телефона
        </p>
      </fieldset>
    </div>
  );
}
