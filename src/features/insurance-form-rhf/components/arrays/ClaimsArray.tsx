import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormInput, FormSelect, FormCheckbox, FormTextarea } from '@/components/form';
import type { InsuranceFormData } from '../../types';
import { createClaim } from '../../types';
import { CLAIM_TYPE_OPTIONS } from '../../constants';
import { useFormMode } from '../../hooks';

export function ClaimsArray() {
  const { isReadOnly } = useFormMode();
  const { control } = useFormContext<InsuranceFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'claims',
  });

  const handleAdd = () => {
    append(createClaim());
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Страховые случаи</h3>
        {!isReadOnly && (
          <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
            + Добавить страховой случай
          </Button>
        )}
      </div>

      {fields.length === 0 && (
        <p className="text-muted-foreground text-sm">
          Страховые случаи не добавлены
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

          <h4 className="font-medium">Страховой случай {index + 1}</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name={`claims.${index}.date`}
              label="Дата события"
              type="date"
              disabled={isReadOnly}
            />
            <FormSelect
              name={`claims.${index}.type`}
              label="Тип события"
              options={CLAIM_TYPE_OPTIONS}
              disabled={isReadOnly}
            />
          </div>

          <FormTextarea
            name={`claims.${index}.description`}
            label="Описание"
            placeholder="Опишите страховой случай..."
            disabled={isReadOnly}
          />

          <FormInput
            name={`claims.${index}.amount`}
            label="Сумма выплаты (руб.)"
            type="number"
            placeholder="100000"
            disabled={isReadOnly}
          />

          <FormCheckbox
            name={`claims.${index}.atFault`}
            label="По моей вине"
            disabled={isReadOnly}
          />
        </div>
      ))}
    </div>
  );
}
