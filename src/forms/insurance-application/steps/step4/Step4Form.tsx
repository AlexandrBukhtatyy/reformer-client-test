import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui';
import type { GroupNodeWithControls } from '@reformer/core';
import type { Step4Form } from './type';

interface Step4FormProps {
  form: GroupNodeWithControls<Step4Form>;
  insuranceType: 'casco' | 'osago' | 'property' | 'life' | 'travel';
}

export function Step4Form({ form, insuranceType }: Step4FormProps) {
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
            {form.unlimitedDrivers.value && (
              <span className="text-sm text-gray-500">Будет разрешено неограниченное количество водителей</span>
            )}
          </div>

          {!unlimitedDrivers && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Водители</h3>
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  onClick={() => form.drivers?.push({ 
                    fullName: '', 
                    birthDate: '', 
                    licenseNumber: '', 
                    licenseIssueDate: '', 
                    drivingExperience: undefined, 
                    accidentsCount: 0, 
                    isMainDriver: false 
                  })}
                >
                  + Добавить водителя
                </button>
              </div>

              {form.drivers && form.drivers.length > 0 && (
                <div className="space-y-4">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {(form.drivers as any)?.map((driver: any, index: number) => (
                    <div key={driver.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Водитель #{index + 1}</h4>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-800 text-sm"
                          onClick={() => {
                            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            (form.drivers as any)?.removeAt(index);
                          }}
                        >
                          Удалить
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={driver.fullName} />
                        <FormField control={driver.birthDate} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={driver.licenseNumber} />
                        <FormField control={driver.licenseIssueDate} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={driver.drivingExperience} />
                        <FormField control={driver.accidentsCount} />
                        <FormField control={driver.isMainDriver} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.minDriverAge} />
                <FormField control={form.minDriverExperience} />
              </div>
            </div>
          )}
        </div>
      ) : insuranceType === 'life' ? (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Выгодоприобретатели</h3>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => form.beneficiaries?.push({ 
                  fullName: '', 
                  birthDate: '', 
                  relationship: 'spouse', 
                  share: undefined, 
                  phone: '' 
                })}
              >
                + Добавить выгодоприобретателя
              </button>
            </div>

            {form.beneficiaries && form.beneficiaries.length > 0 && (
              <div className="space-y-4">
               {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
               {(form.beneficiaries as any)?.map((beneficiary: any, index: number) => (
                 <div key={beneficiary.id} className="border rounded-lg p-4 space-y-4">
                   <div className="flex justify-between items-center">
                     <h4 className="font-medium">Выгодоприобретатель #{index + 1}</h4>
                     <button
                       type="button"
                       className="text-red-600 hover:text-red-800 text-sm"
                       onClick={() => {
                         /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                         (form.beneficiaries as any)?.removeAt(index);
                       }}
                     >
                       Удалить
                     </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormField control={beneficiary.fullName} />
                     <FormField control={beneficiary.birthDate} />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormField control={beneficiary.relationship} />
                     <FormField control={beneficiary.share} />
                   </div>

                   <FormField control={beneficiary.phone} />
                 </div>
               ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.totalBeneficiaryShare} />
            </div>
          </div>
        </div>
      ) : insuranceType === 'travel' ? (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Путешественники</h3>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => form.travelers?.push({ 
                  fullName: '', 
                  birthDate: '', 
                  passportNumber: '' 
                })}
              >
                + Добавить путешественника
              </button>
            </div>

            {form.travelers && form.travelers.length > 0 && (
              <div className="space-y-4">
               {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
               {(form.travelers as any)?.map((traveler: any, index: number) => (
                 <div key={traveler.id} className="border rounded-lg p-4 space-y-4">
                   <div className="flex justify-between items-center">
                     <h4 className="font-medium">Путешественник #{index + 1}</h4>
                     <button
                       type="button"
                       className="text-red-600 hover:text-red-800 text-sm"
                       onClick={() => {
                         /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                         (form.travelers as any)?.removeAt(index);
                       }}
                     >
                       Удалить
                     </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormField control={traveler.fullName} />
                     <FormField control={traveler.birthDate} />
                   </div>

                   <FormField control={traveler.passportNumber} />
                 </div>
               ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}