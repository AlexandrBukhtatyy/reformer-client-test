import { useFormControl } from "@reformer/react";
import type { GroupNodeWithControls } from "@reformer/core";
import { FormField } from "../../../../components/ui/FormField";
import type { InsuranceApplicationForm } from "../../types";

interface StepProps {
  control: GroupNodeWithControls<InsuranceApplicationForm>;
}

export function Step4({ control }: StepProps) {
  const insuranceType = control.insuranceType.value;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Водители и застрахованные лица</h2>

      {(insuranceType === 'casco' || insuranceType === 'osago') && (
        <div className="space-y-4">
          <FormField
            control={control.unlimitedDrivers}
            label="Неограниченное количество водителей"
            component="checkbox"
          />

          {!control.unlimitedDrivers.value && (
            <>
              <h3 className="font-medium">Водители</h3>
              
              {control.drivers.map((driver, index) => (
                <div key={index} className="border p-4 rounded space-y-2">
                  <h4 className="font-medium">Водитель {index + 1}</h4>
                  
                  <FormField
                    control={driver.fullName}
                    label="ФИО водителя"
                    component="input"
                  />
                  
                  <FormField
                    control={driver.birthDate}
                    label="Дата рождения"
                    component="input"
                    type="date"
                  />
                  
                  <FormField
                    control={driver.licenseNumber}
                    label="Номер ВУ"
                    component="input"
                  />
                  
                  <FormField
                    control={driver.licenseIssueDate}
                    label="Дата выдачи ВУ"
                    component="input"
                    type="date"
                  />
                  
                  <FormField
                    control={driver.drivingExperience}
                    label="Стаж вождения (лет)"
                    component="input"
                    type="number"
                    disabled
                  />
                  
                  <FormField
                    control={driver.accidentsCount}
                    label="Кол-во ДТП за 3 года"
                    component="input"
                    type="number"
                  />
                  
                  <FormField
                    control={driver.isMainDriver}
                    label="Основной водитель"
                    component="checkbox"
                  />
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => control.drivers.push({ 
                  fullName: "", 
                  birthDate: "", 
                  licenseNumber: "", 
                  licenseIssueDate: "", 
                  drivingExperience: null,
                  accidentsCount: 0,
                  isMainDriver: false
                })}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Добавить водителя
              </button>
              
              <FormField
                control={control.minDriverAge}
                label="Мин. возраст водителя"
                component="input"
                type="number"
                disabled
              />
              
              <FormField
                control={control.minDriverExperience}
                label="Мин. стаж водителя"
                component="input"
                type="number"
                disabled
              />
            </>
          )}
        </div>
      )}

      {insuranceType === 'life' && (
        <div className="space-y-4">
          <h3 className="font-medium">Выгодоприобретатели</h3>
          
          {control.beneficiaries.map((beneficiary, index) => (
            <div key={index} className="border p-4 rounded space-y-2">
              <h4 className="font-medium">Выгодоприобретатель {index + 1}</h4>
              
              <FormField
                control={beneficiary.fullName}
                label="ФИО"
                component="input"
              />
              
              <FormField
                control={beneficiary.birthDate}
                label="Дата рождения"
                component="input"
                type="date"
              />
              
              <FormField
                control={beneficiary.relationship}
                label="Степень родства"
                component="select"
                options={[
                  { value: "spouse", label: "Супруг(а)" },
                  { value: "child", label: "Ребенок" },
                  { value: "parent", label: "Родитель" },
                  { value: "sibling", label: "Брат/сестра" },
                  { value: "other", label: "Другое" },
                ]}
              />
              
              <FormField
                control={beneficiary.share}
                label="Доля (%)"
                component="input"
                type="number"
              />
              
              <FormField
                control={beneficiary.phone}
                label="Телефон"
                component="input"
              />
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => control.beneficiaries.push({ 
              fullName: "", 
              birthDate: "", 
              relationship: "spouse", 
              share: null,
              phone: ""
            })}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Добавить выгодоприобретателя
          </button>
          
          <FormField
            control={control.totalBeneficiaryShare}
            label="Сумма долей (%)"
            component="input"
            type="number"
            disabled
          />
        </div>
      )}
    </div>
  );
}