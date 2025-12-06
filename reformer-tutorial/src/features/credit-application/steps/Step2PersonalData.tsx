/**
 * Шаг 2: Персональные данные
 */

import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { PersonalDataSubForm, PassportDataSubForm } from '../sub-forms';
import type { CreditApplicationForm } from '../model/types';

interface Step2PersonalDataProps {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function Step2PersonalData({ control }: Step2PersonalDataProps) {
  return (
    <div className="space-y-6">
      {/* Личные данные */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <PersonalDataSubForm control={control.personalData} title="Личные данные" />
      </div>

      {/* Паспортные данные */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <PassportDataSubForm control={control.passportData} title="Паспортные данные" />
      </div>

      {/* Документы */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Документы</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.inn} />
          <FormField control={control.snils} />
        </div>
      </div>

      {/* Вычисляемые поля */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-3">Автоматически вычисляемые данные</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.fullName} />
          <FormField control={control.age} />
        </div>
      </div>
    </div>
  );
}
