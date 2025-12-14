import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../../type';

interface Step6FormProps {
  form: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step6Form({ form }: Step6FormProps) {
  const agreePersonalData = useFormControlValue(form?.agreePersonalData);
  const agreeTerms = useFormControlValue(form?.agreeTerms);
  const agreeElectronicPolicy = useFormControlValue(form?.agreeElectronicPolicy);
  const agreeMarketing = useFormControlValue(form?.agreeMarketing);
  const confirmAccuracy = useFormControlValue(form?.confirmAccuracy);

  if (!form) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Расчет и подтверждение</h2>
        <p className="text-sm text-gray-500">Ознакомьтесь с расчетом стоимости и подтвердите заявление</p>
      </div>

      <div className="border rounded-lg p-6 space-y-6">
        <h3 className="font-medium text-lg">Расчет стоимости</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.basePremium} />
          <FormField control={form.totalPremium} />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Коэффициенты и скидки</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField control={form.ageCoefficient} />
            <FormField control={form.experienceCoefficient} />
            <FormField control={form.regionCoefficient} />
            <FormField control={form.claimsCoefficient} />
            <FormField control={form.deductibleDiscount} />
            <FormField control={form.promoDiscount} />
            <FormField control={form.multiPolicyDiscount} />
          </div>
        </div>

        {form.installmentAmount && (
          <FormField control={form.installmentAmount} />
        )}
      </div>

      <div className="border rounded-lg p-6 space-y-6">
        <h3 className="font-medium text-lg">Подтверждение и согласия</h3>
        
        <div className="space-y-4">
          <FormField control={form.agreePersonalData} />
          <FormField control={form.agreeTerms} />
          <FormField control={form.agreeElectronicPolicy} />
          <FormField control={form.agreeMarketing} />
          <FormField control={form.confirmAccuracy} />
        </div>

        {(agreePersonalData === true && agreeTerms === true && agreeElectronicPolicy === true && agreeMarketing === true && confirmAccuracy === true) && (
          <FormField control={form.electronicSignature} />
        )}
      </div>

      <div className="border rounded-lg p-6 space-y-4">
        <h3 className="font-medium text-lg">Данные полиса</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.policyNumber} />
          <FormField control={form.policyStartDate} />
        </div>
        
        <FormField control={form.policyEndDate} />
      </div>
    </div>
  );
}