import { useState, useCallback } from 'react';
import { useFormControlValue } from '@reformer/core';
import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/button';
import { DriverItem } from '../../sub-forms/driver/DriverItem';
import { BeneficiaryItem } from '../../sub-forms/beneficiary/BeneficiaryItem';
import type { InsuranceApplicationForm } from '../../type';

interface DriversBeneficiariesStepProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function DriversBeneficiariesStep({ control }: DriversBeneficiariesStepProps) {
  const insuranceType = useFormControlValue(control.insuranceType);
  const unlimitedDrivers = useFormControlValue(control.unlimitedDrivers);
  const totalShare = useFormControlValue(control.totalBeneficiaryShare) as number | undefined;

  // Force re-render when array items are added/removed
  const [, forceUpdate] = useState(0);
  const triggerUpdate = useCallback(() => forceUpdate((n) => n + 1), []);

  const isVehicleInsurance = insuranceType === 'casco' || insuranceType === 'osago';
  const isLifeInsurance = insuranceType === 'life';

  return (
    <div className="space-y-6">
      {isVehicleInsurance && (
        <>
          <h2 className="text-xl font-semibold">Водители</h2>

          <FormField control={control.unlimitedDrivers} />

          {!unlimitedDrivers && (
            <>
              <div className="space-y-4">
                {control.drivers.map((driver: any, index: number) => (
                  <DriverItem
                    key={index}
                    control={driver}
                    onRemove={() => {
                      control.drivers.removeAt(index);
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
                  control.drivers.push({
                    lastName: '',
                    firstName: '',
                    middleName: '',
                    birthDate: '',
                    age: undefined,
                    licenseNumber: '',
                    licenseIssueDate: '',
                    experience: undefined,
                  });
                  triggerUpdate();
                }}
              >
                Добавить водителя
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FormField control={control.minDriverAge} />
                <FormField control={control.minDriverExperience} />
              </div>
            </>
          )}
        </>
      )}

      {isLifeInsurance && (
        <>
          <h2 className="text-xl font-semibold">Выгодоприобретатели</h2>

          <div className="space-y-4">
            {control.beneficiaries.map((beneficiary: any, index: number) => (
              <BeneficiaryItem
                key={index}
                control={beneficiary}
                onRemove={() => {
                  control.beneficiaries.removeAt(index);
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
              control.beneficiaries.push({
                lastName: '',
                firstName: '',
                middleName: '',
                birthDate: '',
                relation: 'spouse',
                share: undefined,
                passportSeries: '',
                passportNumber: '',
                phone: '',
              });
              triggerUpdate();
            }}
          >
            Добавить выгодоприобретателя
          </Button>

          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="font-medium">
              Общая сумма долей:{' '}
              <span className={totalShare === 100 ? 'text-green-600' : 'text-red-600'}>
                {totalShare || 0}%
              </span>
            </p>
            {totalShare !== 100 && (
              <p className="text-sm text-red-500 mt-1">
                Сумма долей должна быть равна 100%
              </p>
            )}
          </div>
        </>
      )}

      {!isVehicleInsurance && !isLifeInsurance && (
        <div className="text-center py-8 text-gray-500">
          <p>Для выбранного типа страхования этот шаг не требуется.</p>
          <p className="text-sm mt-2">Нажмите "Далее" для продолжения.</p>
        </div>
      )}
    </div>
  );
}
