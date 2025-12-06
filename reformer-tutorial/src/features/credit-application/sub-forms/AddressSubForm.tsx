/**
 * Под-форма адреса
 */

import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { Address } from '../model/types';

interface AddressSubFormProps {
  control: GroupNodeWithControls<Address>;
  title?: string;
}

export function AddressSubForm({ control, title }: AddressSubFormProps) {
  return (
    <div className="space-y-4">
      {title && <h4 className="font-medium text-gray-900">{title}</h4>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.region} />
        <FormField control={control.city} />
      </div>

      <FormField control={control.street} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={control.house} />
        <FormField control={control.apartment} />
        <FormField control={control.postalCode} />
      </div>
    </div>
  );
}
