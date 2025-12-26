import { useFormContext, useWatch } from 'react-hook-form';
import { FormRadioGroup } from '@/components/form';
import { INSURED_TYPE_OPTIONS } from '../../constants';
import type { InsuranceFormData } from '../../types';
import { useFormMode } from '../../hooks';
import {
  PersonalDataSection,
  CompanyDataSection,
  PassportDataSection,
  ContactsSection,
} from '../sections';
import { ComputedField } from '../ui';

export function Step2InsuredInfo() {
  const { isReadOnly } = useFormMode();
  const { control } = useFormContext<InsuranceFormData>();

  const insuredType = useWatch({ control, name: 'insuredType' });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 2: Данные страхователя</h2>

      <FormRadioGroup
        name="insuredType"
        label="Тип страхователя"
        options={INSURED_TYPE_OPTIONS}
        disabled={isReadOnly}
      />

      {insuredType === 'individual' ? (
        <>
          <PersonalDataSection />
          <PassportDataSection />
        </>
      ) : (
        <CompanyDataSection />
      )}

      <ContactsSection />

      <div className="bg-muted p-4 rounded-lg space-y-2">
        <h4 className="font-medium">Вычисляемые поля</h4>
        <ComputedField name="fullName" label="Полное имя" />
        <ComputedField
          name="age"
          label="Возраст"
          suffix="лет"
        />
      </div>
    </div>
  );
}
