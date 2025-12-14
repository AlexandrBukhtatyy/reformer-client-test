import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../../type';

interface Step1FormProps {
  form: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step1Form({ form }: Step1FormProps) {
  const paymentTypeValue = useFormControlValue(form?.paymentType);

  if (!form) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Тип страхования и основные параметры</h2>
        <p className="text-sm text-gray-500">Выберите тип страхования и укажите основные параметры</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={form.insuranceType} />
        <FormField control={form.insurancePeriod} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={form.startDate} />
        <FormField control={form.endDate} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={form.coverageAmount} />
        <FormField control={form.deductible} />
      </div>

      <div className="space-y-4">
        <FormField control={form.paymentType} />
        
        {paymentTypeValue === 'installments' && (
          <FormField control={form.installments} />
        )}
      </div>
    </div>
  );
}