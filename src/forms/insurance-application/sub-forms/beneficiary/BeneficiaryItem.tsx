import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/button';
import type { BeneficiaryData } from './type';

interface BeneficiaryItemProps {
  control: GroupNodeWithControls<BeneficiaryData>;
  onRemove: () => void;
  index: number;
}

export function BeneficiaryItem({ control, onRemove, index }: BeneficiaryItemProps) {
  return (
    <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Выгодоприобретатель {index + 1}</h4>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={control.birthDate} />
        <FormField control={control.relation} />
        <FormField control={control.share} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={control.passportSeries} />
        <FormField control={control.passportNumber} />
        <FormField control={control.phone} />
      </div>
    </div>
  );
}
