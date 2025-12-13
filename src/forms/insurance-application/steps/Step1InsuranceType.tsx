// Step 1: Insurance Type and Basic Parameters
import { useEffect } from 'react';
import type { GroupNodeWithControls } from '@reformer/core';
import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { InsuranceApplicationForm } from '../type';

// Helper to add months to date
const addMonths = (dateStr: string, months: number): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  date.setMonth(date.getMonth() + months);
  return date.toISOString().split('T')[0];
};

interface Step1Props {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step1InsuranceType({ control }: Step1Props) {
  const paymentType = useFormControlValue(control.paymentType);
  const startDate = useFormControlValue(control.startDate);
  const insurancePeriod = useFormControlValue(control.insurancePeriod);

  // Calculate endDate when startDate or insurancePeriod changes
  useEffect(() => {
    if (startDate && insurancePeriod) {
      const endDate = addMonths(startDate, Number(insurancePeriod));
      control.endDate.setValue(endDate);
    } else {
      control.endDate.setValue('');
    }
  }, [startDate, insurancePeriod, control.endDate]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 1: Тип страхования и основные параметры</h2>

      <div className="space-y-4">
        {/* Insurance Type Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Основное</h3>
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
        </section>

        {/* Payment Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Оплата</h3>
          <FormField control={control.paymentType} />
          {paymentType === 'installments' && (
            <FormField control={control.installments} />
          )}
        </section>
      </div>
    </div>
  );
}
