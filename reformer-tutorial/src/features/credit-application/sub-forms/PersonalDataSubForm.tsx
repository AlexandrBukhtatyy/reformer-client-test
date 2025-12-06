/**
 * Под-форма для ввода персональных данных
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
      {title && <h4 className="font-medium text-gray-700">{title}</h4>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={control.lastName} />
        <FormField control={control.firstName} />
        <FormField control={control.middleName} />
        <FormField control={control.birthDate} />
        <FormField control={control.gender} className="md:col-span-2" />
        <FormField control={control.birthPlace} className="md:col-span-3" />
      </div>
    </div>
  );
}
