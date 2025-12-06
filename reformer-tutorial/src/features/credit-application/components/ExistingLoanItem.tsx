/**
 * Компонент для отображения элемента существующего кредита в массиве
 */

import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { ExistingLoan } from '../model/types';

interface ExistingLoanItemProps {
  control: GroupNodeWithControls<ExistingLoan>;
}

export function ExistingLoanItem({ control }: ExistingLoanItemProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.bank} />
        <FormField control={control.type} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.amount} />
        <FormField control={control.remainingAmount} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.monthlyPayment} />
        <FormField control={control.maturityDate} />
      </div>
    </div>
  );
}
