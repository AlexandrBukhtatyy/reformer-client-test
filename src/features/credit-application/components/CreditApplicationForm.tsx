import { useMemo, useRef } from "react";
import { form } from "../schema";
import { STEP_VALIDATIONS, validation } from "../validation";
import { StepNavigation } from "../../../components/ui/step-navigation";
import type { StepNavigationHandle } from "../../../components/ui/step-navigation/types";
import { LoanInfoStep } from "./steps/LoanInfoStep";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { ContactInfoStep } from "./steps/ContactInfoStep";
import { EmploymentInfoStep } from "./steps/EmploymentInfoStep";
import { AdditionalInfoStep } from "./steps/AdditionalInfoStep";
import { ConfirmationStep } from "./steps/ConfirmationStep";
import type { CreditApplicationForm } from "../types";

export function CreditApplicationForm() {
  const formInstance = useMemo(() => form, []);
  const navRef = useRef<StepNavigationHandle<CreditApplicationForm>>(null);

  const config = useMemo(() => ({
    totalSteps: 6,
    stepValidations: STEP_VALIDATIONS,
    fullValidation: validation,
  }), []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Заявка на кредит</h1>
      
      <StepNavigation
        ref={navRef}
        form={formInstance}
        config={config}
      >
        {({ currentStep, isFirstStep, isLastStep, isValidating }) => (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Шаг {currentStep} из 6</span>
                <span className="text-sm text-gray-500">
                  {currentStep === 1 && "Основная информация"}
                  {currentStep === 2 && "Персональные данные"}
                  {currentStep === 3 && "Контактная информация"}
                  {currentStep === 4 && "Информация о занятости"}
                  {currentStep === 5 && "Дополнительная информация"}
                  {currentStep === 6 && "Подтверждение"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(currentStep / 6) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-8">
              {currentStep === 1 && <LoanInfoStep control={formInstance} />}
              {currentStep === 2 && <PersonalInfoStep control={formInstance} />}
              {currentStep === 3 && <ContactInfoStep control={formInstance} />}
              {currentStep === 4 && <EmploymentInfoStep control={formInstance} />}
              {currentStep === 5 && <AdditionalInfoStep control={formInstance} />}
              {currentStep === 6 && <ConfirmationStep control={formInstance} />}
            </div>

            <div className="flex justify-between mt-8">
              {!isFirstStep && (
                <button
                  onClick={() => navRef.current?.goToPreviousStep()}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                  disabled={isValidating}
                >
                  Назад
                </button>
              )}
              
              {isLastStep ? (
                <button
                  onClick={async () => {
                    const result = await navRef.current?.submit((values) => {
                      console.log("Submit:", values);
                      // Здесь будет логика отправки формы
                      return values;
                    });
                    if (result) {
                      console.log("Form submitted successfully");
                    }
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ml-auto"
                  disabled={isValidating}
                >
                  {isValidating ? "Отправка..." : "Отправить заявку"}
                </button>
              ) : (
                <button
                  onClick={() => navRef.current?.goToNextStep()}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ml-auto"
                  disabled={isValidating}
                >
                  {isValidating ? "Проверка..." : "Далее"}
                </button>
              )}
            </div>
          </>
        )}
      </StepNavigation>
    </div>
  );
}