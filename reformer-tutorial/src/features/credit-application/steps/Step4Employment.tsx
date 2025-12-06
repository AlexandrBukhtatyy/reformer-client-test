/**
 * Шаг 4: Информация о занятости
 */

import type { GroupNodeWithControls } from '@reformer/core';
import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { CreditApplicationForm } from '../model/types';

interface Step4EmploymentProps {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function Step4Employment({ control }: Step4EmploymentProps) {
  const employmentStatus = useFormControlValue(control.employmentStatus);

  return (
    <div className="space-y-6">
      {/* Статус занятости */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Статус занятости</h4>
        <FormField control={control.employmentStatus} />
      </div>

      {/* Поля для работающих по найму */}
      {employmentStatus === 'employed' && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Информация о работодателе</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.companyName} />
              <FormField control={control.companyInn} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.companyPhone} />
              <FormField control={control.position} />
            </div>
            <FormField control={control.companyAddress} />
          </div>
        </div>
      )}

      {/* Поля для ИП */}
      {employmentStatus === 'selfEmployed' && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Информация о бизнесе</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.businessType} />
              <FormField control={control.businessInn} />
            </div>
            <FormField control={control.businessActivity} />
          </div>
        </div>
      )}

      {/* Стаж */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Стаж работы</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.workExperienceTotal} />
          <FormField control={control.workExperienceCurrent} />
        </div>
      </div>

      {/* Доход */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Доход</h4>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.monthlyIncome} />
            <FormField control={control.additionalIncome} />
          </div>
          <FormField control={control.additionalIncomeSource} />
        </div>
      </div>

      {/* Вычисляемые поля */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-3">Итого</h4>
        <FormField control={control.totalIncome} />
      </div>
    </div>
  );
}
