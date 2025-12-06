/**
 * Компонент элемента массива - Имущество
 */

import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { Property } from '../model/types';

interface PropertyItemProps {
  control: GroupNodeWithControls<Property>;
  index: number;
}

export function PropertyItem({ control, index }: PropertyItemProps) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h5 className="font-medium text-gray-700 mb-3">Имущество #{index + 1}</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.type} />
        <FormField control={control.estimatedValue} />
        <FormField control={control.description} className="md:col-span-2" />
        <FormField control={control.hasEncumbrance} className="md:col-span-2" />
      </div>
    </div>
  );
}
