import type { GroupNodeWithControls } from "@reformer/core";
import type { CreditApplicationForm } from "../../types";
import { FormField } from "../../../../components/ui/FormField";
import { FormArrayManager } from "../../../../components/ui/FormArrayManager";

interface StepProps {
  control: GroupNodeWithControls<CreditApplicationForm>;
}

// Компонент для элемента массива имущества
function PropertyItem({ control }: { control: GroupNodeWithControls<CreditApplicationForm["properties"][0]> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField control={control.type} />
      <FormField control={control.estimatedValue} />
      <div className="md:col-span-2">
        <FormField control={control.description} />
      </div>
      <FormField control={control.hasEncumbrance} />
    </div>
  );
}

// Компонент для элемента массива существующих кредитов
function ExistingLoanItem({ control }: { control: GroupNodeWithControls<CreditApplicationForm["existingLoans"][0]> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField control={control.bank} />
      <FormField control={control.type} />
      <FormField control={control.amount} />
      <FormField control={control.remainingAmount} />
      <FormField control={control.monthlyPayment} />
      <FormField control={control.maturityDate} />
    </div>
  );
}

// Компонент для элемента массива созаемщиков
function CoBorrowerItem({ control }: { control: GroupNodeWithControls<CreditApplicationForm["coBorrowers"][0]> }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={control.personalData.lastName} />
        <FormField control={control.personalData.firstName} />
        <FormField control={control.personalData.middleName} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.phone} />
        <FormField control={control.email} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control.relationship} />
        <FormField control={control.monthlyIncome} />
      </div>
    </div>
  );
}

export function AdditionalInfoStep({ control }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Дополнительная информация</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={control.maritalStatus} />
        <FormField control={control.dependents} />
        <FormField control={control.education} />
      </div>

      <div className="mt-4">
        <FormField control={control.hasProperty} />
      </div>

      {control.hasProperty.value && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-4">Имущество</h3>
          <FormArrayManager
            control={control.properties}
            component={PropertyItem}
            itemLabel="Имущество"
          />
        </div>
      )}

      <div className="mt-4">
        <FormField control={control.hasExistingLoans} />
      </div>

      {control.hasExistingLoans.value && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-4">Существующие кредиты</h3>
          <FormArrayManager
            control={control.existingLoans}
            component={ExistingLoanItem}
            itemLabel="Кредит"
          />
        </div>
      )}

      <div className="mt-4">
        <FormField control={control.hasCoBorrower} />
      </div>

      {control.hasCoBorrower.value && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-4">Созаемщики</h3>
          <FormArrayManager
            control={control.coBorrowers}
            component={CoBorrowerItem}
            itemLabel="Созаемщик"
          />
        </div>
      )}
    </div>
  );
}