import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui';
import type { GroupNodeWithControls } from '@reformer/core';
import type { Step5Form } from './type';

interface Step5FormProps {
  form: GroupNodeWithControls<Step5Form>;
}

export function Step5Form({ form }: Step5FormProps) {
  const hasPreviousInsurance = useFormControlValue(form.hasPreviousInsurance);
  const hadClaims = useFormControlValue(form.hadClaims);
  const referralSource = useFormControlValue(form.referralSource);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">История страхования и дополнительная информация</h2>
        <p className="text-sm text-gray-500">Расскажите о предыдущем опыте страхования и дополнительной информации</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <FormField control={form.hasPreviousInsurance} />

          {hasPreviousInsurance && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
              <FormField control={form.previousInsurer} />
              <FormField control={form.previousPolicyNumber} />
              <FormField control={form.previousPolicyEndDate} />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <FormField control={form.hadClaims} />

          {hadClaims && form.claims && (
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Страховые случаи</h3>
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  onClick={() => form.claims?.push({ 
                    date: '', 
                    type: 'accident', 
                    description: '', 
                    amount: undefined, 
                    atFault: false 
                  })}
                >
                  + Добавить случай
                </button>
              </div>

              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(form.claims as any)?.map((claim: any, index: number) => (
                <div key={claim.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Случай #{index + 1}</h4>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800 text-sm"
                      onClick={() => {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        (form.claims as any)?.removeAt(index);
                      }}
                    >
                      Удалить
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={claim.date} />
                    <FormField control={claim.type} />
                  </div>

                  <FormField control={claim.description} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={claim.amount} />
                    <FormField control={claim.atFault} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.promoCode} />
          <FormField control={form.referralSource} />
        </div>

        {referralSource === 'agent' && (
          <FormField control={form.agentCode} />
        )}

        <FormField control={form.additionalNotes} />
      </div>
    </div>
  );
}