import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui';
import { FormArray } from '@reformer/ui/form-array';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../../type';

interface Step5FormProps {
  form: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step5Form({ form }: Step5FormProps) {
  const hasPreviousInsurance = useFormControlValue(form.hasPreviousInsurance);
  const hadClaims = useFormControlValue(form.hadClaims);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">История страхования и дополнительная информация</h2>
        <p className="text-sm text-gray-500">Укажите историю страхования и дополнительные сведения</p>
      </div>

      <div className="space-y-4">
        <FormField control={form.hasPreviousInsurance} />
        
        {hasPreviousInsurance === true && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
            <FormField control={form.previousInsurer} />
            <FormField control={form.previousPolicyNumber} />
            <FormField control={form.previousPolicyEndDate} />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <FormField control={form.hadClaims} />
        
        {hadClaims === true && (
          <FormArray.Root control={form.claims}>
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
        <FormField control={form.promoCode} />
        <FormField control={form.referralSource} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={form.agentCode} />
        <FormField control={form.additionalNotes} />
      </div>
    </div>
  );
}