// Step 3: Insurance Object
import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { RadioGroup } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import type { InsuranceApplicationForm } from '../types';

interface Step3Props {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

// Vehicle options
const brandOptions = [
  { value: 'toyota', label: 'Toyota' },
  { value: 'bmw', label: 'BMW' },
  { value: 'mercedes', label: 'Mercedes-Benz' },
  { value: 'audi', label: 'Audi' },
  { value: 'volkswagen', label: 'Volkswagen' },
  { value: 'honda', label: 'Honda' },
  { value: 'hyundai', label: 'Hyundai' },
  { value: 'kia', label: 'Kia' },
  { value: 'nissan', label: 'Nissan' },
  { value: 'ford', label: 'Ford' },
];

const modelOptions: Record<string, Array<{ value: string; label: string }>> = {
  toyota: [
    { value: 'camry', label: 'Camry' },
    { value: 'corolla', label: 'Corolla' },
    { value: 'rav4', label: 'RAV4' },
  ],
  bmw: [
    { value: '3series', label: '3 Series' },
    { value: '5series', label: '5 Series' },
    { value: 'x5', label: 'X5' },
  ],
  mercedes: [
    { value: 'c-class', label: 'C-Class' },
    { value: 'e-class', label: 'E-Class' },
    { value: 's-class', label: 'S-Class' },
  ],
  audi: [
    { value: 'a4', label: 'A4' },
    { value: 'a6', label: 'A6' },
    { value: 'q5', label: 'Q5' },
  ],
  volkswagen: [
    { value: 'passat', label: 'Passat' },
    { value: 'tiguan', label: 'Tiguan' },
    { value: 'golf', label: 'Golf' },
  ],
  default: [{ value: 'other', label: 'Другая модель' }],
};

const bodyTypeOptions = [
  { value: 'sedan', label: 'Седан' },
  { value: 'hatchback', label: 'Хэтчбек' },
  { value: 'suv', label: 'Внедорожник' },
  { value: 'wagon', label: 'Универсал' },
  { value: 'coupe', label: 'Купе' },
  { value: 'minivan', label: 'Минивэн' },
  { value: 'pickup', label: 'Пикап' },
];

const transmissionOptions = [
  { value: 'manual', label: 'Механика' },
  { value: 'automatic', label: 'Автомат' },
];

const usagePurposeOptions = [
  { value: 'personal', label: 'Личное' },
  { value: 'taxi', label: 'Такси' },
  { value: 'training', label: 'Учебный' },
  { value: 'commercial', label: 'Коммерческое' },
];

// Property options
const propertyTypeOptions = [
  { value: 'apartment', label: 'Квартира' },
  { value: 'house', label: 'Дом' },
  { value: 'townhouse', label: 'Таунхаус' },
  { value: 'commercial', label: 'Коммерческая' },
  { value: 'land', label: 'Земельный участок' },
];

const wallMaterialOptions = [
  { value: 'brick', label: 'Кирпич' },
  { value: 'concrete', label: 'Бетон' },
  { value: 'wood', label: 'Дерево' },
  { value: 'panel', label: 'Панель' },
  { value: 'monolith', label: 'Монолит' },
  { value: 'other', label: 'Другое' },
];

// Travel options
const destinationOptions = [
  { value: 'europe', label: 'Европа' },
  { value: 'asia', label: 'Азия' },
  { value: 'usa_canada', label: 'США и Канада' },
  { value: 'cis', label: 'СНГ' },
  { value: 'worldwide', label: 'Весь мир' },
];

const tripPurposeOptions = [
  { value: 'tourism', label: 'Туризм' },
  { value: 'business', label: 'Бизнес' },
  { value: 'education', label: 'Обучение' },
  { value: 'work', label: 'Работа' },
  { value: 'other', label: 'Другое' },
];

export function Step3InsuranceObject({ control }: Step3Props) {
  const insuranceType = control.controls.insuranceType.value;
  const isVehicle = insuranceType === 'casco' || insuranceType === 'osago';
  const isProperty = insuranceType === 'property';
  const isLife = insuranceType === 'life';
  const isTravel = insuranceType === 'travel';

  const selectedBrand = control.controls.vehicle.controls.brand.value;
  const availableModels = modelOptions[selectedBrand] || modelOptions.default;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 3: Объект страхования</h2>

      {/* Vehicle Section - CASCO/OSAGO */}
      {isVehicle && control.controls.vehicle.enabled && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Данные транспортного средства</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
              control={control.controls.vehicle.controls.vin.withComponent(Input, {
                label: 'VIN-номер',
                placeholder: 'XXXXXXXXXXXXXXXXX',
                maxLength: 17,
                testId: 'vehicleVin',
              })}
              testId="vehicleVin"
            />
            <FormField
              control={control.controls.vehicle.controls.brand.withComponent(Select, {
                label: 'Марка автомобиля',
                options: brandOptions,
                placeholder: 'Выберите марку',
                testId: 'vehicleBrand',
              })}
              testId="vehicleBrand"
            />
            <FormField
              control={control.controls.vehicle.controls.model.withComponent(Select, {
                label: 'Модель автомобиля',
                options: availableModels,
                placeholder: 'Выберите модель',
                testId: 'vehicleModel',
              })}
              testId="vehicleModel"
            />
            <FormField
              control={control.controls.vehicle.controls.year.withComponent(Input, {
                label: 'Год выпуска',
                type: 'number',
                placeholder: '2020',
                min: 1990,
                max: new Date().getFullYear(),
                testId: 'vehicleYear',
              })}
              testId="vehicleYear"
            />
            <FormField
              control={control.controls.vehicle.controls.mileage.withComponent(Input, {
                label: 'Пробег (км)',
                type: 'number',
                placeholder: '50000',
                min: 0,
                testId: 'vehicleMileage',
              })}
              testId="vehicleMileage"
            />
            <FormField
              control={control.controls.vehicle.controls.enginePower.withComponent(Input, {
                label: 'Мощность двигателя (л.с.)',
                type: 'number',
                placeholder: '150',
                min: 1,
                testId: 'vehicleEnginePower',
              })}
              testId="vehicleEnginePower"
            />
            <FormField
              control={control.controls.vehicle.controls.bodyType.withComponent(Select, {
                label: 'Тип кузова',
                options: bodyTypeOptions,
                placeholder: 'Выберите тип',
                testId: 'vehicleBodyType',
              })}
              testId="vehicleBodyType"
            />
            <FormField
              control={control.controls.vehicle.controls.transmission.withComponent(RadioGroup, {
                label: 'Коробка передач',
                options: transmissionOptions,
                testId: 'vehicleTransmission',
              })}
              testId="vehicleTransmission"
            />
            <FormField
              control={control.controls.vehicle.controls.licensePlate.withComponent(Input, {
                label: 'Госномер',
                placeholder: 'А000АА000',
                testId: 'vehicleLicensePlate',
              })}
              testId="vehicleLicensePlate"
            />
            <FormField
              control={control.controls.vehicle.controls.registrationCert.withComponent(Input, {
                label: 'Номер СТС',
                placeholder: '00 00 000000',
                testId: 'vehicleRegistrationCert',
              })}
              testId="vehicleRegistrationCert"
            />

            {/* Market value - CASCO only */}
            {insuranceType === 'casco' && control.controls.vehicle.controls.marketValue.enabled && (
              <FormField
                control={control.controls.vehicle.controls.marketValue.withComponent(Input, {
                  label: 'Рыночная стоимость (₽)',
                  type: 'number',
                  placeholder: '1500000',
                  min: 0,
                  testId: 'vehicleMarketValue',
                })}
                testId="vehicleMarketValue"
              />
            )}

            <FormField
              control={control.controls.vehicle.controls.usagePurpose.withComponent(Select, {
                label: 'Цель использования',
                options: usagePurposeOptions,
                placeholder: 'Выберите цель',
                testId: 'vehicleUsagePurpose',
              })}
              testId="vehicleUsagePurpose"
            />
          </div>

          {/* Anti-theft and parking */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormField
              control={control.controls.vehicle.controls.hasAntiTheft.withComponent(Checkbox, {
                label: 'Наличие противоугонной системы',
                testId: 'vehicleHasAntiTheft',
              })}
              testId="vehicleHasAntiTheft"
            />
            {control.controls.vehicle.controls.antiTheftBrand.enabled && (
              <FormField
                control={control.controls.vehicle.controls.antiTheftBrand.withComponent(Input, {
                  label: 'Марка противоугонной системы',
                  placeholder: 'StarLine',
                  testId: 'vehicleAntiTheftBrand',
                })}
                testId="vehicleAntiTheftBrand"
              />
            )}
            <FormField
              control={control.controls.vehicle.controls.garageParking.withComponent(Checkbox, {
                label: 'Гаражное хранение',
                testId: 'vehicleGarageParking',
              })}
              testId="vehicleGarageParking"
            />
          </div>
        </div>
      )}

      {/* Property Section */}
      {isProperty && control.controls.property.enabled && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Данные недвижимости</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
              control={control.controls.property.controls.type.withComponent(Select, {
                label: 'Тип недвижимости',
                options: propertyTypeOptions,
                placeholder: 'Выберите тип',
                testId: 'propertyType',
              })}
              testId="propertyType"
            />
            <FormField
              control={control.controls.property.controls.address.controls.region.withComponent(Input, {
                label: 'Регион',
                placeholder: 'Московская область',
                testId: 'propertyRegion',
              })}
              testId="propertyRegion"
            />
            <FormField
              control={control.controls.property.controls.address.controls.city.withComponent(Input, {
                label: 'Город',
                placeholder: 'Москва',
                testId: 'propertyCity',
              })}
              testId="propertyCity"
            />
            <FormField
              control={control.controls.property.controls.address.controls.street.withComponent(Input, {
                label: 'Улица',
                placeholder: 'ул. Ленина',
                testId: 'propertyStreet',
              })}
              testId="propertyStreet"
            />
            <FormField
              control={control.controls.property.controls.address.controls.house.withComponent(Input, {
                label: 'Дом',
                placeholder: '1',
                testId: 'propertyHouse',
              })}
              testId="propertyHouse"
            />
            <FormField
              control={control.controls.property.controls.address.controls.apartment.withComponent(Input, {
                label: 'Квартира',
                placeholder: '1',
                testId: 'propertyApartment',
              })}
              testId="propertyApartment"
            />
            <FormField
              control={control.controls.property.controls.area.withComponent(Input, {
                label: 'Площадь (м²)',
                type: 'number',
                placeholder: '50',
                min: 1,
                testId: 'propertyArea',
              })}
              testId="propertyArea"
            />
            <FormField
              control={control.controls.property.controls.floors.withComponent(Input, {
                label: 'Этажность здания',
                type: 'number',
                placeholder: '9',
                min: 1,
                testId: 'propertyFloors',
              })}
              testId="propertyFloors"
            />
            {control.controls.property.controls.floor.enabled && (
              <FormField
                control={control.controls.property.controls.floor.withComponent(Input, {
                  label: 'Этаж квартиры',
                  type: 'number',
                  placeholder: '5',
                  min: 1,
                  testId: 'propertyFloor',
                })}
                testId="propertyFloor"
              />
            )}
            <FormField
              control={control.controls.property.controls.yearBuilt.withComponent(Input, {
                label: 'Год постройки',
                type: 'number',
                placeholder: '2010',
                min: 1800,
                max: new Date().getFullYear(),
                testId: 'propertyYearBuilt',
              })}
              testId="propertyYearBuilt"
            />
            <FormField
              control={control.controls.property.controls.wallMaterial.withComponent(Select, {
                label: 'Материал стен',
                options: wallMaterialOptions,
                placeholder: 'Выберите материал',
                testId: 'propertyWallMaterial',
              })}
              testId="propertyWallMaterial"
            />
            <FormField
              control={control.controls.property.controls.marketValue.withComponent(Input, {
                label: 'Рыночная стоимость (₽)',
                type: 'number',
                placeholder: '5000000',
                min: 0,
                testId: 'propertyMarketValue',
              })}
              testId="propertyMarketValue"
            />
            <FormField
              control={control.controls.property.controls.ownershipDoc.withComponent(Input, {
                label: 'Номер документа о собственности',
                placeholder: '00-00/000-00/000/000/0000-0000',
                testId: 'propertyOwnershipDoc',
              })}
              testId="propertyOwnershipDoc"
            />
          </div>

          {/* Security */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormField
              control={control.controls.property.controls.hasAlarm.withComponent(Checkbox, {
                label: 'Охранная сигнализация',
                testId: 'propertyHasAlarm',
              })}
              testId="propertyHasAlarm"
            />
            <FormField
              control={control.controls.property.controls.hasFireAlarm.withComponent(Checkbox, {
                label: 'Пожарная сигнализация',
                testId: 'propertyHasFireAlarm',
              })}
              testId="propertyHasFireAlarm"
            />
          </div>

          {/* Coverage options */}
          {control.controls.propertyCoverageOptions.enabled && (
            <div className="border-t pt-4 mt-4">
              <h4 className="text-md font-medium mb-2">Варианты покрытия</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control.controls.propertyCoverageOptions.controls.structure.withComponent(Checkbox, {
                    label: 'Страхование конструктива',
                    testId: 'propertyCoverageStructure',
                  })}
                  testId="propertyCoverageStructure"
                />
                <FormField
                  control={control.controls.propertyCoverageOptions.controls.interior.withComponent(Checkbox, {
                    label: 'Страхование отделки',
                    testId: 'propertyCoverageInterior',
                  })}
                  testId="propertyCoverageInterior"
                />
                <FormField
                  control={control.controls.propertyCoverageOptions.controls.movables.withComponent(Checkbox, {
                    label: 'Страхование движимого имущества',
                    testId: 'propertyCoverageMovables',
                  })}
                  testId="propertyCoverageMovables"
                />
                <FormField
                  control={control.controls.propertyCoverageOptions.controls.liability.withComponent(Checkbox, {
                    label: 'Гражданская ответственность',
                    testId: 'propertyCoverageLiability',
                  })}
                  testId="propertyCoverageLiability"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Health Section - Life Insurance */}
      {isLife && control.controls.health.enabled && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Данные о здоровье</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
              control={control.controls.health.controls.height.withComponent(Input, {
                label: 'Рост (см)',
                type: 'number',
                placeholder: '175',
                min: 100,
                max: 250,
                testId: 'healthHeight',
              })}
              testId="healthHeight"
            />
            <FormField
              control={control.controls.health.controls.weight.withComponent(Input, {
                label: 'Вес (кг)',
                type: 'number',
                placeholder: '70',
                min: 30,
                max: 300,
                testId: 'healthWeight',
              })}
              testId="healthWeight"
            />
            <FormField
              control={control.controls.health.controls.bmi.withComponent(Input, {
                label: 'Индекс массы тела',
                type: 'number',
                disabled: true,
                testId: 'healthBmi',
              })}
              testId="healthBmi"
            />
            <FormField
              control={control.controls.health.controls.bloodPressure.withComponent(Input, {
                label: 'Артериальное давление',
                placeholder: '120/80',
                testId: 'healthBloodPressure',
              })}
              testId="healthBloodPressure"
            />
            <FormField
              control={control.controls.health.controls.occupation.withComponent(Input, {
                label: 'Род занятий',
                placeholder: 'Менеджер',
                testId: 'healthOccupation',
              })}
              testId="healthOccupation"
            />
          </div>

          {/* Habits and conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormField
              control={control.controls.health.controls.isSmoker.withComponent(Checkbox, {
                label: 'Курящий',
                testId: 'healthIsSmoker',
              })}
              testId="healthIsSmoker"
            />
            {control.controls.health.controls.smokingYears.enabled && (
              <FormField
                control={control.controls.health.controls.smokingYears.withComponent(Input, {
                  label: 'Стаж курения (лет)',
                  type: 'number',
                  placeholder: '5',
                  min: 0,
                  testId: 'healthSmokingYears',
                })}
                testId="healthSmokingYears"
              />
            )}
            <FormField
              control={control.controls.health.controls.hasChronicDiseases.withComponent(Checkbox, {
                label: 'Хронические заболевания',
                testId: 'healthHasChronicDiseases',
              })}
              testId="healthHasChronicDiseases"
            />
            {control.controls.health.controls.chronicDiseases.enabled && (
              <FormField
                control={control.controls.health.controls.chronicDiseases.withComponent(Textarea, {
                  label: 'Описание заболеваний',
                  placeholder: 'Перечислите заболевания',
                  testId: 'healthChronicDiseases',
                })}
                testId="healthChronicDiseases"
              />
            )}
            <FormField
              control={control.controls.health.controls.hadSurgeries.withComponent(Checkbox, {
                label: 'Перенесенные операции',
                testId: 'healthHadSurgeries',
              })}
              testId="healthHadSurgeries"
            />
            {control.controls.health.controls.surgeries.enabled && (
              <FormField
                control={control.controls.health.controls.surgeries.withComponent(Textarea, {
                  label: 'Описание операций',
                  placeholder: 'Перечислите операции',
                  testId: 'healthSurgeries',
                })}
                testId="healthSurgeries"
              />
            )}
            <FormField
              control={control.controls.health.controls.isHighRiskJob.withComponent(Checkbox, {
                label: 'Опасная профессия',
                testId: 'healthIsHighRiskJob',
              })}
              testId="healthIsHighRiskJob"
            />
            <FormField
              control={control.controls.health.controls.practicesSports.withComponent(Checkbox, {
                label: 'Занятия спортом',
                testId: 'healthPracticesSports',
              })}
              testId="healthPracticesSports"
            />
            {control.controls.health.controls.extremeSports.enabled && (
              <FormField
                control={control.controls.health.controls.extremeSports.withComponent(Checkbox, {
                  label: 'Экстремальные виды спорта',
                  testId: 'healthExtremeSports',
                })}
                testId="healthExtremeSports"
              />
            )}
          </div>

          {/* Life coverage options */}
          {control.controls.lifeCoverageOptions.enabled && (
            <div className="border-t pt-4 mt-4">
              <h4 className="text-md font-medium mb-2">Варианты покрытия</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control.controls.lifeCoverageOptions.controls.death.withComponent(Checkbox, {
                    label: 'Страхование на случай смерти',
                    testId: 'lifeCoverageDeath',
                  })}
                  testId="lifeCoverageDeath"
                />
                <FormField
                  control={control.controls.lifeCoverageOptions.controls.disability.withComponent(Checkbox, {
                    label: 'Страхование инвалидности',
                    testId: 'lifeCoverageDisability',
                  })}
                  testId="lifeCoverageDisability"
                />
                <FormField
                  control={control.controls.lifeCoverageOptions.controls.criticalIllness.withComponent(Checkbox, {
                    label: 'Критические заболевания',
                    testId: 'lifeCoverageCriticalIllness',
                  })}
                  testId="lifeCoverageCriticalIllness"
                />
                <FormField
                  control={control.controls.lifeCoverageOptions.controls.accident.withComponent(Checkbox, {
                    label: 'Несчастные случаи',
                    testId: 'lifeCoverageAccident',
                  })}
                  testId="lifeCoverageAccident"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Travel Section */}
      {isTravel && control.controls.travel.enabled && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Данные о поездке</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
              control={control.controls.travel.controls.destination.withComponent(Select, {
                label: 'Страна/регион назначения',
                options: destinationOptions,
                placeholder: 'Выберите регион',
                testId: 'travelDestination',
              })}
              testId="travelDestination"
            />
            <FormField
              control={control.controls.travel.controls.tripPurpose.withComponent(Select, {
                label: 'Цель поездки',
                options: tripPurposeOptions,
                placeholder: 'Выберите цель',
                testId: 'travelTripPurpose',
              })}
              testId="travelTripPurpose"
            />
            <FormField
              control={control.controls.travel.controls.departureDate.withComponent(Input, {
                label: 'Дата отъезда',
                type: 'date',
                testId: 'travelDepartureDate',
              })}
              testId="travelDepartureDate"
            />
            <FormField
              control={control.controls.travel.controls.returnDate.withComponent(Input, {
                label: 'Дата возвращения',
                type: 'date',
                testId: 'travelReturnDate',
              })}
              testId="travelReturnDate"
            />
            <FormField
              control={control.controls.travel.controls.tripDuration.withComponent(Input, {
                label: 'Длительность поездки (дни)',
                type: 'number',
                disabled: true,
                testId: 'travelTripDuration',
              })}
              testId="travelTripDuration"
            />
            <FormField
              control={control.controls.travel.controls.isMultipleTrips.withComponent(Checkbox, {
                label: 'Мультипоездка (годовой полис)',
                testId: 'travelIsMultipleTrips',
              })}
              testId="travelIsMultipleTrips"
            />
          </div>

          {/* Travel coverage options */}
          {control.controls.travelCoverageOptions.enabled && (
            <div className="border-t pt-4 mt-4">
              <h4 className="text-md font-medium mb-2">Варианты покрытия</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control.controls.travelCoverageOptions.controls.medical.withComponent(Checkbox, {
                    label: 'Медицинские расходы',
                    testId: 'travelCoverageMedical',
                  })}
                  testId="travelCoverageMedical"
                />
                <FormField
                  control={control.controls.travelCoverageOptions.controls.baggage.withComponent(Checkbox, {
                    label: 'Багаж',
                    testId: 'travelCoverageBaggage',
                  })}
                  testId="travelCoverageBaggage"
                />
                <FormField
                  control={control.controls.travelCoverageOptions.controls.tripCancellation.withComponent(Checkbox, {
                    label: 'Отмена поездки',
                    testId: 'travelCoverageTripCancellation',
                  })}
                  testId="travelCoverageTripCancellation"
                />
                <FormField
                  control={control.controls.travelCoverageOptions.controls.flightDelay.withComponent(Checkbox, {
                    label: 'Задержка рейса',
                    testId: 'travelCoverageFlightDelay',
                  })}
                  testId="travelCoverageFlightDelay"
                />
                <FormField
                  control={control.controls.travelCoverageOptions.controls.carRental.withComponent(Checkbox, {
                    label: 'Аренда авто',
                    testId: 'travelCoverageCarRental',
                  })}
                  testId="travelCoverageCarRental"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
