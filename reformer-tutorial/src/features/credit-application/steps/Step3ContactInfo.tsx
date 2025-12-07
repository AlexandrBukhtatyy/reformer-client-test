/**
 * Шаг 3: Контактная информация
 */

import { useFormControlValue, type GroupNodeWithControls } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';

import type { CreditApplicationForm } from '../model/types';

interface Step3ContactInfoProps {
  form: GroupNodeWithControls<CreditApplicationForm>;
  disabled?: boolean;
}

export function Step3ContactInfo({ form, disabled }: Step3ContactInfoProps) {
  const isSameAsRegistration = useFormControlValue(form.sameAsRegistration);

  return (
    <div className="form-step step-3">
      <h2>Контактная информация</h2>

      <fieldset disabled={disabled} className="form-section">
        <legend>Телефоны и Email</legend>

        <div className="form-row">
          <FormField control={form.phoneMain} />
          <FormField control={form.phoneAdditional} />
        </div>

        <div className="form-row">
          <FormField control={form.email} />
          <FormField control={form.emailAdditional} />
        </div>
      </fieldset>

      <fieldset disabled={disabled} className="form-section">
        <legend>Адрес регистрации</legend>

        <div className="form-row">
          <FormField control={form.registrationAddress.region} />
          <FormField control={form.registrationAddress.city} />
        </div>

        <div className="form-row">
          <FormField control={form.registrationAddress.street} />
          <FormField control={form.registrationAddress.house} />
          <FormField control={form.registrationAddress.apartment} />
        </div>

        <div className="form-row">
          <FormField control={form.registrationAddress.postalCode} />
        </div>
      </fieldset>

      <fieldset disabled={disabled} className="form-section">
        <div className="form-row">
          <FormField control={form.sameAsRegistration} />
        </div>
      </fieldset>

      {!isSameAsRegistration && (
        <fieldset disabled={disabled} className="form-section">
          <legend>Адрес проживания</legend>

          <div className="form-row">
            <FormField control={form.residenceAddress.region} />
            <FormField control={form.residenceAddress.city} />
          </div>

          <div className="form-row">
            <FormField control={form.residenceAddress.street} />
            <FormField control={form.residenceAddress.house} />
            <FormField control={form.residenceAddress.apartment} />
          </div>

          <div className="form-row">
            <FormField control={form.residenceAddress.postalCode} />
          </div>
        </fieldset>
      )}
    </div>
  );
}
