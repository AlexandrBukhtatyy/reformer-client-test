import type { GroupNodeWithControls } from "@reformer/core";
import type { CreditApplicationForm } from "../../types";
import { FormField } from "../../../../components/ui/FormField";

interface StepProps {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

export function LoanInfoStep({ control }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Основная информация о кредите</h2>

      <FormField control={control.loanType} />

      <FormField control={control.loanAmount} />

      <FormField control={control.loanTerm} />

      <FormField control={control.loanPurpose} />

      {/* Условные поля для ипотеки */}
      {control.loanType.value === 'mortgage' && (
        <div className="space-y-4 mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-medium">Данные недвижимости</h3>
          <FormField control={control.propertyValue} />
          <FormField control={control.initialPayment} />
        </div>
      )}

      {/* Условные поля для автокредита */}
      {control.loanType.value === 'car' && (
        <div className="space-y-4 mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-medium">Данные автомобиля</h3>
          <FormField control={control.carBrand} />
          <FormField control={control.carModel} />
          <FormField control={control.carYear} />
          <FormField control={control.carPrice} />
        </div>
      )}
    </div>
  );
}