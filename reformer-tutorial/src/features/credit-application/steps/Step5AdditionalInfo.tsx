/**
 * Шаг 5: Дополнительная информация
 */

import { useFormControl, type GroupNodeWithControls, type FieldNode } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { FormArrayManager } from '@/components/ui/FormArrayManager';
import { PropertyItem } from '../components/PropertyItem';
import { ExistingLoanItem } from '../components/ExistingLoanItem';
import { CoBorrowerItem } from '../components/CoBorrowerItem';
import type { CreditApplicationForm } from '../model/types';
import {
  DEFAULT_PROPERTY,
  DEFAULT_EXISTING_LOAN,
  DEFAULT_CO_BORROWER,
} from '../model/constants';

interface Step5AdditionalInfoProps {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function Step5AdditionalInfo({ control }: Step5AdditionalInfoProps) {
  const { value: hasProperty } = useFormControl(control.hasProperty as FieldNode<boolean>);
  const { value: hasExistingLoans } = useFormControl(control.hasExistingLoans as FieldNode<boolean>);
  const { value: hasCoBorrower } = useFormControl(control.hasCoBorrower as FieldNode<boolean>);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Шаг 5: Дополнительная информация</h2>

      {/* Личная информация */}
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-700 mb-3">Личная информация</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField control={control.maritalStatus} className="md:col-span-2" />
          <FormField control={control.dependents} />
          <FormField control={control.education} className="md:col-span-3" />
        </div>
      </div>

      {/* Имущество */}
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <div className="mb-4">
          <FormField control={control.hasProperty} />
        </div>

        {hasProperty && (
          <FormArrayManager
            control={control.properties}
            component={PropertyItem}
            defaultItem={DEFAULT_PROPERTY}
            addButtonText="Добавить имущество"
            emptyMessage="Нет добавленного имущества"
          />
        )}
      </div>

      {/* Существующие кредиты */}
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <div className="mb-4">
          <FormField control={control.hasExistingLoans} />
        </div>

        {hasExistingLoans && (
          <>
            <p className="text-sm text-amber-600 mb-4">
              Наличие существующих кредитов влияет на решение по заявке. Пожалуйста, укажите все активные кредиты.
            </p>
            <FormArrayManager
              control={control.existingLoans}
              component={ExistingLoanItem}
              defaultItem={DEFAULT_EXISTING_LOAN}
              addButtonText="Добавить кредит"
              emptyMessage="Нет добавленных кредитов"
            />
          </>
        )}
      </div>

      {/* Созаемщики */}
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <div className="mb-4">
          <FormField control={control.hasCoBorrower} />
        </div>

        {hasCoBorrower && (
          <>
            <p className="text-sm text-blue-600 mb-4">
              Добавление созаемщика увеличивает шансы на одобрение кредита и позволяет получить большую сумму.
            </p>
            <FormArrayManager
              control={control.coBorrowers}
              component={CoBorrowerItem}
              defaultItem={DEFAULT_CO_BORROWER}
              addButtonText="Добавить созаемщика"
              emptyMessage="Нет добавленных созаемщиков"
            />

            {/* Вычисляемый доход созаемщиков */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <FormField control={control.coBorrowersIncome} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
