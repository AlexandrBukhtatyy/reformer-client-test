import { useFormControlValue } from '@reformer/core';
import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/button';
import type { InsuranceApplicationForm } from '../../type';

interface ConfirmationStepProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function ConfirmationStep({ control }: ConfirmationStepProps) {
  const totalPremium = useFormControlValue(control.totalPremium) as number | undefined;
  const installmentAmount = useFormControlValue(control.installmentAmount) as number | undefined;
  const paymentType = useFormControlValue(control.paymentType);
  const installments = useFormControlValue(control.installments) as number | undefined;

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined || value === null) return '—';
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleSendCode = () => {
    // TODO: Отправка SMS с кодом
    alert('Код подтверждения отправлен на ваш номер телефона');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Расчет и подтверждение</h2>

      {/* Расчет стоимости */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-medium">Расчет стоимости полиса</h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
            <FormField control={control.basePremium} />
            <FormField control={control.ageCoefficient} />
            <FormField control={control.experienceCoefficient} />
            <FormField control={control.regionalCoefficient} />
            <FormField control={control.kbmCoefficient} />
            <FormField control={control.deductibleDiscount} />
            <FormField control={control.promoDiscount} />
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Итого к оплате:</span>
            <span className="text-green-600">{formatCurrency(totalPremium)}</span>
          </div>

          {paymentType === 'installments' && installmentAmount && (
            <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
              <span>Платеж ({installments} платежей):</span>
              <span>{formatCurrency(installmentAmount)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Согласия */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Согласия и подтверждения</h3>

        <div className="space-y-3">
          <FormField control={control.agreePersonalData} />
          <FormField control={control.agreeInsuranceTerms} />
          <FormField control={control.agreeElectronicPolicy} />
          <FormField control={control.agreeMarketing} />
          <FormField control={control.confirmDataAccuracy} />
        </div>
      </div>

      {/* Верификация */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Подтверждение по СМС</h3>

        <div className="flex gap-4 items-end">
          <FormField control={control.smsVerificationCode} className="flex-1" />
          <Button type="button" variant="outline" onClick={handleSendCode}>
            Отправить код
          </Button>
        </div>
      </div>
    </div>
  );
}
