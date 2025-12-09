import { useFormControl } from "@reformer/react";
import type { GroupNodeWithControls } from "@reformer/core";
import { FormField } from "../../../../components/ui/FormField";
import type { InsuranceApplicationForm } from "../../types";

interface StepProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step2({ control }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Данные страхователя</h2>

      <FormField
        control={control.insuredType}
        label="Тип страхователя"
        component="radio-group"
        options={[
          { value: "individual", label: "Физическое лицо" },
          { value: "corporate", label: "Юридическое лицо" },
        ]}
      />

      {control.insuredType.value === 'individual' ? (
        <div className="space-y-4">
          <FormField
            control={control.personalData.lastName}
            label="Фамилия"
            component="input"
          />
          
          <FormField
            control={control.personalData.firstName}
            label="Имя"
            component="input"
          />
          
          <FormField
            control={control.personalData.middleName}
            label="Отчество"
            component="input"
          />
          
          <FormField
            control={control.personalData.birthDate}
            label="Дата рождения"
            component="input"
            type="date"
          />
          
          <FormField
            control={control.personalData.gender}
            label="Пол"
            component="radio-group"
            options={[
              { value: "male", label: "Мужской" },
              { value: "female", label: "Женский" },
            ]}
          />

          <h3 className="font-medium mt-4">Паспортные данные</h3>
          
          <FormField
            control={control.passportData.series}
            label="Серия паспорта"
            component="input"
          />
          
          <FormField
            control={control.passportData.number}
            label="Номер паспорта"
            component="input"
          />
          
          <FormField
            control={control.passportData.issueDate}
            label="Дата выдачи"
            component="input"
            type="date"
          />
          
          <FormField
            control={control.passportData.issuedBy}
            label="Кем выдан"
            component="input"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <FormField
            control={control.companyData.name}
            label="Название организации"
            component="input"
          />
          
          <FormField
            control={control.companyData.inn}
            label="ИНН организации"
            component="input"
          />
          
          <FormField
            control={control.companyData.ogrn}
            label="ОГРН"
            component="input"
          />
          
          <FormField
            control={control.companyData.kpp}
            label="КПП"
            component="input"
          />
          
          <FormField
            control={control.companyData.ceoName}
            label="ФИО руководителя"
            component="input"
          />
        </div>
      )}

      <FormField
        control={control.phone}
        label="Телефон"
        component="input"
      />

      <FormField
        control={control.email}
        label="Email"
        component="input"
        type="email"
      />

      <FormField
        control={control.fullName}
        label="Полное имя (ФИО)"
        component="input"
        disabled
      />

      <FormField
        control={control.age}
        label="Возраст"
        component="input"
        type="number"
        disabled
      />
    </div>
  );
}