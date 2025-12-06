/**
 * Компонент для отображения элемента имущества в массиве
 */

import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { Property } from '../model/types';

interface PropertyItemProps {
  control: GroupNodeWithControls<Property>;
}

export function PropertyItem({ control }: PropertyItemProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.type} />
        <FormField control={control.estimatedValue} />
      </div>
      <FormField control={control.description} />
      <FormField control={control.hasEncumbrance} />
    </div>
  );
}
