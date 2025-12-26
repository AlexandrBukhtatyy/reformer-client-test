import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/form';
import type { InsuranceFormData } from '../../types';
import { createTraveler } from '../../types';
import { useFormMode } from '../../hooks';

export function TravelersArray() {
  const { isReadOnly } = useFormMode();
  const { control } = useFormContext<InsuranceFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'travelers',
  });

  const handleAdd = () => {
    append(createTraveler());
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Путешественники</h3>
        {!isReadOnly && (
          <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
            + Добавить путешественника
          </Button>
        )}
      </div>

      {fields.length === 0 && (
        <p className="text-muted-foreground text-sm">
          Путешественники не добавлены
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

          <h4 className="font-medium">Путешественник {index + 1}</h4>

          <FormInput
            name={`travelers.${index}.fullName`}
            label="ФИО (как в загранпаспорте)"
            placeholder="IVANOV IVAN"
            disabled={isReadOnly}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name={`travelers.${index}.birthDate`}
              label="Дата рождения"
              type="date"
              disabled={isReadOnly}
            />
            <FormInput
              name={`travelers.${index}.passportNumber`}
              label="Номер загранпаспорта"
              placeholder="12 3456789"
              disabled={isReadOnly}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
