import { FormInput, FormCheckbox } from '@/components/form';
import { useFormMode } from '../../hooks';
import { useWatch, useFormContext } from 'react-hook-form';
import type { InsuranceFormData } from '../../types';
import { ComputedField } from '../ui';

export function HealthSection() {
  const { isReadOnly } = useFormMode();
  const { control } = useFormContext<InsuranceFormData>();

  const isSmoker = useWatch({ control, name: 'health.isSmoker' });
  const hasChronicDiseases = useWatch({ control, name: 'health.hasChronicDiseases' });
  const hadSurgeries = useWatch({ control, name: 'health.hadSurgeries' });
  const practicesSports = useWatch({ control, name: 'health.practicesSports' });

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Данные о здоровье</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormInput
          name="health.height"
          label="Рост (см)"
          type="number"
          placeholder="175"
          disabled={isReadOnly}
        />
        <FormInput
          name="health.weight"
          label="Вес (кг)"
          type="number"
          placeholder="70"
          disabled={isReadOnly}
        />
        <div>
          <ComputedField
            name="health.bmi"
            label="ИМТ"
            format={(val) => (val as number)?.toFixed(1) ?? '-'}
          />
        </div>
      </div>

      <FormInput
        name="health.bloodPressure"
        label="Артериальное давление"
        placeholder="120/80"
        disabled={isReadOnly}
      />

      <div className="space-y-2">
        <FormCheckbox
          name="health.isSmoker"
          label="Курю"
          disabled={isReadOnly}
        />
        {isSmoker && (
          <FormInput
            name="health.smokingYears"
            label="Стаж курения (лет)"
            type="number"
            placeholder="5"
            disabled={isReadOnly}
          />
        )}
      </div>

      <div className="space-y-2">
        <FormCheckbox
          name="health.hasChronicDiseases"
          label="Есть хронические заболевания"
          disabled={isReadOnly}
        />
        {hasChronicDiseases && (
          <FormInput
            name="health.chronicDiseases"
            label="Укажите заболевания"
            placeholder="Перечислите хронические заболевания"
            disabled={isReadOnly}
          />
        )}
      </div>

      <div className="space-y-2">
        <FormCheckbox
          name="health.hadSurgeries"
          label="Были операции за последние 5 лет"
          disabled={isReadOnly}
        />
        {hadSurgeries && (
          <FormInput
            name="health.surgeries"
            label="Укажите операции"
            placeholder="Перечислите операции"
            disabled={isReadOnly}
          />
        )}
      </div>

      <FormInput
        name="health.occupation"
        label="Род занятий"
        placeholder="Инженер"
        disabled={isReadOnly}
      />

      <FormCheckbox
        name="health.isHighRiskJob"
        label="Работа связана с повышенным риском"
        disabled={isReadOnly}
      />

      <div className="space-y-2">
        <FormCheckbox
          name="health.practicesSports"
          label="Занимаюсь спортом"
          disabled={isReadOnly}
        />
        {practicesSports && (
          <FormCheckbox
            name="health.extremeSports"
            label="Экстремальные виды спорта"
            disabled={isReadOnly}
          />
        )}
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Страховое покрытие</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormCheckbox
            name="lifeCoverageOptions.death"
            label="Смерть"
            disabled={isReadOnly}
          />
          <FormCheckbox
            name="lifeCoverageOptions.disability"
            label="Инвалидность"
            disabled={isReadOnly}
          />
          <FormCheckbox
            name="lifeCoverageOptions.criticalIllness"
            label="Критические заболевания"
            disabled={isReadOnly}
          />
          <FormCheckbox
            name="lifeCoverageOptions.accident"
            label="Несчастный случай"
            disabled={isReadOnly}
          />
        </div>
      </div>
    </div>
  );
}
