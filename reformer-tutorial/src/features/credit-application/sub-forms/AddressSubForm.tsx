/**
 * Под-форма для ввода адреса
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
      {title && <h4 className="font-medium text-gray-700">{title}</h4>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.region} className="md:col-span-2" />
        <FormField control={control.city} className="md:col-span-2" />
        <FormField control={control.street} className="md:col-span-2" />
        <FormField control={control.house} />
        <FormField control={control.apartment} />
        <FormField control={control.postalCode} />
      </div>
    </div>
  );
}
