// Step 4: Drivers and Beneficiaries
import type { GroupNodeWithControls, ArrayNode } from '@reformer/core';
import { useFormArray } from '@reformer/ui';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { InputMask } from '@/components/ui/input-mask';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import type { InsuranceApplicationForm, Driver, Beneficiary, Traveler } from '../types';
import { defaultDriver, defaultBeneficiary, defaultTraveler } from '../types';

interface Step4Props {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

const relationshipOptions = [
  { value: 'spouse', label: 'Супруг(а)' },
  { value: 'child', label: 'Ребенок' },
  { value: 'parent', label: 'Родитель' },
  { value: 'sibling', label: 'Брат/сестра' },
  { value: 'other', label: 'Другое' },
];

// Driver Item Component
function DriverItem({
  driver,
  index,
  onRemove,
}: {
  driver: GroupNodeWithControls<Driver>;
  index: number;
  onRemove: () => void;
}) {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium">Водитель {index + 1}</h4>
        <Button variant="destructive" size="sm" onClick={onRemove}>
          Удалить
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          control={driver.controls.fullName.withComponent(Input, {
            label: 'ФИО водителя',
            placeholder: 'Иванов Иван Иванович',
            testId: `driver${index}FullName`,
          })}
          testId={`driver${index}FullName`}
        />
        <FormField
          control={driver.controls.birthDate.withComponent(Input, {
            label: 'Дата рождения',
            type: 'date',
            testId: `driver${index}BirthDate`,
          })}
          testId={`driver${index}BirthDate`}
        />
        <FormField
          control={driver.controls.licenseNumber.withComponent(Input, {
            label: 'Номер ВУ',
            placeholder: '00 00 000000',
            testId: `driver${index}LicenseNumber`,
          })}
          testId={`driver${index}LicenseNumber`}
        />
        <FormField
          control={driver.controls.licenseIssueDate.withComponent(Input, {
            label: 'Дата выдачи ВУ',
            type: 'date',
            testId: `driver${index}LicenseIssueDate`,
          })}
          testId={`driver${index}LicenseIssueDate`}
        />
        <FormField
          control={driver.controls.drivingExperience.withComponent(Input, {
            label: 'Стаж вождения (лет)',
            type: 'number',
            disabled: true,
            testId: `driver${index}DrivingExperience`,
          })}
          testId={`driver${index}DrivingExperience`}
        />
        <FormField
          control={driver.controls.accidentsCount.withComponent(Input, {
            label: 'Кол-во ДТП за 3 года',
            type: 'number',
            min: 0,
            testId: `driver${index}AccidentsCount`,
          })}
          testId={`driver${index}AccidentsCount`}
        />
        <FormField
          control={driver.controls.isMainDriver.withComponent(Checkbox, {
            label: 'Основной водитель',
            testId: `driver${index}IsMainDriver`,
          })}
          testId={`driver${index}IsMainDriver`}
        />
      </div>
    </div>
  );
}

// Beneficiary Item Component
function BeneficiaryItem({
  beneficiary,
  index,
  onRemove,
}: {
  beneficiary: GroupNodeWithControls<Beneficiary>;
  index: number;
  onRemove: () => void;
}) {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium">Выгодоприобретатель {index + 1}</h4>
        <Button variant="destructive" size="sm" onClick={onRemove}>
          Удалить
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          control={beneficiary.controls.fullName.withComponent(Input, {
            label: 'ФИО',
            placeholder: 'Иванов Иван Иванович',
            testId: `beneficiary${index}FullName`,
          })}
          testId={`beneficiary${index}FullName`}
        />
        <FormField
          control={beneficiary.controls.birthDate.withComponent(Input, {
            label: 'Дата рождения',
            type: 'date',
            testId: `beneficiary${index}BirthDate`,
          })}
          testId={`beneficiary${index}BirthDate`}
        />
        <FormField
          control={beneficiary.controls.relationship.withComponent(Select, {
            label: 'Степень родства',
            options: relationshipOptions,
            placeholder: 'Выберите',
            testId: `beneficiary${index}Relationship`,
          })}
          testId={`beneficiary${index}Relationship`}
        />
        <FormField
          control={beneficiary.controls.share.withComponent(Input, {
            label: 'Доля (%)',
            type: 'number',
            placeholder: '50',
            min: 1,
            max: 100,
            testId: `beneficiary${index}Share`,
          })}
          testId={`beneficiary${index}Share`}
        />
        <FormField
          control={beneficiary.controls.phone.withComponent(InputMask, {
            label: 'Телефон',
            mask: '+7 (999) 999-99-99',
            placeholder: '+7 (___) ___-__-__',
            testId: `beneficiary${index}Phone`,
          })}
          testId={`beneficiary${index}Phone`}
        />
      </div>
    </div>
  );
}

