import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui';
import { FormArray } from '@reformer/ui/form-array';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../../type';

interface Step4FormProps {
  form: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step4Form({ form }: Step4FormProps) {
  const insuranceType = useFormControlValue(form?.insuranceType);
  const unlimitedDrivers = useFormControlValue(form.unlimitedDrivers);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Водители и выгодоприобретатели</h2>
        <p className="text-sm text-gray-500">
          {insuranceType === 'casco' || insuranceType === 'osago' 
            ? 'Добавьте водителей, допущенных к управлению транспортным средством'
            : insuranceType === 'life'
            ? 'Укажите выгодоприобретателей полиса'
            : 'Добавьте путешественников по полису'}
        </p>
      </div>

      {(insuranceType === 'casco' || insuranceType === 'osago') ? (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <FormField control={form.unlimitedDrivers} />
            {form.unlimitedDrivers.value.value && (
              <span className="text-sm text-gray-50">Будет разрешено неограниченное количество водителей</span>
            )}
          </div>

          {!unlimitedDrivers && (
            <FormArray.Root control={form.drivers}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Водители</h3>
                  <FormArray.AddButton className="text-blue-600 hover:text-blue-800 text-sm">
                    + Добавить водителя
                  </FormArray.AddButton>
                </div>

                <FormArray.Empty>
                  <p className="text-sm text-gray-500">Нет добавленных водителей</p>
                </FormArray.Empty>

                <FormArray.List>
                  {({ control, index, remove }) => (
                    <div key={control.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Водитель #{index + 1}</h4>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-800 text-sm"
                          onClick={remove}
                        >
                          Удалить
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={control.fullName} />
                        <FormField control={control.birthDate} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={control.licenseNumber} />
                        <FormField control={control.licenseIssueDate} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={control.drivingExperience} />
                        <FormField control={control.accidentsCount} />
                        <FormField control={control.isMainDriver} />
                      </div>
                    </div>
                  )}
                </FormArray.List>
              </div>
            </FormArray.Root>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.minDriverAge} />
            <FormField control={form.minDriverExperience} />
          </div>
        </div>
      ) : insuranceType === 'life' ? (
        <div className="space-y-6">
          <FormArray.Root control={form.beneficiaries}>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Выгодоприобретатели</h3>
                <FormArray.AddButton className="text-blue-600 hover:text-blue-80 text-sm">
                  + Добавить выгодоприобретателя
                </FormArray.AddButton>
              </div>

              <FormArray.Empty>
                <p className="text-sm text-gray-500">Нет добавленных выгодоприобретателей</p>
              </FormArray.Empty>

              <FormArray.List>
                {({ control, index, remove }) => (
                  <div key={control.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Выгодоприобретатель #{index + 1}</h4>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800 text-sm"
                        onClick={remove}
                      >
                        Удалить
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={control.fullName} />
                      <FormField control={control.birthDate} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={control.relationship} />
                      <FormField control={control.share} />
                    </div>

                    <FormField control={control.phone} />
                  </div>
                )}
              </FormArray.List>
            </div>
          </FormArray.Root>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.totalBeneficiaryShare} />
          </div>
        </div>
      ) : insuranceType === 'travel' ? (
        <div className="space-y-6">
          <FormArray.Root control={form.travelers}>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Путешественники</h3>
                <FormArray.AddButton className="text-blue-600 hover:text-blue-800 text-sm">
                  + Добавить путешественника
                </FormArray.AddButton>
              </div>

              <FormArray.Empty>
                <p className="text-sm text-gray-500">Нет добавленных путешественников</p>
              </FormArray.Empty>

              <FormArray.List>
                {({ control, index, remove }) => (
                  <div key={control.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Путешественник #{index + 1}</h4>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800 text-sm"
                        onClick={remove}
                      >
                        Удалить
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={control.fullName} />
                      <FormField control={control.birthDate} />
                    </div>

                    <FormField control={control.passportNumber} />
                  </div>
                )}
              </FormArray.List>
            </div>
          </FormArray.Root>
        </div>
      ) : null}
    </div>
  );
}