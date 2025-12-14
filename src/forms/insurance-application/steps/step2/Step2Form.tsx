import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui';
import type { GroupNodeWithControls } from '@reformer/core';
import type { InsuranceApplicationForm } from '../../type';

interface Step2FormProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step2Form({ control }: Step2FormProps) {
  const insuredType = useFormControlValue(control.insuredType);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Данные страхователя</h2>
        <p className="text-sm text-gray-500">Укажите персональные или корпоративные данные</p>
      </div>

      <FormField control={control.insuredType} />

      {insuredType === 'individual' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField control={control.personalData!.lastName} />
            <FormField control={control.personalData!.firstName} />
            <FormField control={control.personalData!.middleName} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.personalData!.birthDate} />
            <FormField control={control.personalData!.gender} />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Паспортные данные</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.passportData!.series} />
              <FormField control={control.passportData!.number} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.passportData!.issueDate} />
              <FormField control={control.passportData!.issuedBy} />
            </div>
          </div>
        </div>
      )}

      {insuredType === 'company' && (
        <div className="space-y-4">
          <FormField control={control.companyData!.name} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.companyData!.inn} />
            <FormField control={control.companyData!.ogrn} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.companyData!.kpp} />
            <FormField control={control.companyData!.ceoName} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.phone} />
        <FormField control={control.email} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.fullName} />
        <FormField control={control.age} />
      </div>
    </div>
  );
}