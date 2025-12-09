import { useFormControl } from "@reformer/react";
import type { GroupNodeWithControls } from "@reformer/core";
import { FormField } from "../../../../components/ui/FormField";
import type { InsuranceApplicationForm } from "../../types";

interface StepProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step6({ control }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Расчет и подтверждение</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <h3 className="font-medium mb-2">Расчет</h3>
          
          <FormField
            control={control.basePremium}
            label="Базовая премия (₽)"
            component="input"
            type="number"
            disabled
          />
          
          <h4 className="font-medium mt-4">Коэффициенты</h4>
          
          <FormField
            control={control.ageCoefficient}
            label="Коэффициент возраста"
            component="input"
            type="number"
            disabled
          />
          
          <FormField
            control={control.experienceCoefficient}
            label="Коэффициент стажа"
            component="input"
            type="number"
            disabled
          />
          
          <FormField
            control={control.regionCoefficient}
            label="Региональный коэффициент"
            component="input"
            type="number"
            disabled
          />
          
          <FormField
            control={control.claimsCoefficient}
            label="Коэффициент аварийности (КБМ)"
            component="input"
            type="number"
            disabled
          />
          
          <h4 className="font-medium mt-4">Скидки</h4>
          
          <FormField
            control={control.deductibleDiscount}
            label="Скидка за франшизу (%)"
            component="input"
            type="number"
            disabled
          />
          
          <FormField
            control={control.promoDiscount}
            label="Скидка по промокоду (%)"
            component="input"
            type="number"
            disabled
          />
          
          <FormField
            control={control.multiPolicyDiscount}
            label="Скидка за комплексное страхование (%)"
            component="input"
            type="number"
            disabled
          />
          
          <h4 className="font-medium mt-4">Итого</h4>
          
          <FormField
            control={control.totalPremium}
            label="Итоговая премия (₽)"
            component="input"
            type="number"
            disabled
          />
          
          <FormField
            control={control.installmentAmount}
            label="Сумма платежа (₽)"
            component="input"
            type="number"
            disabled
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Согласия</h3>
        
        <FormField
          control={control.agreePersonalData}
          label="Согласие на обработку персональных данных"
          component="checkbox"
        />
        
        <FormField
          control={control.agreeTerms}
          label="Согласие с правилами страхования"
          component="checkbox"
        />
        
        <FormField
          control={control.agreeElectronicPolicy}
          label="Согласие на электронный полис"
          component="checkbox"
        />
        
        <FormField
          control={control.agreeMarketing}
          label="Согласие на рекламу"
          component="checkbox"
        />
        
        <FormField
          control={control.confirmAccuracy}
          label="Подтверждение достоверности данных"
          component="checkbox"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Подтверждение</h3>
        
        <FormField
          control={control.electronicSignature}
          label="SMS-код подтверждения"
          component="input"
        />
      </div>
    </div>
  );
}