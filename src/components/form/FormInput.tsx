import * as React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { Input, type InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface FormInputProps extends Omit<InputProps, 'value' | 'onChange' | 'onBlur' | 'name'> {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
}

export function FormInput({
  name,
  label,
  description,
  required,
  className,
  ...inputProps
}: FormInputProps) {
  const { control } = useFormContext();
  const id = React.useId();

  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  });

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <Input
        id={id}
        ref={ref}
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={invalid}
        aria-describedby={error ? `${id}-error` : description ? `${id}-desc` : undefined}
        {...inputProps}
      />

      {description && !error && (
        <p id={`${id}-desc`} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error.message}
        </p>
      )}
    </div>
  );
}
