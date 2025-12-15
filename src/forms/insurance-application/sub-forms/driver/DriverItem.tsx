import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/button';
import type { DriverData } from './type';

interface DriverItemProps {
  control: GroupNodeWithControls<DriverData>;
  onRemove: () => void;
  index: number;
}

export function DriverItem({ control, onRemove, index }: DriverItemProps) {
  return (
    <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Водитель {index + 1}</h4>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={onRemove}
        >
          Удалить
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={control.lastName} />
        <FormField control={control.firstName} />
        <FormField control={control.middleName} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.birthDate} />
        <FormField control={control.age} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={control.licenseNumber} />
        <FormField control={control.licenseIssueDate} />
        <FormField control={control.experience} />
      </div>
    </div>
  );
}
