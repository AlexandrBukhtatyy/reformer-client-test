// steps/Step5AdditionalInfo.tsx - Шаг 5: Дополнительная информация

import { useFormControl, type GroupNodeWithControls, type FieldNode } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { FormArrayManager } from '@/components/ui/FormArrayManager';
import { PropertyItem } from '../sub-forms/PropertyItem';
import { ExistingLoanItem } from '../sub-forms/ExistingLoanItem';
import { CoBorrowerItem } from '../sub-forms/CoBorrowerItem';
import type { CreditApplicationForm } from '../model/types';

interface Step5Props {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function Step5AdditionalInfo({ control }: Step5Props) {
  // Получаем флаги для условного рендеринга массивов
  const { value: hasProperty } = useFormControl(control.hasProperty as FieldNode<boolean>);
  const { value: hasExistingLoans } = useFormControl(
    control.hasExistingLoans as FieldNode<boolean>
  );
  const { value: hasCoBorrower } = useFormControl(control.hasCoBorrower as FieldNode<boolean>);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Дополнительная информация</h2>

      {/* Личная информация */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-4">Личная информация</h4>
        <div className="space-y-4">
          <FormField control={control.maritalStatus} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.dependents} />
            <FormField control={control.education} />
          </div>
        </div>
      </div>

      {/* Имущество */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-4">Имущество</h4>
        <FormField control={control.hasProperty} />

        {hasProperty && (
          <div className="mt-4">
            <FormArrayManager
              control={control.properties}
              component={PropertyItem}
              itemLabel="Имущество"
              addButtonLabel="+ Добавить имущество"
              emptyMessage="Нет добавленного имущества"
            />
          </div>
        )}
      </div>

      {/* Существующие кредиты */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-4">Существующие кредиты</h4>
        <FormField control={control.hasExistingLoans} />

        {hasExistingLoans && (
          <div className="mt-4">
            <FormArrayManager
              control={control.existingLoans}
              component={ExistingLoanItem}
              itemLabel="Кредит"
              addButtonLabel="+ Добавить кредит"
              emptyMessage="Нет добавленных кредитов"
            />
          </div>
        )}
      </div>

      {/* Созаёмщики */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-4">Созаёмщики</h4>
        <FormField control={control.hasCoBorrower} />

        {hasCoBorrower && (
          <div className="mt-4">
            <FormArrayManager
              control={control.coBorrowers}
              component={CoBorrowerItem}
              itemLabel="Созаёмщик"
              addButtonLabel="+ Добавить созаёмщика"
              emptyMessage="Нет добавленных созаёмщиков"
            />

            {/* Суммарный доход созаёмщиков */}
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <FormField control={control.coBorrowersIncome} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
