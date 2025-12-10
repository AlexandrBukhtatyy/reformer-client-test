import React from 'react';
import { FormField } from '@/components/ui/FormField';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../type';

interface Step3Props {
  control: GroupNodeWithControls<Pick<InsuranceApplicationForm, 
    'insuranceType' | 'vehicle' | 'property' | 'propertyCoverageOptions' | 
    'health' | 'lifeCoverageOptions' | 'travel' | 'travelers' | 'travelCoverageOptions'
  >>;
}

export const Step3: React.FC<Step3Props> = ({ control }) => {
  const insuranceType = control.insuranceType.value.value;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Объект страхования</h2>
      
      {insuranceType === 'casco' || insuranceType === 'osago' ? (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Данные транспортного средства</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control.vehicle.vin} />
            <FormField control={control.vehicle.brand} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control.vehicle.model} />
            <FormField control={control.vehicle.year} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control.vehicle.mileage} />
            <FormField control={control.vehicle.enginePower} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control.vehicle.bodyType} />
            <FormField control={control.vehicle.transmission} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control.vehicle.marketValue} />
            <FormField control={control.vehicle.licensePlate} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control.vehicle.registrationCert} />
            <FormField control={control.vehicle.usagePurpose} />
          </div>
          
          <div className="space-y-4">
            <FormField control={control.vehicle.hasAntiTheft} />
            
            {control.vehicle.hasAntiTheft.value.value && (
              <FormField control={control.vehicle.antiTheftBrand} />
            )}
          </div>
          
          <FormField control={control.vehicle.garageParking} />
        </div>
      ) : insuranceType === 'property' ? (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Данные объекта недвижимости</h3>
          
          <FormField control={control.property.type} />
          
          <div className="space-y-4">
            <h4 className="font-medium">Адрес</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={control.property.address.region} />
              <FormField control={control.property.address.city} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField control={control.property.address.street} />
              <FormField control={control.property.address.house} />
              <FormField control={control.property.address.apartment} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control.property.area} />
            <FormField control={control.property.floors} />
          </div>
          
          {control.property.type.value.value === 'apartment' && (
            <FormField control={control.property.floor} />
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control.property.yearBuilt} />
            <FormField control={control.property.wallMaterial} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control.property.marketValue} />
            <FormField control={control.property.ownershipDoc} />
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Опции страхового покрытия</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.propertyCoverageOptions.structure} />
              <FormField control={control.propertyCoverageOptions.interior} />
              <FormField control={control.propertyCoverageOptions.movables} />
              <FormField control={control.propertyCoverageOptions.liability} />
            </div>
          </div>
        </div>
      ) : insuranceType === 'life' ? (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Данные здоровья</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control.health.height} />
            <FormField control={control.health.weight} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control.health.bmi} />
            <FormField control={control.health.bloodPressure} />
          </div>
          
          <div className="space-y-4">
            <FormField control={control.health.isSmoker} />
            
            {control.health.isSmoker.value.value && (
              <FormField control={control.health.smokingYears} />
            )}
          </div>
          
          <div className="space-y-4">
            <FormField control={control.health.hasChronicDiseases} />
            
            {control.health.hasChronicDiseases.value.value && (
              <FormField control={control.health.chronicDiseases} />
            )}
          </div>
          
          <div className="space-y-4">
            <FormField control={control.health.hadSurgeries} />
            
            {control.health.hadSurgeries.value.value && (
              <FormField control={control.health.surgeries} />
            )}
          </div>
          
          <div className="space-y-4">
            <FormField control={control.health.practicesSports} />
            
            {control.health.practicesSports.value.value && (
              <FormField control={control.health.extremeSports} />
            )}
          </div>
          
          <FormField control={control.health.occupation} />
          <FormField control={control.health.isHighRiskJob} />
          
          <div className="space-y-4">
            <h4 className="font-medium">Опции страхового покрытия</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.lifeCoverageOptions.death} />
              <FormField control={control.lifeCoverageOptions.disability} />
              <FormField control={control.lifeCoverageOptions.criticalIllness} />
              <FormField control={control.lifeCoverageOptions.accident} />
            </div>
          </div>
        </div>
      ) : insuranceType === 'travel' ? (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Данные поездки</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control.travel.destination} />
            <FormField control={control.travel.tripPurpose} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control.travel.departureDate} />
            <FormField control={control.travel.returnDate} />
          </div>
          
          <FormField control={control.travel.isMultipleTrips} />
          
          <div className="space-y-4">
            <h4 className="font-medium">Путешественники</h4>
            {control.travelers.value.value?.map((_: unknown, index: number) => (
              <div key={index} className="border p-4 rounded space-y-4">
                <h5 className="font-medium">Путешественник #{index + 1}</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={control.travelers[index]?.fullName} />
                  <FormField control={control.travelers[index]?.birthDate} />
                </div>
                <FormField control={control.travelers[index]?.passportNumber} />
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Опции страхового покрытия</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.travelCoverageOptions.medical} />
              <FormField control={control.travelCoverageOptions.baggage} />
              <FormField control={control.travelCoverageOptions.tripCancellation} />
              <FormField control={control.travelCoverageOptions.flightDelay} />
              <FormField control={control.travelCoverageOptions.carRental} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};