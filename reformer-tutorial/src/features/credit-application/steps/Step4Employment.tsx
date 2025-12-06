/**
 * Шаг 4: Информация о занятости
 */

import { useFormControl, type GroupNodeWithControls, type FieldNode } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { CreditApplicationForm, EmploymentStatus } from '../model/types';

interface Step4EmploymentProps {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function Step4Employment({ control }: Step4EmploymentProps) {
  const { value: employmentStatus } = useFormControl(control.employmentStatus as FieldNode<EmploymentStatus>);
  const { value: additionalIncome } = useFormControl(control.additionalIncome as FieldNode<number | undefined>);

  const isWorking = employmentStatus === 'employed' || employmentStatus === 'selfEmployed';

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Шаг 4: Информация о занятости</h2>

      {/* Статус занятости */}
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <FormField control={control.employmentStatus} />
      </div>

      {/* Поля для работающих по найму */}
      {employmentStatus === 'employed' && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 space-y-4">
          <h3 className="font-medium text-blue-800">Информация о работодателе</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.companyName} className="md:col-span-2" />
            <FormField control={control.companyInn} />
            <FormField control={control.companyPhone} />
            <FormField control={control.companyAddress} className="md:col-span-2" />
            <FormField control={control.position} className="md:col-span-2" />
          </div>
        </div>
      )}

      {/* Поля для ИП */}
      {employmentStatus === 'selfEmployed' && (
        <div className="p-4 bg-green-50 rounded-lg border border-green-100 space-y-4">
          <h3 className="font-medium text-green-800">Информация о бизнесе</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.businessType} />
            <FormField control={control.businessInn} />
            <FormField control={control.businessActivity} className="md:col-span-2" />
          </div>
        </div>
      )}

      {/* Стаж работы */}
      {isWorking && (
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-700 mb-3">Стаж работы</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.workExperienceTotal} />
            <FormField control={control.workExperienceCurrent} />
          </div>
        </div>
      )}

      {/* Доход */}
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-700 mb-3">Доход</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.monthlyIncome} />
          <FormField control={control.additionalIncome} />
          {additionalIncome !== undefined && additionalIncome > 0 && (
            <FormField control={control.additionalIncomeSource} className="md:col-span-2" />
          )}
        </div>
      </div>

      {/* Вычисляемые поля */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-700 mb-3">Итого</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.totalIncome} />
          <FormField control={control.paymentToIncomeRatio} />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Процент платежа от дохода не должен превышать 50%.
        </p>
      </div>
    </div>
  );
}
