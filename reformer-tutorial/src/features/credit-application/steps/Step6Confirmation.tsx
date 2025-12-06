/**
 * Шаг 6: Подтверждение и согласия
 */

import type { GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { CreditApplicationForm } from '../model/types';

interface Step6ConfirmationProps {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function Step6Confirmation({ control }: Step6ConfirmationProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Шаг 6: Подтверждение заявки</h2>

      {/* Согласия */}
      <div className="p-4 bg-white rounded-lg border border-gray-200 space-y-4">
        <h4 className="font-medium text-gray-700">Согласия</h4>

        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <FormField control={control.agreePersonalData} />
            <p className="text-xs text-gray-500 mt-1 ml-6">
              Я даю согласие на обработку моих персональных данных в соответствии с
              Федеральным законом № 152-ФЗ "О персональных данных".
            </p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <FormField control={control.agreeCreditHistory} />
            <p className="text-xs text-gray-500 mt-1 ml-6">
              Я даю согласие на получение кредитного отчета из бюро кредитных историй.
            </p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <FormField control={control.agreeTerms} />
            <p className="text-xs text-gray-500 mt-1 ml-6">
              Я ознакомлен и согласен с общими условиями кредитования.
            </p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <FormField control={control.agreeMarketing} />
            <p className="text-xs text-gray-500 mt-1 ml-6">
              Я согласен на получение рекламных и информационных материалов (необязательно).
            </p>
          </div>
        </div>
      </div>

      {/* Подтверждение данных */}
      <div className="p-4 bg-white rounded-lg border border-gray-200 space-y-4">
        <h4 className="font-medium text-gray-700">Подтверждение</h4>

        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
          <FormField control={control.confirmAccuracy} />
          <p className="text-xs text-amber-700 mt-1 ml-6">
            Я подтверждаю, что все указанные мной сведения являются достоверными и полными.
            Я осознаю, что предоставление недостоверной информации может повлечь отказ в
            выдаче кредита или требование о досрочном погашении.
          </p>
        </div>
      </div>

      {/* SMS-код */}
      <div className="p-4 bg-white rounded-lg border border-gray-200 space-y-4">
        <h4 className="font-medium text-gray-700">Электронная подпись</h4>

        <p className="text-sm text-gray-600">
          Для подтверждения заявки введите код из SMS, отправленный на номер телефона,
          указанный в заявке.
        </p>

        <div className="max-w-xs">
          <FormField control={control.electronicSignature} />
        </div>

        <p className="text-xs text-gray-500">
          Введя код, вы подписываете заявку электронной подписью в соответствии
          с Федеральным законом № 63-ФЗ "Об электронной подписи".
        </p>
      </div>

      {/* Информационный блок */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2">Что дальше?</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• После отправки заявки мы проверим указанные данные</li>
          <li>• Решение по заявке будет принято в течение 15 минут</li>
          <li>• Вы получите SMS-уведомление о результате рассмотрения</li>
          <li>• При положительном решении менеджер свяжется с вами для согласования условий</li>
        </ul>
      </div>
    </div>
  );
}
