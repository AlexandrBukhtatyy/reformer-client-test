import { FormField } from '@/components/ui';
import type { GroupNodeWithControls } from '@reformer/core';
import type { Step3Form } from './type';

interface Step3FormProps {
  form: GroupNodeWithControls<Step3Form>;
  insuranceType: 'casco' | 'osago' | 'property' | 'life' | 'travel';
}

export function Step3Form({ form, insuranceType }: Step3FormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Объект страхования</h2>
        <p className="text-sm text-gray-500">Укажите данные об объекте страхования</p>
      </div>

      {insuranceType === 'casco' || insuranceType === 'osago' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.vehicle!.vin} />
            <FormField control={form.vehicle!.licensePlate} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.vehicle!.brand} />
            <FormField control={form.vehicle!.model} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField control={form.vehicle!.year} />
            <FormField control={form.vehicle!.mileage} />
            <FormField control={form.vehicle!.enginePower} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.vehicle!.bodyType} />
            <FormField control={form.vehicle!.transmission} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.vehicle!.registrationCert} />
            {insuranceType === 'casco' && <FormField control={form.vehicle!.marketValue} />}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FormField control={form.vehicle!.hasAntiTheft} />
              {form.vehicle?.hasAntiTheft.value && (
                <FormField control={form.vehicle!.antiTheftBrand} />
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <FormField control={form.vehicle!.garageParking} />
              <FormField control={form.vehicle!.usagePurpose} />
            </div>
          </div>
        </div>
      ) : insuranceType === 'property' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.property!.type} />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Адрес недвижимости</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.property!.address.region} />
              <FormField control={form.property!.address.city} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField control={form.property!.address.street} />
              <FormField control={form.property!.address.house} />
              <FormField control={form.property!.address.apartment} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.property!.area} />
            <FormField control={form.property!.floors} />
          </div>

          {form.property?.type.value === 'apartment' && (
            <FormField control={form.property!.floor} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.property!.yearBuilt} />
            <FormField control={form.property!.wallMaterial} />
          </div>

          <FormField control={form.property!.marketValue} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.property!.ownershipDoc} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FormField control={form.property!.hasAlarm} />
              <FormField control={form.property!.hasFireAlarm} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Покрытие</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.propertyCoverageOptions!.structure} />
              <FormField control={form.propertyCoverageOptions!.interior} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.propertyCoverageOptions!.movables} />
              <FormField control={form.propertyCoverageOptions!.liability} />
            </div>
          </div>
        </div>
      ) : insuranceType === 'life' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField control={form.health!.height} />
            <FormField control={form.health!.weight} />
            <FormField control={form.health!.bmi} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.health!.bloodPressure} />
            <FormField control={form.health!.occupation} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FormField control={form.health!.isSmoker} />
              {form.health?.isSmoker.value && (
                <FormField control={form.health!.smokingYears} />
              )}
            </div>

            <div className="flex items-center gap-4">
              <FormField control={form.health!.hasChronicDiseases} />
              {form.health?.hasChronicDiseases.value && (
                <FormField control={form.health!.chronicDiseases} />
              )}
            </div>

            <div className="flex items-center gap-4">
              <FormField control={form.health!.hadSurgeries} />
              {form.health?.hadSurgeries.value && (
                <FormField control={form.health!.surgeries} />
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FormField control={form.health!.practicesSports} />
              {form.health?.practicesSports.value && (
                <FormField control={form.health!.extremeSports} />
              )}
            </div>

            <div className="flex items-center gap-4">
              <FormField control={form.health!.isHighRiskJob} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Покрытие</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.lifeCoverageOptions!.death} />
              <FormField control={form.lifeCoverageOptions!.disability} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.lifeCoverageOptions!.criticalIllness} />
              <FormField control={form.lifeCoverageOptions!.accident} />
            </div>
          </div>
        </div>
      ) : insuranceType === 'travel' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.travel!.destination} />
            <FormField control={form.travel!.tripPurpose} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.travel!.departureDate} />
            <FormField control={form.travel!.returnDate} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.travel!.tripDuration} />
            <FormField control={form.travel!.isMultipleTrips} />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Покрытие</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.travelCoverageOptions!.medical} />
              <FormField control={form.travelCoverageOptions!.baggage} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.travelCoverageOptions!.tripCancellation} />
              <FormField control={form.travelCoverageOptions!.flightDelay} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.travelCoverageOptions!.carRental} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}