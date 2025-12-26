import { useFormContext, useWatch } from 'react-hook-form';
import { FormInput, FormSelect, FormRadioGroup } from '@/components/form';
import {
  INSURANCE_TYPE_OPTIONS,
  INSURANCE_PERIOD_OPTIONS,
  PAYMENT_TYPE_OPTIONS,
  INSTALLMENTS_OPTIONS,
} from '../../constants';
import type { InsuranceFormData } from '../../types';
import { useFormMode } from '../../hooks';
import { ComputedField } from '../ui';

export function Step1InsuranceType() {
  const { isReadOnly } = useFormMode();
  const { control } = useFormContext<InsuranceFormData>();

  const paymentType = useWatch({ control, name: 'paymentType' });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 1: Тип страхования</h2>

      <FormRadioGroup
        name="insuranceType"
        label="Выберите тип страхования"
        options={INSURANCE_TYPE_OPTIONS}
        disabled={isReadOnly}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          name="insurancePeriod"
          label="Срок страхования (месяцев)"
          options={INSURANCE_PERIOD_OPTIONS}
          disabled={isReadOnly}
        />
        <FormInput
          name="startDate"
          label="Дата начала действия"
          type="date"
          disabled={isReadOnly}
        />
      </div>

      <div>
        <ComputedField
          name="endDate"
          label="Дата окончания действия"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          name="coverageAmount"
          label="Страховая сумма (руб.)"
          type="number"
          placeholder="1000000"
          disabled={isReadOnly}
        />
        <FormInput
          name="deductible"
          label="Франшиза (руб.)"
          type="number"
          placeholder="10000"
          disabled={isReadOnly}
        />
      </div>

      <FormRadioGroup
        name="paymentType"
        label="Способ оплаты"
        options={PAYMENT_TYPE_OPTIONS}
        disabled={isReadOnly}
      />

      {paymentType === 'installments' && (
        <FormSelect
          name="installments"
          label="Количество платежей"
          options={INSTALLMENTS_OPTIONS}
          disabled={isReadOnly}
        />
      )}
    </div>
  );
}
