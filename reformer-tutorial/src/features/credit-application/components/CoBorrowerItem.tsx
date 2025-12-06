/**
 * Компонент элемента массива - Созаемщик
 */

import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { PersonalDataSubForm } from '../sub-forms';
import type { CoBorrower } from '../model/types';

interface CoBorrowerItemProps {
  control: GroupNodeWithControls<CoBorrower>;
  index: number;
}

export function CoBorrowerItem({ control, index }: CoBorrowerItemProps) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h5 className="font-medium text-gray-700 mb-3">Созаемщик #{index + 1}</h5>

      <PersonalDataSubForm
        control={control.personalData}
        title="Личные данные"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <FormField control={control.phone} />
        <FormField control={control.email} />
        <FormField control={control.relationship} />
        <FormField control={control.monthlyIncome} />
      </div>
    </div>
  );
}
