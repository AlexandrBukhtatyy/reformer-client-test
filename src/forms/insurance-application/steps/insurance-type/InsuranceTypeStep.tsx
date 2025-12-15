import { useFormControlValue } from '@reformer/core';
import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { InsuranceApplicationForm } from '../../type';

interface InsuranceTypeStepProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function InsuranceTypeStep({ control }: InsuranceTypeStepProps) {
  const paymentType = useFormControlValue(control.paymentType);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Тип страхования и основные параметры</h2>

      <FormField control={control.insuranceType} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.insurancePeriod} />
        <FormField control={control.coverageAmount} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.startDate} />
        <FormField control={control.endDate} />
      </div>

      <FormField control={control.deductible} />

      <div className="space-y-4">
        <FormField control={control.paymentType} />

        {paymentType === 'installments' && (
          <FormField control={control.installments} />
        )}
      </div>
    </div>
  );
}
