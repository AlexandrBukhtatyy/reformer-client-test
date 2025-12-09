import type { GroupNodeWithControls } from "@reformer/core";
import type { CreditApplicationForm } from "../../types";
import { FormField } from "../../../../components/ui/FormField";

interface StepProps {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function ConfirmationStep({ control }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Подтверждение и согласия</h2>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-2">Расчетные данные:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div><strong>Процентная ставка:</strong> {control.interestRate.value}%</div>
          <div><strong>Ежемесячный платеж:</strong> {control.monthlyPayment.value?.toLocaleString('ru-RU')} ₽</div>
          <div><strong>Полное имя:</strong> {control.fullName.value}</div>
          <div><strong>Возраст:</strong> {control.age.value} лет</div>
          <div><strong>Общий доход:</strong> {control.totalIncome.value?.toLocaleString('ru-RU')} ₽</div>
          <div><strong>Процент платежа от дохода:</strong> {control.paymentToIncomeRatio.value}%</div>
        </div>
      </div>

      <FormField control={control.agreePersonalData} />
      <FormField control={control.agreeCreditHistory} />
      <FormField control={control.agreeMarketing} />
      <FormField control={control.agreeTerms} />
      <FormField control={control.confirmAccuracy} />
      <FormField control={control.electronicSignature} />
    </div>
  );
}