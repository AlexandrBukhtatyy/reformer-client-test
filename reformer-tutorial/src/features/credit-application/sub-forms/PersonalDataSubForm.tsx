/**
 * Под-форма персональных данных
 */

import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { PersonalData } from '../model/types';

interface PersonalDataSubFormProps {
  control: GroupNodeWithControls<PersonalData>;
  title?: string;
}

export function PersonalDataSubForm({ control, title }: PersonalDataSubFormProps) {
  return (
    <div className="space-y-4">
      {title && <h4 className="font-medium text-gray-900">{title}</h4>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={control.lastName} />
        <FormField control={control.firstName} />
        <FormField control={control.middleName} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.birthDate} />
        <FormField control={control.gender} />
      </div>

      <FormField control={control.birthPlace} />
    </div>
  );
}
