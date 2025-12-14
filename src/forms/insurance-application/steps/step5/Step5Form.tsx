import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui';
import { FormArray } from '@reformer/ui/form-array';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../../type';

interface Step5FormProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step5Form({ control }: Step5FormProps) {
  const hasPreviousInsurance = useFormControlValue(control.hasPreviousInsurance);
  const hadClaims = useFormControlValue(control.hadClaims);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">История страхования и дополнительная информация</h2>
        <p className="text-sm text-gray-500">Укажите историю страхования и дополнительные сведения</p>
      </div>

      <div className="space-y-4">
        <FormField control={control.hasPreviousInsurance} />
        
        {hasPreviousInsurance === true && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
            <FormField control={control.previousInsurer} />
            <FormField control={control.previousPolicyNumber} />
            <FormField control={control.previousPolicyEndDate} />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <FormField control={control.hadClaims} />
        
        {hadClaims === true && (
          <FormArray.Root control={control.claims}>
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Страховые случаи</h3>
                <FormArray.AddButton className="text-blue-600 hover:text-blue-80 text-sm">
                  + Добавить случай
                </FormArray.AddButton>
              </div>
  
              <FormArray.Empty>
                <p className="text-sm text-gray-500">Нет добавленных страховых случаев</p>
              </FormArray.Empty>
  
              <FormArray.List>
                {({ control, index, remove }) => (
                  <div key={control.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Случай #{index + 1}</h4>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-80 text-sm"
                        onClick={remove}
                      >
                        Удалить
                      </button>
                    </div>
  
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={control.date} />
                      <FormField control={control.type} />
                    </div>
                    <FormField control={control.description} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={control.amount} />
                      <FormField control={control.atFault} />
                    </div>
                  </div>
                )}
              </FormArray.List>
            </div>
          </FormArray.Root>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.promoCode} />
        <FormField control={control.referralSource} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.agentCode} />
        <FormField control={control.additionalNotes} />
      </div>
    </div>
  );
}