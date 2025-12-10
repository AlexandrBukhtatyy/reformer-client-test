import { useFormControl } from "@reformer/react";
import type { GroupNodeWithControls } from "@reformer/core";
import { FormField } from "../../../../components/ui/FormField";
import type { InsuranceApplicationForm } from "../../types";

interface StepProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step5({ control }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">История и дополнительная информация</h2>

      <FormField
        control={control.hasPreviousInsurance}
        label="Был ли полис ранее"
        component="checkbox"
      />

      {control.hasPreviousInsurance.value && (
        <>
          <FormField
            control={control.previousInsurer}
            label="Предыдущий страховщик"
            component="input"
          />
          
          <FormField
            control={control.previousPolicyNumber}
            label="Номер предыдущего полиса"
            component="input"
          />
          
          <FormField
            control={control.previousPolicyEndDate}
            label="Дата окончания предыдущего полиса"
            component="input"
            type="date"
          />
        </>
      )}

      <FormField
        control={control.hadClaims}
        label="Были ли страховые случаи"
        component="checkbox"
      />

      {control.hadClaims.value && (
        <>
          {control.claims.map((claim, index) => (
            <div key={index} className="border p-4 rounded space-y-2">
              <h3 className="font-medium">Страховой случай {index + 1}</h3>
              
              <FormField
                control={claim.date}
                label="Дата события"
                component="input"
                type="date"
              />
              
              <FormField
                control={claim.type}
                label="Тип события"
                component="select"
                options={[
                  { value: "accident", label: "ДТП" },
                  { value: "theft", label: "Угон/кража" },
                  { value: "damage", label: "Повреждение" },
                  { value: "natural-disaster", label: "Стихийное бедствие" },
                  { value: "medical", label: "Медицинский случай" },
                  { value: "other", label: "Другое" },
                ]}
              />
              
              <FormField
                control={claim.description}
                label="Описание"
                component="textarea"
              />
              
              <FormField
                control={claim.amount}
                label="Сумма выплаты (₽)"
                component="input"
                type="number"
              />
              
              <FormField
                control={claim.atFault}
                label="По вине страхователя"
                component="checkbox"
              />
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => control.claims.push({ 
              date: "", 
              type: "accident", 
              description: "", 
              amount: null,
              atFault: false
            })}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Добавить страховой случай
          </button>
        </>
      )}

      <FormField
        control={control.promoCode}
        label="Промокод"
        component="input"
      />

      <FormField
        control={control.referralSource}
        label="Откуда узнали о нас"
        component="select"
        options={[
          { value: "internet", label: "Интернет" },
          { value: "friends", label: "Рекомендации друзей" },
          { value: "tv", label: "Телевидение" },
          { value: "agent", label: "Страховой агент" },
          { value: "other", label: "Другое" },
        ]}
      />

      <FormField
        control={control.agentCode}
        label="Код агента"
        component="input"
      />

      <FormField
        control={control.additionalNotes}
        label="Дополнительные комментарии"
        component="textarea"
      />
    </div>
  );
}