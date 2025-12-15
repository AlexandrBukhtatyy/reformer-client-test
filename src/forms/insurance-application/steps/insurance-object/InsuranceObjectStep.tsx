import { useState, useCallback } from 'react';
import { useFormControlValue } from '@reformer/core';
import type { GroupNodeWithControls } from '@reformer/core';
import { Button } from '@/components/ui/button';
import { VehicleFields } from '../../sub-forms/vehicle/VehicleFields';
import { PropertyFields } from '../../sub-forms/property/PropertyFields';
import { LifeHealthFields } from '../../sub-forms/life-health/LifeHealthFields';
import { TravelFields } from '../../sub-forms/travel/TravelFields';
import { TravelerItem } from '../../sub-forms/traveler/TravelerItem';
import type { InsuranceApplicationForm } from '../../type';

interface InsuranceObjectStepProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function InsuranceObjectStep({ control }: InsuranceObjectStepProps) {
  const insuranceType = useFormControlValue(control.insuranceType);

  // Force re-render when array items are added/removed
  const [, forceUpdate] = useState(0);
  const triggerUpdate = useCallback(() => forceUpdate((n) => n + 1), []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Объект страхования</h2>

      {(insuranceType === 'casco' || insuranceType === 'osago') && (
        <VehicleFields control={control.vehicle} />
      )}

      {insuranceType === 'property' && (
        <PropertyFields control={control.property} />
      )}

      {insuranceType === 'life' && (
        <LifeHealthFields control={control.lifeHealth} />
      )}

      {insuranceType === 'travel' && (
        <>
          <TravelFields control={control.travel} />

          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-medium">Застрахованные лица</h3>

            <div className="space-y-4">
              {control.travelers.map((traveler: any, index: number) => (
                <TravelerItem
                  key={index}
                  control={traveler}
                  onRemove={() => {
                    control.travelers.removeAt(index);
                    triggerUpdate();
                  }}
                  index={index}
                />
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                control.travelers.push({
                  lastName: '',
                  firstName: '',
                  middleName: '',
                  birthDate: '',
                  passportNumber: '',
                  passportExpiry: '',
                  citizenship: 'RUS',
                });
                triggerUpdate();
              }}
            >
              Добавить путешественника
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
