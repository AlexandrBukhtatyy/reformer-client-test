/**
 * Компонент для отображения элемента созаемщика в массиве
 */

import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { PersonalDataSubForm } from '../sub-forms';
import type { CoBorrower } from '../model/types';

interface CoBorrowerItemProps {
  control: GroupNodeWithControls<CoBorrower>;
}

export function CoBorrowerItem({ control }: CoBorrowerItemProps) {
  return (
    <div className="space-y-6">
      <PersonalDataSubForm control={control.personalData} title="Персональные данные созаемщика" />

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Контактная информация</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.phone} />
          <FormField control={control.email} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.relationship} />
          <FormField control={control.monthlyIncome} />
        </div>
      </div>
    </div>
  );
}
