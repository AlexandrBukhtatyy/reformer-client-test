import { useWatch, useFormContext } from 'react-hook-form';
import type { Path } from 'react-hook-form';
import type { InsuranceFormData } from '../../types';

interface ComputedFieldProps {
  name: Path<InsuranceFormData>;
  label: string;
  format?: (value: unknown) => string;
  suffix?: string;
}

export function ComputedField({ name, label, format, suffix }: ComputedFieldProps) {
  const { control } = useFormContext<InsuranceFormData>();
  const value = useWatch({ control, name });

  const displayValue = format ? format(value) : String(value ?? '-');

  return (
    <div className="flex justify-between py-2 border-b border-muted">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">
        {displayValue}
        {suffix && value != null && ` ${suffix}`}
      </span>
    </div>
  );
}
