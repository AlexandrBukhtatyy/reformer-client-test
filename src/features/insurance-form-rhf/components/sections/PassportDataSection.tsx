import { FormInput } from '@/components/form';
import { useFormMode } from '../../hooks';

export function PassportDataSection() {
  const { isReadOnly } = useFormMode();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Паспортные данные</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          name="passportData.series"
          label="Серия"
          placeholder="1234"
          disabled={isReadOnly}
        />
        <FormInput
          name="passportData.number"
          label="Номер"
          placeholder="567890"
          disabled={isReadOnly}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          name="passportData.issueDate"
          label="Дата выдачи"
          type="date"
          disabled={isReadOnly}
        />
        <FormInput
          name="passportData.issuedBy"
          label="Кем выдан"
          placeholder="ОВД района..."
          disabled={isReadOnly}
        />
      </div>
    </div>
  );
}
