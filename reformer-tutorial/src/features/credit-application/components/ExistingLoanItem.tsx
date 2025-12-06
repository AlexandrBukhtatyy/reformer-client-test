/**
 * Компонент элемента массива - Существующий кредит
 */

import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { ExistingLoan } from '../model/types';

interface ExistingLoanItemProps {
  control: GroupNodeWithControls<ExistingLoan>;
  index: number;
}

export function ExistingLoanItem({ control, index }: ExistingLoanItemProps) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h5 className="font-medium text-gray-700 mb-3">Кредит #{index + 1}</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.bank} />
        <FormField control={control.type} />
        <FormField control={control.amount} />
        <FormField control={control.remainingAmount} />
        <FormField control={control.monthlyPayment} />
        <FormField control={control.maturityDate} />
      </div>
    </div>
  );
}
