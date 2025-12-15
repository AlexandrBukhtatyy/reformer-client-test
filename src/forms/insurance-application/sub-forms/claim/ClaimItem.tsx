import { useFormControlValue } from '@reformer/core';
import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/button';
import type { ClaimData } from './type';

interface ClaimItemProps {
  control: GroupNodeWithControls<ClaimData>;
  onRemove: () => void;
  index: number;
}

export function ClaimItem({ control, onRemove, index }: ClaimItemProps) {
  const wasCompensated = useFormControlValue(control.wasCompensated);

  return (
    <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Страховой случай {index + 1}</h4>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={onRemove}
        >
          Удалить
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.date} />
        <FormField control={control.claimType} />
      </div>

      <FormField control={control.description} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.amount} />
      </div>

      <FormField control={control.wasCompensated} />

      {wasCompensated && <FormField control={control.compensationAmount} />}
    </div>
  );
}
