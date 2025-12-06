/**
 * Шаг 3: Контактная информация
 */

import { useFormControl, type GroupNodeWithControls, type FieldNode } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import { AddressSubForm } from '../sub-forms';
import type { CreditApplicationForm } from '../model/types';

interface Step3ContactInfoProps {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function Step3ContactInfo({ control }: Step3ContactInfoProps) {
  const { value: sameAsRegistration } = useFormControl(control.sameAsRegistration as FieldNode<boolean>);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Шаг 3: Контактная информация</h2>

      {/* Телефоны */}
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-700 mb-3">Телефоны</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.phoneMain} />
          <FormField control={control.phoneAdditional} />
        </div>
      </div>

      {/* Email */}
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-700 mb-3">Email</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control.email} />
          <FormField control={control.emailAdditional} />
        </div>
        <div className="mt-2">
          <FormField control={control.sameEmail} />
        </div>
      </div>

      {/* Адрес регистрации */}
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <AddressSubForm
          control={control.registrationAddress}
          title="Адрес регистрации"
        />
      </div>

      {/* Адрес проживания */}
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <div className="mb-4">
          <FormField control={control.sameAsRegistration} />
        </div>

        {!sameAsRegistration && (
          <AddressSubForm
            control={control.residenceAddress}
            title="Адрес проживания"
          />
        )}

        {sameAsRegistration && (
          <p className="text-sm text-gray-500">
            Адрес проживания совпадает с адресом регистрации.
          </p>
        )}
      </div>
    </div>
  );
}
