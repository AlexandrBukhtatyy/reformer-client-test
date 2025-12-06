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
      <h2 className="text-xl font-semibold text-gray-800">Шаг 2: Персональные данные</h2>

      {/* Личные данные */}
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <PersonalDataSubForm
          control={control.personalData}
          title="Личные данные"
        />
      </div>

      {/* Вычисляемые поля */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <FormField control={control.fullName} />
        <FormField control={control.age} />
      </div>

      {/* Паспортные данные */}
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <PassportDataSubForm
          control={control.passportData}
          title="Паспортные данные"
        />
      </div>

      {/* Документы */}
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-700 mb-3">Документы</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.inn} />
          <FormField control={control.snils} />
        </div>
      </div>
    </div>
  );
}
