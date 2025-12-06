/**
 * Шаг 6: Подтверждение и согласия
 */

import type { GroupNodeWithControls } from '@reformer/core';
import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/button';
import type { CreditApplicationForm } from '../model/types';

interface Step6ConfirmationProps {
  control: GroupNodeWithControls<CreditApplicationForm>;
  onSendSmsCode?: () => void;
  isSendingSms?: boolean;
}

export function Step6Confirmation({ control, onSendSmsCode, isSendingSms }: Step6ConfirmationProps) {
  const fullName = useFormControlValue(control.fullName);
  const loanAmount = useFormControlValue(control.loanAmount);
  const loanTerm = useFormControlValue(control.loanTerm);
  const monthlyPayment = useFormControlValue(control.monthlyPayment);
  const interestRate = useFormControlValue(control.interestRate);
  const phoneMain = useFormControlValue(control.phoneMain);

  return (
    <div className="space-y-6">
      {/* Сводка заявки */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-4">Сводка по заявке</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Заемщик:</span>
            <span className="ml-2 font-medium text-gray-900">{fullName || '—'}</span>
          </div>
          <div>
            <span className="text-gray-600">Сумма кредита:</span>
            <span className="ml-2 font-medium text-gray-900">
              {loanAmount ? `${loanAmount.toLocaleString()} ₽` : '—'}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Срок кредита:</span>
            <span className="ml-2 font-medium text-gray-900">
              {loanTerm ? `${loanTerm} мес.` : '—'}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Процентная ставка:</span>
            <span className="ml-2 font-medium text-gray-900">
              {interestRate ? `${interestRate}%` : '—'}
            </span>
          </div>
          <div className="md:col-span-2">
            <span className="text-gray-600">Ежемесячный платеж:</span>
            <span className="ml-2 font-medium text-green-600 text-lg">
              {monthlyPayment ? `${monthlyPayment.toLocaleString()} ₽` : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Согласия */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Согласия</h4>
        <div className="space-y-3">
          <FormField control={control.agreePersonalData} />
          <FormField control={control.agreeCreditHistory} />
          <FormField control={control.agreeTerms} />
          <FormField control={control.agreeMarketing} />
        </div>
      </div>

      {/* Подтверждение данных */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Подтверждение</h4>
        <FormField control={control.confirmAccuracy} />
      </div>

      {/* СМС-код */}
      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h4 className="font-medium text-yellow-900 mb-4">Подтверждение по СМС</h4>
        <p className="text-sm text-yellow-800 mb-4">
          Для завершения заявки введите код подтверждения, отправленный на номер {phoneMain || 'ваш телефон'}.
        </p>
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <FormField control={control.electronicSignature} />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={onSendSmsCode}
            disabled={isSendingSms}
          >
            {isSendingSms ? 'Отправка...' : 'Отправить код'}
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Для тестирования используйте код: 123456
        </p>
      </div>
    </div>
  );
}
