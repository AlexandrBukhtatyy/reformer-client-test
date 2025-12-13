// Step 3: Insurance Object
import type { GroupNodeWithControls } from '@reformer/core';
import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { FormArray } from '@reformer/ui/form-array';
import type { InsuranceApplicationForm } from '../type';

interface Step3Props {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step3InsuranceObject({ control }: Step3Props) {
  const insuranceType = useFormControlValue(control.insuranceType);
  const hasAntiTheft = useFormControlValue(control.vehicle.hasAntiTheft);
  const propertyType = useFormControlValue(control.property.type);
  const isSmoker = useFormControlValue(control.health.isSmoker);
  const hasChronicDiseases = useFormControlValue(control.health.hasChronicDiseases);
  const hadSurgeries = useFormControlValue(control.health.hadSurgeries);
  const practicesSports = useFormControlValue(control.health.practicesSports);

  const isVehicle = insuranceType === 'casco' || insuranceType === 'osago';
  const isProperty = insuranceType === 'property';
  const isLife = insuranceType === 'life';
  const isTravel = insuranceType === 'travel';

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 3: Объект страхования</h2>

      {/* Vehicle Section - CASCO/OSAGO */}
      {isVehicle && (
        <div className="space-y-4">
          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Данные транспортного средства</h3>
            <FormField control={control.vehicle.vin} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.vehicle.brand} />
              <FormField control={control.vehicle.model} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField control={control.vehicle.year} />
              <FormField control={control.vehicle.mileage} />
              <FormField control={control.vehicle.enginePower} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.vehicle.bodyType} />
              <FormField control={control.vehicle.transmission} />
            </div>
            {insuranceType === 'casco' && (
              <FormField control={control.vehicle.marketValue} />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.vehicle.licensePlate} />
              <FormField control={control.vehicle.registrationCert} />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Дополнительная информация</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.vehicle.hasAntiTheft} />
              <FormField control={control.vehicle.garageParking} />
            </div>
            {hasAntiTheft && (
              <FormField control={control.vehicle.antiTheftBrand} />
            )}
            <FormField control={control.vehicle.usagePurpose} />
          </section>
        </div>
      )}

      {/* Property Section */}
      {isProperty && (
        <div className="space-y-4">
          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Данные недвижимости</h3>
            <FormField control={control.property.type} />
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Адрес</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.property.address.region} />
              <FormField control={control.property.address.city} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField control={control.property.address.street} />
              <FormField control={control.property.address.house} />
              <FormField control={control.property.address.apartment} />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Характеристики</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField control={control.property.area} />
              <FormField control={control.property.floors} />
              {propertyType === 'apartment' && (
                <FormField control={control.property.floor} />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.property.yearBuilt} />
              <FormField control={control.property.wallMaterial} />
            </div>
            <FormField control={control.property.marketValue} />
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Безопасность</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.property.hasAlarm} />
              <FormField control={control.property.hasFireAlarm} />
            </div>
            <FormField control={control.property.ownershipDoc} />
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Варианты покрытия</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.propertyCoverageOptions.structure} />
              <FormField control={control.propertyCoverageOptions.interior} />
              <FormField control={control.propertyCoverageOptions.movables} />
              <FormField control={control.propertyCoverageOptions.liability} />
            </div>
          </section>
        </div>
      )}

      {/* Life/Health Section */}
      {isLife && (
        <div className="space-y-4">
          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Данные о здоровье</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField control={control.health.height} />
              <FormField control={control.health.weight} />
              <FormField control={control.health.bmi} />
            </div>
            <FormField control={control.health.bloodPressure} />
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Привычки</h3>
            <FormField control={control.health.isSmoker} />
            {isSmoker && (
              <FormField control={control.health.smokingYears} />
            )}
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Заболевания и операции</h3>
            <FormField control={control.health.hasChronicDiseases} />
            {hasChronicDiseases && (
              <FormField control={control.health.chronicDiseases} />
            )}
            <FormField control={control.health.hadSurgeries} />
            {hadSurgeries && (
              <FormField control={control.health.surgeries} />
            )}
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Работа и спорт</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.health.occupation} />
              <FormField control={control.health.isHighRiskJob} />
            </div>
            <FormField control={control.health.practicesSports} />
            {practicesSports && (
              <FormField control={control.health.extremeSports} />
            )}
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Варианты покрытия</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.lifeCoverageOptions.death} />
              <FormField control={control.lifeCoverageOptions.disability} />
              <FormField control={control.lifeCoverageOptions.criticalIllness} />
              <FormField control={control.lifeCoverageOptions.accident} />
            </div>
          </section>
        </div>
      )}

      {/* Travel Section */}
      {isTravel && (
        <div className="space-y-4">
          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Данные поездки</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.travel.destination} />
              <FormField control={control.travel.tripPurpose} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField control={control.travel.departureDate} />
              <FormField control={control.travel.returnDate} />
              <FormField control={control.travel.tripDuration} />
            </div>
            <FormField control={control.travel.isMultipleTrips} />
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Варианты покрытия</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.travelCoverageOptions.medical} />
              <FormField control={control.travelCoverageOptions.baggage} />
              <FormField control={control.travelCoverageOptions.tripCancellation} />
              <FormField control={control.travelCoverageOptions.flightDelay} />
              <FormField control={control.travelCoverageOptions.carRental} />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Путешественники</h3>
            <FormArray.Root control={control.travelers}>
              <FormArray.Empty>
                <p className="text-gray-500 text-sm">Нет путешественников. Добавьте хотя бы одного.</p>
              </FormArray.Empty>

              <FormArray.List className="space-y-4">
                {({ control: itemControl, index }) => (
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Путешественник #{index + 1}</h4>
                      <FormArray.RemoveButton className="text-red-500 hover:text-red-700 text-sm">
                        Удалить
                      </FormArray.RemoveButton>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField control={itemControl.fullName} />
                      <FormField control={itemControl.birthDate} />
                      <FormField control={itemControl.passportNumber} />
                    </div>
                  </div>
                )}
              </FormArray.List>

              <FormArray.AddButton className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                + Добавить путешественника
              </FormArray.AddButton>
            </FormArray.Root>
          </section>
        </div>
      )}
    </div>
  );
}
