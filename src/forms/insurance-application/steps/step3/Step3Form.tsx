import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../../type';

interface Step3FormProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step3Form({ control }: Step3FormProps) {
  const insuranceType = useFormControlValue(control.insuranceType);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Объект страхования</h2>
        <p className="text-sm text-gray-500">Укажите данные об объекте страхования</p>
      </div>

      {insuranceType === 'casco' || insuranceType === 'osago' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.vehicle!.vin} />
            <FormField control={control.vehicle!.licensePlate} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.vehicle!.brand} />
            <FormField control={control.vehicle!.model} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField control={control.vehicle!.year} />
            <FormField control={control.vehicle!.mileage} />
            <FormField control={control.vehicle!.enginePower} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.vehicle!.bodyType} />
            <FormField control={control.vehicle!.transmission} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.vehicle!.registrationCert} />
            {insuranceType === 'casco' && <FormField control={control.vehicle!.marketValue} />}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FormField control={control.vehicle!.hasAntiTheft} />
              {control.vehicle?.hasAntiTheft.value.value && (
                <FormField control={control.vehicle!.antiTheftBrand} />
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <FormField control={control.vehicle!.garageParking} />
              <FormField control={control.vehicle!.usagePurpose} />
            </div>
          </div>
        </div>
      ) : insuranceType === 'property' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.property!.type} />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Адрес недвижимости</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.property!.address.region} />
              <FormField control={control.property!.address.city} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField control={control.property!.address.street} />
              <FormField control={control.property!.address.house} />
              <FormField control={control.property!.address.apartment} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.property!.area} />
            <FormField control={control.property!.floors} />
          </div>

          {control.property?.type.value.value === 'apartment' && (
            <FormField control={control.property!.floor} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.property!.yearBuilt} />
            <FormField control={control.property!.wallMaterial} />
          </div>

          <FormField control={control.property!.marketValue} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.property!.ownershipDoc} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FormField control={control.property!.hasAlarm} />
              <FormField control={control.property!.hasFireAlarm} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Покрытие</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.propertyCoverageOptions!.structure} />
              <FormField control={control.propertyCoverageOptions!.interior} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.propertyCoverageOptions!.movables} />
              <FormField control={control.propertyCoverageOptions!.liability} />
            </div>
          </div>
        </div>
      ) : insuranceType === 'life' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField control={control.health!.height} />
            <FormField control={control.health!.weight} />
            <FormField control={control.health!.bmi} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.health!.bloodPressure} />
            <FormField control={control.health!.occupation} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FormField control={control.health!.isSmoker} />
              {control.health?.isSmoker.value.value && (
                <FormField control={control.health!.smokingYears} />
              )}
            </div>

            <div className="flex items-center gap-4">
              <FormField control={control.health!.hasChronicDiseases} />
              {control.health?.hasChronicDiseases.value.value && (
                <FormField control={control.health!.chronicDiseases} />
              )}
            </div>

            <div className="flex items-center gap-4">
              <FormField control={control.health!.hadSurgeries} />
              {control.health?.hadSurgeries.value.value && (
                <FormField control={control.health!.surgeries} />
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FormField control={control.health!.practicesSports} />
              {control.health?.practicesSports.value.value && (
                <FormField control={control.health!.extremeSports} />
              )}
            </div>

            <div className="flex items-center gap-4">
              <FormField control={control.health!.isHighRiskJob} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Покрытие</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.lifeCoverageOptions!.death} />
              <FormField control={control.lifeCoverageOptions!.disability} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.lifeCoverageOptions!.criticalIllness} />
              <FormField control={control.lifeCoverageOptions!.accident} />
            </div>
          </div>
        </div>
      ) : insuranceType === 'travel' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.travel!.destination} />
            <FormField control={control.travel!.tripPurpose} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.travel!.departureDate} />
            <FormField control={control.travel!.returnDate} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.travel!.tripDuration} />
            <FormField control={control.travel!.isMultipleTrips} />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Покрытие</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.travelCoverageOptions!.medical} />
              <FormField control={control.travelCoverageOptions!.baggage} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.travelCoverageOptions!.tripCancellation} />
              <FormField control={control.travelCoverageOptions!.flightDelay} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.travelCoverageOptions!.carRental} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}