import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormInput, FormSelect } from '@/components/form';
import type { InsuranceFormData } from '../../types';
import { createBeneficiary } from '../../types';
import { RELATIONSHIP_OPTIONS } from '../../constants';
import { useFormMode } from '../../hooks';

export function BeneficiariesArray() {
  const { isReadOnly } = useFormMode();
  const { control } = useFormContext<InsuranceFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'beneficiaries',
  });

  const totalShare = useWatch({ control, name: 'totalBeneficiaryShare' });

  const handleAdd = () => {
    append(createBeneficiary());
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Выгодоприобретатели</h3>
        {!isReadOnly && (
          <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
            + Добавить выгодоприобретателя
          </Button>
        )}
      </div>

      {fields.length === 0 && (
        <p className="text-muted-foreground text-sm">
          Выгодоприобретатели не добавлены
        </p>
      )}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border rounded-lg p-4 space-y-4 relative"
        >
          {!isReadOnly && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-destructive"
              onClick={() => remove(index)}
            >
              ✕
            </Button>
          )}

          <h4 className="font-medium">Выгодоприобретатель {index + 1}</h4>

          <FormInput
            name={`beneficiaries.${index}.fullName`}
            label="ФИО"
            placeholder="Иванов Иван Иванович"
            disabled={isReadOnly}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name={`beneficiaries.${index}.birthDate`}
              label="Дата рождения"
              type="date"
              disabled={isReadOnly}
            />
            <FormSelect
              name={`beneficiaries.${index}.relationship`}
              label="Родство"
              options={RELATIONSHIP_OPTIONS}
              disabled={isReadOnly}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name={`beneficiaries.${index}.share`}
              label="Доля (%)"
              type="number"
              placeholder="50"
              disabled={isReadOnly}
            />
            <FormInput
              name={`beneficiaries.${index}.phone`}
              label="Телефон"
              placeholder="+7 (999) 123-45-67"
              disabled={isReadOnly}
            />
          </div>
        </div>
      ))}

      {fields.length > 0 && (
        <div className="flex justify-end items-center gap-2 pt-2 border-t">
          <span className="text-muted-foreground">Общая доля:</span>
          <span
            className={`font-bold ${
              totalShare === 100
                ? 'text-green-600'
                : totalShare !== null && totalShare !== 0
                ? 'text-destructive'
                : ''
            }`}
          >
            {totalShare ?? 0}%
          </span>
          {totalShare !== 100 && totalShare !== null && totalShare !== 0 && (
            <span className="text-destructive text-sm">
              (должно быть 100%)
            </span>
          )}
        </div>
      )}
    </div>
  );
}
