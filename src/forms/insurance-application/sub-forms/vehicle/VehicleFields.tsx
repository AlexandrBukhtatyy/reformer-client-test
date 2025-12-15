import { useFormControlValue } from '@reformer/core';
import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { VehicleData } from './type';

interface VehicleFieldsProps {
  control: GroupNodeWithControls<VehicleData>;
}

export function VehicleFields({ control }: VehicleFieldsProps) {
  const hasAntiTheft = useFormControlValue(control.hasAntiTheft);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Данные транспортного средства</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.vin} />
        <FormField control={control.licensePlate} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.brand} />
        <FormField control={control.model} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={control.year} />
        <FormField control={control.mileage} />
        <FormField control={control.enginePower} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.bodyType} />
        <FormField control={control.transmission} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.marketValue} />
        <FormField control={control.registrationCertificate} />
      </div>

      <FormField control={control.hasAntiTheft} />

      {hasAntiTheft && <FormField control={control.antiTheftBrand} />}
    </div>
  );
}
