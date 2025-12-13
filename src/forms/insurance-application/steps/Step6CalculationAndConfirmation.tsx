// Step 6: Calculation and Confirmation
import type { GroupNodeWithControls } from '@reformer/core';
import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { InsuranceApplicationForm } from '../type';

interface Step6Props {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step6CalculationAndConfirmation({ control }: Step6Props) {
  const paymentType = useFormControlValue(control.paymentType);
  const totalPremium = useFormControlValue(control.totalPremium);
  const installmentAmount = useFormControlValue(control.installmentAmount);
  const installments = useFormControlValue(control.installments);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 6: Расчет и подтверждение</h2>

      <div className="space-y-4">
        {/* Premium Calculation Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Расчет стоимости</h3>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.basePremium} />
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-3">Коэффициенты</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FormField control={control.ageCoefficient} />
              <FormField control={control.experienceCoefficient} />
              <FormField control={control.regionCoefficient} />
              <FormField control={control.claimsCoefficient} />
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-3">Скидки</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField control={control.deductibleDiscount} />
              <FormField control={control.promoDiscount} />
              <FormField control={control.multiPolicyDiscount} />
            </div>
          </div>
        </section>

        {/* Total Section */}
        <section className="p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Итого</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormField control={control.totalPremium} />
              {totalPremium && (
                <p className="text-2xl font-bold text-blue-600 mt-2">
                  {Number(totalPremium).toLocaleString('ru-RU')} руб.
                </p>
              )}
            </div>
            {paymentType === 'installments' && installments && (
              <div>
                <FormField control={control.installmentAmount} />
                {installmentAmount && (
                  <p className="text-lg font-semibold text-gray-700 mt-2">
                    {String(installments)} x {Number(installmentAmount).toLocaleString('ru-RU')} руб.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Agreements Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Согласия</h3>
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <FormField control={control.agreePersonalData} />
            <FormField control={control.agreeTerms} />
            <FormField control={control.agreeElectronicPolicy} />
            <FormField control={control.agreeMarketing} />
          </div>
        </section>

        {/* Confirmation Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Подтверждение</h3>
          <div className="p-4 bg-gray-50 rounded-lg space-y-4">
            <FormField control={control.confirmAccuracy} />
            <div className="max-w-xs">
              <FormField control={control.electronicSignature} />
              <p className="text-xs text-gray-500 mt-1">
                Введите 6-значный код из SMS
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
