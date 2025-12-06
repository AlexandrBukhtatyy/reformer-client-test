// steps/Step2PersonalData.tsx - Шаг 2: Персональные данные

import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { PersonalDataSubForm, PassportDataSubForm } from '../sub-forms';
import type { CreditApplicationForm } from '../model/types';

interface Step2Props {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function Step2PersonalData({ control }: Step2Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Персональные данные</h2>

      {/* Персональные данные */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <PersonalDataSubForm control={control.personalData} title="Основная информация" />
      </div>

      {/* Вычисляемые поля */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <FormField control={control.fullName} />
        <FormField control={control.age} />
      </div>

      {/* Паспортные данные */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <PassportDataSubForm control={control.passportData} title="Паспортные данные" />
      </div>

      {/* ИНН и СНИЛС */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-4">Документы</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.inn} />
          <FormField control={control.snils} />
        </div>
      </div>
    </div>
  );
}
