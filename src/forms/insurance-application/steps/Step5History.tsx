// Step 5: History and Additional Information
import type { GroupNodeWithControls } from '@reformer/core';
import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { FormArray } from '@reformer/ui/form-array';
import type { InsuranceApplicationForm } from '../type';

interface Step5Props {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step5History({ control }: Step5Props) {
  const hasPreviousInsurance = useFormControlValue(control.hasPreviousInsurance);
  const hadClaims = useFormControlValue(control.hadClaims);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 5: История и дополнительная информация</h2>

      <div className="space-y-4">
        {/* Previous Insurance Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Предыдущий полис</h3>
          <FormField control={control.hasPreviousInsurance} />

          {hasPreviousInsurance && (
            <div className="space-y-4 pl-4 border-l-2 border-blue-200">
              <FormField control={control.previousInsurer} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={control.previousPolicyNumber} />
                <FormField control={control.previousPolicyEndDate} />
              </div>
            </div>
          )}
        </section>

        {/* Claims Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Страховые случаи</h3>
          <FormField control={control.hadClaims} />

          {hadClaims && (
            <div className="pl-4 border-l-2 border-blue-200">
              <FormArray.Root control={control.claims}>
                <FormArray.Empty>
                  <p className="text-gray-500 text-sm">Нет страховых случаев.</p>
                </FormArray.Empty>

                <FormArray.List className="space-y-4">
                  {({ control: itemControl, index }) => (
                    <div className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Страховой случай #{index + 1}</h4>
                        <FormArray.RemoveButton className="text-red-500 hover:text-red-700 text-sm">
                          Удалить
                        </FormArray.RemoveButton>
                      </div>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField control={itemControl.date} />
                          <FormField control={itemControl.type} />
                        </div>
                        <FormField control={itemControl.description} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField control={itemControl.amount} />
                          <FormField control={itemControl.atFault} />
                        </div>
                      </div>
                    </div>
                  )}
                </FormArray.List>

                <FormArray.AddButton className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                  + Добавить страховой случай
                </FormArray.AddButton>
              </FormArray.Root>
            </div>
          )}
        </section>

        {/* Additional Information */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Дополнительно</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.promoCode} />
            <FormField control={control.referralSource} />
          </div>
          <FormField control={control.agentCode} />
          <FormField control={control.additionalNotes} />
        </section>
      </div>
    </div>
  );
}
