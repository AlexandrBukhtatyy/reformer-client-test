// steps/Step6Confirmation.tsx - Шаг 6: Подтверждение и согласия

import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { CreditApplicationForm } from '../model/types';

interface Step6Props {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function Step6Confirmation({ control }: Step6Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Подтверждение</h2>

      {/* Обязательные согласия */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-4">Обязательные согласия</h4>
        <div className="space-y-3">
          <FormField control={control.agreePersonalData} />
          <FormField control={control.agreeCreditHistory} />
          <FormField control={control.agreeTerms} />
          <FormField control={control.confirmAccuracy} />
        </div>
      </div>

      {/* Опциональное согласие */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-4">Дополнительно</h4>
        <FormField control={control.agreeMarketing} />
      </div>

      {/* SMS-код */}
      <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
        <h4 className="font-medium text-blue-900 mb-4">Подтверждение по SMS</h4>
        <p className="text-sm text-blue-700 mb-4">
          На ваш номер телефона будет отправлен код подтверждения. Введите его для завершения
          подачи заявки.
        </p>
        <div className="max-w-xs">
          <FormField control={control.electronicSignature} />
        </div>
      </div>

      {/* Сводка по расчёту */}
      <div className="p-4 border border-green-200 rounded-lg bg-green-50">
        <h4 className="font-medium text-green-900 mb-4">Итоговый расчёт</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField control={control.interestRate} />
          <FormField control={control.monthlyPayment} />
          <FormField control={control.paymentToIncomeRatio} />
        </div>
      </div>
    </div>
  );
}
