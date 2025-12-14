import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../../type';

interface Step1FormProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step1Form({ control }: Step1FormProps) {
  const paymentTypeValue = useFormControlValue(control.paymentType!);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Тип страхования и основные параметры</h2>
        <p className="text-sm text-gray-500">Выберите тип страхования и укажите основные параметры</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.insuranceType} />
        <FormField control={control.insurancePeriod} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.startDate} />
        <FormField control={control.endDate} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.coverageAmount} />
        <FormField control={control.deductible} />
      </div>

      <div className="space-y-4">
        <FormField control={control.paymentType} />
        
        {paymentTypeValue === 'installments' && (
          <FormField control={control.installments} />
        )}
      </div>
    </div>
  );
}