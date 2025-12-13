import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui';
import type { GroupNodeWithControls } from '@reformer/core';
import type { Step6Form } from './type';

interface Step6FormProps {
  form: GroupNodeWithControls<Step6Form>;
}

export function Step6Form({ form }: Step6FormProps) {
  const paymentMethod = useFormControlValue(form.paymentMethod);
  // Removed unused variables

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Расчет и подтверждение</h2>
        <p className="text-sm text-gray-500">Ознакомьтесь с расчетом страховой премии и подтвердите информацию</p>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg p-6 space-y-6">
          <h3 className="font-medium text-lg">Расчет страховой премии</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.basePremium} />
            <FormField control={form.calculatedPremium} />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Коэффициенты риска</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField control={form.riskCoefficients.age} />
              <FormField control={form.riskCoefficients.experience} />
              <FormField control={form.riskCoefficients.region} />
              <FormField control={form.riskCoefficients.vehicleAge} />
              <FormField control={form.riskCoefficients.vehiclePower} />
              <FormField control={form.riskCoefficients.propertyValue} />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Скидки</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.discounts.loyalty} />
              <FormField control={form.discounts.safeDriver} />
              <FormField control={form.discounts.securitySystem} />
              <FormField control={form.discounts.franchise} />
              <FormField control={form.discounts.promoCode} />
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-6">
          <h3 className="font-medium text-lg">Способ оплаты</h3>
          
          <FormField control={form.paymentMethod} />

          {paymentMethod === 'installments' && (
            <div className="space-y-4">
              <FormField control={form.installmentsCount} />
              <FormField control={form.installmentAmount} />
            </div>
          )}
        </div>

        <div className="border rounded-lg p-6 space-y-6">
          <h3 className="font-medium text-lg">Подтверждение и согласия</h3>
          
          <div className="space-y-4">
            <FormField control={form.agreeToTerms} />
            <FormField control={form.agreeToProcessing} />
            <FormField control={form.agreeToCommunications} />
            <FormField control={form.confirmInformation} />
          </div>

          <FormField control={form.electronicSignature} />
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
    </div>
  );
}