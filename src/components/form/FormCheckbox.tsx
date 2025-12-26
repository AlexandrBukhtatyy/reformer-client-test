import * as React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { Checkbox, type CheckboxProps } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

export interface FormCheckboxProps extends Omit<CheckboxProps, 'value' | 'onChange' | 'onBlur'> {
  name: string;
  description?: string;
  required?: boolean;
  className?: string;
}

export function FormCheckbox({
  name,
  label,
  description,
  required,
  className,
  ...checkboxProps
}: FormCheckboxProps) {
  const { control } = useFormContext();
  const id = React.useId();

  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div className={cn('space-y-1.5', className)}>
      <Checkbox
        ref={ref}
        value={value ?? false}
        onChange={onChange}
        onBlur={onBlur}
        label={
          label ? (
            <>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </>
          ) : undefined
        }
        data-testid={name}
        {...checkboxProps}
      />

      {description && !error && (
        <p className="text-sm text-muted-foreground ml-6">{description}</p>
      )}

      {error && (
        <p className="text-sm text-destructive ml-6">{error.message}</p>
      )}
    </div>
  );
}
