// components/CoBorrowerItem.tsx - Элемент массива созаёмщиков

import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { PersonalDataSubForm } from '../sub-forms';
import type { CoBorrower } from '../model/types';

interface CoBorrowerItemProps {
  control: GroupNodeWithControls<CoBorrower>;
}

export function CoBorrowerItem({ control }: CoBorrowerItemProps) {
  return (
    <div className="space-y-4 p-4 bg-white rounded border border-gray-200">
      {/* Персональные данные созаёмщика */}
      <PersonalDataSubForm control={control.personalData} title="Персональные данные" />

      {/* Контактная информация */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <FormField control={control.phone} />
        <FormField control={control.email} />
      </div>

      {/* Отношение и доход */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.relationship} />
        <FormField control={control.monthlyIncome} />
      </div>
    </div>
  );
}
