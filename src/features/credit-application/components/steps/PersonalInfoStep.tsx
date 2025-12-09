import type { GroupNodeWithControls } from "@reformer/core";
import type { CreditApplicationForm } from "../../types";
import { FormField } from "../../../../components/ui/FormField";

interface StepProps {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function PersonalInfoStep({ control }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Персональные данные</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={control.personalData.lastName} />
        <FormField control={control.personalData.firstName} />
        <FormField control={control.personalData.middleName} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.personalData.birthDate} />
        <FormField control={control.personalData.gender} />
      </div>

      <FormField control={control.personalData.birthPlace} />

      <h3 className="text-lg font-medium mt-6">Паспортные данные</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.passportData.series} />
        <FormField control={control.passportData.number} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.passportData.issueDate} />
        <FormField control={control.passportData.issuedBy} />
      </div>

      <FormField control={control.passportData.departmentCode} />

      <h3 className="text-lg font-medium mt-6">Документы</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.inn} />
        <FormField control={control.snils} />
      </div>
    </div>
  );
}