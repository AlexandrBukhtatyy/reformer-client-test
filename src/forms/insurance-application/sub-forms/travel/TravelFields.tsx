import { useFormControlValue } from '@reformer/core';
import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { TravelData } from './type';

interface TravelFieldsProps {
  control: GroupNodeWithControls<TravelData>;
}

export function TravelFields({ control }: TravelFieldsProps) {
  const hasMedicalConditions = useFormControlValue(control.hasMedicalConditions);
  const includesLuggage = useFormControlValue(control.includesLuggage);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Данные о путешествии</h3>

      <FormField control={control.countries} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={control.departureDate} />
        <FormField control={control.returnDate} />
        <FormField control={control.tripDuration} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.travelPurpose} />
        <FormField control={control.sportType} />
      </div>

      <div className="space-y-4">
        <FormField control={control.hasMedicalConditions} />
        {hasMedicalConditions && <FormField control={control.medicalConditionsDescription} />}
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Дополнительные опции</h4>
        <FormField control={control.includesCancellation} />

        <div className="space-y-2">
          <FormField control={control.includesLuggage} />
          {includesLuggage && <FormField control={control.luggageValue} className="ml-6" />}
        </div>

        <FormField control={control.includesLiability} />
      </div>
    </div>
  );
}
