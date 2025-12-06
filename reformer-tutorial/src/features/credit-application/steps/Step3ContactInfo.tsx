// steps/Step3ContactInfo.tsx - Шаг 3: Контактная информация

import { useFormControl, type GroupNodeWithControls, type FieldNode } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { AddressSubForm } from '../sub-forms';
import type { CreditApplicationForm } from '../model/types';

interface Step3Props {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function Step3ContactInfo({ control }: Step3Props) {
  // Получаем значение флага "адрес совпадает"
  const { value: sameAsRegistration } = useFormControl(
    control.sameAsRegistration as FieldNode<boolean>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Контактная информация</h2>

      {/* Телефоны */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-4">Телефоны</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.phoneMain} />
          <FormField control={control.phoneAdditional} />
        </div>
      </div>

      {/* Email */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-4">Электронная почта</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.email} />
          <FormField control={control.emailAdditional} />
        </div>
      </div>

      {/* Адрес регистрации */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <AddressSubForm control={control.registrationAddress} title="Адрес регистрации" />
      </div>

      {/* Флаг "адрес совпадает" */}
      <FormField control={control.sameAsRegistration} />

      {/* Адрес проживания (если не совпадает) */}
      {!sameAsRegistration && (
        <div className="p-4 border border-gray-200 rounded-lg">
          <AddressSubForm control={control.residenceAddress} title="Адрес проживания" />
        </div>
      )}
    </div>
  );
}
