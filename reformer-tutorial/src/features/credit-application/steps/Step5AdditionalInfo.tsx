/**
 * Шаг 5: Дополнительная информация
 */

import type { GroupNodeWithControls } from '@reformer/core';
import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { FormArrayManager } from '@/components/ui/FormArrayManager';
import { PropertyItem } from '../components/PropertyItem';
import { ExistingLoanItem } from '../components/ExistingLoanItem';
import { CoBorrowerItem } from '../components/CoBorrowerItem';
import type { CreditApplicationForm } from '../model/types';

interface Step5AdditionalInfoProps {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function Step5AdditionalInfo({ control }: Step5AdditionalInfoProps) {
  const hasProperty = useFormControlValue(control.hasProperty);
  const hasExistingLoans = useFormControlValue(control.hasExistingLoans);
  const hasCoBorrower = useFormControlValue(control.hasCoBorrower);

  return (
    <div className="space-y-6">
      {/* Семейное положение */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Личная информация</h4>
        <div className="space-y-4">
          <FormField control={control.maritalStatus} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.dependents} />
            <FormField control={control.education} />
          </div>
        </div>
      </div>

      {/* Имущество */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Имущество</h4>
        <FormField control={control.hasProperty} className="mb-4" />

        {hasProperty && (
          <FormArrayManager
            control={control.properties}
            component={PropertyItem}
            itemLabel="Имущество"
            addButtonLabel="+ Добавить имущество"
            emptyMessage="Нет добавленного имущества. Нажмите кнопку выше, чтобы добавить."
          />
        )}
      </div>

      {/* Существующие кредиты */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Существующие кредиты</h4>
        <FormField control={control.hasExistingLoans} className="mb-4" />

        {hasExistingLoans && (
          <FormArrayManager
            control={control.existingLoans}
            component={ExistingLoanItem}
            itemLabel="Кредит"
            addButtonLabel="+ Добавить кредит"
            emptyMessage="Нет добавленных кредитов. Нажмите кнопку выше, чтобы добавить."
          />
        )}
      </div>

      {/* Созаемщики */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Созаемщики</h4>
        <FormField control={control.hasCoBorrower} className="mb-4" />

        {hasCoBorrower && (
          <FormArrayManager
            control={control.coBorrowers}
            component={CoBorrowerItem}
            itemLabel="Созаемщик"
            addButtonLabel="+ Добавить созаемщика"
            emptyMessage="Нет добавленных созаемщиков. Нажмите кнопку выше, чтобы добавить."
          />
        )}
      </div>

      {/* Вычисляемые поля */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-3">Расчетные показатели</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.paymentToIncomeRatio} />
          <FormField control={control.coBorrowersIncome} />
        </div>
      </div>
    </div>
  );
}
