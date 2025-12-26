import { useFormContext, useWatch } from 'react-hook-form';
import { FormCheckbox } from '@/components/form';
import type { InsuranceFormData } from '../../types';
import { useFormMode } from '../../hooks';
import { DriversArray, BeneficiariesArray, TravelersArray } from '../arrays';
import { ComputedField } from '../ui';

export function Step4DriversAndBeneficiaries() {
  const { isReadOnly } = useFormMode();
  const { control } = useFormContext<InsuranceFormData>();
  const insuranceType = useWatch({ control, name: 'insuranceType' });
  const unlimitedDrivers = useWatch({ control, name: 'unlimitedDrivers' });

  const showDrivers = insuranceType === 'casco' || insuranceType === 'osago';
  const showBeneficiaries = insuranceType === 'life';
  const showTravelers = insuranceType === 'travel';

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 4: Дополнительные участники</h2>

      {showDrivers && (
        <div className="space-y-4">
          <FormCheckbox
            name="unlimitedDrivers"
            label="Неограниченное количество водителей"
            disabled={isReadOnly}
          />

          {!unlimitedDrivers && (
            <>
              <DriversArray />
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h4 className="font-medium">Характеристики водителей</h4>
                <ComputedField
                  name="minDriverAge"
                  label="Минимальный возраст"
                  suffix="лет"
                />
                <ComputedField
                  name="minDriverExperience"
                  label="Минимальный стаж"
                  suffix="лет"
                />
              </div>
            </>
          )}
        </div>
      )}

      {showBeneficiaries && <BeneficiariesArray />}

      {showTravelers && <TravelersArray />}

      {!showDrivers && !showBeneficiaries && !showTravelers && (
        <p className="text-muted-foreground">
          Для выбранного типа страхования дополнительные участники не требуются.
        </p>
      )}
    </div>
  );
}
