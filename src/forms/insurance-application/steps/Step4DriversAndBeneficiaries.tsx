// Step 4: Drivers and Beneficiaries
import type { GroupNodeWithControls } from '@reformer/core';
import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { FormArray } from '@reformer/ui/form-array';
import type { InsuranceApplicationForm } from '../type';

interface Step4Props {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step4DriversAndBeneficiaries({ control }: Step4Props) {
  const insuranceType = useFormControlValue(control.insuranceType);
  const unlimitedDrivers = useFormControlValue(control.unlimitedDrivers);

  const isVehicle = insuranceType === 'casco' || insuranceType === 'osago';
  const isLife = insuranceType === 'life';

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 4: Водители и застрахованные лица</h2>

      {/* Drivers Section - CASCO/OSAGO */}
      {isVehicle && (
        <div className="space-y-4">
          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Водители</h3>
            <FormField control={control.unlimitedDrivers} />

            {!unlimitedDrivers && (
              <>
                <FormArray.Root control={control.drivers}>
                  <FormArray.Empty>
                    <p className="text-gray-500 text-sm">Нет водителей. Добавьте хотя бы одного.</p>
                  </FormArray.Empty>

                  <FormArray.List className="space-y-4">
                    {({ control: itemControl, index }) => (
                      <div className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium">Водитель #{index + 1}</h4>
                          <FormArray.RemoveButton className="text-red-500 hover:text-red-700 text-sm">
                            Удалить
                          </FormArray.RemoveButton>
                        </div>
                        <div className="space-y-4">
                          <FormField control={itemControl.fullName} />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={itemControl.birthDate} />
                            <FormField control={itemControl.licenseNumber} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={itemControl.licenseIssueDate} />
                            <FormField control={itemControl.drivingExperience} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={itemControl.accidentsCount} />
                            <FormField control={itemControl.isMainDriver} />
                          </div>
                        </div>
                      </div>
                    )}
                  </FormArray.List>

                  <FormArray.AddButton className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    + Добавить водителя
                  </FormArray.AddButton>
                </FormArray.Root>

                {/* Computed fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-blue-50 rounded-lg">
                  <FormField control={control.minDriverAge} />
                  <FormField control={control.minDriverExperience} />
                </div>
              </>
            )}
          </section>
        </div>
      )}

      {/* Beneficiaries Section - Life Insurance */}
      {isLife && (
        <div className="space-y-4">
          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Выгодоприобретатели</h3>
            <p className="text-sm text-gray-600">
              Укажите лиц, которые получат страховую выплату. Сумма долей должна составлять 100%.
            </p>

            <FormArray.Root control={control.beneficiaries}>
              <FormArray.Empty>
                <p className="text-gray-500 text-sm">Нет выгодоприобретателей. Добавьте хотя бы одного.</p>
              </FormArray.Empty>

              <FormArray.List className="space-y-4">
                {({ control: itemControl, index }) => (
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Выгодоприобретатель #{index + 1}</h4>
                      <FormArray.RemoveButton className="text-red-500 hover:text-red-700 text-sm">
                        Удалить
                      </FormArray.RemoveButton>
                    </div>
                    <div className="space-y-4">
                      <FormField control={itemControl.fullName} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={itemControl.birthDate} />
                        <FormField control={itemControl.relationship} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={itemControl.share} />
                        <FormField control={itemControl.phone} />
                      </div>
                    </div>
                  </div>
                )}
              </FormArray.List>

              <FormArray.AddButton className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                + Добавить выгодоприобретателя
              </FormArray.AddButton>
            </FormArray.Root>

            {/* Total share */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <FormField control={control.totalBeneficiaryShare} />
            </div>
          </section>
        </div>
      )}

      {/* Message for other insurance types */}
      {!isVehicle && !isLife && (
        <div className="p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600">
            Для выбранного типа страхования ({insuranceType === 'property' ? 'Недвижимость' : 'Путешествия'})
            не требуется указание водителей или выгодоприобретателей.
          </p>
        </div>
      )}
    </div>
  );
}
