import { useFormControlValue } from '@reformer/core';
import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { LifeHealthData } from './type';

interface LifeHealthFieldsProps {
  control: GroupNodeWithControls<LifeHealthData>;
}

export function LifeHealthFields({ control }: LifeHealthFieldsProps) {
  const hasChronicDiseases = useFormControlValue(control.hasChronicDiseases);
  const isSmoker = useFormControlValue(control.isSmoker);
  const hasAllergies = useFormControlValue(control.hasAllergies);
  const hasSurgeries = useFormControlValue(control.hasSurgeries);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Данные о здоровье</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={control.height} />
        <FormField control={control.weight} />
        <FormField control={control.bmi} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.bloodPressureSystolic} />
        <FormField control={control.bloodPressureDiastolic} />
      </div>

      <div className="space-y-4">
        <FormField control={control.hasChronicDiseases} />
        {hasChronicDiseases && <FormField control={control.chronicDiseasesDescription} />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormField control={control.isSmoker} />
          {isSmoker && <FormField control={control.smokingYears} />}
        </div>
      </div>

      <div className="space-y-4">
        <FormField control={control.hasAllergies} />
        {hasAllergies && <FormField control={control.allergiesDescription} />}
      </div>

      <div className="space-y-4">
        <FormField control={control.hasSurgeries} />
        {hasSurgeries && <FormField control={control.surgeriesDescription} />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.occupation} />
        <FormField control={control.isHazardousWork} />
      </div>
    </div>
  );
}
