import { useFormContext, useWatch } from 'react-hook-form';
import { FormInput, FormSelect, FormCheckbox, FormTextarea } from '@/components/form';
import {
  REFERRAL_SOURCE_OPTIONS,
} from '../../constants';
import type { InsuranceFormData } from '../../types';
import { useFormMode } from '../../hooks';
import { ClaimsArray } from '../arrays';

export function Step5History() {
  const { isReadOnly } = useFormMode();
  const { control } = useFormContext<InsuranceFormData>();

  const hasPreviousInsurance = useWatch({ control, name: 'hasPreviousInsurance' });
  const hadClaims = useWatch({ control, name: 'hadClaims' });
  const referralSource = useWatch({ control, name: 'referralSource' });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 5: История и дополнительная информация</h2>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Предыдущее страхование</h3>

        <FormCheckbox
          name="hasPreviousInsurance"
          label="Был предыдущий полис"
          disabled={isReadOnly}
        />

        {hasPreviousInsurance && (
          <div className="space-y-4 pl-6 border-l-2 border-muted">
            <FormInput
              name="previousInsurer"
              label="Страховая компания"
              placeholder="Название компании"
              disabled={isReadOnly}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="previousPolicyNumber"
                label="Номер полиса"
                placeholder="XXX-123456"
                disabled={isReadOnly}
              />
              <FormInput
                name="previousPolicyEndDate"
                label="Дата окончания"
                type="date"
                disabled={isReadOnly}
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Страховые случаи</h3>

        <FormCheckbox
          name="hadClaims"
          label="Были страховые случаи"
          disabled={isReadOnly}
        />

        {hadClaims && (
          <div className="pl-6 border-l-2 border-muted">
            <ClaimsArray />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Промо и реферальная программа</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            name="promoCode"
            label="Промокод"
            placeholder="PROMO2024"
            disabled={isReadOnly}
          />
          <FormSelect
            name="referralSource"
            label="Откуда узнали о нас"
            options={REFERRAL_SOURCE_OPTIONS}
            disabled={isReadOnly}
          />
        </div>

        {referralSource === 'agent' && (
          <FormInput
            name="agentCode"
            label="Код агента"
            placeholder="AG-12345"
            disabled={isReadOnly}
          />
        )}
      </div>

      <FormTextarea
        name="additionalNotes"
        label="Дополнительные примечания"
        placeholder="Укажите дополнительную информацию, если необходимо..."
        disabled={isReadOnly}
      />
    </div>
  );
}
