import React from 'react';
import { FormField } from '../../../components/ui/FormField';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../schemas/form-schema';

interface Step3Props {
  form: GroupNodeWithControls<InsuranceApplicationForm>;
}

const Step3: React.FC<Step3Props> = ({ form }) => {
  const insuranceType = form.insuranceType.value.value;
  
  return (
    <div className="space-y-6">
      {insuranceType === 'casco' || insuranceType === 'osago' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.vehicle.vin} />
            <FormField control={form.vehicle.licensePlate} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.vehicle.brand} />
            <FormField control={form.vehicle.model} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.vehicle.year} />
            <FormField control={form.vehicle.mileage} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.vehicle.enginePower} />
            <FormField control={form.vehicle.bodyType} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.vehicle.transmission} />
            <FormField control={form.vehicle.usagePurpose} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.vehicle.marketValue} />
            <FormField control={form.vehicle.registrationCert} />
          </div>
          
          <div className="space-y-4">
            <FormField control={form.vehicle.hasAntiTheft} />
            {form.vehicle.hasAntiTheft.value.value && (
              <FormField control={form.vehicle.antiTheftBrand} />
            )}
          </div>
          
          <FormField control={form.vehicle.garageParking} />
        </div>
      ) : insuranceType === 'property' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.property.type} />
            <FormField control={form.property.wallMaterial} />
          </div>
          
          <div className="space-y-4">
            <FormField control={form.property.address.region} />
            <FormField control={form.property.address.city} />
            <FormField control={form.property.address.street} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.property.address.house} />
              <FormField control={form.property.address.apartment} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.property.area} />
            <FormField control={form.property.floors} />
          </div>
          
          {form.property.type.value.value === 'apartment' && (
            <FormField control={form.property.floor} />
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.property.yearBuilt} />
            <FormField control={form.property.marketValue} />
          </div>
          
          <div className="space-y-4">
            <FormField control={form.property.hasAlarm} />
            <FormField control={form.property.hasFireAlarm} />
          </div>
          
          <FormField control={form.property.ownershipDoc} />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Покрытие</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.propertyCoverageOptions.structure} />
              <FormField control={form.propertyCoverageOptions.interior} />
              <FormField control={form.propertyCoverageOptions.movables} />
              <FormField control={form.propertyCoverageOptions.liability} />
            </div>
          </div>
        </div>
      ) : insuranceType === 'life' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.health.height} />
            <FormField control={form.health.weight} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.health.bmi} />
            <FormField control={form.health.bloodPressure} />
          </div>
          
          <div className="space-y-4">
            <FormField control={form.health.isSmoker} />
            {form.health.isSmoker.value.value && (
              <FormField control={form.health.smokingYears} />
            )}
          </div>
          
          <div className="space-y-4">
            <FormField control={form.health.hasChronicDiseases} />
            {form.health.hasChronicDiseases.value.value && (
              <FormField control={form.health.chronicDiseases} />
            )}
          </div>
          
          <div className="space-y-4">
            <FormField control={form.health.hadSurgeries} />
            {form.health.hadSurgeries.value.value && (
              <FormField control={form.health.surgeries} />
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.health.occupation} />
            <FormField control={form.health.isHighRiskJob} />
          </div>
          
          <div className="space-y-4">
            <FormField control={form.health.practicesSports} />
            {form.health.practicesSports.value.value && (
              <FormField control={form.health.extremeSports} />
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Покрытие</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.lifeCoverageOptions.death} />
              <FormField control={form.lifeCoverageOptions.disability} />
              <FormField control={form.lifeCoverageOptions.criticalIllness} />
              <FormField control={form.lifeCoverageOptions.accident} />
            </div>
          </div>
        </div>
      ) : insuranceType === 'travel' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.travel.destination} />
            <FormField control={form.travel.tripPurpose} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.travel.departureDate} />
            <FormField control={form.travel.returnDate} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.travel.tripDuration} />
            <FormField control={form.travel.isMultipleTrips} />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Путешественники</h3>
            {form.travelers.map((traveler: any, index: number) => (
              <div key={index} className="border p-4 rounded-md space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={traveler.fullName} />
                  <FormField control={traveler.birthDate} />
                </div>
                <FormField control={traveler.passportNumber} />
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Покрытие</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.travelCoverageOptions.medical} />
              <FormField control={form.travelCoverageOptions.baggage} />
              <FormField control={form.travelCoverageOptions.tripCancellation} />
              <FormField control={form.travelCoverageOptions.flightDelay} />
              <FormField control={form.travelCoverageOptions.carRental} />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Пожалуйста, выберите тип страхования на первом шаге
        </div>
      )}
    </div>
  );
};

export default Step3;