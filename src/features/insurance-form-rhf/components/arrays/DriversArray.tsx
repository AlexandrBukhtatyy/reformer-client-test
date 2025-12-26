import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormInput, FormCheckbox } from '@/components/form';
import type { InsuranceFormData } from '../../types';
import { createDriver } from '../../types';
import { useFormMode } from '../../hooks';
import { ComputedField } from '../ui';

export function DriversArray() {
  const { isReadOnly } = useFormMode();
  const { control } = useFormContext<InsuranceFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'drivers',
  });

  const handleAdd = () => {
    append(createDriver());
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Водители</h3>
        {!isReadOnly && (
          <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
            + Добавить водителя
          </Button>
        )}
      </div>

      {fields.length === 0 && (
        <p className="text-muted-foreground text-sm">Водители не добавлены</p>
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

          <h4 className="font-medium">Водитель {index + 1}</h4>

          <FormInput
            name={`drivers.${index}.fullName`}
            label="ФИО"
            placeholder="Иванов Иван Иванович"
            disabled={isReadOnly}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name={`drivers.${index}.birthDate`}
              label="Дата рождения"
              type="date"
              disabled={isReadOnly}
            />
            <FormInput
              name={`drivers.${index}.licenseNumber`}
              label="Номер ВУ"
              placeholder="77 00 123456"
              disabled={isReadOnly}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name={`drivers.${index}.licenseIssueDate`}
              label="Дата выдачи ВУ"
              type="date"
              disabled={isReadOnly}
            />
            <div>
              <ComputedField
                name={`drivers.${index}.drivingExperience` as any}
                label="Стаж вождения"
                suffix="лет"
              />
            </div>
          </div>

          <FormInput
            name={`drivers.${index}.accidentsCount`}
            label="Количество ДТП за последние 3 года"
            type="number"
            disabled={isReadOnly}
          />

          <FormCheckbox
            name={`drivers.${index}.isMainDriver`}
            label="Основной водитель"
            disabled={isReadOnly}
          />
        </div>
      ))}
    </div>
  );
}
