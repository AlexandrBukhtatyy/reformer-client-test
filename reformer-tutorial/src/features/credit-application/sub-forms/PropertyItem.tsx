// components/PropertyItem.tsx - Элемент массива имущества

import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { Property } from '../model/types';

interface PropertyItemProps {
  control: GroupNodeWithControls<Property>;
}

export function PropertyItem({ control }: PropertyItemProps) {
  return (
    <div className="space-y-4 p-4 bg-white rounded border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.type} />
        <FormField control={control.estimatedValue} />
      </div>

      <FormField control={control.description} />

      <FormField control={control.hasEncumbrance} />
    </div>
  );
}
