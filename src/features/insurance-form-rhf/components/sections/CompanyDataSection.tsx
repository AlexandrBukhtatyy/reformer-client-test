import { FormInput } from '@/components/form';
import { useFormMode } from '../../hooks';

export function CompanyDataSection() {
  const { isReadOnly } = useFormMode();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Данные организации</h3>

      <FormInput
        name="companyData.name"
        label="Наименование организации"
        placeholder='ООО "Компания"'
        disabled={isReadOnly}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormInput
          name="companyData.inn"
          label="ИНН"
          placeholder="1234567890"
          disabled={isReadOnly}
        />
        <FormInput
          name="companyData.ogrn"
          label="ОГРН"
          placeholder="1234567890123"
          disabled={isReadOnly}
        />
        <FormInput
          name="companyData.kpp"
          label="КПП"
          placeholder="123456789"
          disabled={isReadOnly}
        />
      </div>

      <FormInput
        name="companyData.ceoName"
        label="ФИО руководителя"
        placeholder="Иванов Иван Иванович"
        disabled={isReadOnly}
      />
    </div>
  );
}
