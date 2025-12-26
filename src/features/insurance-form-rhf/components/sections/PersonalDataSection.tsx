import { FormInput, FormSelect, FormRadioGroup } from '@/components/form';
import { GENDER_OPTIONS } from '../../constants';
import { useFormMode } from '../../hooks';

export function PersonalDataSection() {
  const { isReadOnly } = useFormMode();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Персональные данные</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormInput
          name="personalData.lastName"
          label="Фамилия"
          placeholder="Иванов"
          disabled={isReadOnly}
        />
        <FormInput
          name="personalData.firstName"
          label="Имя"
          placeholder="Иван"
          disabled={isReadOnly}
        />
        <FormInput
          name="personalData.middleName"
          label="Отчество"
          placeholder="Иванович"
          disabled={isReadOnly}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          name="personalData.birthDate"
          label="Дата рождения"
          type="date"
          disabled={isReadOnly}
        />
        <FormRadioGroup
          name="personalData.gender"
          label="Пол"
          options={GENDER_OPTIONS}
          disabled={isReadOnly}
        />
      </div>
    </div>
  );
}
