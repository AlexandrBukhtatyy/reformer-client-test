import { FormInput } from '@/components/form';
import { useFormMode } from '../../hooks';

export function ContactsSection() {
  const { isReadOnly } = useFormMode();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Контактная информация</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          name="phone"
          label="Телефон"
          placeholder="+7 (999) 123-45-67"
          disabled={isReadOnly}
        />
        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="email@example.com"
          disabled={isReadOnly}
        />
      </div>
    </div>
  );
}
