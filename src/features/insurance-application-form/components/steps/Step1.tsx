import { useFormControl } from "@reformer/react";
import type { GroupNodeWithControls } from "@reformer/core";
import { FormField } from "../../../../components/ui/FormField";
import type { InsuranceApplicationForm } from "../../types";

interface StepProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step1({ control }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Тип страхования и основные параметры</h2>

      <FormField
        control={control.insuranceType}
        label="Тип страхования"
        component="select"
        options={[
          { value: "casco", label: "КАСКО" },
          { value: "osago", label: "ОСАГО" },
          { value: "property", label: "Недвижимость" },
          { value: "life", label: "Жизнь и здоровье" },
          { value: "travel", label: "Путешествия" },
        ]}
      />

      <FormField
        control={control.insurancePeriod}
        label="Срок страхования"
        component="select"
        options={[
          { value: 3, label: "3 месяца" },
          { value: 6, label: "6 месяцев" },
          { value: 12, label: "1 год" },
          { value: 24, label: "2 года" },
          { value: 36, label: "3 года" },
        ]}
      />

      <FormField
        control={control.startDate}
        label="Дата начала действия полиса"
        component="input"
        type="date"
      />

      <FormField
        control={control.endDate}
        label="Дата окончания"
        component="input"
        type="date"
        disabled
      />

      <FormField
        control={control.coverageAmount}
        label="Страховая сумма (₽)"
        component="input"
        type="number"
        min={1000}
        max={500000}
      />

      <FormField
        control={control.deductible}
        label="Франшиза (₽)"
        component="input"
        type="number"
        min={0}
      />

      <FormField
        control={control.paymentType}
        label="Способ оплаты"
        component="radio-group"
        options={[
          { value: "single", label: "Единовременно" },
          { value: "installments", label: "В рассрочку" },
        ]}
      />

      {control.paymentType.value === 'installments' && (
        <FormField
          control={control.installments}
          label="Количество платежей"
          component="select"
          options={[
            { value: 2, label: "2 платежа" },
            { value: 3, label: "3 платежа" },
            { value: 4, label: "4 платежа" },
            { value: 6, label: "6 платежей" },
            { value: 12, label: "12 платежей" },
          ]}
        />
      )}
    </div>
  );
}