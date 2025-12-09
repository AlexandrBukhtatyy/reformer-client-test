import type { GroupNodeWithControls } from "@reformer/core";
import type { CreditApplicationForm } from "../../types";
import { FormField } from "../../../../components/ui/FormField";

interface StepProps {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function EmploymentInfoStep({ control }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Информация о занятости</h2>

      <FormField control={control.employmentStatus} />

      {/* Условные поля для работающих по найму */}
      {control.employmentStatus.value === 'employed' && (
        <div className="space-y-4 mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-medium">Информация о работодателе</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.companyName} />
            <FormField control={control.companyInn} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.companyPhone} />
            <FormField control={control.companyAddress} />
          </div>
          
          <FormField control={control.position} />
        </div>
      )}

      {/* Условные поля для ИП */}
      {control.employmentStatus.value === 'selfEmployed' && (
        <div className="space-y-4 mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-medium">Информация о бизнесе</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control.businessType} />
            <FormField control={control.businessInn} />
          </div>
          
          <FormField control={control.businessActivity} />
        </div>
      )}

      <h3 className="text-lg font-medium mt-6">Стаж и доход</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.workExperienceTotal} />
        <FormField control={control.workExperienceCurrent} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.monthlyIncome} />
        <FormField control={control.additionalIncome} />
      </div>

      {control.additionalIncome.value && control.additionalIncome.value > 0 && (
        <FormField control={control.additionalIncomeSource} />
      )}
    </div>
  );
}