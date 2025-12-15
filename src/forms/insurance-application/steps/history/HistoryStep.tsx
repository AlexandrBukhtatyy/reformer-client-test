import { useFormControlValue } from '@reformer/core';
import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/button';
import { ClaimItem } from '../../sub-forms/claim/ClaimItem';
import type { InsuranceApplicationForm } from '../../type';

interface HistoryStepProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function HistoryStep({ control }: HistoryStepProps) {
  const hasPreviousInsurance = useFormControlValue(control.hasPreviousInsurance);
  const hasClaimsHistory = useFormControlValue(control.hasClaimsHistory);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">История страхования</h2>

      <div className="space-y-4">
        <FormField control={control.hasPreviousInsurance} />

        {hasPreviousInsurance && (
          <div className="pl-6 border-l-2 border-gray-200 space-y-4">
            <FormField control={control.previousInsurer} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.previousPolicyNumber} />
              <FormField control={control.previousPolicyEndDate} />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <FormField control={control.hasClaimsHistory} />

        {hasClaimsHistory && (
          <div className="space-y-4">
            {control.claims.map((claim: any, index: number) => (
              <ClaimItem
                key={index}
                control={claim}
                onRemove={() => control.claims.removeAt(index)}
                index={index}
              />
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                control.claims.push({
                  date: '',
                  claimType: 'accident',
                  description: '',
                  amount: undefined,
                  wasCompensated: false,
                  compensationAmount: undefined,
                })
              }
            >
              Добавить страховой случай
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4 pt-6 border-t">
        <h3 className="text-lg font-medium">Дополнительная информация</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.promoCode} />
          <FormField control={control.referralSource} />
        </div>

        <FormField control={control.agentCode} />
        <FormField control={control.additionalNotes} />
      </div>
    </div>
  );
}
