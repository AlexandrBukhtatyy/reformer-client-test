/**
 * Шаг 3: Контактная информация
 */

import type { GroupNodeWithControls } from '@reformer/core';
import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { AddressSubForm } from '../sub-forms';
import type { CreditApplicationForm } from '../model/types';

interface Step3ContactInfoProps {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function Step3ContactInfo({ control }: Step3ContactInfoProps) {
  const sameAsRegistration = useFormControlValue(control.sameAsRegistration);

  return (
    <div className="space-y-6">
      {/* Телефоны */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Телефоны</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.phoneMain} />
          <FormField control={control.phoneAdditional} />
        </div>
      </div>

      {/* Email */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Электронная почта</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.email} />
          <FormField control={control.emailAdditional} />
        </div>
      </div>

      {/* Адрес регистрации */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <AddressSubForm control={control.registrationAddress} title="Адрес регистрации" />
      </div>

      {/* Чекбокс совпадения адресов */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <FormField control={control.sameAsRegistration} />
      </div>

      {/* Адрес проживания (условный) */}
      {!sameAsRegistration && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <AddressSubForm control={control.residenceAddress} title="Адрес проживания" />
        </div>
      )}
    </div>
  );
}