// Traveler Item Component
function TravelerItem({
  traveler,
  index,
  onRemove,
}: {
  traveler: GroupNodeWithControls<Traveler>;
  index: number;
  onRemove: () => void;
}) {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium">Путешественник {index + 1}</h4>
        <Button variant="destructive" size="sm" onClick={onRemove}>
          Удалить
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={traveler.controls.fullName.withComponent(Input, {
            label: 'ФИО',
            placeholder: 'Ivanov Ivan',
            testId: `traveler${index}FullName`,
          })}
          testId={`traveler${index}FullName`}
        />
        <FormField
          control={traveler.controls.birthDate.withComponent(Input, {
            label: 'Дата рождения',
            type: 'date',
            testId: `traveler${index}BirthDate`,
          })}
          testId={`traveler${index}BirthDate`}
        />
        <FormField
          control={traveler.controls.passportNumber.withComponent(Input, {
            label: 'Номер загранпаспорта',
            placeholder: '00 0000000',
            testId: `traveler${index}PassportNumber`,
          })}
          testId={`traveler${index}PassportNumber`}
        />
      </div>
    </div>
  );
}

export function Step4DriversAndBeneficiaries({ control }: Step4Props) {
  const insuranceType = control.controls.insuranceType.value;
  const isVehicle = insuranceType === 'casco' || insuranceType === 'osago';
  const isLife = insuranceType === 'life';
  const isTravel = insuranceType === 'travel';
  const unlimitedDrivers = control.controls.unlimitedDrivers.value;

  // Array hooks
  const driversArray = useFormArray(control.controls.drivers as ArrayNode<Driver>);

  const beneficiariesArray = useFormArray(control.controls.beneficiaries as ArrayNode<Beneficiary>);

  const travelersArray = useFormArray(control.controls.travelers as ArrayNode<Traveler>);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 4: Водители и застрахованные лица</h2>

      {/* Drivers Section - CASCO/OSAGO */}
      {isVehicle && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Водители</h3>

          {/* Unlimited drivers checkbox */}
          {control.controls.unlimitedDrivers.enabled && (
            <FormField
              control={control.controls.unlimitedDrivers.withComponent(Checkbox, {
                label: 'Неограниченное количество водителей',
                testId: 'unlimitedDrivers',
              })}
              testId="unlimitedDrivers"
            />
          )}

          {/* Drivers list */}
          {!unlimitedDrivers && control.controls.drivers.enabled && (
            <>
              {driversArray.items.map(({ control, index, id, remove }) => (
                <DriverItem
                  key={id}
                  driver={control as GroupNodeWithControls<Driver>}
                  index={index}
                  onRemove={remove}
                />
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() => driversArray.add(defaultDriver)}
              >
                + Добавить водителя
              </Button>

              {/* Computed fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FormField
                  control={control.controls.minDriverAge.withComponent(Input, {
                    label: 'Мин. возраст водителя',
                    type: 'number',
                    disabled: true,
                    testId: 'minDriverAge',
                  })}
                  testId="minDriverAge"
                />
                <FormField
                  control={control.controls.minDriverExperience.withComponent(Input, {
                    label: 'Мин. стаж водителя',
                    type: 'number',
                    disabled: true,
                    testId: 'minDriverExperience',
                  })}
                  testId="minDriverExperience"
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* Beneficiaries Section - Life Insurance */}
      {isLife && control.controls.beneficiaries.enabled && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Выгодоприобретатели</h3>

          {beneficiariesArray.items.map(({ control, index, id, remove }) => (
            <BeneficiaryItem
              key={id}
              beneficiary={control as GroupNodeWithControls<Beneficiary>}
              index={index}
              onRemove={remove}
            />
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => beneficiariesArray.add(defaultBeneficiary)}
          >
            + Добавить выгодоприобретателя
          </Button>

          {/* Total share computed */}
          <div className="mt-4">
            <FormField
              control={control.controls.totalBeneficiaryShare.withComponent(Input, {
                label: 'Сумма долей (%)',
                type: 'number',
                disabled: true,
                testId: 'totalBeneficiaryShare',
              })}
              testId="totalBeneficiaryShare"
            />
            <p className="text-sm text-gray-500 mt-1">Сумма всех долей должна быть равна 100%</p>
          </div>
        </div>
      )}

      {/* Travelers Section - Travel Insurance */}
      {isTravel && control.controls.travelers.enabled && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Путешественники</h3>

          {travelersArray.items.map(({ control, index, id, remove }) => (
            <TravelerItem
              key={id}
              traveler={control as GroupNodeWithControls<Traveler>}
              index={index}
              onRemove={remove}
            />
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => travelersArray.add(defaultTraveler)}
          >
            + Добавить путешественника
          </Button>
        </div>
      )}

      {/* No relevant section for property insurance */}
      {insuranceType === 'property' && (
        <p className="text-gray-500">
          Для страхования недвижимости этот шаг не требует дополнительных данных.
        </p>
      )}
    </div>
  );
}
