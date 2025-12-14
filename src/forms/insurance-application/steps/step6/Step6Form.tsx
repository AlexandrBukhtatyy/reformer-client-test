import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../../type';

interface Step6FormProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step6Form({ control }: Step6FormProps) {
  const agreePersonalData = useFormControlValue(control?.agreePersonalData);
  const agreeTerms = useFormControlValue(control?.agreeTerms);
  const agreeElectronicPolicy = useFormControlValue(control?.agreeElectronicPolicy);
  const agreeMarketing = useFormControlValue(control?.agreeMarketing);
  const confirmAccuracy = useFormControlValue(control?.confirmAccuracy);

  if (!control) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Расчет и подтверждение</h2>
        <p className="text-sm text-gray-500">Ознакомьтесь с расчетом стоимости и подтвердите заявление</p>
      </div>

      <div className="border rounded-lg p-6 space-y-6">
        <h3 className="font-medium text-lg">Расчет стоимости</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.basePremium} />
          <FormField control={control.totalPremium} />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Коэффициенты и скидки</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField control={control.ageCoefficient} />
            <FormField control={control.experienceCoefficient} />
            <FormField control={control.regionCoefficient} />
            <FormField control={control.claimsCoefficient} />
            <FormField control={control.deductibleDiscount} />
            <FormField control={control.promoDiscount} />
            <FormField control={control.multiPolicyDiscount} />
          </div>
        </div>

        {control.installmentAmount && (
          <FormField control={control.installmentAmount} />
        )}
      </div>

      <div className="border rounded-lg p-6 space-y-6">
        <h3 className="font-medium text-lg">Подтверждение и согласия</h3>
        
        <div className="space-y-4">
          <FormField control={control.agreePersonalData} />
          <FormField control={control.agreeTerms} />
          <FormField control={control.agreeElectronicPolicy} />
          <FormField control={control.agreeMarketing} />
          <FormField control={control.confirmAccuracy} />
        </div>

        {(agreePersonalData === true && agreeTerms === true && agreeElectronicPolicy === true && agreeMarketing === true && confirmAccuracy === true) && (
          <FormField control={control.electronicSignature} />
        )}
      </div>

      <div className="border rounded-lg p-6 space-y-4">
        <h3 className="font-medium text-lg">Данные полиса</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.policyNumber} />
          <FormField control={control.policyStartDate} />
        </div>
        
        <FormField control={control.policyEndDate} />
      </div>
    </div>
  );
}