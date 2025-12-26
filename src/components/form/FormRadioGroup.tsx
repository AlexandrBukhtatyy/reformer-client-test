import * as React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { RadioGroup, type RadioGroupProps } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

export interface FormRadioGroupProps extends Omit<RadioGroupProps, 'value' | 'onChange' | 'onBlur'> {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
}

export function FormRadioGroup({
  name,
  label,
  description,
  required,
  className,
  options,
  ...radioProps
}: FormRadioGroupProps) {
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
        <label className="block text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <RadioGroup
        ref={ref}
        value={value ?? null}
        onChange={onChange}
        onBlur={onBlur}
        options={options}
        aria-invalid={invalid}
        data-testid={name}
        {...radioProps}
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
