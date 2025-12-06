// sub-forms/PassportDataSubForm.tsx - Переиспользуемая группа паспортных данных

import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { PassportData } from '../model/types';

interface PassportDataSubFormProps {
  control: GroupNodeWithControls<PassportData>;
  title?: string;
}

export function PassportDataSubForm({ control, title }: PassportDataSubFormProps) {
  return (
    <div className="space-y-4">
      {title && <h4 className="font-medium text-gray-700">{title}</h4>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={control.series} />
        <FormField control={control.number} />
        <FormField control={control.departmentCode} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.issueDate} />
        <FormField control={control.issuedBy} />
      </div>
    </div>
  );
}
