// steps/Step4Employment.tsx - Шаг 4: Информация о занятости

import { useFormControl, type GroupNodeWithControls, type FieldNode } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { CreditApplicationForm } from '../model/types';

interface Step4Props {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function Step4Employment({ control }: Step4Props) {
  // Получаем статус занятости для условного рендеринга
  const { value: employmentStatus } = useFormControl(
    control.employmentStatus as FieldNode<CreditApplicationForm['employmentStatus']>
  );

  // Получаем значение дополнительного дохода
  const { value: additionalIncome } = useFormControl(
    control.additionalIncome as FieldNode<number | undefined>
  );

  const isEmployed = employmentStatus === 'employed';
  const isSelfEmployed = employmentStatus === 'selfEmployed';
  const hasAdditionalIncome = (additionalIncome ?? 0) > 0;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Информация о занятости</h2>

      {/* Статус занятости */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <FormField control={control.employmentStatus} />
      </div>

      {/* Поля для работающих по найму */}
      {isEmployed && (
        <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
          <h3 className="font-medium text-blue-900 mb-4">Информация о работодателе</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.companyName} />
            <FormField control={control.companyInn} />
            <FormField control={control.companyPhone} />
            <FormField control={control.position} />
          </div>
          <div className="mt-4">
            <FormField control={control.companyAddress} />
          </div>
        </div>
      )}

      {/* Поля для самозанятых */}
      {isSelfEmployed && (
        <div className="p-4 border border-green-200 rounded-lg bg-green-50">
          <h3 className="font-medium text-green-900 mb-4">Информация о бизнесе</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.businessType} />
            <FormField control={control.businessInn} />
          </div>
          <div className="mt-4">
            <FormField control={control.businessActivity} />
          </div>
        </div>
      )}

      {/* Стаж работы */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-4">Стаж работы</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.workExperienceTotal} />
          <FormField control={control.workExperienceCurrent} />
        </div>
      </div>

      {/* Доход */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-4">Доход</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.monthlyIncome} />
          <FormField control={control.additionalIncome} />
        </div>

        {/* Источник дополнительного дохода (если есть доп. доход) */}
        {hasAdditionalIncome && (
          <div className="mt-4">
            <FormField control={control.additionalIncomeSource} />
          </div>
        )}

        {/* Вычисляемое поле - общий доход */}
        <div className="mt-4 p-3 bg-gray-50 rounded">
          <FormField control={control.totalIncome} />
        </div>
      </div>
    </div>
  );
}
