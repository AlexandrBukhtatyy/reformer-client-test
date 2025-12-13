// Step 2: Policyholder Data
import type { GroupNodeWithControls } from '@reformer/core';
import { useFormControlValue } from '@reformer/core';
import { FormField } from '@/components/ui/FormField';
import type { InsuranceApplicationForm } from '../type';

interface Step2Props {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step2PolicyholderData({ control }: Step2Props) {
  const insuredType = useFormControlValue(control.insuredType);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Шаг 2: Данные страхователя</h2>

      <div className="space-y-4">
        {/* Insured Type Selection */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Тип страхователя</h3>
          <FormField control={control.insuredType} />
        </section>

        {/* Personal Data - for Individual */}
        {insuredType === 'individual' && (
          <>
            <section className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Личные данные</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={control.personalData.lastName} />
                <FormField control={control.personalData.firstName} />
                <FormField control={control.personalData.middleName} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={control.personalData.birthDate} />
                <FormField control={control.personalData.gender} />
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Паспортные данные</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={control.passportData.series} />
                <FormField control={control.passportData.number} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={control.passportData.issueDate} />
                <FormField control={control.passportData.issuedBy} />
              </div>
            </section>
          </>
        )}

        {/* Company Data - for Company */}
        {insuredType === 'company' && (
          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Данные организации</h3>
            <FormField control={control.companyData.name} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField control={control.companyData.inn} />
              <FormField control={control.companyData.ogrn} />
              <FormField control={control.companyData.kpp} />
            </div>
            <FormField control={control.companyData.ceoName} />
          </section>
        )}

        {/* Contact Information */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Контактная информация</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.phone} />
            <FormField control={control.email} />
          </div>
        </section>

        {/* Computed Fields */}
        {insuredType === 'individual' && (
          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Вычисляемые поля</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control.fullName} />
              <FormField control={control.age} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
