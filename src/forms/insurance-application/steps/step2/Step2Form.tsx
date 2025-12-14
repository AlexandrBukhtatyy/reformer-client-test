import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../../type';

interface Step2FormProps {
  form: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step2Form({ form }: Step2FormProps) {
  const insuredType = useFormControlValue(form.insuredType);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Данные страхователя</h2>
        <p className="text-sm text-gray-500">Укажите персональные или корпоративные данные</p>
      </div>

      <FormField control={form.insuredType} />

      {insuredType === 'individual' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField control={form.personalData!.lastName} />
            <FormField control={form.personalData!.firstName} />
            <FormField control={form.personalData!.middleName} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.personalData!.birthDate} />
            <FormField control={form.personalData!.gender} />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Паспортные данные</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.passportData!.series} />
              <FormField control={form.passportData!.number} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.passportData!.issueDate} />
              <FormField control={form.passportData!.issuedBy} />
            </div>
          </div>
        </div>
      )}

      {insuredType === 'company' && (
        <div className="space-y-4">
          <FormField control={form.companyData!.name} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.companyData!.inn} />
            <FormField control={form.companyData!.ogrn} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.companyData!.kpp} />
            <FormField control={form.companyData!.ceoName} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={form.phone} />
        <FormField control={form.email} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={form.fullName} />
        <FormField control={form.age} />
      </div>
    </div>
  );
}