import * as React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { Select, type SelectProps } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface FormSelectProps extends Omit<SelectProps<unknown>, 'value' | 'onChange' | 'onBlur'> {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
}

export function FormSelect({
  name,
  label,
  description,
  required,
  className,
  options,
  placeholder,
  ...selectProps
}: FormSelectProps) {
  const { control } = useFormContext();
  const id = React.useId();

  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  });

  // Преобразует строковое значение обратно в исходный тип (string или number)
  const handleChange = React.useCallback(
    (newValue: string | null) => {
      if (newValue === null) {
        onChange(null);
        return;
      }

      // Ищем опцию с таким значением и возвращаем оригинальный тип
      const option = options?.find((opt) => String(opt.value) === newValue);
      if (option) {
        onChange(option.value);
      } else {
        onChange(newValue);
      }
    },
    [onChange, options]
  );

  // Преобразуем значение в строку для Select UI компонента
  const stringValue = value != null ? String(value) : null;

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <Select
        ref={ref}
        value={stringValue}
        onChange={handleChange}
        onBlur={onBlur}
        options={options}
        placeholder={placeholder}
        aria-invalid={invalid}
        data-testid={name}
        {...selectProps}
      />

      {description && !error && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {error && (
        <p className="text-sm text-destructive">{error.message}</p>
      )}
    </div>
  );
}
